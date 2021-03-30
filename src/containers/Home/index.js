import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Card from "../../components/Card/index";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { getTasksStatics, getTasksTeam } from "../../api/index";
import { BrowserView, MobileView } from "react-device-detect";
import TaskItem from "../Reclamos/TaskItem/TaskItem";
import AnimatedListItem from "../../components/Animations/AnimatedListItem/AnimatedListItem";
import Modal from "../../components/Modal/index";
import TaskStateModal from "./TaskStateModal/TaskStateModal";

const Home = () => {
  const id_user = useSelector((state) => state.auth.user.id);

  const [chartsData, setChartsData] = useState();
  const [currentTasks, setCurrentTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReclamo, setSelectedReclamo] = useState({});

  /*   const chartDataByService = () => {
    const result = chartsData?.amount_service?.map((el) => el.description_service);
    return result;
  };
 */
  const handlerTask = (reclamo) => {
    setSelectedReclamo(reclamo);
    if (!open) {
      setOpen(true);
    }
  };

  const renderTasks = () => {
    return currentTasks.map((e, i) => (
      <AnimatedListItem key={e.id + i}>
        <TaskItem reclamo={e} handlerTask={handlerTask} />
      </AnimatedListItem>
    ));
  };

  useEffect(() => {
    //chartDataByService();
    getTasksTeam(51).then((res) => setCurrentTasks(res));
    getTasksStatics().then((res) => setChartsData(res));
  }, []);

  const pieDataTasks = {
    datasets: [
      {
        data: chartsData?.amount_type?.map((el) => el.amount),
        backgroundColor: [
          "rgb(34, 124, 157)",
          "rgb(23, 195, 178)",
          "rgb(255, 203, 119)",
          "rgb(254, 109, 115)",
          "rgb(144,221,240)",
        ],
        hoverBackgroundColor: [
          "rgb(29, 106, 134)",
          "rgb(19, 164, 150)",
          "rgb(255, 185, 71)",
          "rgb(254, 72, 78)",
          "rgb(111,211,235)",
        ],
      },
    ],
    labels: chartsData?.amount_type?.map((el) => el.description_type),
  };

  const pieDataServices = {
    datasets: [
      {
        data: chartsData?.amount_service?.map((el) => el.amount),
        backgroundColor: [
          "rgb(34, 124, 157)",
          "rgb(23, 195, 178)",
          "rgb(255, 203, 119)",
          "rgb(254, 109, 115)",
          "rgb(144,221,240)",
        ],
        hoverBackgroundColor: [
          "rgb(29, 106, 134)",
          "rgb(19, 164, 150)",
          "rgb(255, 185, 71)",
          "rgb(254, 72, 78)",
          "rgb(111,211,235)",
        ],
      },
    ],
    labels: chartsData?.amount_service?.map((el) => el.description_service),
  };

  return (
    <>
      <BrowserView>
        <div>
          <h3 style={{ margin: "1rem" }}>
            <b>Dashboard</b>
          </h3>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <Card>
                <div className={styles.graphContainer}>
                  <div className={styles.graph}>
                    <Pie
                      data={pieDataServices}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                          display: true,
                          text: "Reclamos por servicio",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                        },
                      }}
                    />
                  </div>
                  <div className={styles.graph}>
                    <Pie
                      data={pieDataTasks}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                          display: true,
                          text: "Tareas pendientes",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                        },
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        {renderTasks()}
        {open && (
          <Modal title={`Historial de estados tarea: #${selectedReclamo.id}`} onClose={() => setOpen(false)}>
            <TaskStateModal onClose={() => setOpen(false)} task={selectedReclamo} />
          </Modal>
        )}
      </MobileView>
    </>
  );
};

export default Home;
