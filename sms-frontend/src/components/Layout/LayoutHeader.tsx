import React, { Dispatch, SetStateAction } from 'react'
import { AuthContext } from '@/Context/AuthContext';
import { ReactNode, useContext, useState } from 'react';
import { FiBell, FiLogOut } from 'react-icons/fi';
import { Button, message } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import APIHandlers from '@/utils/APIHandlers';
import { useRouter } from 'next/navigation';

interface Props {
  collapsed: boolean,
  setCollapsed: Dispatch<SetStateAction<boolean>>

}



const LayoutHeader = (props: Props) => {

  const { usermeta, branchmeta, today_date } = useContext(AuthContext)

  const router = useRouter()

  const handleLogout = (event: any) => {

    APIHandlers.post('/api/auth/logout/', {}).then(Response => {
      console.log(Response)
      message.success('Logout Success!!')
      router.push('/auth/login/')


    }).catch(error => {
      message.error(error?.message)

    })

  }


  return (
    <div className='flex text-center items-center  justify-between  '>
      <Button
        className='text-xl text-purple-700'
        type="text"
        icon={props.collapsed ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        onClick={() => props.setCollapsed(!props.collapsed)}

      />
      <li className='list-none font-bold'>{branchmeta?.org_name}({branchmeta?.nick_name})</li>
      <li className='list-none font-bold'>{today_date.today_date_np}</li>
      <li className='list-none font-bold'>{usermeta?.first_name} {usermeta?.last_name}</li>
      <div className='flex space-x-8  '>
        <Button icon={<FiBell />} ghost={true} type='text' className='text-purple-700 text-lg' />
        <Button icon={<FiLogOut />} onClick={handleLogout} ghost={true} type='text' className='text-purple-700 text-lg' />
      </div>
    </div>
  )
}

export default LayoutHeader

function toast(arg0: { title: string; position: string; isClosable: boolean; colorScheme: string; }) {
  throw new Error('Function not implemented.');
}
