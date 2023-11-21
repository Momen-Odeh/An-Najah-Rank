import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import useStyles from "./textAreaStyle";
const CodeTextArea = ({ text }) => {
  const classes = useStyles();
  const [textareaHeight, setTextareaHeight] = useState("100px");
  useEffect(() => {
    if (typeof text == "string") {
      const lines = text.split("\n").length;
      const newHeight = Math.max(100, lines * 30);
      setTextareaHeight(`${newHeight}px`);
    }
  }, [text]);
  //
  let splitLines = text.split("\n");
  const linesToHighlight = [2, 4, 5];
  const colorRange = [
    { range: "1-7", color: "red" },
    { range: "8-12", color: "green" },
    { range: "16-18", color: "cyan" },
  ];
  const highlightedContent = splitLines.map((line, index) => {
    // const val
    for (let index1 = 0; index1 < colorRange.length; index1++) {
      let splitRange = colorRange[index1].range.split("-");
      if (index + 1 >= splitRange[0] && index + 1 <= splitRange[1]) {
        // console.log(index, colorRange[index].color);
        return `<span style="color: ${colorRange[index1].color}">${line}</span><br>`;
      }
    }
    // console.log(index, "black");
    return `<span style="color: ${"black"}">${line}</span><br>`;
  });

  //
  return (
    <Row>
      <Col>
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
      </Col>
    </Row>
  );
};

//

//

export default CodeTextArea;
