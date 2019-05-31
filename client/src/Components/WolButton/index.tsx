import React from 'react'
import { Device } from '../../types/device'

const WolButton = ({ device }: { device: Device }) => {
  return <div>{device.isAlive ? 'yes' : 'no'}</div>
}

export default WolButton
