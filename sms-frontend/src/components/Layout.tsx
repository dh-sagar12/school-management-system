'use client';
import { IconButton, useToast } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { ReactNode, useContext } from 'react';
import { FiBell, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '@/Context/AuthContext';
import APIHandlers from '@/utils/APIHandlers';
import {useRouter} from 'next/navigation';


export default function Layout(
  {
    children
  }: {
    children: ReactNode;
  }) {


  const { usermeta, branchmeta } = useContext(AuthContext)

  const toast =  useToast()
  const router  =  useRouter()

  const handleLogout = (event: any) => {

    APIHandlers.post('/api/auth/logout/', {}).then(Response => {
      toast({
        title: 'Logged out Successfully!!',
        position: 'top-right',
        isClosable: true,
        colorScheme: 'green'
      })
      router.push('/auth/login/')
      

    }).catch(error=> {
      toast({
        title: 'Invalid Request!',
        position: 'top-right',
        isClosable: true,
        colorScheme: 'red'
      })
    })

  }

  return (
    <>


      <div className='flex'>
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
      </div>




    </>
  )
}