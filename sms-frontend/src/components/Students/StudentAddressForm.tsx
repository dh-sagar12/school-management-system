import React, { useState } from 'react'
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Table,
    Row,
    Select,
    Space,
    message,
} from 'antd';
import { StudentAddress } from '@/students/studentTypes';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { ColumnsType } from 'antd/es/table';
import { DistrictModel, LocalBodiesModel, StateModel } from '@/core/coreTypes';

interface Props {
    StudentAddress: any,
    setStudentAddress: any,
    States: any,
    Districts: any,
    LocalBodies: any
}



const StudentAddressForm = (prop: Props) => {


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


        if (prop.StudentAddress.some((e: { address_type: string; }) => e.address_type == values.address_type)) {
            message.error('Already Exists')
        }
        else {
            let key_ful_values = { ...values, key: Math.random() * 100,  state: prop.States.filter((item: { id: number })=> item.id  == values.state_id)[0]?.province_name, district: prop.Districts.filter((item: { id: number })=> item.id  == values.district_id)[0]?.district_name, local_body: prop.LocalBodies.filter((item: { id: number })=> item.id  == values.local_bodies_id)[0]?.local_body_name, 
            
            }
            console.log(key_ful_values)
            prop.setStudentAddress([...prop.StudentAddress, key_ful_values])
            addressForm.resetFields();
        }
    }

    const address_table_column: ColumnsType<StudentAddress> = [
        {
            title: 'Address Type',
            dataIndex: 'address_type',
            key: 'address_type'
        },

        {
            title: 'State',
            dataIndex: 'state',
            key: 'state'
        },

        {
            title: 'District',
            dataIndex: 'district',
            key: 'district'
        },

        {
            title: 'Local Body',
            dataIndex: 'local_body',
            key: 'local_body'
        },

        {
            title: 'Ward No',
            dataIndex: 'ward_no',
            key: 'ward_no'
        },

        {
            title: 'Street',
            dataIndex: 'street',
            key: 'street'
        },
        {
            title: 'Tole',
            dataIndex: 'tple_name',
            key: 'tole_name'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className='text-purple-700'>
                    <a><AiOutlineEdit /></a>
                    <a><AiOutlineDelete /></a>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Form   {...formItemLayout}
                form={addressForm}
                name="address_form"
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
                        <Form.Item<StudentAddress> name="address_type" label="Address Type" rules={[{ required: true }]}>
                            <Select
                                placeholder="Address Type"
                            >
                                <Select.Option value="Permanent">Permanent</Select.Option>
                                <Select.Option value="Temporary">Temporary</Select.Option>
                                <Select.Option value="Other">Other </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>


                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentAddress> name="state_id" label="State:" rules={[{ required: true }]}>
                            <Select
                                placeholder="State"
                                onChange={() => { setdiabled({ ...diabled, district_id: false }) }}
                            >
                                {prop.States.map((item: StateModel) => {
                                    return (
                                        <Select.Option key={item.id} value={item.id}>{item.province_name}({item.province_name_np})</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>


                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentAddress> name="district_id" label="District:" rules={[{ required: true }]}>
                            <Select
                                placeholder="District"
                                disabled={diabled.district_id}
                                onChange={() => { setdiabled({ ...diabled, local_bodies_id: false }) }}

                            >
                                {prop.Districts.filter((x: { province_id: number; }) => x.province_id == addressForm.getFieldValue('state_id'))?.map((x: DistrictModel) => <Select.Option key={x.id} value={x.id}>{x.district_name}</Select.Option>)}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentAddress> name="local_bodies_id" label="Local Body: " rules={[{ required: true }]}>
                            <Select
                                placeholder="Local Body"
                                disabled={diabled.local_bodies_id}
                            >

                                {prop.LocalBodies.filter((x: { district_id: number; }) => x.district_id == addressForm.getFieldValue('district_id'))?.map((x: LocalBodiesModel) => <Select.Option key={x.id} value={x.id}>{x.local_body_name}</Select.Option>)}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentAddress>
                            name='ward_no'
                            label='Ward No: '
                            rules={[{ required: true, message: 'Required' }, { type: 'number' }]}
                        >

                            <InputNumber size='middle' className='w-full' min={1} />

                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentAddress>
                            name='street'
                            label='Street: '
                        >

                            <Input size='middle' className='' />

                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item<StudentAddress>
                            name='tole_name'
                            label='Tole: '
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

            <Divider className='border-purple-700'/>

       


            <Table columns={address_table_column} dataSource={prop.StudentAddress} pagination={false} />




        </>
    )
}

export default StudentAddressForm