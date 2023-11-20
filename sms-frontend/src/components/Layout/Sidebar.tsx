"use client"
import { MenusModel } from '@/core/coreTypes'
import APIHandlers from '@/utils/APIHandlers'
import { Menu, message, theme } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AuthContext } from '@/Context/AuthContext'
import MenuItem from 'antd/es/menu/MenuItem'
import { useRouter } from 'next/navigation'
import { AiOutlineSetting } from 'react-icons/ai'
import { PiStudent } from 'react-icons/pi'
import { GrUserWorker } from 'react-icons/gr'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import Link from 'next/link'


type MenuItem = Required<MenuProps>['items'][number];


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}




const Sidebar = () => {

    const [ParentMenus, setParentMenus] = useState<MenusModel[]>([])
    const [SubMenus, setSubMenus] = useState<MenusModel[]>([])
    const [Reports, setReports] = useState<MenusModel[]>([])
    const [MenusItem, setMenusItem] = useState<any>([
        getItem('Navigation Two', 'sub3', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'submenu3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
    ])

    const { menusmeta } = useContext(AuthContext)

    const router = useRouter()


    const handleMenuRouter = (router_url: string) => {
        router.push(router_url)
    }


    useEffect(() => {
        APIHandlers.get('api/core/menus').then(resp => {

            const authorized_menu = resp.filter((item: MenusModel) => {
                let to_return = menusmeta?.map(i => i.id)
                let available_parent_ids = menusmeta?.map((i: any) => i.parent_id)
                return to_return?.includes(item.id) || (item.parent_id == null && available_parent_ids?.includes(item.id))
            })

            const parent_menus = authorized_menu.filter((item: MenusModel) => item.parent_id == null)
            const sub_menus = authorized_menu.filter((item: MenusModel) => item.menu_type == 'M')
            const reports = authorized_menu.filter((item: MenusModel) => item.menu_type == 'R')
            setParentMenus(parent_menus)
            setSubMenus(sub_menus)
            setReports(reports)


            const series_icons = [
                ['100', <AiOutlineSetting className='text-2xl' />],
                ['200', <PiStudent className='text-2xl' />],
                ['300', <GrUserWorker className='text-2xl'  />],
                ['400', <HiOutlineAcademicCap className='text-2xl' />],

            ]



            const parent_items = parent_menus.map((item: MenusModel) => {
                return {
                    "key": item.menu_code,
                    "icon": series_icons.filter((ico: any)=> ico[0] == item.menu_code)[0][1],
                    "label": item.menu_name,
                    "children": [
                        ...sub_menus.filter((sub_menu: MenusModel) => sub_menu.parent_id == item.id).map((sub_menu_item: MenusModel) => {
                            return {
                                "key": sub_menu_item.id,
                                "label": sub_menu_item.menu_name,
                                "onClick": () => handleMenuRouter(sub_menu_item.url)
                            }
                        }),
                        {
                            "key": `Report_${item.id}`,
                            "label": "Reports",
                            "children": [
                                ...reports.filter((report_menu: MenusModel) => report_menu.parent_id == item.id).map((report_menu_item: MenusModel) => {
                                    return {
                                        "key": report_menu_item.id,
                                        "label": report_menu_item.menu_name,
                                        "onClick": () => handleMenuRouter(report_menu_item.url)
                                    }
                                })
                            ]
                        }

                    ]



                }
            })


            setMenusItem(parent_items)

        }).catch(error => {
            message.error(error.message)
        })

    }, [])


    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();

    return (
        <div className=' max-h-screen overflow-y-scroll'>
            <div className='text-purple-700 p-5 m-3 border border-purple-700'>
                <Link href={'/'}>
                    Logo
                </Link>
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                className='px-0'
                items={MenusItem}
            />

        </div>
    )
}

export default Sidebar