import React from "react";
import styles from "./style.module.scss";

import Status from "../../../../../components/Status/index";
import Button from "../../../../../components/Button";
const TaskItem = ({ task, newIssue }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>
          <span className={styles.boldText}>Tipo de inconveniente:</span> {task.name}
        </h4>
        <Status description={task.last_state_description} name={task.last_state} />
      </div>
      <div className={styles.header}>
        {task.team[0]?.id_team && (
          <h5>
            <span className={styles.boldText}>Cuadrilla asignada: </span>
            {task.team[0].id_team + ". "}
            {task.team.map((e) => e.operator_name + " - ")}
          </h5>
        )}
      </div>
      <div>
        <p>
          <span className={styles.boldText}>Fecha:</span> {task.created_at}
        </p>
        <p>
          <span className={styles.boldText}>Descripcion:</span> {task.description}
        </p>
      </div>
      <div className={styles.bottom}>
        <Button
          onClick={() => {
            newIssue();
          }}
          variant="light"
        >
          Incidente
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
