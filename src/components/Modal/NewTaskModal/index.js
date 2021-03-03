import React, { useState } from "react";

import DropDown from "../../DropDown";
import Button from "../../Button";
import styles from "./style.module.scss";

const NewTaskModal = ({ id, sid, taskTypes, onClose }) => {
  const [taskType, setTaskType] = useState();

  return (
    <div className={styles.ntmodal_wrapper}>
      <h3>
        <b>Cliente # {id}</b>
      </h3>
      <h4>Subcuenta # {sid}</h4>
      <textarea className={styles.description} placeholder="Descripcion.."></textarea>
      <div className={styles.select}>
        <div>
          <DropDown
            data={taskTypes}
            onChange={(e) => {
              setTaskType(e);
            }}
          />
        </div>
        <div>
          <DropDown
            data={taskTypes}
            onChange={(e) => {
              setTaskType(e);
            }}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => {}}>
          Guardar
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default NewTaskModal;
