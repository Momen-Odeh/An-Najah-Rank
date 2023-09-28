import { createUseStyles} from 'react-jss'

const useStyle = createUseStyles({
    iconColor:{
        marginLeft:'10px',
        '&:hover':{
            color:'#4691f6 !important'
        },
    }
})

export default useStyle