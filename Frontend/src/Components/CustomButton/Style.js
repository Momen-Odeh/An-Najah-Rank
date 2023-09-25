import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    customBtn:{
        backgroundColor:({backgroundColor})=>`${backgroundColor}`,
        color:({color})=>color,
        padding:({padding})=>padding,
        border:'none',
        margin:({margin})=>margin,
        '&:hover':{
            backgroundColor:'green'
        }
    }
})

export default useStyle