import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CustomInputGroup from '../CustomInputGroup'
import Text from '../Text'
import UserLimitAccess from '../UserLimitAccess'
import useStyle from './Style'
const Moderators = ({Owner}) => {
  const classes = useStyle()
  const[moderators, setModerators]= useState([])

  const handleAdd = (val)=>{
    if (val.trim() !== '') {
        setModerators([...moderators, val.trim()]);
    }
  }
  const handleRemoveModerator =(moderator)=>{
    const updatedModerators = moderators.filter((mo) => mo !== moderator);
    setModerators(updatedModerators)
  }
  return (
    <Container>
        <Row>
            <Col md={2}>
            <Text fontFamily='Open Sans' text={'Moderators'} height={'40px'} wegiht={'600'}/>
            </Col>
            <Col md={8}>
                <Row>
                    <CustomInputGroup 
                        BtnText={'Add'} 
                        handleBtnClick={handleAdd}
                        placeholder={""}
                        type="email"
                    />
                </Row>

                <Row className='m-1'>
                    <Text wegiht={'300'} size='14px' color={'#979faf'} text={`Enter moderator's email. Moderators can edit this challenge.`}/>
                </Row>

                <Row>
                    <Row className='ms-3'>
                        <UserLimitAccess userName={Owner} access={'owner'}/>
                    </Row>
                    {moderators?.map((item)=>(
                        <div className='d-flex align-items-center'>
                            <button
                            className={`badge m-1 p-1 border-0 ${classes.button}`}
                            onClick={() => handleRemoveModerator(item)}
                            >
                            &times;
                            </button>
                            <UserLimitAccess userName={item} access={'moderator'}/>
                        </div>
                    ))}
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default Moderators