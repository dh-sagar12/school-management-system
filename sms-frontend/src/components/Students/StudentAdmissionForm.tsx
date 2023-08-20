"use client"
import { Button, Card, Col, DatePicker, Divider, Form, Row, Select, Space, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/Context/AuthContext';
import dayjs from 'dayjs';
import StudentSearch from '@/helpers/StudentSearch';
import { ClassesModel, CoursesModel, FacultyModel } from '@/academic/academic';
import getAcademicSession from '@/utils/AcademicSessionServices';
import ChargeTableForAdmission from './ChargeTableForAdmission';
import APIHandlers from '@/utils/APIHandlers';
import { useRouter } from 'next/navigation';

interface Props {
  ClassesModel: ClassesModel[]
  FacultyModel: FacultyModel[]
  Courses: CoursesModel[]
}

interface Charges {
  key?: number,
  charge_id: number,
  charge_name: string,
  due_charge: number,
  course_id: number
  academic_session_type: number,
  discount: number,
  received_amount: number,
}


const StudentAdmissionForm = (prop: Props) => {
  const [PageSubmitting, setPageSubmitting] = useState<boolean>(false)
  const { today_date } = useContext(AuthContext)
  const [value, setValue] = useState('')
  const [disabled, setdisabled] = useState(true)
  const [ShowFaculty, setShowFaculty] = useState(false)
  const [AcademicSessionDropdown, setAcademicSessionDropdown] = useState<any>([])
  const [ChargesData, setChargesData] = useState<Charges[]>([])
  const [selectedRow, setSelectedRow] = useState<Charges[]>([]);
  const [ChargesTotal, setChargesTotal] = useState<{
    total_charge: number,
    discount: number
  }>({
    total_charge: 0,
    discount: 0
  })
  const [form] = Form.useForm();
  const router = useRouter()




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

  const onFinish = (values: any) => {
    let class_id = form.getFieldValue('class_id')

    APIHandlers.post('/api/tran/due-charges/', { 'student_id': value, 'class_id': class_id }).then(response => {
      if (values?.academic_session_type !== undefined) {
        let charge_data = response.filter((item: any) => item.course_id == values.course_id && item.academic_session_type == values.academic_session_type).map((item: any) => {
          return { ...item, key: item.charge_id, discount: 0, received_amount: item.due_charge }
        })
        setChargesData(charge_data)
      }
      else {
        let charge_data = response.map((item: any) => {
          return { ...item, key: item.charge_id, discount: 0, received_amount: item.due_charge }
        })
        setChargesData(charge_data)
      }



    }).catch(err => {

      message.error(err?.message)
    })


  }


  const faculty_needed = ['Eleven', 'Twelve', 'Bachelor', 'Master']

  useEffect(() => {
    form.setFieldsValue({ 'student_id': value })
  }, [value])

  useEffect(() => {
    let total_charge: number = selectedRow.reduce((prev, curr_val) => prev + curr_val.received_amount, 0)
    let total_discount: number = selectedRow.reduce((prev, curr_val) => prev + curr_val.discount, 0)
    setChargesTotal({ ...ChargesTotal, total_charge: total_charge, discount: total_discount })
  }, [selectedRow])

  const handleChangeInClass = (value: number) => {
    form.setFieldsValue({ course_id: null, academic_session_type: null })
    setChargesData([])
    if (value > 0) {
      setdisabled(false)
    }

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


  const OnChangeInCourse = async (value: number) => {
    form.setFieldsValue({ academic_session_type: null })
    let course = prop.Courses.filter(item => item.id == value)[0]
    if (value > 0) {
      let academic_session_dropdown_data = await getAcademicSession(course.course_duration, course.academic_type_id)
      setAcademicSessionDropdown(academic_session_dropdown_data)
    }



  }



  const SaveAdmissionForm = () => {
      console.log('now rest work for tomorrow');
      
    
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
                        onChange={OnChangeInCourse}
                      >
                        {
                          prop.Courses.map(item => {
                            return (
                              <Select.Option value={item.id} key={item.id}>{item.course_name}</Select.Option>
                            )
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={6}>
                    <Form.Item name="academic_session_type" label="Semester/Year" rules={[{ required: true }]}>
                      <Select
                        disabled={AcademicSessionDropdown.length == 0}
                        placeholder="Semester/Year"
                        allowClear
                      >
                        {
                          AcademicSessionDropdown.map((item: any) => {
                            return (
                              <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
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
            <Col xs={24} sm={12} md={6}>
              <Form.Item label=" " colon={false}>
                <Button htmlType="submit" className='text-purple-600 border-purple-700' disabled={disabled}>
                  ShowData
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Divider className='border-purple-700' style={{ fontWeight: 'bold', color: '#922EC9', fontSize: '16px' }}>Charges</Divider>

          <ChargeTableForAdmission ChargesData={ChargesData} setChargesData={setChargesData} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />

        </Form>

        <div className='leading-7 mb-5'>
          <p>
            <span className='font-bold'>Total Charge :</span>  <span>{ChargesTotal.total_charge}</span>
          </p>
          <p>
            <span className='font-bold'>Discount :</span>  <span>{ChargesTotal.discount}</span>
          </p>
          <hr />
          <p>
            <span className='font-bold'>Net Total :</span> <span>{ChargesTotal.total_charge - ChargesTotal.discount}</span>
          </p>
        </div>

        <Space size={'middle'}>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="button" onClick={SaveAdmissionForm} className='bg-purple-700' loading={PageSubmitting} 
            disabled={form.getFieldValue('student_id')== '' || form.getFieldValue('class_id')<=0 } >
              Submit
            </Button>
          </Form.Item>
          <Form.Item label=" " colon={false}>

            <Button htmlType="button" onClick={() => { router.push('/student/') }} className='bg-gray-300'  >

              Cancel
            </Button>
          </Form.Item>

        </Space>
      </Card>
    </div>
  )
}

export default StudentAdmissionForm