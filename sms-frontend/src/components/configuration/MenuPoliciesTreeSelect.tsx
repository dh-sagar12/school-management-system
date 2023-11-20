"use client"
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Grid, Row, Select, Tree, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import APIHandlers from '@/utils/APIHandlers';
import { BranchesDropdownType, MenusModel } from '@/core/coreTypes';
import { UserInfo } from '@/authentication/authTypes';



interface Prop {
    Branches: BranchesDropdownType[]
}

interface MenuPolicyPayload {
    user_id: number,
    branch_id: number,
    menus: number[]
}

const MenuPolicies = (prop: Prop) => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const [TreeData, setTreeData] = useState<DataNode[]>([])
    const [UsersData, setUsersData] = useState<UserInfo[]>([])
    const [PageSubmitting, setPageSubmitting] = useState(false)
    const [form] = Form.useForm();

    const [MenuPoliciesPayload, setMenuPoliciesPayload] = useState<MenuPolicyPayload>({
        branch_id: 0,
        user_id: 0,
        menus: []
    })

    useEffect(() => {

        APIHandlers.get('api/core/menus').then(resp => {

            const parent_menus = resp.filter((item: MenusModel) => item.parent_id == null)
            const sub_menus = resp.filter((item: MenusModel) => item.parent_id !== null)


            let tree_data = parent_menus.map((items: MenusModel) => {
                return {
                    title: `(${items.menu_code}) ${items.menu_name}`,
                    key: items.id,
                    children: [
                        ...sub_menus.filter((sub_menu: MenusModel) => sub_menu.parent_id == items.id).map((sub_menu_item: MenusModel) => {
                            return {
                                title: `(${sub_menu_item.menu_code}) ${sub_menu_item.menu_name}`,
                                key: sub_menu_item.id,
                            }
                        })
                    ]
                }
            })
            setTreeData(tree_data)

        }).catch(error => {
            message.error(error.message)
        })

        APIHandlers.get('api/auth/users').then((user: UserInfo[]) => {
            setUsersData(user)
        })
    }, [])


    const onExpand = (expandedKeysValue: React.Key[]) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const HandleOnCheck = (checkedKeysValue: any) => {
        setCheckedKeys(checkedKeysValue);
        setMenuPoliciesPayload((preval: any) => {
            return { ...preval, menus: checkedKeysValue }
        })
    };

    const handleBranchChange = (branch_id: number) => {
        setMenuPoliciesPayload((preval: any) => {
            return { ...preval, branch_id: branch_id }
        })
        if (MenuPoliciesPayload.user_id > 0) {
            APIHandlers.get('api/auth/menu-policies', { user_id: MenuPoliciesPayload.user_id, branch_id: branch_id }).then((policies => {
                let initial_checked = policies.map((item: any) => item.menu_id)
                console.log('initial_checked', initial_checked)
                setCheckedKeys(initial_checked)
                setExpandedKeys(initial_checked)
            }))
        }
    }

    const handleUserChange = (user_id: number) => {
        setMenuPoliciesPayload((preval: any) => {
            return { ...preval, user_id: user_id }
        })
        if (MenuPoliciesPayload.branch_id > 0) {
            APIHandlers.get('api/auth/menu-policies/', { user_id: user_id, branch_id: MenuPoliciesPayload.branch_id }).then((policies => {
                let initial_checked = policies.map((item: any) => item.menu_id)
                console.log('initial_checked', initial_checked)
                setCheckedKeys(initial_checked)
                setExpandedKeys(initial_checked)
            }))
        }
    }

    const HandleFormSubmit = () => {
        setPageSubmitting(true)
        APIHandlers.post('api/auth/menu-policies/', MenuPoliciesPayload).then(data => {
            setPageSubmitting(false)


        }).catch(error => {
            console.log(error)
            setPageSubmitting(false)

        })


    }

    return (


        <>

            <h2 className='text-xl font-bold text-blue-600 pb-3'>Menu Permissions</h2>

            <Card style={{ maxWidth: '98%' }}>
                <div className=' flex w-1/2 justify-between pb-4 ' >


                    <div className='flex flex-col'>
                        <label>User: </label>
                        <Select
                            style={{ minWidth: '13rem' }}
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            className='text-left'
                            onChange={handleUserChange}
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

                    </div>


                    <div className='flex flex-col'>
                        <label>Branch: </label>
                        <Select
                            style={{ minWidth: '13rem' }}
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            onChange={handleBranchChange}
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

                    </div>


                </div>

                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={HandleOnCheck}
                    checkedKeys={checkedKeys}
                    treeData={TreeData}
                />
                {
                    MenuPoliciesPayload.branch_id > 0 && MenuPoliciesPayload.user_id > 0 &&

                    <Form.Item label=" " colon={false} style={{ paddingTop: '2.5rem' }}>
                        <Button type="primary" htmlType="submit" onClick={HandleFormSubmit} className='bg-purple-700' loading={PageSubmitting} >
                            Submit
                        </Button>
                    </Form.Item>
                }

            </Card>
        </>

    );
};

export default MenuPolicies;