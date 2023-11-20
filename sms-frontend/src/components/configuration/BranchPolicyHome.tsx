"use client"
import { BranchLoginPolicyModel } from '@/authentication/authTypes'
import APIHandlers from '@/utils/APIHandlers'
import { Button, Card, Divider, Space, Table, Tooltip } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue } from 'antd/es/table/interface'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlinePrinter, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsPersonAdd } from 'react-icons/bs'


interface TableDataType extends BranchLoginPolicyModel {
    key: number,
    user_name?: string,
    branch_name?: string,
}


interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}


const BranchPolicyHome = () => {
    const [PolicyData, setPolicyData] = useState<TableDataType[]>([])
    const [Loading, setLoading] = useState<boolean>(false)
    const [TotalPoliciesCount, setTotalPoliciesCount] = useState<number>(10)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
            total: TotalPoliciesCount
        },
    });

    useEffect(() => {
        APIHandlers.get(`/api/auth/branch-policies/?page=${tableParams.pagination?.current}`).then(response => {
            console.log('response', response);
            let policy_data = response.results.map((item: any) => {
                return {
                    key: item.id,
                    id: item.id, 
                    date_access_from: item.date_access_from,
                    date_access_to: item.date_access_to,
                    time_access_from: item.time_access_from,
                    time_access_to: item.time_access_to,
                    user_name: `${item.user_id.first_name} ${item.user_id.last_name}`,
                    branch_name: `(${item.branch_id.org_code}) ${item.branch_id.nick_name}`,
                }
            })
            console.log(policy_data)
            setPolicyData(policy_data)
            setTotalPoliciesCount(response.count)

        }).catch(error => {
            console.log(error);

        })
    }, [tableParams.pagination])


    const columns: ColumnsType<TableDataType> = [

        {
            title: 'User',
            dataIndex: 'user_name',
            key: 'user_name',
        },

        {
            title: 'Branch',
            dataIndex: 'branch_name',
            key: 'branch_name',
        },

        {
            title: 'Branch',
            dataIndex: 'branch_name',
            key: 'branch_name',
        },

        {
            title: 'Date Access From',
            dataIndex: 'date_access_from',
            key: 'date_access_from',
        },
        {
            title: 'Date Access To',
            dataIndex: 'date_access_to',
            key: 'date_access_to',
        },
        {
            title: 'Time Access To',
            dataIndex: 'time_access_from',
            key: 'time_access_from',
        },
        {
            title: 'Time Access To',
            dataIndex: 'time_access_to',
            key: 'time_access_to',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/configuration/branch-policies/${record.id}`}>
                        <Tooltip title='Edit' >
                            <AiOutlineEdit className='text-purple-700' />
                        </Tooltip>
                    </Link>
                </Space>
            ),

        },

    ]


    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: any,
        sorter: any,
    ) => {
        console.log(pagination);


        setTableParams({
            pagination: { ...pagination, total: TotalPoliciesCount },
            filters: filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setPolicyData([]);
        }
    };

    return (
        <div>
            <h2 className='text-xl font-bold text-blue-600 pb-3'>Branch Login Policy</h2>

            <Card style={{ maxWidth: '98%' }}>

                <Space direction='horizontal' className='flex justify-between pe-8' size='middle'    >
                    <Link href={'/configuration/branch-policies/add'}>
                        <Button type='primary' className='bg-purple-600 text-xs' icon={<BsPersonAdd />}>
                            Add
                        </Button>
                    </Link>
                </Space>

                <Divider className='text-purple-700 border-purple-700' />

                <div className='w-full overflow-scroll'>
                    <Table columns={columns}
                        dataSource={PolicyData}
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

export default BranchPolicyHome