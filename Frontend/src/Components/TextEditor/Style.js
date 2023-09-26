import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    textAreaContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'start',
      backgroundColor: '#f5f5f5',
      border:'2px solid #dddddd',
      borderRadius:'5px'
    },
    lineNumbers: {
      width: '30px',
      backgroundColor: '#f5f5f5',
      top:'6px',
      position: 'relative',
    },
    lineNumber: {
      textAlign: 'center',
      padding: '2px',
      userSelect: 'none',
    },
    textarea: {
      border: 'none',
      resize: 'none',
      minHeight: '100px',
      overflow: 'hidden',
      lineHeight: '1.73',
      '&:focus': {
        boxShadow: 'none !important',
      },
    },
  });

  export default useStyles