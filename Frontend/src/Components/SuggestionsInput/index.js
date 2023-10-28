import React, { useState, useRef, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";
import useStyle from "./Style";
import InputFiledRank from "../InputFiledRank";

const SuggestionsInput = ({
  data,
  name,
  value,
  placeholder = "Type here...",
  handleChange,
  width,
  msgInput,
  loadingVal,
}) => {
  const classes = useStyle();
  const words = data;
  const inputRef = useRef(null);
  const suggestionsContainerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    handleChange(inputText);
    if (!inputText) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = words.filter((word) =>
        word.toLowerCase().includes(inputText.toLowerCase())
      );
      setErrorMsg({ moderators: null });
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    }
  };
  const handleSuggestionClick = (word) => {
    handleChange(word);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      scrollSuggestionsContainer(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      scrollSuggestionsContainer(selectedIndex - 1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleChange(suggestions[selectedIndex]);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const scrollSuggestionsContainer = (index) => {
    if (suggestionsContainerRef.current) {
      const itemHeight =
        suggestionsContainerRef.current.firstChild.clientHeight;
      const containerHeight = suggestions.length * itemHeight;
      suggestionsContainerRef.current.style.height = `${containerHeight}px`;
      const scrollOffset = index * itemHeight;
      suggestionsContainerRef.current.scrollTop = scrollOffset;
    }
  };
  const { errorMsg, setErrorMsg } = msgInput;
  const { loading, setLoading } = loadingVal;
  return (
    <div className={`${classes.inputContainer}`}>
      <InputFiledRank
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          handleInputChange(e);
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete="off"
        width={width}
        msg={errorMsg.moderators}
        disabled={loading}
      />
      {showSuggestions && (
        <div className={classes.suggestionsContainer}>
          <ListGroup
            className={classes.ListGroup}
            ref={suggestionsContainerRef}
          >
            {suggestions.map((word, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleSuggestionClick(word)}
                className={
                  selectedIndex === index
                    ? `${classes.suggestionItem} ${classes.selected}`
                    : classes.suggestionItem
                }
              >
                {word}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default SuggestionsInput;
