import React, { useState } from "react";
import styles from "./style.module.scss";

import Button from "../../Button/index";
import Message from "../../Message/index";

const NewIssueModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSaveHandler = (description) => {
    if (description.length < 4) {
      setError(true);
    } else {
      onSave(description);
      setSuccess(true);
    }
  };

  return (
    <div className={styles.modal_wrapper}>
      <textarea
        className={styles.description}
        placeholder="Descripcion.."
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => onSaveHandler(description)}>
          Guardar
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
      {success && <Message type="success" message="Incidente cargado" />}
      {error && !success && <Message type="error" message="Caracteres insuficientes" />}
    </div>
  );
};

export default NewIssueModal;
