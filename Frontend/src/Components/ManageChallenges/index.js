import React from 'react'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ButtonRank from '../ButtonRank'
import TabTable from '../TabTable'
import { useNavigate } from 'react-router-dom'
const ManageChallenges = () => {
  const header=['Challenge Name','Challenge Slug','Challenge Owner']
  const navigate = useNavigate()
  const [challenges,setChallenges]=useState([
    {
        name:'Insertion Sort',slug:'An-Najah',owner:'Noor Aldeen'   
    },
  ])
  return (
    <>
        <Row>
            <Col className='d-flex justify-content-end'>
                <ButtonRank text='Create Challenge' color='#ffffff' hoverBackgroundColor='green' backgroundColor='#1cb557'
                onClick={()=>navigate('/create-challenge')}
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
                <TabTable TableHeader={header} TableData={challenges} url={'/challenge'}/>
            </Col>
        </Row>
    </>
  )
}

export default ManageChallenges