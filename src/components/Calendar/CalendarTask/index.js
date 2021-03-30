import React, { useEffect, useRef, useState } from "react";

import Card from "../../Card/index";
import style from "./style.module.scss";
import useVisible from "../../../hooks/useVisible";
import { Link } from "react-router-dom";

import { faEllipsisV, faEye, faMapMarkerAlt, faTasks, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CalendarTask = ({ task, onEdit, parentPos }) => {
  const [pos, setPost] = useState();
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const elementRef = useRef(null);

  useEffect(() => {
    setPost(elementRef.current.getBoundingClientRect());
  }, [task]);
  return (
    <div className={style.card_container} ref={elementRef}>
      <Card style={task.last_state}>
        <div className={style.task}>
          <div className={style.task_content}>
            <p>
              #{task.id_account ? task.id_account : ""} -{" "}
              {task.account_name
                ? task.account_name.length > 17
                  ? task.account_name.substring(0, 17) + "..."
                  : task.account_name
                : "Sin Titular"}
            </p>
            <div className={style.content_icon}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" className={style.icon} />
              <p>{task.region ? task.region : "Sin Region"}</p>
            </div>
          </div>
          <div className={style.content_icon}>
            {isVisible && (
              <div
                ref={ref}
                style={{
                  display: "flex",
                  position: "absolute",
                  top: pos.top - parentPos.top + pos.height - 100, //-100 for AnimatedListItem Component
                  left: pos.left,
                  zIndex: "1",
                }}
              >
                <div className={style.options_menu}></div>
                <Card>
                  <div className={style.options}>
                    <Link
                      to={{
                        pathname: "/reclamo",
                        state: {
                          id_task: task.id_task,
                          id_account: task.id_account,
                        },
                      }}
                    >
                      <button className={style.option} /* onClick={() => {nextHandler(task)}} */>
                        <FontAwesomeIcon icon={faEye} size="1x" className={style.icon} />
                        <p>Ver</p>
                      </button>
                    </Link>
                    <div className={style.option_center}>
                      <button
                        className={style.option}
                        onClick={() => {
                          onEdit(task, "assign");
                          setIsVisible(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} size="1x" className={style.icon} />
                        <p>Editar Asignación</p>
                      </button>
                    </div>
                    <button
                      className={style.option}
                      onClick={() => {
                        onEdit(task, "status");
                        setIsVisible(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faTasks} size="1x" className={style.icon} />
                      <p>Nuevo estado</p>
                    </button>
                  </div>
                </Card>
              </div>
            )}
            <button className={style.options_button} onClick={() => setIsVisible(!isVisible)}>
              <FontAwesomeIcon icon={faEllipsisV} size="1x" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalendarTask;
