"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Select, Row, DatePicker, Col, Input, Space, TimePicker, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import APIHandlers from '@/utils/APIHandlers';
import { BranchesDropdownType, MenusModel } from '@/core/coreTypes';
import { BranchLoginPolicyModel, UserInfo } from '@/authentication/authTypes';
import { AuthContext } from '@/Context/AuthContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import customParseFormat from 'dayjs/plugin/customParseFormat';



interface Prop {
    Branches: BranchesDropdownType[]
    slug?: string
}


dayjs.extend(customParseFormat);


const BranchPolicyForm = (prop: Prop) => {

    const [UsersData, setUsersData] = useState<UserInfo[]>([])
    const [PageSubmitting, setPageSubmitting] = useState<boolean>(false)
    const [form] = Form.useForm();
    const { today_date } = useContext(AuthContext)
    const router = useRouter()



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

    useEffect(() => {

        APIHandlers.get('api/auth/users').then((user: UserInfo[]) => {
            setUsersData(user)
        })

        if (prop.slug !== undefined) {
            APIHandlers.get('api/auth/branch-policies', {policy_id: prop.slug}).then((policy_info: BranchLoginPolicyModel) => {
                form.setFieldsValue({
                    date_access_from: dayjs(policy_info.date_access_from),
                    date_access_to: dayjs(policy_info.date_access_to), 
                    time_access_from: dayjs(policy_info.time_access_from, 'HH:mm:ss'),
                    time_access_to: dayjs(policy_info.time_access_to, 'HH:mm:ss'),
                    user_id: policy_info.user_id, 
                    branch_id: policy_info.branch_id
                })
            })
        }

    }, [])

    const onFinish = (form_data: any) => {
        setPageSubmitting(true)
        let policy_payload = {
            ...form_data,
            date_access_from: form_data.date_access_from.format('YYYY-MM-DD'),
            date_access_to: form_data.date_access_to.format('YYYY-MM-DD'),
            time_access_from: form_data.time_access_from.format('HH:mm:ss'),
            time_access_to: form_data.time_access_to.format('HH:mm:ss')
        }

        APIHandlers.post('/api/auth/branch-policies/', policy_payload).then(response => {
            setPageSubmitting(false)
            message.success(response.message)
            router.push('/configuration/branch-policies')
        }).catch(error => {
            setPageSubmitting(false)
            message.error(error.message)
        })

    }

    const handleSelectTimeFrom = (time: any) => {
        form.setFieldValue('time_access_from', time)
    }

    const handleSelectTimeTo = (time: any) => {
        form.setFieldValue('time_access_to', time)
    }


    return (


        <>

            <h2 className='text-xl font-bold text-blue-600 pb-3'>Branch Policy</h2>


            <Card style={{ maxWidth: '98%' }}>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    layout='vertical'
                    initialValues={
                        {
                            date_access_from: dayjs(today_date?.today_date_ad),
                            date_access_to: dayjs(today_date?.today_date_ad + 365),
                            time_access_from: dayjs('00:00:00', 'HH:mm:ss'),
                            time_access_to: dayjs('00:00:00', 'HH:mm:ss'),

                        }
                    }
                >

                    {/* chose branch  */}
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            name='branch_id'
                            label='Branch: '
                            rules={[
                                {
                                    required: true,
                                    message: 'Required'
                                }
                            ]}
                        >
                            <Select
                                style={{ minWidth: '13rem' }}
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                className='text-left'
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                                options={
                                    prop.Branches.map((items) => {
                                        return {
                                            value: items.id,
                                            label: `${items.org_code} ${items.nick_name}`
                                        }
                                    })
                                }
                            />
                        </Form.Item>
                    </Col>

                    {/* choose User  */}
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            name='user_id'
                            label='User: '
                            rules={[
                                {
                                    required: true,
                                    message: 'Required'
                                }
                            ]}
                        >
                            <Select
                                style={{ minWidth: '13rem' }}
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                className='text-left'
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                                options={
                                    UsersData.map((items) => {
                                        return {
                                            value: items.id,
                                            label: `${items.first_name} ${items.last_name}`
                                        }
                                    })
                                }
                            />
                        </Form.Item>
                    </Col>


                    {/* date access from  */}
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            name='date_access_from'
                            label='Date Access From: '
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

                    {/* date access to  */}
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            name='date_access_to'
                            label='Date Access To: '
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


                    {/* time access from  */}
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            name='time_access_from'
                            label='Time Access From: '
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
                            {/* <DatePicker format={'YYYY/MM/DD'} className='w-full' /> */}
                            <TimePicker
                                onSelect={handleSelectTimeFrom}
                            />



                        </Form.Item>
                    </Col>


                    {/* time access from  */}
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item
                            name='time_access_to'
                            label='Time Access To: '
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
                            {/* <DatePicker format={'YYYY/MM/DD'} className='w-full' /> */}
                            <TimePicker
                                onSelect={handleSelectTimeTo}
                            />

                        </Form.Item>
                    </Col>



                    <Space size={'middle'}>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit" className='bg-purple-700' loading={PageSubmitting} >
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item label=" " colon={false}>
                            <Button htmlType="button" onClick={() => { router.push('/configuration/branch-policies') }} className='bg-gray-300' loading={PageSubmitting} >

                                Cancel
                            </Button>
                        </Form.Item>

                    </Space>
                </Form>

            </Card>
        </>

    );
};

export default BranchPolicyForm;