import StudentAdmissionForm from '@/components/Students/StudentAdmissionForm'
import React from 'react'

const AdmissionAdd = () => {
  return (
    <React.Fragment>
      <h2 className='text-xl font-bold text-blue-600 pb-3'>New Admission</h2>
      <StudentAdmissionForm/>

    </React.Fragment>
  )
}

export default AdmissionAdd