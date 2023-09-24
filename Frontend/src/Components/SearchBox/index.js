import React from 'react'
import { InputGroup, FormControl} from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai';
import useStyle from './Style';


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