import React from "react";
import styles from "./style.module.scss";

import Status from "../../../../../components/Status/index";
const TaskItem = ({ task }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>
          <span className={styles.boldText}>Fecha:</span> {task.created_at}
        </h4>
        <Status description={task.last_state_description} name={task.last_state} />
      </div>
      <div>
        <p>
          <span className={styles.boldText}>Descripcion:</span> {task.description}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
