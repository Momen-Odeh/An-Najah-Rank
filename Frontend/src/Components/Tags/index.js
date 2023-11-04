import React from "react";
import CustomInputGroup from "../CustomInputGroup";
import useStyle from "./Style";
import CancelModeratorsBtn from "../CancelModeratorsBtn";

const Tags = ({ tags, handleChange, name, disabled }) => {
  const classes = useStyle();
  const handleAdd = (val) => {
    if (val.trim() !== "") {
      handleChange(null, "tags", [...tags, val.trim()]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    handleChange(null, "tags", updatedTags);
  };

  return (
    <div>
      <CustomInputGroup
        BtnText={"Add"}
        handleBtnClick={handleAdd}
        placeholder={"Add a tag"}
        disabled={disabled}
      />
      <div>
        {tags?.map((tag) => (
          <span key={tag} className={`badge ${classes.tabContent}`}>
            {tag + " "}
            <CancelModeratorsBtn
              onClick={() => handleRemoveTag(tag)}
              backgroundColor="#838e98"
              hoverBackgroundColor="#a4b2be"
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
