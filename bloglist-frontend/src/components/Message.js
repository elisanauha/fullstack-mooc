import React from 'react'

const Message = ({ message, severity }) => {
  let messageClass = 'notification'
  if (severity > 1) messageClass = 'error'
  if (message === null) {
    return null
  }

  return <div className={messageClass}>{message}</div>
}

export default Message
