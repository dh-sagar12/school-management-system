import React, { Dispatch, SetStateAction } from 'react'
import { AuthContext } from '@/Context/AuthContext';
import { ReactNode, useContext, useState } from 'react';
import { FiBell, FiLogOut } from 'react-icons/fi';
import { Button } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

interface Props {
  collapsed: boolean,
  setCollapsed: Dispatch<SetStateAction<boolean>>

}



const LayoutHeader = (props: Props) => {

  const { usermeta, branchmeta, today_date } = useContext(AuthContext)

  // const handleLogout = (event: any) => {

  //   APIHandlers.post('/api/auth/logout/', {}).then(Response => {
  //     toast({
  //       title: 'Logged out Successfully!!',
  //       position: 'top-right',
  //       isClosable: true,
  //       colorScheme: 'green'
  //     })
  //     router.push('/auth/login/')


  //   }).catch(error => {
  //     toast({
  //       title: 'Logged out Successfully!!',
  //       position: 'top-right',
  //       isClosable: true,
  //       colorScheme: 'green'
  //     })
  //     router.push('/auth/login/')


  //   })

  // }


  return (
    <div className='flex text-center items-center  justify-between  '>
      <Button
        className='text-xl text-purple-700'
        type="text"
        icon={props.collapsed ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        onClick={() => props.setCollapsed(!props.collapsed)}

      />
      <li className='list-none font-bold'>{branchmeta?.org_name}({branchmeta?.nick_name})</li>
      <li className='list-none font-bold'>{today_date.today_date_np }</li>
      <li className='list-none font-bold'>{usermeta?.first_name} {usermeta?.last_name}</li>
      <div className='flex space-x-8  '>
        <Button icon={<FiBell />} ghost={true} type='text' className='text-purple-700 text-lg' />
        <Button icon={<FiLogOut />} ghost={true} type='text' className='text-purple-700 text-lg' />
      </div>
    </div>
  )
}

export default LayoutHeader