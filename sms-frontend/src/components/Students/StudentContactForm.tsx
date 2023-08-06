import React, { useState } from 'react'
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Table,
    Row,
    Select,
    Space,
    message,
    Empty,
} from 'antd';
import { StudentContactInfo } from '@/students/studentTypes';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { ColumnsType } from 'antd/es/table';

interface Props {
    StudentContacts: any,
    setStudentContacts: any
}



const StudentContactForm = (prop: Props) => {

    const DeleteContact = (rec: any) => {
        console.log('rec', rec);

        let updated_contact = prop.StudentContacts.filter((item: any) => item.key !== rec.key)
        console.log('updated_contact', updated_contact);

        prop.setStudentContacts([updated_contact])

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


    const [diabled, setdiabled] = useState({
        district_id: true,
        local_bodies_id: true
    })


    const [addressForm] = Form.useForm();

    const OnAddressFinish = (values: any) => {


        if (prop.StudentContacts.some((e: { relation_type: string, contact_type: string }) => e.relation_type == values.relation_type && e.contact_type == values.contact_type)) {
            message.error('Already Exists')
        }
        else {
            let key_ful_values = {
                ...values, key: Math.random() * 100
            }
            console.log(key_ful_values)
            prop.setStudentContacts([...prop.StudentContacts, key_ful_values])
            addressForm.resetFields();
        }
    }

    const address_table_column: ColumnsType<StudentContactInfo> = [
        {
            title: 'Relation',
            dataIndex: 'relation_type',
            key: 'relation_type',

        },


        {
            title: 'Contact Type',
            dataIndex: 'contact_type',
            key: 'contact_type',

        },

        {
            title: 'Contact Number',
            dataIndex: 'contact_number',
            key: 'contact_number',

        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className='text-purple-700'>
                    <a><AiOutlineEdit /></a>
                    <a><AiOutlineDelete onClick={() => DeleteContact(record)} /></a>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Form   {...formItemLayout}
                form={addressForm}
                name="contact_form"
                onFinish={OnAddressFinish}
                scrollToFirstError
                layout='vertical'
                initialValues={{
                    address_type: 'Permanent'
                }}
            >

                <Row gutter={{
                    xs: 8,
                    sm: 16
                }}>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentContactInfo> name="relation_type" label="Contact Relation" rules={[{ required: true }]}>
                            <Select
                                placeholder="Relation"
                            >
                                <Select.Option value="Self">Self</Select.Option>
                                <Select.Option value="Father">Father</Select.Option>
                                <Select.Option value="Mother">Mother </Select.Option>
                                <Select.Option value="Other">Other </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>


                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentContactInfo> name="contact_type" label="Contact Type" rules={[{ required: true }]}>
                            <Select
                                placeholder="Contact Type"
                            >
                                <Select.Option value="Mobile">Mobile</Select.Option>
                                <Select.Option value="Landline">Landline</Select.Option>
                                <Select.Option value="Other">Other </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>



                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentContactInfo> label="Contact Number" rules={[{ required: true }]}
                            name='contact_number'
                        >

                            <Input size='middle' className='' />

                        </Form.Item>
                    </Col>



                    <Col xs={24} sm={12} md={6}>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit" shape="circle" icon={<AiOutlinePlus />} className='bg-purple-700' />
                        </Form.Item>
                    </Col>
                </Row>


            </Form>

            <Divider className='border-purple-700' />

            {
                prop.StudentContacts.length > 0 ?
                    <Table columns={address_table_column} dataSource={prop.StudentContacts} pagination={false} />

                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }






        </>
    )
}

export default StudentContactForm