import ChargesSetup from '@/components/Academic/ChargesSetup'
import APIHandlers from '@/utils/APIHandlers'
import { Card } from 'antd'
import React from 'react'

const ChargeSetup = async () => {

  const classes = await APIHandlers.get('/api/academic/classes/')
  const courses =  await APIHandlers.get('/api/academic/course/')

  return (
    <React.Fragment>
      <h2 className='text-xl font-bold text-blue-600 pb-3'>Charges Setup</h2>

      <ChargesSetup ClassesModel={classes} CoursesModel =  {courses} />


    </React.Fragment>
  )
}

export default ChargeSetup