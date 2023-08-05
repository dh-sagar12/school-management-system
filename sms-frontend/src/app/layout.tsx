import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import React from 'react'
import AuthChecker from '@/components/Auth/AuthChecker'
import StyledComponentsRegistry from '@/helpers/AntdRegistry'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'School Mananagement System',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>
            <AuthChecker>
              <div className='px-5 py-2 overflow-y-scroll max-h-screen min-h-fit'>
                {children}
              </div>
            </AuthChecker>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html >
  )
}
