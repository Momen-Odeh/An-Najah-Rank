import React from 'react'
import { Alert } from 'react-bootstrap'
import useStyle from './Style'
const AlertComponent = ({variant='warning', message}) => {
    const classes = useStyle()
  return (
    <Alert key={variant} variant={variant} className={classes.alert}>
          {message}
    </Alert>
  )
}

export default AlertComponent