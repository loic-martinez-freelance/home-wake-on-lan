import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row } from 'react-bootstrap'

const WolButton = ({
  checkPingCB,
  isComputerOnline,
}: {
  checkPingCB: () => void
  isComputerOnline: boolean
}) => {
  useEffect(() => {
    checkPingCB()
  }, [checkPingCB])

  return <div>{isComputerOnline ? 'yes' : 'no'}</div>
}

export default WolButton
