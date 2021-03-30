import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import DropDown from "../../../../../components/DropDown/index";
import Button from "../../../../../components/Button";
import Message from "../../../../../components/Message/index";
import { useSelector } from "react-redux";
import { getProblems, getTaskTypes } from "../../../../../api/index";

const NewTaskModal = ({ id, sid, serviceType, onClose, onSave }) => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  let timeout;

  const [taskType, setTaskType] = useState(1);
  const [idProblem, setIdProblem] = useState(1);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [taskProblems, setTaskProblems] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [message, setMessage] = useState();

  const textHandler = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDescription(e.target.value);
    }, 500);
  };

  useEffect(() => {
    getTaskTypes().then((res) => setTaskTypes(res));
    getProblems(id_service, "", serviceType, "").then((res) => setTaskProblems(res));
  }, [id_service, serviceType]);

  const saveHandler = async () => {
    onSave(id_service, sid, taskType, idProblem, description)
      .then((res) => {
        setMessage(res.message);
        res.error ? setError(true) : setError(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setError(true);
      });
    setTimeout(() => {
      setMessage();
    }, 6000);
  };

  return (
    <div className={styles.modal_wrapper}>
      <h3>
        <b>
          <span className={styles.boldText}>Cliente</span> #{id}
        </b>
      </h3>
      <h4>
        <span className={styles.boldText}>Subcuenta</span> #{sid}
      </h4>
      <textarea className={styles.description} placeholder="Descripcion.." onChange={(e) => textHandler(e)}></textarea>
      <div className={styles.select}>
        <div style={{ margin: "0.5rem" }}>
          <DropDown
            data={taskTypes}
            onChange={(e) => {
              setTaskType(e.target.value);
            }}
          />
        </div>
        <div style={{ margin: "0.5rem" }}>
          <DropDown
            data={taskProblems}
            onChange={(e) => {
              setIdProblem(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => saveHandler()}>
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

export default NewTaskModal;
