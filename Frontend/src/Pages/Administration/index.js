import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ChallengeTabs from '../../Components/ChallengTabs'
import ManageChallenges from '../../Components/ManageChallenges'
import ManageContests from '../../Components/ManageContests'
import ManageCourses from '../../Components/ManageCourses'
import Text from '../../Components/Text'
const Administration = () => {
    const tabs=[
        {title:'Manage Courses', eventKey: 'ManageCourses', TabComponent:<ManageCourses/>,  urlPattern:'/administration/courses'},
        {title:'Manage Contests', eventKey: 'ManageContests', TabComponent:<ManageContests/>,  urlPattern:'/administration/contests'},
        {title:'Manage Challenges', eventKey: 'ManageChallenges', TabComponent: <ManageChallenges/>,  urlPattern:'/administration/challenges'}
      ]
  return (
    <>
        <Container>
            <Row className='mt-3'>
                <Col>
                    <Text text={"Administration"} size='26px' wegiht='700' color='#0e141e' height='1.4'/>
                </Col>
            </Row>
        </Container>
        <hr></hr>
        <Container>
            <Row>
                <Col>
                    <ChallengeTabs ListTabs={tabs}/>
                </Col>
            </Row>
        </Container>

    </>
  )
}

export default Administration