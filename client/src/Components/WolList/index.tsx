import React from 'react'
import { Device } from '../../types/device'
import WolButton from '../WolButton'

const WolList = ({ devicesList }: { devicesList: Device[] }) => {
  const devicesToDisplay = devicesList.map((device) => (
    <WolButton key={device.ip} device={device} />
  ))

  return <>{devicesToDisplay}</>
}

export default WolList
