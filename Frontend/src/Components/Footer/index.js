import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useStyle from './Style';
const Footer = () => {
  const classes = useStyle()
  return (
      <Container fluid >
        <Row className={classes.footer}>
          <Col >
            &copy; {new Date().getFullYear()} An-Najah Rank
          </Col>
        </Row>
      </Container>
  );
};

export default Footer;
