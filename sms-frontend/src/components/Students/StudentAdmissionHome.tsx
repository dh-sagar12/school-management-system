"use client"
import { AdmissionGridView } from '@/students/studentTypes'
import { Space, Button, Input, Divider, Card, Table, message, Tooltip } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading, AiOutlinePrinter, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsPersonAdd } from 'react-icons/bs'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import APIHandlers from '@/utils/APIHandlers'
import type { FilterValue } from 'antd/es/table/interface'

interface TableDataType extends AdmissionGridView {
    key: number
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}



const StudentAdmissionHome = () => {
    const [Loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const [PaginationURL, setPaginationURL] = useState({
        next_url: null,
        previous_url: null
    })

    const [AdmissionStudentGrid, setAdmissionStudentGrid] = useState<TableDataType[]>([])

    useEffect(() => {
        setLoading(true)
        APIHandlers.get(`/api/student/admission/filter/?page=${tableParams?.pagination?.current}`).then(response => {
            let validated_response = response.results.map((item: any) => {
                item.key = item.id
                return item
            })
            setAdmissionStudentGrid(validated_response)
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: response.count,
                },
            })

        }).catch(err => {
            message.error(err?.message)
        })


    }, [JSON.stringify(tableParams)])



    const handleSearchChange = (e: any) => {
        console.log(e.target.value);

    }

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: any,
        sorter:any,
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setAdmissionStudentGrid([]);
        }
    };


    const columns: ColumnsType<TableDataType> = [

        {
            title: 'Admission Date',
            dataIndex: 'admission_date',
            key: 'admission_date',


        },

        {
            title: 'Tran COde',
            dataIndex: 'tran_code',
            key: 'tran_code',


        },

        {
            title: 'Student Id',
            dataIndex: 'student_id',
            key: 'student_id',
        },

        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name',

        },

        {
            title: 'Contact Number',
            dataIndex: 'contact_number',
            key: 'contact_number',


        },

        {
            title: 'Class Name',
            dataIndex: 'class_name',
            key: 'class_name',


        },
        {
            title: 'Faculty Name',
            dataIndex: 'faculty_name',
            key: 'faculty_name',


        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',


        },
        {
            title: 'Year/Semester',
            dataIndex: 'academic_session_type',
            key: 'academic_session_type',


        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right', 
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/student/admission/confirm/${record.tran_id}`}>
                        <Tooltip title='View Detail' >
                            <AiOutlineUnorderedList className='text-purple-700' />
                        </Tooltip>
                    </Link>
                    <a>
                        <Tooltip title='Print Receipt'>
                            <AiOutlinePrinter className='text-purple-700' />
                        </Tooltip>
                    </a>
                </Space>
            ),

        },

    ]



    return (
        <div>
            <Space direction='horizontal' className='flex justify-between pe-8' size='middle'    >
                <Link href={'/student/admission/add'}>
                    <Button type='primary' className='bg-purple-600 text-xs' icon={<BsPersonAdd />}>
                        Add
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

            <Card>
                <div className='w-full overflow-scroll'>
                    <Table columns={columns} 
                    dataSource={AdmissionStudentGrid} 
                    style={{ whiteSpace: 'nowrap' }} 
                    pagination={tableParams.pagination}
                    loading={Loading}
                    onChange={handleTableChange}
                    />
                </div>
            </Card>
        </div>
    )
}

export default StudentAdmissionHome