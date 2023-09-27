import React from 'react';
import CustomInputGroup from '../CustomInputGroup';
import useStyle from './Style';

const Tags = ({tags, handleChange, name}) => {
  const classes = useStyle()
  const handleAdd = (val) => {
    if (val.trim() !== '') {
        handleChange(null, 'tags',[...tags, val.trim()]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    handleChange(null, 'tags', updatedTags);
  };

  return (
    <div>
      <CustomInputGroup 
        BtnText={'Add'}
        handleBtnClick={handleAdd}
        placeholder={"Add a tag"}
        />
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
