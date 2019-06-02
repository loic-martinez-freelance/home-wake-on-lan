import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Spinner = () => {
  return (
    <Row>
      <Col className="text-center">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </Col>
    </Row>
  )
}

export default Spinner
