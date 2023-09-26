import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import useStyle from './Style';

const Tags = ({tags, handleChange, name}) => {
    const classes = useStyle()
  const [newTag, setNewTag] = useState('');

  const handleTagInputChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
        handleChange(null, 'tags',[...tags, newTag.trim()]);
        setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    handleChange(null, 'tags', updatedTags);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Add a tag"
          value={newTag}
          onChange={handleTagInputChange}
          className={classes.inputTags}
        />
        <Button variant="success" onClick={handleAddTag}>
          Add
        </Button>
      </InputGroup>
      <div>
        {tags.map((tag) => (
          <span key={tag} className={`badge  bg-secondary m-1 p-1 ${classes.tabContent}`}>
            {tag}
            <button
              className={`badge m-1 p-1 border-0 ${classes.button}`}
              onClick={() => handleRemoveTag(tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
