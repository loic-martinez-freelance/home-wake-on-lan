import React from 'react'
import { Device } from '../../types/device'
import WolButton from '../WolButton'
import { ListGroup, Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WolList = ({
  devicesList,
  refreshCB,
  disconnectCB,
  sendWolCB,
}: {
  devicesList: Device[]
  refreshCB: () => void
  disconnectCB: () => void
  sendWolCB: (mac_address: string) => void
}) => {
  const devicesToDisplay = devicesList.map((device) => (
    <ListGroup.Item key={device.ip}>
      <WolButton sendWolCB={sendWolCB} device={device} />
    </ListGroup.Item>
  ))

  return (
    <>
      <Row>
        <Col className="text-right">
          <button
            className="btn btn-link p-2"
            title="Refresh"
            onClick={refreshCB}
          >
            <FontAwesomeIcon icon="sync" size="1x" />
          </button>
          <button
            className="btn btn-link p-2 mr-2"
            title="Sign out"
            onClick={disconnectCB}
          >
            <FontAwesomeIcon icon="sign-out-alt" size="1x" />
          </button>
        </Col>
      </Row>
      <ListGroup variant="flush">{devicesToDisplay}</ListGroup>
    </>
  )
}

export default WolList
