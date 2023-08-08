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
    height: '8px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  };


  return (
    <>

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
          <Footer style={footerStyle} className='border-t-1 '>
            Copyright to Sagar Dhakal
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}