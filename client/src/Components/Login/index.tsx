import React, { FormEvent, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormControlProps, Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
  const [password, setPassword] = useState<string | undefined>('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Row className="mb-3 text-center">
          <Col>
            <div className="rounded-icon">
              <FontAwesomeIcon
                icon={'lock'}
                size="2x"
                className="align-middle"
              />
            </div>
          </Col>
        </Row>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e: FormEvent<FormControlProps>) => {
              setPassword(e.currentTarget.value)
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default Login
