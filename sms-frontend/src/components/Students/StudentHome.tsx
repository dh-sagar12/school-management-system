'use client'

import React, { useContext, useEffect, useState } from 'react'
import { BsPersonAdd } from 'react-icons/bs'
import { AiOutlineLoading } from 'react-icons/ai'
import Link from 'next/link'
import { Space, Button, Input, Col, Row, Divider, Image, Card } from 'antd'
import { AiOutlineSetting, AiOutlineEdit, AiOutlineEllipsis } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroll-component';
import APIHandlers from '@/utils/APIHandlers'
import { usePathname, useRouter } from 'next/navigation'



// interface Props {
//     Students: any
// }

const StudentHome = () => {

    const [Loading, setLoading] = useState<boolean>(false)
    const [InfineScrollStudentData, setInfineScrollStudentData] = useState([])
    const [NextReqData, setNextReqData] = useState({
        count: '',
        next: '',
        previous: '',
    })
    const [query, setquery] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        APIHandlers.post('/api/student/filter/', {query: ''}).then(
            response => {
                console.log(response)
                setInfineScrollStudentData(response?.results)
                setNextReqData({
                    count: response?.count,
                    next: response?.next,
                    previous: response?.previous,
                })
            
            }
        )


    }, [])
    



    const fetchNextStudentPage = () => {
        APIHandlers.post(NextReqData?.next, { query: query }).then(data => {
            console.log(data);


            setNextReqData({...NextReqData, 
                count: data?.count,
                next: data?.next,
                previous: data?.previous
            })

            
            setInfineScrollStudentData((preval: any) => {

                return preval.concat(data.results)

            })
        

        }).catch(error => {
            if (error?.status == 401) {
                router.push(`/auth/login?ReturnUrl=${pathname}`)
            }
        })
    }


    const handleSearchChange = (event: any) => {
        setLoading(true)
        setquery(event.target.value)

        APIHandlers.post('/api/student/filter/', { query: event.target.value }).then(data => {
            setInfineScrollStudentData(data?.results)
            setNextReqData({
                count: data?.count,
                next: data?.next,
                previous: data?.previous
            })
            setLoading(false)

        }).catch(error => {
            if (error?.status == 401) {
                router.push(`/auth/login?ReturnUrl=${pathname}`)
            }
        })
    }



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
                    onChange={handleSearchChange}
                    suffix={<AiOutlineLoading className={Loading ? 'animate-spin' : 'hidden'} />}
                />
            </Space>

            <Divider className='text-purple-700 border-purple-700' />


            <InfiniteScroll
                dataLength={InfineScrollStudentData.length} //This is important field to render the next data
                next={() => fetchNextStudentPage()}
                hasMore={NextReqData.next !== null}
                loader={<div className='text-center'><AiOutlineLoading className={'animate-spin text-center mx-auto text-2xl m-2'} /></div>}
                endMessage={
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <h4>No More Item To Show</h4>
                        </div>
                    </div>
                }
                style={{ height: '100%', overflow: 'hidden' }}
     
            >
                <Row gutter={[30, 30]}>
                    {
                        InfineScrollStudentData.map((item: any) => {
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
            </InfiniteScroll>




        </div >
    )
}

export default StudentHome