'use client'
import { Button, Card, Col, Divider, Form, Input, InputRef, Row, Select, Space, Upload, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import StudentSearch from '@/helpers/StudentSearch';
import { AiOutlinePlus, AiOutlineSave, AiOutlineUpload } from 'react-icons/ai';
import APIHandlers from '@/utils/APIHandlers';
import { AttachmentModel } from '@/core/coreTypes';
import { RxCross1 } from 'react-icons/rx'




const UploadAttachmentsPage = () => {


    const [value, setValue] = useState<string>('');
    const [progress, setProgress] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [PreviewImgURL, setPreviewImgURL] = useState<string>('/blankuser.png')

    const [AttachmentModel, setAttachmentModel] = useState<AttachmentModel>({
        table_name: 'student.students',
        attachment_type: '',
        file_name: '',
        original_file_name: '',
        is_active: true,
        table_id: parseInt(value)

    })
    const [items, setItems] = useState(['Avatar', 'Citizenship', 'BirthCertificate']);
    const [name, setName] = useState('');
    const [StudentAttachmentDetail, setStudentAttachmentDetail] = useState<AttachmentModel[]>([])
    const [TenatURL, setTenatURL] = useState<string>('')

    const inputRef = useRef<InputRef>(null);


    useEffect(() => {
        setAttachmentModel({ ...AttachmentModel, table_id: parseInt(value) })
        if (value !== undefined) {

            APIHandlers.get(`/api/core/attachment/${value}`).then(data => {
                console.log(data);
                setTenatURL(data.host_url)
                setStudentAttachmentDetail(data.attachments)


            }).catch(err => {
                console.log(err);

            })
        }


    }, [value])



    const uploadImage = async (options: any) => {
        const { onSuccess, onError, file, onProgress, action } = options;

        // const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event: any) => {

                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };

        APIHandlers.postWithFile('/api/core/upload/temp/', {}, file, config).then(response => {

            setAttachmentModel({ ...AttachmentModel, file_name: response.file_name, original_file_name: response.original_file_name, table_id: parseInt(value) })
            onSuccess('Ok')
            setPreviewImgURL(`${response.temp_url}/${response.file_name}`)


        }).catch(err => {
            if (err.status == 401) {
                window.location.reload()
            }

        })
    };


    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);

    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {

        e.preventDefault();
        setItems([...items, name]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleSelectChange = (value: string) => {

        setAttachmentModel({ ...AttachmentModel, attachment_type: value })

    }

    const handleSaveAttach = () => {
        setLoading(true)
        APIHandlers.post('/api/core/upload/', AttachmentModel).then(response => {
            console.log(response);
            message.success('Uploaded Successfully!!!')
            setLoading(false)
            setAttachmentModel({
                table_name: 'student.students',
                attachment_type: '',
                file_name: '',
                original_file_name: '',
                is_active: true,
                table_id: parseInt(value)

            })
            setPreviewImgURL('/blankuser.png')
            setStudentAttachmentDetail([...StudentAttachmentDetail, response])



        }).catch(err => {
            console.log(err);
            
            message.error(err?.message)
            setLoading(false)


        })
    }


    const DeleteAttachment =  (attachment_id: any)=> {
        APIHandlers.delete(`/api/core/attachment/delete/${attachment_id}`).then(response=>{
            message.success('Deleted Successfully!!')
            let filtered_attach = StudentAttachmentDetail.filter(item=> item.id  !== attachment_id)            
            setStudentAttachmentDetail(filtered_attach)

        }).catch(err=>{
            message.error(err?.message)            
        })
    }

    return (
        <React.Fragment>
            <h2 className='text-xl font-bold text-blue-600 pb-3'>Upload Attachments</h2>

            <Card style={{ maxWidth: '98%' }} >
                <Form layout='vertical'>
                    <Form.Item label="Student" colon={false}>

                        <StudentSearch setValue={setValue} value={value} />


                    </Form.Item>

                </Form>

                <Divider className='border-purple-700 ' />

                <Row wrap={true}>
                    <Col span={6} >
                        <Card className='shadow-md text-center w-[300px]'>
                            <h2 className='text-center font-bold text-purple-600'>Choose Image</h2>
                            <div className='p-3 '>
                                <img className='mx-auto' src={PreviewImgURL} alt={''} width={200} height={500} ></img>
                            </div>
                            <div>
                                <Upload multiple={false} customRequest={uploadImage} accept="image/*" name='original_file_name' withCredentials={true} >
                                    <Button icon={<AiOutlineUpload />}>Upload</Button>
                                </Upload>
                            </div>
                            <div>
                                <Select
                                    className='min-w-full py-3'
                                    placeholder="custom dropdown render"
                                    allowClear={true}
                                    onChange={handleSelectChange}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Please enter item"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}

                                                />
                                                <Button type="text" icon={<AiOutlinePlus />} onClick={addItem} disabled={name.length == 0}>
                                                    Add
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item, value: item }))}
                                />

                            </div>

                            {
                                (AttachmentModel?.table_id > 0 && AttachmentModel.attachment_type !== '') ?

                                    <Button type="primary" icon={<AiOutlineSave />} loading={Loading} className='bg-purple-700' onClick={handleSaveAttach}>
                                        Save
                                    </Button>
                                    :
                                    <React.Fragment></React.Fragment>
                            }


                        </Card>
                    </Col>


                    {


                        StudentAttachmentDetail.length > 0 ?

                            <Col span={15} push={2} >
                                <div className='grid grid-cols-3 flex-wrap'>
                                    {

                                        StudentAttachmentDetail.map(item => {
                                            return (
                                                <Card className='text-center col-span-1' key={item.id}>
                                                    <div className='p-3 '>
                                                        <img className='mx-auto' src={`${TenatURL}/${item.file_name}`} alt={''} width={200} height={500} ></img>
                                                    </div>
                                                    <h2 className=' font-bold'>{item.attachment_type}</h2>
                                                    <Button type="link" danger className='flex justify-center items-center mx-auto' icon={<RxCross1 className='' />} onClick={()=>DeleteAttachment(item.id)} >
                                                        Delete
                                                    </Button>
                                                </Card>
                                            )

                                        })
                                    }


                                </div>
                            </Col>
                            :
                            <React.Fragment></React.Fragment>


                    }

                </Row>

            </Card>
        </React.Fragment>
    )
}

export default UploadAttachmentsPage