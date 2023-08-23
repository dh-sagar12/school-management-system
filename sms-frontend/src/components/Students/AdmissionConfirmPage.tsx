"use client"
import { Button, Card, Descriptions, Divider, Space } from 'antd'
import Link from 'next/link'
import React from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import AmountToWordConverter from '@/utils/AmountToWordConverter'

interface Param {
    slug: any,
    AdmissionDetail: any,
    Charges: any

}

const AdmissionConfirmPage = (params: Param) => {


    return (
        <div>
            <Card>
                <Descriptions title="Admission Info" layout='vertical' colon={true} column={6}>
                    <Descriptions.Item label="Tran Id">{params.AdmissionDetail.class_data.tran_id}</Descriptions.Item>
                    <Descriptions.Item label="Tran Code">{params.AdmissionDetail.class_data.tran_code}</Descriptions.Item>
                    <Descriptions.Item label="Admission Date">{params.AdmissionDetail.class_data.admission_date}</Descriptions.Item>
                    <Descriptions.Item label="Verification Status">{params.AdmissionDetail.class_data.verification_status}</Descriptions.Item>
                    <Descriptions.Item label="Created By">{params.AdmissionDetail.class_data.created_by}</Descriptions.Item>
                    <Descriptions.Item label="Verified By">{params.AdmissionDetail.class_data.verified_by}</Descriptions.Item>
                </Descriptions>
                <Divider className='border-purple-500' />

                <h3 className='text-purple-700 text-xl'>More Information</h3>
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
                                <Button type='primary' className='bg-purple-700' icon={<AiOutlineUpload />}>Upload</Button>
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
                                                    <td>{params.Charges.filter((i: any) => i.id = item.charge_id)[0].charge_name}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.discount}</td>
                                                </tr>
                                            )

                                        })
                                    }


                                    <tr className='border-t font-semibold'>
                                        <td className=''>Total</td>
                                        <td>{parseFloat(params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => 0 + curr.amount, 0)).toFixed(2)}</td>
                                        <td>{parseFloat(params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => 0 + curr.discount, 0)).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <div>
                            <p className='py-3 '>
                                <span className='font-semibold'>Balance In Word: </span>
                                <span className='text-current'> Rs. {AmountToWordConverter.amount_to_word_english(parseFloat(params.AdmissionDetail.transaction_detail.reduce((prev: any, curr: any) => 0 + curr.amount, 0)).toFixed(2))}</span>
                            </p>
                        </div>

                    </Card>

                </div>

                <Divider className='border-purple-500' />

                <h3 className='text-purple-700 text-xl'>Charges</h3>



            </Card>

        </div>
    )
}

export default AdmissionConfirmPage