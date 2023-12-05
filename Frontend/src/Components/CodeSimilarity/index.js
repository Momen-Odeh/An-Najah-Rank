import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Col, Container, Row } from "react-bootstrap";
import CodeTextArea from "./CodeTextArea";
import TabsSimilarity from "./TabsSimilarity";
import Text from "../Text";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../Utils/toast";
import Loader from "../Loader";
const CodeSimilarity = () => {
  const classes = useStyles();
  const { userId, id, contestId, challengeId } = useParams();
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(true);
  const [leftUser, setLeftUser] = useState([
    {
      eventKey: "tab-0",
      title: null,
      TabComponent: null,
    },
  ]);
  const [rightUsers, setRightUsers] = useState([
    {
      eventKey: "tab-0",
      title: null,
      TabComponent: null,
    },
  ]);
  const [rightIndex, setRightIndex] = useState(0);
  const [leftUserData, setLeftUserData] = useState();
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    if (loadData) {
      setLeftUser([
        {
          eventKey: leftUserData.eventKey,
          title: leftUserData.title,
          TabComponent: (
            <CodeTextArea
              text={leftUserData.code}
              range={leftUserData.mathchs[rightIndex]}
            />
          ),
        },
      ]);
    }
  }, [rightIndex, leftUserData, loadData]);
  useEffect(() => {
    axios
      .get("/userSimilarity", {
        params: {
          contestId: contestId,
          challengeId: challengeId,
          courseId: id,
          userId: userId,
        },
      })
      .then((response) => {
        console.log(response.data);

        setLeftUserData({
          eventKey: "tab-0",
          title: response.data.fileName + ` (${response.data.similarity}%)`,
          code: response.data.code,
          mathchs: response.data.SimilarFiles.map((item) =>
            item.linesMatch.map((item2) => item2.f1Lines)
          ),
        });
        setLoadData(true);

        setRightUsers(
          response.data.SimilarFiles.map((item, index) => {
            return {
              eventKey: "tab-" + index,
              title: item.similarFileName + ` (${item.similarPercentage})`,
              TabComponent: (
                <CodeTextArea
                  text={item.code}
                  key={index}
                  range={item.linesMatch.map((item2) => item2.f2Lines)}
                />
              ),
            };
          })
        );
        setLoadingPage(false);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 401) {
          if (error?.response?.data?.message === "unauthorized role") {
            toastError("Unautharized accesss");
            navigate("..");
          } else if (
            error?.response?.data?.message === "unauthorized role professor"
          ) {
            toastError("Unautharized accesss");
            navigate("/");
          } else {
            toastError("Unautharized accesss");
            navigate("/log-in");
          }
        } else if (error?.response?.status === 404) {
          if (
            error?.response?.data?.message === "not found similarity file" ||
            error?.response?.data?.message === "Not found user"
          ) {
            toastError("No similarity data");
            navigate("..");
          } else if (
            error?.response?.data?.message === "not found contest or challenge"
          ) {
            toastError("Not found");
            navigate("..");
          }
        } else {
          setLoadingPage(false);
        }
      });
  }, []);

  return loadingPage ? (
    <Loader />
  ) : (
    <Container fluid className={classes.Container}>
      <Row className={`${classes.RowCont}`}>
        <Col>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className={`${classes.RowCont} mt-5 mb-4`}>
        <Col className={`${classes.Col} ${classes.ColCenter}`}>
          <Text
            text={"Code Similarity Summary"}
            fontFamily="Open Sans"
            size="26px"
            wegiht="600"
          />
        </Col>
      </Row>
      <Row className={classes.Row}>
        <Col className={`${classes.Col} ${classes.MyCode}`} md="6">
          <TabsSimilarity ListTabs={leftUser} PaddingTop="0" />
        </Col>
        <Col className={`${classes.Col} ${classes.SimilarCodes}`} md="6">
          <TabsSimilarity
            ListTabs={rightUsers}
            PaddingTop="0"
            setRightIndex={setRightIndex}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeSimilarity;
