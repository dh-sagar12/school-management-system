// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import React, { Suspense, useState } from 'react'


// const colors = {
//     brand: {
//       900: '#1a365d',
//       800: '#153e75',
//       700: '#2a69ac',
//     },
//   }


// export const theme = extendTheme({ colors })
export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (

    <CacheProvider>
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }} >
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}