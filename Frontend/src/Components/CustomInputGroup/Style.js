import { createUseStyles } from "react-jss";
const useStyle = createUseStyles({
    inputTags:{
        maxWidth:'250px'
    },
    button:{
        backgroundColor:'#f8f9fa',
        border:'1px solid #C2C7D0',
        color:'black',
        '&:hover':{
            backgroundColor:'#2ec866'
        },
    },
})
export default useStyle