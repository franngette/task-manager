import React from "react";
import styles from "./style.module.scss";

import Button from "../../../../../components/Button";

const NewIssueModal = ({ onClose, onSave }) => {
  return (
    <div className={styles.modal_wrapper}>
      <textarea className={styles.description} placeholder="Descripcion.."></textarea>

      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => onSave("new issue")}>
          Guardar
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default NewIssueModal;
