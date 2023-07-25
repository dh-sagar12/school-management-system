'use client';
import {IconButton } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { ReactNode } from 'react';
import { FiBell, FiLogOut } from 'react-icons/fi';



export default function Layout({
  children,
}: {
  children: ReactNode;
}) {


  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <div className='py-5 border-b-2 shadow-sm px-16 flex text-center items-center justify-between align-middle '>
            <li className='list-none'>Pragati Secondary School</li>
            <li className='list-none'>Friday, 6 Shrawan, 2080</li>
            <div className='flex space-x-4 '>
              <IconButton
                // size="lg"
                variant="ghost"
                icon={<FiBell />}
                aria-label='open-menu'
              />
              <IconButton
                // size="lg"
                variant="ghost"
                icon={<FiLogOut />}
                aria-label='open-menu'
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}