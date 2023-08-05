// app/providers.tsx
'use client'

import { AuthContextProvider } from '@/Context/AuthContext'
import { App, ConfigProvider } from 'antd';
import theme from '@/utils/themeCofig';


export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContextProvider>
      <ConfigProvider theme={theme}>
        {/* <CacheProvider> */}
        {/* <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }} > */}
        <App notification={{ placement: 'bottomRight' }}>

          {children}
        </App>

        {/* </ChakraProvider> */}
        {/* </CacheProvider> */}
      </ConfigProvider>
    </AuthContextProvider>

  )
}