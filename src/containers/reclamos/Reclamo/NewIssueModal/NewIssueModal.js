import React, { useState } from "react";
import styles from "./style.module.scss";

import Button from "../../../../components/Button/index";
import Message from "../../../../components/Message/index";

const NewIssueModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();

  const onSaveHandler = async (description) => {
    if (description.length < 4) {
      setError(true);
      setMessage("Caracteres insuficientes");
    } else {
      const res = await onSave(description);
      res.error ? setError(true) : setError(false);
      setMessage(res.message);
      setTimeout(() => {
        setMessage();
      }, 6000);
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
      {message && <Message type={error ? "error" : "success"} message={message} />}
    </div>
  );
};

export default NewIssueModal;
