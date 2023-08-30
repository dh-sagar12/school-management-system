"use client"
import { Button, Card, Descriptions, Divider, Space, message } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { AiOutlinePrinter, AiOutlineUpload } from 'react-icons/ai'
import AmountToWordConverter from '@/utils/AmountToWordConverter'
import { TiTick } from 'react-icons/ti'
import { RxCross1 } from 'react-icons/rx'
import { AuthContext } from '@/Context/AuthContext'
import APIHandlers from '@/utils/APIHandlers'

interface Param {
    slug: any,
    AdmissionDetail: any,
    Charges: any

}

const AdmissionConfirmPage = (params: Param) => {

    const { today_date, usermeta } = useContext(AuthContext)


    const handleReject = (tran_id: number) => {
        APIHandlers.patch(`/api/tran/master/${tran_id}`, { 'verification_id': -1, 'verified_by': usermeta?.id }).then(response => {
            message.success('Admission Rejected')
            location.reload()
        }).catch(err => {
            message.error(err.message)
        })

    }



    const handleVerify = (tran_id: number) => {
        APIHandlers.patch(`/api/tran/master/${tran_id}`, { 'verification_id': 1, 'verified_by': usermeta?.id }).then(response => {
            message.success('Admission verified')
            location.reload()
        }).catch(err => {
            message.error(err.message)

        })
    }

    return (
        <div>
            <Card>
                <Descriptions title="Admission Info" layout='vertical' colon={true} column={6}>
                    <Descriptions.Item label="Tran Id">{params.AdmissionDetail.class_data.tran_id}</Descriptions.Item>
                    <Descriptions.Item label="Tran Code">{params.AdmissionDetail.class_data.tran_code}</Descriptions.Item>
                    <Descriptions.Item label="Admission Date">{params.AdmissionDetail.class_data.admission_date}</Descriptions.Item>
                    <Descriptions.Item label="Verification Status" contentStyle={ params.AdmissionDetail.class_data.verification_status =='Rejected' ?  {color: 'red'} : {}}>{params.AdmissionDetail.class_data.verification_status}</Descriptions.Item>
                    <Descriptions.Item label="Created By">{params.AdmissionDetail.class_data.created_by}</Descriptions.Item>
                    <Descriptions.Item label="Verified By">{params.AdmissionDetail.class_data.verified_by}</Descriptions.Item>
                </Descriptions>
                <Divider className='border-purple-500' />
                <div className='flex space-x-3 items-center pb-4'>

                    <h3 className='text-purple-700 text-xl'>More Information</h3>

                    {
                        params.AdmissionDetail.class_data.verification_status == 'UnVerified' ?
                            <React.Fragment>
                                <Button onClick={() => handleVerify(params.AdmissionDetail.class_data.tran_id)} shape="circle" className='text-green-500 border border-green-500 hover:border-green-600' icon={<TiTick />} size={'small'} />
                                <Button onClick={() => handleReject(params.AdmissionDetail.class_data.tran_id)} shape="circle" className='text-red-500 border border-red-500 hover:border-red-600' icon={<RxCross1 className='text-center align-middle' />} size={'small'} />
                            </React.Fragment>
                            : <React.Fragment></React.Fragment>
                    }
                    {params.AdmissionDetail.class_data.verification_status == 'Verified' && params.AdmissionDetail.class_data.admission_date_ad == (today_date.today_date_ad) ?
                        <Button shape="circle" onClick={() => handleReject(params.AdmissionDetail.class_data.tran_id)} className='text-red-500 border border-red-500 hover:border-red-600' icon={<RxCross1 className='text-center align-middle' />} size={'small'} />
                        : <React.Fragment></React.Fragment>
                    }


                </div>
                <div className='grid grid-cols-8 gap-3'>
                    <Card className='border-gray-200 col-span-5'>
                        <div className='grid grid-cols-2'>
                            <p className='flex space-x-2'>
                                <span className='font-bold'>Student Id:</span>
                                <span >{params.AdmissionDetail.class_data.student_id}</span>
                            </p>
                            <p className='flex space-x-2'>
                                <span className='font-bold'>Name:</span>
                                <span >{params.AdmissionDetail.class_data.student_name}</span>
                            </p>
                        </div>
                        <Divider className='border-purple-200' />

                        <div className='grid grid-cols-2'>
                            <p className='flex space-x-2'>
                                <span className='font-bold'>Class:</span>
                                <span >{params.AdmissionDetail.class_data.class_name}</span>
                            </p>
                            <p className='flex space-x-2'>
                                <span className='font-bold'>Contact Number:</span>
                                <span >{params.AdmissionDetail.class_data.contact_number}</span>
                            </p>
                        </div>
                        <Divider className='border-purple-200' />

                        <div className='grid grid-cols-1'>
                            <p className='flex space-x-2'>
                                <span className='font-bold'>Adress:</span>
                                <span >{params.AdmissionDetail.class_data.permanent_address}</span>
                            </p>
                        </div>
                        <Divider className='border-purple-200' />
                        {
                            params.AdmissionDetail.class_data.faculty_name &&
                            <React.Fragment>
                                <div className='grid grid-cols-2'>
                                    <p className='flex space-x-2'>
                                        <span className='font-bold'>Faculty:</span>
                                        <span >{params.AdmissionDetail.class_data.faculty_name}</span>
                                    </p>
                                    <p className='flex space-x-2'>
                                        <span className='font-bold'>Course:</span>
                                        <span >{params.AdmissionDetail.class_data.course_name}</span>
                                    </p>
                                </div>
                                <Divider className='border-purple-200' />

                                <div className='grid grid-cols-2'>
                                    <p className='flex space-x-2'>
                                        <span className='font-bold'>Semester/Year:</span>
                                        <span >{params.AdmissionDetail.class_data.academic_session_type}</span>
                                    </p>
                                </div>
                                <Divider className='border-purple-200' />
                            </React.Fragment>

                        }

                    </Card>
                    <Card className='border-gray-200 col-span-3'>
                        <div className='justify-between flex'>
                            <h2 className='font-semibold text-lg text-purple-600'>Charges</h2>
                            <Link href={'/student/attachment/'} >
                                <Button type='primary' className='bg-purple-700' icon={<AiOutlinePrinter />}>Receipt</Button>
                            </Link>
                        </div>
                        <div className='mt-4'>
                            <table className='w-full text-left '>
                                <thead>
                                    <tr className=' p-1 border-b'>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Discount</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        params.AdmissionDetail.transaction_detail.map((item: any) => {
                                            return (
                                                <tr>
                                                    <td>{params.Charges.filter((i: any) => i.id == item.charge_id)[0].charge_name}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.discount}</td>
                                                </tr>
                                            )

                                        })
                                    }


                                    <tr className='border-t font-semibold'>
                                        <td className=''>Total</td>
                                        {/* <td>{parseFloat(params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => (0 + curr.amount).toFixed(2)), 0)))}</td> */}
                                        <td>
                                            {
                                                params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => {
                                                    return (parseFloat(prev) + parseFloat(curr.amount)).toFixed(2)
                                                }, 0)
                                            }
                                        </td>
                                        <td>
                                            {
                                                params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => {
                                                    return (parseFloat(prev) + parseFloat(curr.discount)).toFixed(2)
                                                }, 0)
                                            }
                                        </td>

                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <div>
                            <p className='py-3 '>
                                <span className='font-semibold'>Balance In Word: </span>
                                <span className='text-current'> Rs. {AmountToWordConverter.amount_to_word_english(params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => {
                                    return (parseFloat(prev) + parseFloat(curr.amount)).toFixed(2)
                                }, 0)) }</span>
                            </p>
                        </div>

                    </Card>

                </div>





            </Card>

        </div>
    )
}

export default AdmissionConfirmPage