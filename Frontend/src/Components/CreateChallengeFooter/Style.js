import { createUseStyles } from 'react-jss';

// Define JSS styles
const useStyle = createUseStyles({
  container: {
    position: 'relative',
  },
  fixedContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
    width:'100%',
    borderTop:'1px solid #a8a8a8',
    zIndex:'500'
  }
});
export default useStyle