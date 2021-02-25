import { useEffect, useState } from "react";

import Calendar from "../../components/Calendar/index";
import Spinner from '../../components/Spinner/index'

import { getCalendar, getStatus, getTeams } from "../../api/index";
import moment from "moment";


const Calendario = (props) => {
  const id_service = 1;
  const monthNow = moment().format("MM");
  const yearNow = moment().format("YYYY");
  const dateNow = yearNow + "-" + monthNow;
  const [tasks, setTasks] = useState();
  const [teams, setTeams] = useState();
  const [operators, setOperators] = useState();
  const [status, setStatus] = useState();

  const getData = async () => {
    const tasksCalendar = await getCalendar(id_service, dateNow);
    const teams = await getTeams(id_service);
    const operators = await getTeams(id_service);
    const status = await getStatus();
    setTasks(tasksCalendar);
    setTeams(teams);
    setOperators(operators);
    setStatus(status);
  };
 
  useEffect(() => {
    getData();
  }, []);

  let render = <Spinner />
  if (tasks && teams && operators && status)
  {
    render = (
      <Calendar
      tasksCalendar={tasks}
      teams={teams}
      operators={operators}
      states={status}
    />
    )
  }
  return (
    <div>
      {render}
    </div>
  );
};

export default Calendario;
