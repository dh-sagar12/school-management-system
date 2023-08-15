import StudentAdmissionForm from '@/components/Students/StudentAdmissionForm'
import APIHandlers from '@/utils/APIHandlers'
import React from 'react'

const AdmissionAdd = async () => {

  const classes = await APIHandlers.get('/api/academic/classes/')
  const faculties = await APIHandlers.get('/api/academic/faculty/')
  const courses =  await APIHandlers.get('/api/academic/course/')



  return (
    <React.Fragment>
      <h2 className='text-xl font-bold text-blue-600 pb-3'>New Admission</h2>
      <StudentAdmissionForm ClassesModel={classes} FacultyModel = {faculties} Courses =  {courses} />

    </React.Fragment>
  )
}

export default AdmissionAdd