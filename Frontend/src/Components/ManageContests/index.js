import React from 'react'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ButtonRank from '../ButtonRank'
import TabTable from '../TabTable'
const ManageContests = () => {
    const navigate = useNavigate()
  const header=['Contest Name','Contest Slug','Contest Owner','Start Date','Participants']
  const [contests,setContests]=useState([
    {
        name:'HW1',slug:'An-Najah',owner:'Noor Aldeen',startDate:'Oct 1, 2023',participants:'3'    
    },
  ])
  return (
    <>
        <Row>
            <Col className='d-flex justify-content-end'>
                <ButtonRank text='Create Contest' color='#ffffff' hoverBackgroundColor='green' backgroundColor='#1cb557'
                onClick={()=>navigate('/create-contest')}
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
                <TabTable TableHeader={header} TableData={contests} url={'/contest-view'}/>
            </Col>
        </Row>
    </>
  )
}

export default ManageContests