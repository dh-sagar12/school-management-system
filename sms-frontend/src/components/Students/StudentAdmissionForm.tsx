"use client"
import { Card, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/Context/AuthContext';
import dayjs from 'dayjs';
import StudentSearch from '@/helpers/StudentSearch';
import { ClassesModel, CoursesModel, FacultyModel } from '@/academic/academic';

interface Props {
  ClassesModel: ClassesModel[]
  FacultyModel: FacultyModel[]
  Courses: CoursesModel[]
}


const StudentAdmissionForm = (prop: Props) => {
  const { today_date } = useContext(AuthContext)


  useEffect(() => {

  }, [])




  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 32 },
    },
  };
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);

  }
  const [value, setValue] = useState('')
  const [ShowFaculty, setShowFaculty] = useState(false)

  const faculty_needed = ['Eleven', 'Twelve', 'Bachelor', 'Master']

  const handleChangeInClass = (value: number) => {

    if (prop.ClassesModel.filter((item) => {
      return faculty_needed.some(elem => {
        return elem == item.class_name
      })
    }).some((item: any) => item.id == value)) {
      setShowFaculty(true)
    }
    else {
      setShowFaculty(false)
      form.setFieldsValue({ 'faculty_id': null, 'course_id': null })
    }

  }





  return (
    <div>
      <Card>

        <Form
          {...formItemLayout}
          form={form}
          name="admission"
          onFinish={onFinish}
          scrollToFirstError
          layout='vertical'
          initialValues={{ admission_date: dayjs(today_date?.today_date_ad) }}
        >
          <Row gutter={{
            xs: 8,
            sm: 16
          }}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name='admission_date'
                label='Admission Date: '
                rules={[
                  {
                    type: 'date',
                    message: 'Not a valid Date'
                  },
                  {
                    required: true,
                    message: 'Required'
                  }
                ]}
              >
                <DatePicker format={'YYYY/MM/DD'} className='w-full' />

              </Form.Item>
            </Col>



            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name='student_id'
                label='Student Name'
                rules={[
                  {
                    required: true,
                    message: 'Required'
                  }
                ]}
              >

                <StudentSearch setValue={setValue} value={value} style={{ width: '100%' }} />

              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item name="class_id" label="Class" rules={[{ required: true }]}>
                <Select
                  placeholder="Class"
                  allowClear
                  onChange={handleChangeInClass}
                >
                  {
                    prop.ClassesModel.map(item => {
                      return (
                        <Select.Option value={item.id} key={item.id}>{item.class_name}</Select.Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>

            {

              ShowFaculty
                ?

                <React.Fragment>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item name="faculty_id" label="Faculty" rules={[{ required: true }]}>
                      <Select
                        placeholder="Faculty"
                        allowClear
                      >
                        {
                          prop.FacultyModel.map(item => {
                            return (
                              <Select.Option value={item.id} key={item.id}>{item.faculty_name}</Select.Option>
                            )
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>


                  <Col xs={24} sm={12} md={6}>
                    <Form.Item name="course_id" label="Course" rules={[{ required: true }]}>
                      <Select
                        placeholder="Course"
                        allowClear
                      >
                        {
                          prop.FacultyModel.map(item => {
                            return (
                              <Select.Option value={item.id} key={item.id}>{item.faculty_name}</Select.Option>
                            )
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </React.Fragment>

                :
                <React.Fragment></React.Fragment>
            }

          </Row>



        </Form>
      </Card>
    </div>
  )
}

export default StudentAdmissionForm