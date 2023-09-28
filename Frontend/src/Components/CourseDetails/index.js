import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Text from '../Text'
import * as XLSX from 'xlsx'
import useStyle from './Style'
import ButtonRank from '../ButtonRank'
const CourseDetails = ({details, handleChange}) => {
    const classes = useStyle()
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
          setSelectedFile(file);
        } else {
          alert('Please select a valid Excel file (.xls or .xlsx).');
          e.target.value = null;
          setSelectedFile(null);
        }
      }
    };
    const handleFileUpload = () => {
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            handleChange(null,"students",jsonData)
          };
          reader.readAsBinaryString(selectedFile);
        }
      };
  return (
    <Container>
        <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Course Name'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              id="input"
              onChange={handleChange}
              value={details.name}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Description'} height={'40px'} wegiht={'600'}/>
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="description"
              id="textarea"
              rows={3}
              onChange={handleChange}
              value={details.description}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Text fontFamily='Open Sans' text={'Upload Excel File'} height={'40px'} wegiht={'600'}/>
        </Col>

        <Col>
            <Form.Group>
            <Form.Control
                type="file"
                name='students'
                accept=".xls, .xlsx"
                onChange={handleFileChange}
                className={classes.file}
            />
            <ButtonRank onClick={handleFileUpload} disabled={!selectedFile} text={'handle Upload'}/>
            </Form.Group>
        </Col>
      </Row>
    </Container>
    )
}

export default CourseDetails