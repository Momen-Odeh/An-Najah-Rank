import React, { useState, useEffect } from "react";
import useStyles from "./textAreaStyle";
const CodeTextArea = ({ text, range }) => {
  const classes = useStyles();
  const [textareaHeight, setTextareaHeight] = useState("100px");
  useEffect(() => {
    if (typeof text == "string") {
      const lines = text?.split("\n").length;
      const newHeight = Math.max(480, lines * 27.75);
      setTextareaHeight(`${newHeight}px`);
    }
  }, [text]);

  let splitLines = text?.split("\n");
  const colors = ["red", "green", "orange", "blue", "purple", "teal"];
  const highlightedContent = splitLines.map((line, index) => {
    // const val
    for (let index1 = 0; index1 < range.length; index1++) {
      let splitRange = range[index1]?.split("-");
      if (index + 1 >= splitRange[0] && index + 1 <= splitRange[1]) {
        return `<span style="color: ${colors[index1]}">${line}</span><br>`;
      }
    }
    return `<span style="color: ${"black"}">${line}</span><br>`;
  });

  //
  return (
    <div className={classes.textAreaContainer}>
      <div className={classes.lineNumbers}>
        {typeof text == "string" &&
          Array.from({ length: splitLines.length }, (_, index) => (
            <div key={index} className={classes.lineNumber}>
              {index + 1}
            </div>
          ))}
      </div>

      <div
        // contentEditable={true}
        dangerouslySetInnerHTML={{ __html: highlightedContent.join("") }}
        className={classes.textarea}
        style={{
          borderLeft: "1px solid #ccc",
          padding: "6px",
          paddingLeft: "10px",
          minHeight: "100px",
          height: textareaHeight,
        }}
      />
    </div>
  );
};

//

//

export default CodeTextArea;
