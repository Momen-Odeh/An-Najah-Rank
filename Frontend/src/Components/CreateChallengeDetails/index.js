import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Text from "../Text";
import TextEditor from "../TextEditor";
import Tags from "../Tags";
import ButtonRank from "../ButtonRank";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import InputFiledRank from "../InputFiledRank";
import useStyle from "./style";
import LoaderRank from "../LoaderRank";
import { toastError } from "../../Utils/toast";
import CheckRank from "../CheckRank";
const defaultLang = {
  Java: `  import java.io.*;
  import java.util.*;
  
  class Main {
  
      public static void main(String[] args) {
          /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
      }
  }`,
  C: `  #include <stdio.h>
  #include <string.h>
  #include <math.h>
  #include <stdlib.h>
  
  int main() {
  
      /* Enter your code here. Read input from STDIN. Print output to STDOUT */    
      return 0;
  }`,
  "C++": `  #include <cmath>
  #include <cstdio>
  #include <vector>
  #include <iostream>
  #include <algorithm>
  using namespace std;
  
  
  int main() {
      /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
      return 0;
  }
  `,
  Python: `# Enter your code here. Read input from STDIN. Print output to STDOUT`,
  JavaScript: `function processData(input) {
    //Enter your code here
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
`,
  regularexpression: ``,
};
const CreateChallengeDetails = ({ operation, data, setData }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const languages = ["Java", "C", "C++", "Python", "JavaScript", "Regex"];
  const [details, setDetails] = useState({
    difficulty: "Easy",
    challengeLanguage: [
      { language: "Java", type: "default", content: defaultLang["Java"] },
      { language: "C", type: "default", content: defaultLang["C"] },
      { language: "C++", type: "default", content: defaultLang["C++"] },
      { language: "Python", type: "default", content: defaultLang["Python"] },
      {
        language: "JavaScript",
        type: "default",
        content: defaultLang["JavaScript"],
      },
    ],
    name: "",
    description: "",
    problemStatement: "",
    inputFormat: "",
    constraints: "",
    outputFormat: "",
    challengePrivacy: false,
    tags: [],
  });

  console.log("******* ====>", details);
  // const [javaBase, setJavaBase] = useState(true); //***************************************************************************************** */
  const [errorMsg, setErrorMsg] = useState({
    name: null,
    description: null,
    problemStatement: null,
    inputFormat: null,
    constraints: null,
    outputFormat: null,
    language: null,
    challengeLanguage: [null, null, null, null, null, null],
  });
  useEffect(() => {
    if (operation === "create") {
      axios
        .get("/is-admin-or-professor")
        .then((res) => {
          if (data) setDetails(data);
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            //************* guard done ************************ */
            if (error?.response?.data?.message === "Access Denied") {
              toastError("Invalid Access");
              navigate("/");
            } else {
              toastError("Invalid Access");
              navigate("/log-in");
            }
          }
        });
    } else if (data) {
      setDetails({
        ...data,
        challengeLanguage: data.challengeLanguage.map((item) => {
          return { ...item, content: null };
        }),
      });
    }
  }, [data]);
  console.log(details);
  const navigate = useNavigate();
  const handleChange = (e, nameVal = null, val = null) => {
    if (e) {
      const { name, value } = e.target;
      setDetails({ ...details, [name]: value });
    } else {
      setDetails({ ...details, [nameVal]: val });
    }
  };
  const handleClick = async () => {
    let challenge = {
      difficulty: details.difficulty,
      name: details.name,
      description: details.description,
      problem_statement: details.problemStatement,
      input_format: details.inputFormat,
      constraints: details.constraints,
      output_format: details.outputFormat,
      challengePrivacy: details.challengePrivacy,
      challengeLanguage: details.challengeLanguage,
      tags: details?.tags?.length === 0 ? null : details.tags,
    };
    setErrorMsg({
      name:
        challenge?.name?.length < 3
          ? "challenge name must contain at least 3 characters"
          : null,
      description:
        challenge?.description?.length === 0
          ? "please enter the challenge description"
          : null,
      problemStatement:
        challenge?.problem_statement?.length === 0
          ? "please enter the challenge problem statement"
          : null,
      inputFormat:
        challenge?.input_format?.length === 0
          ? "please enter the challenge input format"
          : null,
      constraints:
        challenge?.constraints?.length === 0
          ? "please enter the challenge constraints"
          : null,
      outputFormat:
        challenge?.output_format?.length === 0
          ? "please enter the challenge output format"
          : null,
      language:
        details.challengeLanguage?.length === 0
          ? "please choose challenge languages"
          : details.challengeLanguage
              .map((x) => x.language)
              ?.includes("Regex") && //************************* update  */
            details.challengeLanguage?.length > 1
          ? "Regex must be alone"
          : null,
      challengeLanguage: details.challengeLanguage.map((item) => {
        if (item.content === null) {
          if (operation === "create") {
            return "please upload a base file or choose default";
          } else {
            const oldData = data.challengeLanguage.find(
              (lang) => lang.language === item.language
            );
            if (oldData) {
              if (oldData.type === "default" && item.type === "default") {
                return null;
              } else if (
                oldData.type === "upload" &&
                item.type === "upload" &&
                item.content === null
              ) {
                return null;
              } else return "please upload a base file or choose default";
            } else {
              return "please upload a base file or choose default";
            }
          }
        } else {
          return null;
        }
      }),
    });

    if (
      challenge.name?.length >= 3 &&
      challenge.description?.length !== 0 &&
      challenge.problem_statement?.length !== 0 &&
      challenge.input_format?.length !== 0 &&
      challenge.constraints?.length !== 0 &&
      challenge.output_format?.length !== 0 &&
      ((details.challengeLanguage?.length > 0 &&
        !details.challengeLanguage.map((x) => x.language)?.includes("Regex")) || //************************* update  */
        (details.challengeLanguage.map((x) => x.language)?.includes("Regex") &&
          details.challengeLanguage?.length === 1)) &&
      !details.challengeLanguage
        .map((item) => {
          if (item.content === null) {
            if (operation === "create") {
              return false;
            } else {
              const oldData = data.challengeLanguage.find(
                (lang) => lang.language === item.language
              );
              if (oldData) {
                if (oldData.type === "default" && item.type === "default") {
                  return true;
                } else if (
                  oldData.type === "upload" &&
                  item.type === "upload" &&
                  item.content === null
                ) {
                  return true;
                } else return false;
              } else {
                return false;
              }
            }
          } else {
            return true;
          }
        })
        .includes(false)
    ) {
      setLoading(true);
      try {
        if (operation === "create") {
          const res = await axios.post("/challenges", challenge);
          navigate(`/administration/challenges/${res.data.message}/test-cases`);
        } else {
          challenge = {
            ...challenge,
            challengeLanguage: challenge.challengeLanguage.map((item) => {
              const oldData = data.challengeLanguage.find(
                (lang) => lang.language === item.language
              );
              if (oldData) {
                if (oldData.type === "default" && item.type === "default") {
                  return { ...item, content: null };
                } else if (
                  oldData.type === "upload" &&
                  item.type === "upload" &&
                  item.content === null
                ) {
                  return { ...item, content: null };
                } else return item;
              } else {
                return item;
              }
            }),
          };
          await axios.put(`/challenges/${id}`, challenge);
          setData({
            ...details,
            challengeLanguage: details.challengeLanguage.map((item) => {
              const oldData = data.challengeLanguage.find(
                (lang) => lang.language === item.language
              );
              if (oldData) {
                if (
                  oldData.type === "upload" &&
                  item.type === "upload" &&
                  item.content === null
                ) {
                  return oldData;
                } else if (
                  oldData.type === "default" &&
                  item.type === "default"
                ) {
                  return oldData;
                } else {
                  return item;
                }
              } else {
                return item;
              }
            }),
          });
          navigate(`/administration/challenges/${id}/test-cases`);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        toastError(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };

  const handleFileInputChange = (event, language) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setDetails({
          ...details,
          challengeLanguage: details.challengeLanguage.map((item) => {
            if (item.language === language) {
              return { ...item, content: content };
            }
            return item;
          }),
        });
      };

      reader.readAsText(file);
    }
  };
  const classes = useStyle();
  return (
    <Container fluid>
      <Row className="mb-3 mt-5">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Difficulty"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            disabled={loading}
            name="difficulty"
            onChange={handleChange}
            value={details.difficulty}
            options={[
              {
                value: "Easy",
                text: "Easy",
              },
              {
                value: "Medium",
                text: "Medium",
              },
              {
                value: "Hard",
                text: "Hard",
              },
            ]}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Specify Language"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={`${classes.ColInputFiled} ${classes.CheckRank}`}>
          <Row className="gap-4">
            {languages.map((item) => (
              <Col xs="auto">
                <CheckRank
                  type={"checkbox"}
                  label={item}
                  checked={details.challengeLanguage
                    ?.map((x) => x.language)
                    ?.includes(item)}
                  name={item}
                  onChange={(e) => {
                    e.target.checked
                      ? setDetails({
                          ...details,
                          challengeLanguage: [
                            ...details.challengeLanguage,
                            {
                              language: item,
                              type: "default",
                              content: defaultLang[item],
                            }, //*********************************** */
                          ],
                        })
                      : setDetails({
                          ...details,
                          challengeLanguage: details.challengeLanguage.filter(
                            (i) => i.language !== item
                          ),
                        });
                  }}
                  disabled={loading}
                />
              </Col>
            ))}
          </Row>
          {errorMsg.language && (
            <span className={classes.msg}>* {errorMsg.language}</span>
          )}
        </Col>
      </Row>
      {/* ************************************************************************ 00000000000000000000000000000000000000000000*/}
      {details.challengeLanguage
        .filter((data) => data.language !== "Regex")
        .map((itemLang, indexLang) => (
          <Row className="mb-3" key={indexLang}>
            <Col xs={"auto"} className={classes.TitleFiled}>
              <Text
                fontFamily="Open Sans"
                text={itemLang.language + " Base File"}
                height={"40px"}
                wegiht={"600"}
              />
            </Col>
            <Col className={classes.ColInputFiled}>
              <Row>
                <Col xs={"auto"} className="ms-3">
                  <CheckRank
                    type={"radio"}
                    label={"Use default file"}
                    checked={itemLang.type === "default"}
                    onChange={() => {
                      let arrLang = details.challengeLanguage.map((i) => {
                        if (i.language === itemLang.language)
                          return {
                            language: itemLang.language,
                            type: "default",
                            content: defaultLang[itemLang.language],
                          };
                        else return i;
                      });
                      console.log(arrLang);
                      setDetails({ ...details, challengeLanguage: arrLang });
                    }} /*************************************** */
                  />
                </Col>
                <Col className="ms-3">
                  <CheckRank
                    type={"radio"}
                    label={"Upload base file"}
                    checked={itemLang.type === "upload"}
                    onChange={() => {
                      let arrLang = details.challengeLanguage.map((i) => {
                        if (i.language === itemLang.language)
                          return {
                            language: itemLang.language,
                            type: "upload",
                            content: null,
                          };
                        else return i;
                      });
                      setDetails({ ...details, challengeLanguage: arrLang });
                    }}
                  />
                </Col>
                {errorMsg.challengeLanguage[indexLang] !== null && (
                  <span className={`${classes.msg} ms-3`}>
                    * {errorMsg.challengeLanguage[indexLang]}
                  </span>
                )}
              </Row>
              {itemLang.type === "upload" && (
                <Row className="mt-3">
                  <Col>
                    <InputFiledRank
                      type={"file"}
                      onChange={(e) =>
                        handleFileInputChange(e, itemLang.language)
                      }
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        ))}
      {/*  */}
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Name"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            type="text"
            name="name"
            id="input"
            onChange={handleChange}
            value={details.name}
            disabled={loading}
            msg={errorMsg.name}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Description"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <InputFiledRank
            as="textarea"
            name="description"
            id="textarea"
            rows={3}
            onChange={handleChange}
            value={details.description}
            disabled={loading}
            msg={errorMsg.description}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Problem Statement"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"problemStatement"}
            text={details.problemStatement}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.problemStatement}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Input Format"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"inputFormat"}
            text={details.inputFormat}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.inputFormat}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Constraints"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"constraints"}
            text={details.constraints}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.constraints}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Output Format"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <TextEditor
            name={"outputFormat"}
            text={details.outputFormat}
            handleChange={handleChange}
            disabled={loading}
            msg={errorMsg.outputFormat}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Challenge Privacy"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={`${classes.ColInputFiled} ${classes.CheckRank}`}>
          <CheckRank
            type={"checkbox"}
            label={`make the challenge public.`}
            name="challengePrivacy"
            checked={details.challengePrivacy}
            onChange={() =>
              setDetails({
                ...details,
                challengePrivacy: !details.challengePrivacy,
              })
            }
            disabled={loading}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={"auto"} className={classes.TitleFiled}>
          <Text
            fontFamily="Open Sans"
            text={"Tags"}
            height={"40px"}
            wegiht={"600"}
          />
        </Col>
        <Col className={classes.ColInputFiled}>
          <Tags
            tags={details.tags}
            handleChange={handleChange}
            disabled={loading}
          />
        </Col>
      </Row>
      {loading && (
        <Row>
          <Col xs={"auto"} className={classes.Loaderspace}></Col>
          <Col className={classes.Loader}>
            <LoaderRank loading={loading} />
          </Col>
        </Row>
      )}
      <Row className="mt-5">
        <Col Col xs={"auto"} className={classes.TitleFiled}></Col>
        <Col className={classes.ActionBtns}>
          <ButtonRank
            text={"Cancel Changes"}
            onClick={() => navigate("/administration/challenges")}
            disabled={loading}
          />
          <ButtonRank
            onClick={handleClick}
            text={"Save Changes"}
            disabled={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateChallengeDetails;
