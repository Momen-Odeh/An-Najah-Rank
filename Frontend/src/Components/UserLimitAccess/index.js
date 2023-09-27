import React from 'react'
import Text from '../Text';
import useStyle from './Style'
const UserLimitAccess = ({userName, access}) => {
    const classes = useStyle();
  return (
        <div className='d-flex m-3'>
            <div className='me-3'>
                <img src='./images/N-messages.png' alt='userLogo' className={classes.image}></img>
            </div>
            <div>
                <div>
                    <Text color={'#0e141e'} wegiht={600} text={userName}/>
                </div>
                <div>
                    <Text color={'#0e141e'} wegiht={200} text={access}/>
                </div>
            </div>
        </div>
  )
}

export default UserLimitAccess