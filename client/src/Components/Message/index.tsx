import React, { useState, useEffect } from 'react'

const Message = ({
  message,
  success,
}: {
  message: string
  success: boolean
}) => {
  const [messageVisibility, setMessageVisibility] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMessageVisibility(false)
    }, 5000)

    setMessageVisibility(true)
  }, [message])

  return (
    <div className={'message ' + (messageVisibility ? 'show' : '')}>
      <div className={success ? 'text-success' : 'text-danger'}>{message}</div>
    </div>
  )
}

export default Message
