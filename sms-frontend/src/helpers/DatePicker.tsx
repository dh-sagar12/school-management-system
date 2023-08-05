import React from 'react'
import { SlCalender } from 'react-icons/sl'
import Cleave from 'cleave.js/react';
import { Col, Grid, Input, Row, Space, Tooltip } from 'antd';
import { title } from 'process';




const DatePicker = () => {




  return (
    <>
      <div>
        <Space.Compact direction='horizontal' className='text-center items-center '>
          <Col md={24}>
            <Cleave
              placeholder={"YYYY/MM/DD"} className='date-picker-input'
              options={{
                blocks: [4, 2, 2],
                delimiter: '/',
                numericOnly: true
              }}
            // onDoubleClick={() => this.setState({ visible: true })}
            // onChange={
            //   (e) => {
            //     var newDate = e.target.value.replace(/(\/)/g, '')

            //     if (e.target.value.length == 10) {
            //       if (Number(e.target.value.split('/')[1]) > 12 || Number(e.target.value.split('/')[1]) == 0) {
            //         showErrorMessage(`Invalid Month Date ${Number(e.target.value.split('/')[1])}`)
            //         return;
            //       }

            //       if (Number(e.target.value.split('/')[2]) > 32 || Number(e.target.value.split('/')[2]) == 0
            //         || Number(e.target.value.split('/')[2]) > Number(getDays(Number(e.target.value.split('/')[0]), Number(e.target.value.split('/')[1])) || 0)
            //       ) {
            //         showErrorMessage(`Invalid Day Date ${Number(e.target.value.split('/')[2])}`)
            //         return;
            //       }

            //       if (Number(e.target.value.split('/')[0]) < 2001) {
            //         showErrorMessage(`Invalid Year Date ${Number(e.target.value.split('/')[0])}`)
            //         return;
            //       }

            //       if (Number(newDate) >= 0) {
            //         this.setState({
            //           currentDay: Number(e.target.value.split('/')[2]),
            //           currentMonth: Number(e.target.value.split('/')[1]),
            //           currentYear: Number(e.target.value.split('/')[0])
            //         })

            //         this.handleDateChange(Number(e.target.value.split('/')[0]),
            //           Number(e.target.value.split('/')[1]),
            //           Number(e.target.value.split('/')[2]))
            //       }
            //     }
            //   }
            // }

            // style={this.props.style}
            // readOnly={this.props.disabled}
            // value={composeNpDate(currentYear, currentMonth, currentDay)}
            />
          </Col>
          <Col md={1} style={{}}>
            <Tooltip title="Show Calender"> <SlCalender /> </Tooltip>
          </Col>
        </Space.Compact>
      </div>
    </>
  )
}

export default DatePicker