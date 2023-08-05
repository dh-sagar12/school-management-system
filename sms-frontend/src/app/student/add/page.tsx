import AddStudentForm from '@/components/Students/AddStudentForm'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const AddStudentPage = async () => {

  // const provinces  = await APIHandlers.get('/api/core/provinces/')
  // const districts  = await APIHandlers.get('/api/core/districts/')
  // const local_bodies  = await APIHandlers.get('/api/core/localbodies/')


  return (
    <div>
        <AddStudentForm/>
    </div>
  )
}

export default AddStudentPage