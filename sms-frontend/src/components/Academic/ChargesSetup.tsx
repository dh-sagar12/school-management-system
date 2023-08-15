"use client"
import { ClassesModel, CoursesModel } from '@/academic/academic'
import { Card, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useState } from 'react'


interface Props {
    ClassesModel: ClassesModel[]
    CoursesModel: CoursesModel[]
}

const ChargesSetup = (prop: Props) => {
    const [ShowCourse, setShowCourse] = useState(false)
    const [form] = Form.useForm();


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
        console.log(values);

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
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="course_id" label="Course" rules={[{ required: true }]}>
                                        <Select
                                            placeholder="Course"
                                            allowClear
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
                                :
                                <React.Fragment></React.Fragment>
                        }

                        <Col xs={24} sm={12} md={6}>
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
                            <Form.Item name="academic_session_type" label="Year/Semester" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Course"
                                    allowClear
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

                    </Row>

                </Form>
            </Card>
        </React.Fragment>
    )
}

export default ChargesSetup