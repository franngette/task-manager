import React, { useState } from "react";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardHat } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/es";

import Modal from "../Modal/index";
import CalendarRow from "./CalendarRow/CalendarRow";
import Status from "./Status/index";
import AssignTask from "./AssignTask/index";

const Calendar = ({ calendar, week, teams }) => {
  const [task, setTask] = useState({});
  const [show, setShow] = useState(false);

  const content = {
    display: "grid",
    gridTemplateRows: `repeat(${teams.length}))`,
    background: "#2c5282",
    marginRigth: "5px",
    width: "75px",
    color: "white",
    minWidth: "75px",
  };

  const column = {
    width: "100%",
    position: "relative",
    background: "aliceblue",
    display: "grid",
    gridTemplateRows: `repeat(${teams.length})`,
  };

  const editHandler = (task, type) => {
    setShow(true);
    const selectedTask = { ...task, action_type: type };
    setTask(selectedTask);
  };

  const closeModalHandler = () => {
    setShow(false);
  };

  let renderContent = null;

  if (task.action_type && task.action_type === "assign") {
    renderContent = <AssignTask task={task} onClose={closeModalHandler} />;
  }

  if (task.action_type && task.action_type === "status") {
    renderContent = <Status task={task} onClose={closeModalHandler} />;
  }

  const renderCalendar = () => {
    // var Week is index weeks on month selected
    return calendar[week].map((day, index) => {
      return (
        <div key={index} style={column}>
          {teams.map((team, i) => {
            return <CalendarRow key={i} team={team} day={day} editHandler={editHandler} />;
          })}
        </div>
      );
    });
  };

  const renderTeam = (teams) => {
    return teams.map((team, index) => {
      return (
        <div key={index} className={style.rows_team}>
          <div className={style.team}>
            <p>Team {team.id_team}</p>
          </div>
        </div>
      );
    });
  };

  const renderCalendarHeader = () => {
    return calendar[week].map((day, index) => {
      let dayName = moment(day.day, "DD/MM/YYYY HH:mm:ss");
      return (
        <div key={index} className={style.calendar_header}>
          <h2>{dayName.date()}</h2>
          <h4>{dayName.locale("ES").format("dddd").toUpperCase()}</h4>
        </div>
      );
    });
  };

  let loadedCalendar = null; //<Spinner />;
  if (calendar.length > 0 && teams.length > 0) {
    loadedCalendar = (
      <>
        <div className={style.container_header}>
          <div className={style.header}>
            <FontAwesomeIcon icon={faHardHat} size="2x" color="white" />
          </div>
          <div className={style.calendar}>{renderCalendarHeader()}</div>
        </div>
        <div className={style.container}>
          <div style={content}>{renderTeam(teams)}</div>
          <div className={style.calendar}>{renderCalendar()}</div>
        </div>
      </>
    );
  }

  return (
    <div>
      {show && (
        <Modal
          title={task.action_type && task.action_type === "assign" ? "Editar Asignación" : "Nuevo Estado"}
          onClose={() => {
            setShow(false);
          }}
        >
          {renderContent}
        </Modal>
      )}

      {loadedCalendar}
    </div>
  );
};

export default Calendar;
