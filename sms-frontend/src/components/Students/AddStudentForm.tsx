'use client'

import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Space,
    message,
} from 'antd';
import CustomDatePicker from '@/helpers/DatePicker';
import StudentAddressForm from './StudentAddressForm';
import { AddNewStudentForm, StudentAddress, StudentContactInfo } from '@/students/studentTypes';
import APIHandlers from '@/utils/APIHandlers';
import StudentContactForm from './StudentContactForm';
import { DistrictModel, LocalBodiesModel, StateModel } from '@/core/coreTypes';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Context/AuthContext';
import dayjs from 'dayjs';


const AddStudentForm = () => {


    const [form] = Form.useForm();


    // this state will send into the request  as address_request
    const [StudentAddress, setStudentAddress] = useState<StudentAddress[]>([])

    //this state will send into the request as contact_info
    const [StudentContacts, setStudentContacts] = useState<StudentContactInfo[]>([])



    const router = useRouter()
    const [States, setStates] = useState<StateModel[]>([])
    const [Districts, setDistricts] = useState<DistrictModel[]>([])
    const [LocalBodies, setLocalBodies] = useState<LocalBodiesModel[]>([])
    const [PageSubmitting, setPageSubmitting] = useState<boolean>(false)
    const { today_date } = useContext(AuthContext)

    useEffect(() => {

        APIHandlers.promises(['/api/core/provinces/', '/api/core/districts/', '/api/core/localbodies/']).then((data) => {
            setStates(data[0])
            setDistricts(data[1])
            setLocalBodies(data[2])

        }).catch(error => {

        })




    }, [])





    const onFinish = (values: any) => {
        let introduced_on = values["introduced_on"].format("YYYY-MM-DD")
        let date_of_birth = values["date_of_birth"].format("YYYY-MM-DD")

        // let proper_values = { ...values, introduced_on: introduced_on, date_of_birth: date_of_birth }

        let request_student_data: AddNewStudentForm = {
            student: { ...values, introduced_on: introduced_on, date_of_birth: date_of_birth },
            student_addresses: StudentAddress,
            student_contact: StudentContacts
        }
        console.log('Received values of form: ', request_student_data);
        APIHandlers.post('/api/student/student/', request_student_data).then((response) => {
            setPageSubmitting(true)
            message.success('New Student Added Successfully')
            router.push('/student/')
            form.resetFields()

        }).catch(error => {
            message.error(error?.message)
            setPageSubmitting(false)


        })
    };

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



    const HandleFormSubmit = () => {
        form.submit()

    }

    return (
        <>
            <h2 className='text-xl font-bold text-blue-600 pb-3'>Add Student</h2>


            <Card style={{ maxWidth: '98%' }}>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    layout='vertical'
                    initialValues={{ introduced_on: dayjs(today_date?.today_date_ad) }}
                >
                    <Row gutter={{
                        xs: 8,
                        sm: 16
                    }}>
                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='introduced_on'
                                label='Introduced On: '
                                rules={[
                                    {
                                        type: 'date',
                                        message: 'Not a valid Date'
                                    },
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >
                                <DatePicker format={'YYYY/MM/DD'} className='w-full' />

                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='first_name'
                                label='First Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='middle_name'
                                label='Middle Name'
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='last_name'
                                label='Last Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='date_of_birth'
                                label='Date Of Birth'
                                rules={[
                                    {
                                        type: 'date',
                                        message: 'Not a valid Date'
                                    },
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >
                                <DatePicker format={'YYYY/MM/DD'} className='w-full' />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Choose Gender"
                                    allowClear
                                >
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                    <Select.Option value="RatherNotSay">Rather Not Say</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>



                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='father_name'
                                label='Father Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='mother_name'
                                label='Mother Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='grand_father_name'
                                label='Grandfather Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]}
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='grand_mother_name'
                                label='Grandmother Name'
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={12} md={6}>
                            <Form.Item
                                name='email'
                                label='Email: '
                                rules={[{ type: 'email', message: "" }]}
                            >

                                <Input size='middle' className='' />

                            </Form.Item>
                        </Col>

                    </Row>



                </Form>
                <Divider orientation='center' className='text-xl' style={{ color: '#7F2BC9' }}>Address Information</Divider>


                <StudentAddressForm StudentAddress={StudentAddress} setStudentAddress={setStudentAddress} States={States} Districts={Districts} LocalBodies={LocalBodies} />


                <Divider orientation='center' className='text-xl' style={{ color: '#7F2BC9' }}>Contact Information</Divider>


                <StudentContactForm StudentContacts={StudentContacts} setStudentContacts={setStudentContacts} />


                <Space size={'middle'}>
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick={HandleFormSubmit} className='bg-purple-700' loading={PageSubmitting} >
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item label=" " colon={false}>

                        <Button  htmlType="button" onClick={() => { router.push('/student/') }} className='bg-gray-300' loading={PageSubmitting} >
                            
                            Cancel
                        </Button>
                    </Form.Item>

                </Space>

            </Card>
        </ >


    )
}

export default AddStudentForm


