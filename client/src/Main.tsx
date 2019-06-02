import React, { useState, useEffect, useCallback } from 'react'
import Login from './Components/Login'
import Container from 'react-bootstrap/Container'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { sendLogin, storeToken, getToken } from './utils/auth'
import { getDevices, sendWol } from './utils/net'
import WolList from './Components/WolList'
import Panel from './Components/Panel'
import { Device } from './types/device'
import Message from './Components/Message'
library.add(fas)

const Main = () => {
  const [token, setToken] = useState(getToken())
  const [devices, setDevices] = useState<Device[]>([])
  const [sentWolFeedback, setSentWolFeedback] = useState('')
  const [sentWolSuccess, setSentWolSuccess] = useState(false)
  const checkDevicesCB = useCallback(async () => {
    try {
      const devices = await getDevices(token)
      setDevices(devices)
    } catch (e) {
      storeToken('')
      setToken('')
    }
  }, [token])

  const sendPasswordCB = async (password: string) => {
    const token = await sendLogin(password)
    storeToken(token)
    setToken(token)
  }

  const disconnectCB = () => {
    storeToken('')
    setToken('')
  }

  const sendWolCB = async (mac_address: string) => {
    try {
      const isSent = await sendWol(token, mac_address)
      setSentWolSuccess(isSent)
      setSentWolFeedback('')
      setSentWolFeedback(
        isSent ? 'Wake on lan request sent' : 'Failed to send the request'
      )
    } catch (e) {
      storeToken('')
      setToken('')
    }
  }

  useEffect(() => {
    checkDevicesCB()
  }, [token, checkDevicesCB])

  return (
    <>
      <Message message={sentWolFeedback} success={sentWolSuccess} />
      <Container className="h-100">
        <Panel large={token !== '' ? true : false}>
          <>
            {token !== '' ? (
              <WolList
                devicesList={devices}
                refreshCB={checkDevicesCB}
                disconnectCB={disconnectCB}
                sendWolCB={sendWolCB}
              />
            ) : (
              <Login sendPasswordCB={sendPasswordCB} />
            )}
          </>
        </Panel>
      </Container>
    </>
  )
}

export default Main
