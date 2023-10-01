import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container } from 'react-bootstrap';
import useStyle from './Style';

const TextEditor = ({name, text, handleChange}) => {
  const classes = useStyle();
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className={classes.editorContainer}>
      <ReactQuill
        value={text}
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={(value)=>handleChange(null,name,value)}
        className={classes.editor}
      />
      </div>
  );
};

export default TextEditor;

