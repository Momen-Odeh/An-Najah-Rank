import React, { useState } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'
import ButtonRank from '../ButtonRank'
import ChallengeInContest from '../ChallengeInContest'
import Text from '../Text'

const ContestsInCourse = ({contests, isAdmin, handleAddContest}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [contest, setContest] = useState({
    contestName:'',
  })
  const { contestName } = contest
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContest({
      ...contest,
      [name]: value,
    });
  };
  return (
    <Container>
        <Row className="m-2">
          <Col>
            <Text
              text={"Contests"}
              fontFamily={"OpenSans"}
              wegiht="600"
              size="22px"
              color="#39424e"
            />
          </Col>
          {isAdmin && <Col className='d-flex justify-content-end align-items-start'>
            <ButtonRank text={"Add Contest"} color='white' hoverBackgroundColor='green' backgroundColor='#1cb557' onClick={()=>setShowAddModal(true)}/>
          </Col>}
        </Row>
        {contests.map((item) => (
          <Row className="m-2 mt-3">
            <Col>
              <ChallengeInContest
                challengeName={item.ContestName}
                solved={item.solved}
                Statistics={item.statistics}
                challengeUrl={item.url}
                endDate={item.endDate}
              />
            </Col>
          </Row>
        ))}
        <Row>
        <Modal
          show={showAddModal}
          onHide={() => {
            setShowAddModal(false);
            setContest('')
          }}
          scrollable
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Form>
                <Form.Group controlId="registrationNumber">
                  <Text text={"contest Name"} />
                  <Form.Control
                    type="text"
                    name="contestName"
                    value={contestName}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                  />
                </Form.Group>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Container fluid>
              <Row>
                <Col className="d-flex justify-content-end align-align-items-center">
                  <ButtonRank
                    text={"Add"}
                    color="white"
                    hoverBackgroundColor="green"
                    backgroundColor="#1cb557"
                    onClick={()=>{
                      handleAddContest(contestName)
                      setContest('')
                      setShowAddModal(false)
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
        </Row>
      </Container>
  )
}

export default ContestsInCourse