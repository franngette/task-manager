import React from "react";
import style from "./style.module.scss";
import Card from "../../../components/Card/index";
import AnimatedListItem from "../../../components/Animations/AnimatedListItem/AnimatedListItem";

const ListTeams = ({ data, sendData }) => {
  const createHeader = () => {
    const header = (
      <li className={style.rows_header}>
        <span className={style.first_col}>
          <p>#</p>
        </span>
        <span className={style.rest_col}>
          <p>VEHICULO</p>
        </span>
        <span className={style.rest_col}>
          <p>TAREAS ASIGNADA</p>
        </span>
        <span className={style.rest_col}>
          <p>OPERARIOS</p>
        </span>
      </li>
    );
    return header;
  };

  const createList = () => {
    const rows = data.map((team, key) => {
      return (
        <AnimatedListItem index={key} key={key}>
          <li
            key={team.id_team + key}
            className={style.rows}
            onClick={() => {
              sendData(team);
            }}
          >
            <Card>
              <div className={style.content_card}>
                <span className={style.first_col}>
                  <p>{team.id_team}</p>
                </span>
                <span className={style.rest_col}>
                  <p>{team.vehicle_name}</p>
                </span>
                <span className={style.rest_col}>
                  <p>{team.amount_task}</p>
                </span>
                <span className={style.rest_col}>
                  {team.operators.map((operator) => {
                    return (
                      <img
                        key={operator.name}
                        src={`${operator.photo_src}`}
                        alt={`${operator.name}`}
                        title={`${operator.name}`}
                        width="60"
                        height="60"
                      />
                    );
                  })}
                </span>
              </div>
            </Card>
          </li>
        </AnimatedListItem>
      );
    });
    return rows;
  };

  return (
    <div style={{ width: "100%" }}>
      <ul>
        {createHeader()}
        {data.length > 0 ? createList() : <p className={style.error_message}>No hay cuadrillas</p>}
      </ul>
    </div>
  );
};

export default ListTeams;
