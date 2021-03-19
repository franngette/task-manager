import styles from "./style.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputText = ({ type, name = "", onChange, placeHolder, icon, iconColor = "rgba(45, 55, 72, 1)" }) => {
  return (
    <div className={styles.content_input}>
      {icon && <FontAwesomeIcon className={styles.icon} icon={icon} size="lg" color={iconColor} />}
      <input name={name} type={type} className={styles.input} onChange={onChange} placeholder={placeHolder} />
    </div>
  );
};

InputText.propTypes = {
  iconColor: PropTypes.string,
  icon: PropTypes.object,
  placeHolder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default InputText;
