import React from "react";
import styles from "./style.module.scss";

import Incident from "../../../../Reclamos/Reclamo/Incident/Incident";
import Status from "../../../../../components/Status/index";
const TaskItem = ({ task }) => {

  const renderIncidents = (incidents) => {
    return (
      <li style={{ listStyleType: "none" }}>
        <Incident incident={incidents[incidents.length - 1]} />
      </li>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>
          <span className={styles.boldText}>Tipo de inconveniente:</span> {task.name}
        </h4>
        <Status description={task.last_state_description} name={task.last_state} />
      </div>
      <div>
        <h4>
          <span className={styles.boldText}>Cuadrilla asignada: </span>
          {task.team[0]?.id_team
            ? task.team[0].id_team + ". " + task.team.map((e) => e.operator_name + " - ")
            : "Sin operarios asignados"}
        </h4>
      </div>
      <div>
        <p>
          <span className={styles.boldText}>Fecha:</span> {task.created_at}
        </p>
        {task.description && (
          <p>
            <span className={styles.boldText}>Descripcion:</span> {task.description}
          </p>
        )}
      </div>
      {task.incidents[0] && (
        <div>
          <span className={styles.boldText}>Ultimo incidente:</span>
          {renderIncidents(task.incidents)}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
