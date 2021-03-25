import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar/index";
import HeaderCalendar from "../../components/Calendar/HeaderCalendar/HeaderCalendar";
import Spinner from "../../components/Spinner";

import moment from "moment";
import { getCalendar, getTeams } from "../../api/index";

const Calendario = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const socket_refresh = useSelector((state) => state.auth.isSocketRefresh);

  const monthNow = moment().format("MM");
  const yearNow = moment().format("YYYY");
  const [year, setYear] = useState(yearNow);
  const [month, setMonth] = useState(monthNow);
  const [week, setWeek] = useState(0);
  const [teams, setTeams] = useState();
  const [calendar, setCalendar] = useState();

  useEffect(() => {
    getTeams(id_service).then((res) => setTeams(res));
    const dateSelected = year + "-" + month;
    getCalendar(id_service, dateSelected).then((res) => {
      const tasks = res;
      const calendar = getDaysArray(tasks, year, month);
      setCalendar(calendar);
    });
  }, [year, month, socket_refresh, id_service]);

  const getDaysArray = (tasks, year, month) => {
    let monthIndex = month - 1; // 0..11 instead of 1..12
    let date = new Date(year, monthIndex, 1);
    let result = [];
    let week = [];
    let dayData = {};
    let daysOfMonth = moment(`${year}-${month}`).daysInMonth();
    while (date.getMonth() === monthIndex) {
      let dayDate = moment(`${month}/${date.getDate()}/${year}`).format(
        "DD/MM/YYYY"
      );
      let tasksOfDay = tasks.filter((task) => {
        return task.date === dayDate;
      });
      dayData = {
        day: dayDate,
        isMonth: true,
        tasks: tasksOfDay,
      };
      if (week.length <= 6) {
        week.push(dayData);
      } else {
        result.push(week);
        week = [];
        week.push(dayData);
      }
      date.setDate(date.getDate() + 1);
      if (date.getDate() === daysOfMonth) {
        result.push(week);
      }
    }
    return result;
  };

  const dateHandler = (e) => {
    const updateDateSelected = e.target.value.toString();
    const year = moment(updateDateSelected).format("YYYY");
    const month = moment(updateDateSelected).format("MM");
    setWeek(0);
    setMonth(month);
    setYear(year);
    e.preventDefault();
  };

  const nextWeek = (e) => {
    e.preventDefault();
    let selectedWeek = week;
    const calendarMonth = calendar.length;
    if (selectedWeek === calendarMonth - 1) {
      setWeek(0);
    } else {
      selectedWeek = selectedWeek + 1;
      setWeek(selectedWeek);
    }
  };

  const prevWeek = (e) => {
    e.preventDefault();
    let selectedWeek = week;
    const calendarMonth = calendar.length;
    if (selectedWeek === 0) {
      setWeek(calendarMonth - 1);
    } else {
      setWeek(selectedWeek - 1);
    }
  };

  return (
    <div className={style.wrapper}>
      <HeaderCalendar
        month={month}
        year={year}
        dateHandler={dateHandler}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
      />
      {teams && <Calendar calendar={calendar} teams={teams} week={week} />}
    </div>
  );
};

export default Calendario;
