import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, children, title }) => {
  return (
    <div className={[style.Show].join(" ")}>
      <div className={[style.modalMain].join(" ")}>
        <div className={style.header}>
          <h3>{title}</h3>
          <button className={style.closeButton} onClick={() => onClose()}>
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
        </div>
        <div className={style.children}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
