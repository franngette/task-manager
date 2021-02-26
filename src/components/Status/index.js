import styles from './style.module.scss'

const Status = ({ description, name }) => {
  return <div className={[styles.status, name].join(' ')}>{description}</div>
}

export default Status
