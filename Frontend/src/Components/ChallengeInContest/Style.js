import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    Container:{
        border:'1px solid #c2c7d0',
        borderRadius:'5px',
        maxWidth:'800px'
    },
    Link:{
        textDecoration:'none',
        maxWidth:'400px',
        '&:hover':{
            textDecoration:'none',
        }
    }
})

export default useStyle