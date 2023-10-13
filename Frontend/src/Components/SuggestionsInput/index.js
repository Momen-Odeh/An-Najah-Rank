import React, { useState, useRef } from "react";
import { Form, ListGroup } from "react-bootstrap";
import useStyle from "./Style";

const SuggestionsInput = ({ data, name, value, placeholder = "Type here...", handleChange }) => {
  const classes = useStyle();
  const words = data;
  const inputRef = useRef(null);
  const suggestionsContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
    handleChange(inputValue)
    if (!inputText) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = words.filter((word) =>
        word.toLowerCase().includes(inputText.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    }
  };
  const handleSuggestionClick = (word) => {
    setInputValue(word);
    handleChange(word)
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
      setInputValue(suggestions[selectedIndex]);
      handleChange(suggestions[selectedIndex])
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const scrollSuggestionsContainer = (index) => {
    if (suggestionsContainerRef.current) {
      const itemHeight = suggestionsContainerRef.current.firstChild.clientHeight;
      const containerHeight = suggestions.length * itemHeight;
      suggestionsContainerRef.current.style.height = `${containerHeight}px`;
      const scrollOffset = index * itemHeight;
      suggestionsContainerRef.current.scrollTop = scrollOffset;
    }
  };

  return (
    <div className={`${classes.inputContainer}`}>
      <Form.Control
        type="text"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          handleInputChange(e);
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete="off"
      />
      {showSuggestions && (
        <div className={classes.suggestionsContainer}>
          <ListGroup className={classes.ListGroup} ref={suggestionsContainerRef}>
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
