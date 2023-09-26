import React from 'react'
import { Button } from 'react-bootstrap'
import useStyle from './Style'

const CustomButton = ({
    text,
    handleClick,
    backgroundColor="#14823e",
    color="#0e141e",
    padding='10px',
    margin='2px',
}) => {
  const classes = useStyle({backgroundColor, color, padding, margin});
  return (
    <Button onClick={handleClick} className={classes.customBtn}>{text}</Button>
  )
}

export default CustomButton