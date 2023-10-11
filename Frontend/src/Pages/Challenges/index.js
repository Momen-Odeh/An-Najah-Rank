import React, { useEffect, useState } from 'react'
import Details from '../../Components/Details'
import ChallengeTabs from '../../Components/ChallengTabs'
import Breadcrumbs from '../../Components/Breadcrumbs'
import Text from '../../Components/Text';
import { Container, Row } from 'react-bootstrap';
import TestCases from '../../Components/TestCases'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
const Challenges = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({
        difficulty: 'Easy',
        name: null,
        description: null,
        problemStatement: null,
        inputFormat: null,
        constraints: null,
        outputFormat: null,
        tags: [],
      });
      const [challengeName, setChallengeName] = useState(null)
      useEffect(() => {
        // Axios.get(`http://localhost:5000/get-challenge?challenge_id=23`)
        //   .then((res) => {
        //     setDetails(res.data.message)
        //     setChallengeName(res.data.message.name)
        //   })
        //   .catch((error) => {
        //     console.log('Error:', error)
        //     if (error.response) {
        //       console.log('Response data:', error.response.data)
        //       console.log('Response status:', error.response.status)
        //     }
        //   });
        const res = {
          difficulty: "Easy",
          name: "test 22",
          description: "add two numbers",
          problemStatement: "<p>x + y </p>",
          inputFormat: "<p>int</p>",
          constraints: "<p>x&gt;0</p>",
          outputFormat: "<p>int</p>",
          tags:[
            "dsa",
            "ser"
          ]
      }
        setDetails(res)
        setChallengeName(res.name)
    }, []);
    console.log(details)
    const handleChange = (e, nameVal=null, val = null) => {
      if(e){
        const { name, value } = e.target;
        console.log(details)
        setDetails({ ...details, [name]: value });
      }
      else{
        setDetails({ ...details, [nameVal]: val });
        console.log(details)
      }
    };
    const tabs=[
      {title:'Details', eventKey: 'Details', TabComponent: <Details operation={'update'} details={details} handleChange={handleChange} />, urlPattern:`/challenges/${id}/details`},
      {title:'TestCases', eventKey: 'TestCases', TabComponent:<TestCases operation={'update'}/>, urlPattern:`/challenges/${id}/test-cases` }
    ]
    const path=[{title:'Manage Challenges',url:'#manage challenges'}, {title:challengeName,url:'#'}]
    return (
        <>
            <Container>
                <Row className='m-2'>
                    <Breadcrumbs path={path}/>    
                </Row>     
            </Container>
            <hr></hr>
            <Container>     
                <Row className='m-2 mt-4 mb-2'>
                    <Text text={challengeName} size={'30px'} fontFamily={"OpenSans"} color={'#39424e'}/>
                </Row>
                <Row className='m-2'>
                    <ChallengeTabs ListTabs={tabs}/>
                </Row>
            </Container>
        </>
  )
}

export default Challenges