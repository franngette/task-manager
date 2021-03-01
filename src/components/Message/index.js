import React from 'react'
import styles from './style.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

const Message = ({ type, message }) => {
  let style = styles.success
  let icon = faCheckCircle
  switch (type) {
    case 'error':
      style = styles.danger
      icon = faTimesCircle
      break
    case 'info':
      style = styles.info
      icon = faInfoCircle
      break
    case 'success':
        style = styles.success
        icon = faCheckCircle
        break
     default:
      style = styles.success
      icon = faCheckCircle
  }

  return (
    <div className={style}>
      <div className={styles.title}>
        <FontAwesomeIcon
          icon={icon}
          color="white"
          size="lg"
          className={styles.icon}
        />
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
