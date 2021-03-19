import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import DropDown from "../../../../../components/DropDown/index";
import Button from "../../../../../components/Button";
import Message from "../../../../../components/Message/index";
import { useSelector } from "react-redux";
import { getProblems, getTaskTypes } from "../../../../../api/index";
const NewTaskModal = ({ id, sid, serviceType, onClose, onSave }) => {
  const id_service = useSelector((state) => state.auth.user.id_service);

  const [taskType, setTaskType] = useState(1);
  const [idProblem, setIdProblem] = useState(1);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [taskProblems, setTaskProblems] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [message, setMessage] = useState("");

  const getData = async () => {
    const resTaskProblems = await getProblems(id_service, "", serviceType, "");
    setTaskProblems(resTaskProblems);
    const resTaskType = await getTaskTypes();
    setTaskTypes(resTaskType);
  };

  useEffect(() => {
    getData();
  }, []);

  const saveHandler = async () => {
    const res = await onSave(id_service, sid, taskType, idProblem, description);
    if (res.error) {
      setMessage(res.message);
      setError(true);
    } else {
      setMessage(res.message);
      setSuccess(true);
    }
  };

  return (
    <div className={styles.modal_wrapper}>
      <h3>
        <b>Cliente # {id}</b>
      </h3>
      <h4>Subcuenta # {sid}</h4>
      <textarea
        className={styles.description}
        placeholder="Descripcion.."
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
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
      {success && <Message type="success" message={message} />}
      {error && !success && <Message type="error" message={message} />}
    </div>
  );
};

export default NewTaskModal;
