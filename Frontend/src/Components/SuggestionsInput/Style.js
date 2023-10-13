import { createUseStyles } from "react-jss";
const useStyle = createUseStyles({
    suggestionItem: {
        cursor: 'pointer',
        padding: '5px',
        '&:hover':{
            backgroundColor: '#f0f0f0',
        },
      },
      selected: {
        backgroundColor: '#f0f0f0',
      },
      ListGroup:{
        maxHeight: '140px',
        border:'1px solid #dee2e6',
        overflowY: 'auto'
      },
      inputContainer: {
        position: "relative",
      },
      suggestionsContainer: {
        position: "absolute",
        top: "100%",
        left: 0,
        zIndex: 1,
        width: "100%",
      },
  })
  export default useStyle