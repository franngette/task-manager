import React, { useState } from "react";
import style from "./style.module.scss";

import Card from "../Card/index";
import Button from "../Button/index";
import DropDown from "../DropDown/index";
import CalendarButton from "../CalendarButton/index";
import CheckBox from "../Checkbox/index";
import Spinner from "../Spinner/index";
import Message from "../Message/index";

const AsignTeam = (props) => {
  const [teamDate, setTeamDate] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState(props.data.priority ? props.data.priority : false);
  const [team, setTeam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    let res = await props.onsave(props.data.id, teamDate, team, priority);
    if (res) {
      setLoading(false);
      setShowMessage(true);
    }
    if (res.error) {
      setError(true);
      setMessage(res.message);
    } else {
      setMessage(res.message);
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  let wrapperStyle = style.wrapper;
  if (props.style.width === "0%" || props.style.width === "0px") {
    wrapperStyle = style.wrapper_hidden;
  }

  const arrOperators = [];

  const operatorHandler = () => {
    props.operators.forEach((el) => {
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
  };
  operatorHandler();

  return (
    <div style={props.style}>
      <Card>
        <div className={wrapperStyle}>
          <div className={style.container}>
            <div className={style.header}>
              <h3>
                <span className={style.boldText}>{"Reclamo #" + props.data.number}</span>
                <p>{props.data.created_at}</p>
              </h3>
            </div>
            <div className={style.content}>
              <h4>
                <span className={style.boldText}>Subcuenta:</span> #{props.data.id_account} - {props.data.account_name}
              </h4>
            </div>
            <div className={style.content}>
              <h4><span className={style.boldText}>Region:</span> {props.data.region ? props.data.region : "Sin Region"}</h4>
            </div>
            {props.data.problem && (
              <div className={style.content}>
                <h4><span className={style.boldText}>Problema:</span> {props.data.problem}</h4>
              </div>
            )}
            {props.data.description && (
              <div className={style.content}>
                <h4><span className={style.boldText}>Descripcion: </span></h4>
                <p>{props.data.description}</p>
              </div>
            )}
            <form
              onSubmit={(e) => {
                sendData(e);
              }}
            >
              <div className={style.content}>
                <label htmlFor="cuadrilla">
                  <h4><span className={style.boldText}>Cuadrilla</span></h4>
                </label>
                <DropDown
                  selectedValue={props.data.id_team}
                  data={arrOperators}
                  name="cuadrilla"
                  form="asignar"
                  id="cuadrilla"
                  onChange={(event) => setTeam(event.target.value)}
                />
              </div>
              <div className={style.content}>
                <label htmlFor="fecha">
                  <h4><span className={style.boldText}>Fecha</span></h4>
                </label>
                <CalendarButton
                  type={"date"}
                  id="fecha"
                  value={teamDate}
                  name="cuadrillaDate"
                  onChange={(event) => setTeamDate(event.target.value)}
                />
              </div>
              <div className={style.content}>
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
              <div className={style.contentCenter}>
                <Button variant="dark" type="submit" onClick={() => {}}>
                  {loading ? <Spinner /> : "Guardar"}
                </Button>
                <Button
                  variant="outline"
                  type="submit"
                  onClick={(e) => {
                    setError(false);
                    props.close(e);
                  }}
                >
                  Cancelar
                </Button>
              </div>
              <div className={style.contentCenter}>
                {showMessage && <Message type={error ? "error" : "info"} message={message} />}
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AsignTeam;
