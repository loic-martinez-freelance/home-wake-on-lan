import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'typeface-roboto'
import Login from './Components/Login'
import Container from 'react-bootstrap/Container'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { sendLogin, storeToken, getToken } from './utils/auth'
import { ping } from './utils/net'
import WolButton from './Components/WolButton'
import Panel from './Components/Panel'
library.add(fas)

const Main = () => {
  const [token, setToken] = useState(getToken())
  const [computerOnline, setComputerOnline] = useState(false)

  const sendPasswordCB = async (password: string) => {
    const token = await sendLogin(password)
    storeToken(token)
    setToken(token)
  }

  const checkPingCB = async () => {
    try {
      const isOnline = await ping(token)
      setComputerOnline(isOnline)
    } catch (e) {
      storeToken('')
      setToken('')
    }
  }

  return (
    <Container className="h-100">
      <Panel large={token !== '' ? true : false}>
        {token !== '' ? (
          <WolButton
            checkPingCB={checkPingCB}
            isComputerOnline={computerOnline}
          />
        ) : (
          <Login sendPasswordCB={sendPasswordCB} />
        )}
      </Panel>
    </Container>
  )
}

export default Main
