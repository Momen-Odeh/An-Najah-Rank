import React, { useState } from 'react'
import Details from '../../Components/Details'
import Moderators from '../../Components/Moderators'
import ChallengeTabs from '../../Components/ChallengTabs'
import Breadcrumbs from '../../Components/Breadcrumbs'
import Text from '../../Components/Text';
import { Container, Row } from 'react-bootstrap';
const CreateChallenge = () => {
    const [details, setDetails] = useState({
        difficulty: '',
        name: '',
        description: '',
        problemStatement: '',
        inputFormat: '',
        constraints: '',
        outputFormat: '',
        tags: [],
      });
    
      const handleChange = (e, nameVal=null, val = null) => {
        if(e){
          const { name, value } = e.target;
          console.log(value)
          setDetails({ ...details, [name]: value });
        }
        else{
          setDetails({ ...details, [nameVal]: val });
          console.log(val)
        }
      };

    const tabs=[
      {title:'Details', eventKey: 'Details', TabComponent: <Details details={details} handleChange={handleChange}/>},
      {title:'Moderators', eventKey: 'Moderators', TabComponent: <Moderators Owner={'NoorAldeen AbuShehadeh'}/>}
    ]
    const path=[{title:'Manage Challenges',url:'#manage challenges'}, {title:details.name,url:'#'}]
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
                    <Text text={details.name} size={'30px'} fontFamily={"OpenSans"} color={'#39424e'}/>
                </Row>
                <Row className='m-2'>
                    <ChallengeTabs ListTabs={tabs}/>
                </Row>
            </Container>
        
        </>
  )
}

export default CreateChallenge