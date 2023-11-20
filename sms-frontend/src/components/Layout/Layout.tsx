'use client';
import Sidebar from './Sidebar'
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Alert, Layout, } from 'antd';
import LayoutHeader from './LayoutHeader';
import { AuthContext } from '@/Context/AuthContext';
import { usePathname } from 'next/navigation';
import { MenusModel } from '@/core/coreTypes';



const { Header, Footer, Sider, Content } = Layout;

export default function LayOut(
  {
    children
  }: {
    children: ReactNode;
  }) {




  const [collapsed, setCollapsed] = useState(false);
  const [HasMenuPermission, setHasMenuPermission] = useState(false)
  const pathname = usePathname();
  const { menusmeta } = useContext(AuthContext)

  useEffect(() => {

    let has_permission = menusmeta.filter((item: MenusModel) => (item.url == pathname || pathname == '/'))

    if (has_permission.length > 0) {
      setHasMenuPermission(true)
    }



  }, [pathname])



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
            <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content >

            {
              HasMenuPermission ?
                children
                :
                <div className='px-5 py-2 overflow-y-scroll max-h-[80vh] min-h-[80vh]'>

                  <Alert message="You Don't Have Permission To View This Page Please Contact To Your Administrator." type="warning" />
                </div>


            }
          </Content>
          <Footer style={footerStyle} className='border-t-1 '>
            Copyright to Sagar Dhakal
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}