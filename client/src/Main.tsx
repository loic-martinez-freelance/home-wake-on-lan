import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'typeface-roboto'
import Login from './Components/Login'
import Container from 'react-bootstrap/Container'
import { Card, Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { sendLogin, storeToken, getToken } from './utils/auth'
library.add(fas)

const Main = () => {
  const [token, setToken] = useState(getToken())
  const sendPasswordCB = async (password: string) => {
    const token = await sendLogin(password)
    storeToken(token)
    setToken(token)
  }

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 4, offset: 4 }}
          className="align-self-center"
        >
          <Card>
            <Card.Body>
              {!token && <Login sendPasswordCB={sendPasswordCB} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
