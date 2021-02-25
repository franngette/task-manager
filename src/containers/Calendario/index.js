import { useEffect, useState } from "react";

import Calendar from "../../components/Calendar/index";
import Spinner from '../../components/Spinner/index'
import Layout from "../Layout/index";

import { getCalendar } from "../../api/index";
import moment from "moment";


const Calendario = (props) => {
  const id_service = 1;
  const monthNow = moment().format("MM");
  const yearNow = moment().format("YYYY");
  const dateNow = yearNow + "-" + monthNow;
  const [tasks, setTasks] = useState();

  const getData = async () => {
    const tasksCalendar = await getCalendar(id_service, dateNow);
    setTasks(tasksCalendar);
  };
 
  useEffect(() => {
    getData();
  }, []);

  let render = <Spinner />
  if (tasks)
  {
    render = (
      <Calendar
      tasksCalendar={tasks}
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
