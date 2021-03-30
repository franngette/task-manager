import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Status from "../../../components/Status/index";
import Button from "../../../components/Button/index";
import DropDown from "../../../components/DropDown/index";
import { getStatus, getStatusTask, createStatusTask } from "../../../api/index";
import Message from "../../../components/Message/index";

const TaskStateModal = ({ onClose, task }) => {
  const [states, setStates] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [newState, setNewState] = useState();
  const [message, setMessage] = useState();

  const onSaveHandler = async () => {
    if (newState) {
      const res = await createStatusTask(task.id_calendar, newState);
      setMessage(res);
    } else {
      setMessage({ error: true, message: "Seleccione Estado" });
    }
    setTimeout(() => {
      setMessage();
    }, 6000);
  };

  const renderStatus = () => {
    return statusTask.map((el, i) => {
      const formatedDate = new Date(el.date).toLocaleDateString();
      const date = el.status + " " + formatedDate;
      return (
        <div className={styles.m_v} key={el.description + i}>
          <Status name={date} description={el.description} />
        </div>
      );
    });
  };

  useEffect(() => {
    const filterStates = async () => {
      const allStates = await getStatus();
      const taskStates = await getStatusTask(task.id);
      setStatusTask(taskStates);
      const filteredState = allStates.filter((e) => !taskStates.find(({ status }) => e.name === status));
      setStates(filteredState);
    };
    filterStates();
  }, [task, message]);

  return (
    <div className={styles.container}>
      <div className={styles.status_container}>{statusTask.length > 0 && renderStatus()}</div>
      <div className={styles.m_v}>
        <h5 className={styles.m_v}>Nuevo</h5>
        <DropDown data={states} onChange={(e) => setNewState(e.target.value)} />
      </div>
      <div className={styles.bottom}>
        <div>
          <Button type="button" variant="blue" onClick={() => onSaveHandler()}>
            Guardar
          </Button>
        </div>
        <div>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
      {message && (
        <div className={styles.m_v}>
          <Message type={message.error ? "error" : "success"} message={message.message} />{" "}
        </div>
      )}
    </div>
  );
};

export default TaskStateModal;
