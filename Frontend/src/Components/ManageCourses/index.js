import React from 'react'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ButtonRank from '../ButtonRank'
import TabTable from '../TabTable'
const ManageCourses = () => {
    const navigate = useNavigate()
  const header=['Course Name','Course Owner','Moderators']
  const [courses,setCourses]=useState([
    {
        name:'HW1',owner:'Noor Aldeen',moderators:['ahmad','sami']    
    },
  ])
  return (
    <>
        <Row>
            <Col className='d-flex justify-content-end'>
                <ButtonRank text='Create Course' color='#ffffff' hoverBackgroundColor='green' backgroundColor='#1cb557'
                onClick={()=>navigate('/create-course')}
                />
            </Col>
        </Row>
        <Row className='mt-4'>
        <Col></Col>
        <Col md={4} className="d-flex justify-content-end">
          <Form.Control type="text" placeholder="Type username" />
          <ButtonRank
            text={"Search"}
            color="white"
            hoverBackgroundColor="green"
            backgroundColor="#1cb557"
          />
        </Col>
        </Row>
        <Row className='mt-4 mb-4'>
            <Col>
                <TabTable TableHeader={header} TableData={courses} url={'/course-view'}/>
            </Col>
        </Row>
    </>
  )
}

export default ManageCourses