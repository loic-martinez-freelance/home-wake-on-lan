import React, { FormEvent, useState, ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormControlProps } from 'react-bootstrap'

const Login = () => {
  const [password, setPassword] = useState<string | undefined>('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Enter password</Form.Label>
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
