import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import DropDown from "../../DropDown/index";
import Button from "../../Button/index";
import CalendarButton from "../CalendarButton/index";
import CheckBox from "../../Checkbox/index";
import Message from "../../Message/index";
import Spinner from "../../Spinner/index";

import { updateCalendarTask, getTeams } from "../../../api/index";

const AssignTask = ({ task, onClose }) => {
  const [operatorList, setOperatorList] = useState([]);
  const [teamDate, setTeamDate] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState(false);
  const [team, setTeam] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const getData = async () => {
    const operators = await getTeams(1);
    const arrOperators = [];
    operators.forEach((el) => {
      let id = el.id_team;
      let op = el.operators.map((j) => {
        return j.name;
      });
      const newOp = {
        id: id,
        name: op.toString().replace(",", " - "),
      };
      arrOperators.push(newOp);
    });
    setOperatorList(arrOperators);
  };
  useEffect(() => {
    getData();
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const teamEdit = !team ? task.id_team : team;
    updateCalendarTask(task.id_calendar, task.id_task, teamDate, teamEdit, priority)
      .then((res) => {
        setMessage(res.message);
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setMessage(error.message);
        setLoading(false);
      });
    /* setTimeout(() => {
      setMessage('')
    }, 5000) */
  };

  return (
    <div className={style.wrapper}>
      <div className={style.modalContent}>
        <label htmlFor="cuadrilla">
          <h4>Cuadrilla</h4>
        </label>
        <DropDown
          selectedValue={task.id_team}
          data={operatorList}
          name="cuadrilla"
          form="asignar"
          id="cuadrilla"
          onChange={(e) => {
            setTeam(e.target.value);
          }}
        />
      </div>
      <div className={style.modalContent}>
        <label htmlFor="fecha">
          <h4>Fecha</h4>
        </label>
        <CalendarButton
          type={"date"}
          id="fecha"
          value={teamDate}
          name="cuadrillaDate"
          onChange={(e) => {
            setTeamDate(e.target.value);
          }}
        />
      </div>
      <div className={style.modalContent}>
        <CheckBox
          label="Prioridad"
          name="prioridad"
          onChange={() => {
            setPriority((priority) => !priority);
          }}
          check={priority}
          disabled={false}
        />
      </div>
      <div className={style.wrapper_message}>
        <div className={style.content_message}>
          {message.length > 0 && <Message type={error ? "error" : "success"} message={message} />}
        </div>
      </div>
      <div className={style.buttom}>
        <Button variant="dark" type="submit" onClick={(e) => onSave(e)}>
          {loading ? <Spinner /> : "Guardar"}
        </Button>
        <Button variant="outline" type="submit" onClick={() => onClose()}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default AssignTask;
