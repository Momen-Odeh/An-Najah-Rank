import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
    editorContainer: {
      '& .ql-editor': {
        minHeight: '120px',
      },
    },
  });

  export default useStyle