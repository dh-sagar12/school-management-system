"use client"
import { ClassesModel, CoursesModel, AcademicSessionDropdown, ChargesModel } from '@/academic/academic'
import APIHandlers from '@/utils/APIHandlers'
import getAcademicSession from '@/utils/AcademicSessionServices'
import { Button, Card, Col, Divider, Empty, Form, Input, InputNumber, Row, Select, Space, Table, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'


interface Props {
    ClassesModel: ClassesModel[]
    CoursesModel: CoursesModel[]
}


const ChargesSetup = (prop: Props) => {
    const [ShowCourse, setShowCourse] = useState(false)
    const [AcademicSessionDropdown, setAcademicSessionDropdown] = useState<any>([])
    const [ChargesPostData, setChargesPostData] = useState<ChargesModel[]>([])
    const [form] = Form.useForm();
    const router = useRouter()
    const [PageSubmitting, setPageSubmitting] = useState(false)


    const course_needed = ['Eleven', 'Twelve', 'Bachelor', 'Master']

    const handleChangeInClass = (value: number) => {

        if (prop.ClassesModel.filter((item) => {
            return course_needed.some(elem => {
                return elem == item.class_name
            })
        }).some((item: any) => item.id == value)) {
            setShowCourse(true)
        }
        else {
            setShowCourse(false)
            form.setFieldsValue({ 'course_id': null })
        }


    }

    const OnChangeInCourse = async (value: number) => {
        form.setFieldsValue({ academic_session_type: null })
        let course = prop.CoursesModel.filter(item => item.id == value)[0]
        let academic_session_dropdown_data = await getAcademicSession(course.course_duration, course.academic_type_id)
        setAcademicSessionDropdown(academic_session_dropdown_data)



    }


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 32 },
        },
    };

    const onFinish = (values: any) => {

        if (
            ChargesPostData.some(item => item.charge_code == values.charge_code) &&
            ChargesPostData.some(item => item.charge_name == values.charge_name) &&
            ChargesPostData.some(item => item.course_id == values.course_id) &&
            ChargesPostData.some(item => item.academic_session_type == values.academic_session_type)
        ) {
            message.error('Already Exists')
        }
        else {
            setChargesPostData([...ChargesPostData, values])
            form.setFieldsValue({
                charge_code: null,
                charge_name: null,
                charge_amount: null,
                course_id: null,
                academic_session_type: null
            })
        }


    }

    const address_table_column: ColumnsType<ChargesModel> = [
        {
            title: 'Charge Code',
            dataIndex: 'charge_code',
            key: 'charge_code',

        },


        {
            title: 'Charge Name',
            dataIndex: 'charge_name',
            key: 'charge_name',

        },

        {
            title: 'Class',
            dataIndex: 'class_id',
            key: 'class_id',
            render: (record) => {
                return prop.ClassesModel.find(item => item.id == record)?.class_name
            },

        },
        {
            title: 'Course',
            dataIndex: 'course_id',
            key: 'course_id',
            render: (record) => {
                return record !== undefined ?
                    prop.CoursesModel.find(item => item.id == record)?.course_name : '-'
            }

        },

        {
            title: 'Year/Semester',
            dataIndex: 'academic_session_type',
            key: 'academic_session_id'

        },

        {
            title: 'Charge',
            dataIndex: 'charge_amount',
            key: 'charge_amount'

        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className='text-purple-700'>
                    <a><AiOutlineDelete onClick={() => DeleteContact(record)} /></a>
                </Space>
            ),
        },
    ]

    function DeleteContact(record: ChargesModel): void {
        setChargesPostData(ChargesPostData.filter(item => item !==  record))

    }

    const handleSave = () => {
        setPageSubmitting(true)
        APIHandlers.post('/api/academic/charges/', { 'charges': ChargesPostData }).then(response => {
            message.success('Success')
            router.push('/academic/charges')
            setPageSubmitting(false)

        }).catch(err => {
            message.error(err)
            setPageSubmitting(false)

        })
    }

    return (
        <React.Fragment>
            <Card>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="charges"
                    onFinish={onFinish}
                    scrollToFirstError
                    layout='vertical'
                >
                    <Row gutter={{
                        xs: 8,
                        sm: 16
                    }}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item name="class_id" label="Class" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Class"
                                    allowClear
                                    onChange={handleChangeInClass}
                                    disabled={ChargesPostData.length > 0}
                                >
                                    {
                                        prop.ClassesModel.map(item => {
                                            return (
                                                <Select.Option value={item.id} key={item.id}>{item.class_name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>


                        {
                            ShowCourse ?
                                <React.Fragment>
                                    <Col xs={24} sm={12} md={6}>
                                        <Form.Item name="course_id" label="Course" rules={[{ required: true }]}>
                                            <Select
                                                placeholder="Course"
                                                allowClear
                                                onChange={OnChangeInCourse}

                                            >
                                                {
                                                    prop.CoursesModel.map(item => {
                                                        return (
                                                            <Select.Option value={item.id} key={item.id}>{item.course_name}</Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                        <Form.Item name="academic_session_type" label="Year/Semester" rules={[{ required: true }]}>
                                            <Select
                                                placeholder="Year/Semester"
                                                allowClear
                                            >
                                                {
                                                    AcademicSessionDropdown.map((item: AcademicSessionDropdown) => {
                                                        return (
                                                            <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </React.Fragment>

                                :
                                <React.Fragment></React.Fragment>
                        }

                        <Col xs={24} sm={12} md={3}>
                            <Form.Item name="charge_code" label="Charge Code" rules={[{ required: true }]}>
                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item name="charge_name" label="Charge Name" rules={[{ required: true }]}>
                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item name="charge_amount" label="Charge Amount" rules={[{ required: true }]}>
                                <InputNumber size='middle' className='w-full' min={1} />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={3}>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" htmlType="submit" shape="circle" icon={<AiOutlinePlus />} className='bg-purple-700' />
                            </Form.Item>
                        </Col>


                    </Row>

                </Form>
                <Divider className='border-purple-700' />

                {
                    ChargesPostData.length > 0 ?
                        <Table columns={address_table_column} dataSource={ChargesPostData} pagination={false} rowKey={(record) => Math.random() * 1000} className='my-4' />

                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }

                <Space size={'middle'}>
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick={handleSave} className='bg-purple-700' loading={PageSubmitting} >
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item label=" " colon={false}>

                        <Button htmlType="button" onClick={() => { router.push('/academic/charges') }} className='bg-gray-300' >
                            Cancel
                        </Button>
                    </Form.Item>

                </Space>


            </Card>
        </React.Fragment>
    )
}

export default ChargesSetup
