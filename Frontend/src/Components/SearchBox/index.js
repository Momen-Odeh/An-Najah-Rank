import React from 'react'
import { InputGroup, FormControl} from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai';
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    customInputGroup: {
        maxWidth: '250px',
        marginRight:'15px',
      },
      search:{
        backgroundColor:'#39424e',
        color:'white !important',
        border:'none',
        '&::placeholder': {
            color:'white',
        },
          '&:focus': {
            backgroundColor:'#39424e',
            outline: 'none !important',
            boxShadow: 'none !important',
          },
    },
})

const SearchBox = () => {
    const classes = useStyle()
  return (
    <InputGroup className={classes.customInputGroup}>
        <InputGroup.Text id="basic-addon2" className={classes.search}>
            <AiOutlineSearch />
          </InputGroup.Text>
        <FormControl
          className={classes.search}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
    </InputGroup>
  )
}

export default SearchBox