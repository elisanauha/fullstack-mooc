import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, severity }) => {
  let messageClass = 'notification'
  if (severity > 1) messageClass = 'error'
  if (message === null) {
    return null
  }

  return <div className={messageClass}>{message}</div>
}

Message.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.number.isRequired,
}

export default Message
