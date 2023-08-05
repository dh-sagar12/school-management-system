import StudentHome from '@/components/Students/StudentHome'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const Student = async () => {


  const students = await APIHandlers.post('/api/student/filter/', {query: ''})
  

  

  return (
    <div>
        <StudentHome Students={students}/>
        

    </div>

  )
}

export default Student