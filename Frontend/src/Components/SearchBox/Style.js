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

export default useStyle