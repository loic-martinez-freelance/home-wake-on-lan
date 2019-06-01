import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const Panel = ({
  children,
  large,
}: {
  children: JSX.Element
  large: boolean
}) => {
  return (
    <Row className="h-100">
      <Col
        xs={{ span: 10, offset: 1 }}
        md={{ span: large ? 6 : 4, offset: large ? 3 : 4 }}
        className="align-self-center"
      >
        <Card>
          <Card.Body className={large ? 'p-0' : ''}>{children}</Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Panel
