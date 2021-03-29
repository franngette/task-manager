import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem";
import CalendarTask from "../CalendarTask/index";

const CalendarRow = ({ day, team, editHandler }) => {
  const [pos, setPost] = useState();

  const rowRef = useRef(null);

  useEffect(() => {
    setPost(rowRef.current.getBoundingClientRect());
  }, []);

  return (
    <div ref={rowRef} className={day.isMonth ? styles.rows : styles.rows_false}>
      {day.tasks.map((task, index) => {
        return team.id_team === task.id_team && task.date === day.day ? (
          <AnimatedListItem index={index} key={index} delay={0.15}>
            <CalendarTask task={task} onEdit={editHandler} parentPos={pos} />
          </AnimatedListItem>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default CalendarRow;
