'use client'
import { Button, Card, Divider, Form, Space, Upload, UploadProps } from 'antd'
import React, { useState } from 'react'
import StudentSearch from '@/helpers/StudentSearch';
import Image from 'next/image'
import { AiOutlineUpload } from 'react-icons/ai';
import APIHandlers from '@/utils/APIHandlers';




const UploadAttachmentsPage = () => {


    const [value, setValue] = useState<string>();


    const props: UploadProps = {
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
       
        onChange: (e)=>{
            console.log(e);
            
        }, 
        multiple: false, 
    };






    return (
        <React.Fragment>
            <h2 className='text-xl font-bold text-blue-600 pb-3'>Upload Attachments</h2>

            <Card style={{ maxWidth: '98%' }}>
                <Form layout='vertical'>
                    <Form.Item label="Student" colon={false}>

                        <StudentSearch setValue={setValue} value={value} />


                    </Form.Item>

                </Form>

                <Divider className='border-purple-700 ' />

                <Space>
                    <Card className='shadow-md text-center'>
                        <h2 className='text-center font-bold text-purple-600'>Choose Image</h2>
                        <div>
                            <img className='invert' src={'/blankuser.png'} alt={''} width={200} height={500} ></img>
                        </div>
                        <div>
                            <Upload {...props} action={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/core/upload/temp/`} name='original_file_name' withCredentials={true} >
                                <Button icon={<AiOutlineUpload />}>Upload</Button>
                            </Upload>
                        </div>
                    </Card>

                </Space>


            </Card>
        </React.Fragment>
    )
}

export default UploadAttachmentsPage