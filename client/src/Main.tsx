import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'typeface-roboto'
import Login from './Components/Login'
import Container from 'react-bootstrap/Container'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { sendLogin, storeToken, getToken } from './utils/auth'
import { getDevices } from './utils/net'
import WolList from './Components/WolList'
import Panel from './Components/Panel'
import { Device } from './types/device'
library.add(fas)

const Main = () => {
  const [token, setToken] = useState(getToken())
  const [devices, setDevices] = useState<Device[]>([])

  const sendPasswordCB = async (password: string) => {
    const token = await sendLogin(password)
    storeToken(token)
    setToken(token)
  }

  useEffect(() => {
    const checkDevicesCB = async () => {
      try {
        const devices = await getDevices(token)
        setDevices(devices)
      } catch (e) {
        storeToken('')
        setToken('')
      }
    }
    checkDevicesCB()
  }, [token])

  return (
    <Container className="h-100">
      <Panel large={token !== '' ? true : false}>
        {token !== '' ? (
          <WolList devicesList={devices} />
        ) : (
          <Login sendPasswordCB={sendPasswordCB} />
        )}
      </Panel>
    </Container>
  )
}

export default Main
