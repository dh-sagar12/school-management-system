import Login from '@/components/Auth/Login'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'


const page = async () => {
  const branches = await APIHandlers.get('/api/core/branch-dropdown/')
  return (
    <>
      <div>

        <Login Branches={branches} />
      </div>
    </>
  )
}

export default page
