import React from 'react'
import { Device } from '../../types/device'
import { Row, Col, Media, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WolButton = ({
  device,
  sendWolCB,
}: {
  device: Device
  sendWolCB: (mac_address: string) => void
}) => {
  return (
    <Row className="align-items-center">
      <Col>
        <Media className="align-items-center">
          <FontAwesomeIcon
            icon="desktop"
            size="2x"
            className={
              'mr-3 ' + (device.isAlive ? 'text-success' : 'text-danger')
            }
          />
          <Media.Body>
            <span className={device.isAlive ? 'text-success' : 'text-danger'}>
              {device.ip}
            </span>
          </Media.Body>
        </Media>
      </Col>
      <Col className="text-right">
        <Button
          disabled={device.isAlive}
          onClick={() => {
            sendWolCB(device.mac_address)
          }}
        >
          Send wake
        </Button>
      </Col>
    </Row>
  )
}

export default WolButton
