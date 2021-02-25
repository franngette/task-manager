import styles from './style.module.scss'

const Status = ({ description, name }) => {
  return <div className={[styles.status, description].join(' ')}>{name}</div>
}

export default Status
