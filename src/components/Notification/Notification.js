import React from 'react'
import styles from './Notification.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Notification = ({cantNotifications, iconColor, icon}) => {
  return (
    <div className={styles.content_notification}>
      <FontAwesomeIcon
        className={styles.icon}
        icon={icon}
        size="lg"
        color={iconColor}
      />
      <div className={styles.counter}>{cantNotifications}</div>
    </div>
  )
}

Notification.propTypes = {
  iconColor: PropTypes.string,
  icon: PropTypes.object,
  cantNotificacion: PropTypes.number,
}

export default Notification;