import React, {useState} from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';
import useStyle from './Style';

const CustomInputGroup = ({ BtnText, handleBtnClick, placeholder='Enter text',type='text' }) => {
  const classes = useStyle()
  const [data,setData]=useState('');
  return (
    <InputGroup className="mb-3">
        <Form.Control
        type={type}
        placeholder={placeholder}
        value={data}
        onChange={(e)=>{
          setData(e.target.value)
        }}
        className={classes.inputTags}
        />
        <Button variant="success" onClick={()=>{
          handleBtnClick(data)
          setData('')
        }} className={classes.button}>
        {BtnText}
        </Button>
    </InputGroup>
  )
}

export default CustomInputGroup