'use client';
import Sidebar from './Sidebar'
import { ReactNode, useState } from 'react';
import {  Layout, } from 'antd';
import LayoutHeader from './LayoutHeader';



const { Header, Footer, Sider, Content } = Layout;

export default function LayOut(
  {
    children
  }: {
    children: ReactNode;
  }) {




  const [collapsed, setCollapsed] = useState(false);


  const headerStyle: React.CSSProperties = {
    color: '#7F2BC9',
    backgroundColor: '#0000',
  };



  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#0000',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#7F2BC9',
    backgroundColor: '#0000',
    height: '10px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  };


  return (
    <>


      {/* <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <div className='py-5 border-b-2 shadow-sm px-16 flex text-center items-center justify-between align-middle '>
            <li className='list-none'>{branchmeta?.org_name}({branchmeta?.nick_name})</li>
            <li className='list-none'>Friday, 6 Shrawan, 2080</li>
            <li className='list-none'>{usermeta?.first_name} {usermeta?.last_name}</li>
            <div className='flex space-x-4 '>
              <IconButton
                // size="lg"
                variant="ghost"
                icon={<FiBell />}
                aria-label='open-menu'
              />
              <IconButton
                // size="lg"
                onClick={handleLogout}
                variant="ghost"
                icon={<FiLogOut />}
                aria-label='open-menu'
              />
            </div>
          </div>
          {children}
        </div>
      </div> */}

      <Layout>
        <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed} >
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={headerStyle} className='shadow-xl border-r-3 text-purple-700 h-16 ps-3 pe-3  '>
            <LayoutHeader collapsed ={collapsed} setCollapsed={setCollapsed}  />
          </Header>
          <Content >
            {children}
          </Content>
          <Footer style={footerStyle} className='border-t-2 '>
            Copyright to Sagar Dhakal
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}