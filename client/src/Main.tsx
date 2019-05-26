import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'typeface-roboto'
import Login from './Components/Login'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Main = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  )
}

export default Main
