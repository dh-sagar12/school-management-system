'use client'
import { Login } from '@/authentication/authTypes';
import APIHandlers from '@/utils/APIHandlers';
import { useRouter, useSearchParams } from 'next/navigation';
import { BranchesDropdownType } from '@/core/coreTypes'
import { Form, Button, Input, Select, App } from 'antd';
import { useState } from 'react';



interface Prop {
    Branches: BranchesDropdownType[]
}


const Login = (prop: Prop) => {

    const { message } = App.useApp();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false)


    const LoginInitial: Login = {
        email: '',
        password: '',
        branch_id: prop.Branches[0].id
    }



    const onFinish = (values: any) => {
        setLoading(true)
        APIHandlers.post('/api/auth/login/', values).then(responseData => {
            const return_url: string = searchParams.get('ReturnUrl') ?? '/'
            router.refresh()
            setLoading(false)
            router.push(return_url)

        }).catch((error) => {
            console.log(error);
            message.error('Invalid Credentials')
            setLoading(false)

        })
    };

    return (
        <div className='md:mt-24 overflow-y-hidden'>
            <div className='flex justify-center mx-auto  flex-col  items-center w-1/3 shadow-lg border '>
                <h2 className='text-xl font-bold text-purple-700 py-2'>Sign In</h2>
                <Form
                    labelAlign='right'
                    style={{ maxWidth: '100%', width: 250 }}
                    initialValues={LoginInitial}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item<Login>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Login>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<Login>
                        label="Branch"
                        name='branch_id'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            className='text-left'
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare(
                                    (optionB?.label ?? '').toLowerCase())
                            }
                            options={
                                prop.Branches.map((items) => {
                                    return {
                                        value: items.id,
                                        label: `${items.org_code} ${items.nick_name}`
                                    }
                                })
                            }
                        >



                        </Select>



                    </Form.Item>


                    <Form.Item className='text-center'>
                        <Button type="primary" htmlType="submit" className='bg-purple-700' loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>



    );
}


export default Login