//import styles from './checkbox.module.sass'
import styles from './checkbox.module.scss'

const Checkbox = ({ label, name, onChange, check, disabled }) => {
  return (
    <div className={styles.wrapper}>
    <label className={styles.container}>
      {label}
      <input
        name={name}
        type="checkbox"
        defaultChecked={check}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.checkmark}></span>
    </label>
    </div>
  )
}

export default Checkbox
