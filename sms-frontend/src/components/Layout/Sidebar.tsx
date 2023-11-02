"use client"
import { MenusModel } from '@/core/coreTypes'
import APIHandlers from '@/utils/APIHandlers'
import { Menu, message, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    FiMenu,
    FiHome
} from 'react-icons/fi'
import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';


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
  



const Sidebar =  () => {

    const [ParentMenus, setParentMenus] = useState<MenusModel[]>([])
    const [SubMenus, setSubMenus] = useState<MenusModel[]>([])
    const [Reports, setReports] = useState<MenusModel[]>([])


    const items: MenuProps['items'] = [

        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
          ]),
    ]

    

    useEffect(() => {
        APIHandlers.get('api/core/menus').then(resp=> {
            const parent_menus =  resp.filter((item: MenusModel) => item.parent_id == null)
            const sub_menus  =  resp.filter((item: MenusModel) => item.menu_type  == 'M')
            const reports  =  resp.filter((item: MenusModel) => item.menu_type  == 'R')
            setParentMenus(parent_menus)
            setSubMenus(sub_menus)
            setReports(reports)
            
        }).catch(error=> {
            message.error(error.message)
        })

    }, [])
    

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className=' max-h-screen overflow-y-scroll'>
            <div className='text-purple-700 p-5 m-3 border border-purple-700'>box</div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                className='px-0' 
                items={items}
            />

        </div>
    )
}

export default Sidebar