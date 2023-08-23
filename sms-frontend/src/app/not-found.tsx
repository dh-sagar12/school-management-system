import { Button, Result } from 'antd'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    // <div className='text-center'>Page Not found</div>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <a href={'/'}>
          <Button type='primary' className='bg-purple-700'>Back Home</Button>
        </a>
      }
    />
  )
}

export default NotFound