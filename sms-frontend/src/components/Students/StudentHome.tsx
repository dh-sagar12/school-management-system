'use client'

import React, { useState } from 'react'
import { BsPersonAdd } from 'react-icons/bs'
import { AiOutlineLoading } from 'react-icons/ai'
import Link from 'next/link'
import { Space, Button, Input, Col, Row, Divider, Image, Card } from 'antd'
import { AiOutlineSetting, AiOutlineEdit, AiOutlineEllipsis } from 'react-icons/ai'


interface Props {
    Students: any
}

const StudentHome = (props: Props) => {

    const [Loading, setLoading] = useState<boolean>(false)



    return (
        <div >
            <h2 className='text-xl font-bold text-blue-600 pb-3'>Student</h2>

            <Space direction='horizontal' className='flex justify-between pe-8' size='middle'    >
                <Link href={'/student/add'}>
                    <Button type='primary' className='bg-purple-600 text-xs' icon={<BsPersonAdd />}>
                        Add Student
                    </Button>
                </Link>
                <Input
                    placeholder="Search Student By Name & Ids"
                    className='min-w-[50vh]'
                    suffix={<AiOutlineLoading className='animate-spin  ' />}
                />
            </Space>

            <Divider className='text-purple-700 border-purple-700' />


            <Row gutter={[30, 30]}>


                {
                    props.Students?.results.map((item: any)=> {
                        return (
                            <Col span={6} key={item.id}>
                            <Card
                                hoverable
                                className=' text-center'
                                title='Student Info'
                            >
                                <Image
                                    width={100}
                                    className='rounded-full'
                                    src='https://bit.ly/dan-abramov'
                                />
        
                                <div className='text-start pt-4 p-0 '>
        
                                    <ol className='text-xs list-none'>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Name: </span> <span>{item?.first_name} {item?.middle_name} {item?.last_name}</span>
                                        </li>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Student Id: </span> <span>{item?.student_id}</span>
                                        </li>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Class: </span> <span>{item?.class ?? ''}</span>
                                        </li>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Date Of Birth: </span> <span>{item?.date_of_birth}</span>
                                        </li>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Father Name: </span><span>{item?.father_name}</span>
                                        </li>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Gender: </span> <span>{item?.gender}</span>
                                        </li>
                                        <li className='leading-6 flex space-x-2'>
                                            <span className='font-semibold'>Email: </span> <span>{item?.email}</span>
                                        </li>
                                    </ol>
                                </div>
        
                                <Divider className='my-2' />
        
                                <div className='text-xl flex justify-evenly text-purple-700 hover:text-purple-500 '>
                                    <AiOutlineSetting key="setting" />
                                    <AiOutlineEdit key="edit" />
                                    <AiOutlineEllipsis key="ellipsis" />
                                </div>
                            </Card>
                        </Col>
                        )
                    })
                }

               

               
            </Row>



        </div>
    )
}

export default StudentHome