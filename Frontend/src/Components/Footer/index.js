import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#0e141e',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    bottom: '0',
    width: '100%',
  };

  return (
    <div style={footerStyle}>
      <Container>
        <p>&copy; {new Date().getFullYear()} An-Najah Rank</p>
      </Container>
    </div>
  );
};

export default Footer;
