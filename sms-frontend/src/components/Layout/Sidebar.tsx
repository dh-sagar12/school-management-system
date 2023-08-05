import { Menu, theme } from 'antd'
import React from 'react'
import {
    FiMenu,
    FiHome
} from 'react-icons/fi'

const Sidebar = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='h-screen overflow-y-scroll'>
            <div className='text-purple-700 p-5 m-3 border border-purple-700'>box</div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                className='flex flex-col space-y-10  py-5 ' 
                items={[
                    {
                        key: '1',
                        icon: <FiHome />,
                        label: 'Home',
                    },
                    {
                        key: '2',
                        icon: <FiHome />,
                        label: 'Student',
                    },
                    {
                        key: '4',
                        icon: <FiHome />,
                        label: 'Teachers',
                    },
                    {
                        key: '5',
                        icon: <FiHome />,
                        label: 'Teachers',
                    },
                    {
                        key: '6',
                        icon: <FiHome />,
                        label: 'Teachers',
                    },
                    {
                        key: '7',
                        icon: <FiHome />,
                        label: 'Teachers',
                    },
                    {
                        key: '8',
                        icon: <FiHome />,
                        label: 'Teachers',
                    },
                    {
                        key: '9',
                        icon: <FiHome />,
                        label: 'Teachers',
                    },
                ] 
            
            }
            />

        </div>
    )
}

export default Sidebar