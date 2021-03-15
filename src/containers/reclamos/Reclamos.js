import React, { useEffect, useState } from "react";

import styles from "./reclamos.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarMinus,
  faMapMarkerAlt,
  faEllipsisV,
  faListOl,
} from "@fortawesome/free-solid-svg-icons";

import {
  createCalendar,
  getStates,
  getTasks,
  getTeams,
  getTaskTypes,
  getRegions,
  getServiceTypes,
} from "../../api/index";

import AsignTeam from "../../components/AsignTeam/index";
import Card from "../../components/Card/index";
import Status from "../../components/Status/index";
import Selector from "../../components/Selector/Selector";
import InputText from "../../components/InputText/index";
import { useSelector } from "react-redux";
import AnimationListItem from "../../components/Animations/AnimationListItem/AnimatedListItem";

const Reclamos = ({ history }) => {
  const id_service = useSelector((state) => state.auth.user.id_service);

  const [reclamos, setReclamos] = useState([]);
  const [operators, setOperators] = useState([]);
  const [states, setStates] = useState();
  const [taskTypes, setTaskTypes] = useState();
  const [serviceTypes, setServiceTypes] = useState();
  const [regions, setRegions] = useState();

  const [open, setOpen] = useState(false);

  const [selectedReclamo, setSelectedReclamo] = useState({});

  const [res, setRes] = useState(false);

  const [valuesSelected, setValuesSelected] = useState({
    stateSelected: "",
    regionSelected: "",
    taskTypeSelected: "",
    serviceTypesSelected: "",
    numberTaskSelected: "",
  });

  const [style, setStyle] = useState({
    width: "0%",
    transition: "width 1s",
  });

  const filterHandler = (event) => {
    setValuesSelected({
      ...valuesSelected,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getServiceTypes(id_service).then((response) => {
      setServiceTypes(response);
    });
    getTaskTypes().then((response) => {
      setTaskTypes(response);
    });
    getRegions(id_service).then((response) => {
      setRegions(response);
    });
    getStates().then((response) => {
      setStates(response);
    });
    getTeams(id_service).then((response) => {
      setOperators(response);
    });
  }, []);

  useEffect(() => {
    console.log(id_service, valuesSelected);
    getTasks(
      id_service,
      valuesSelected.numberTaskSelected,
      "",
      "",
      valuesSelected.taskTypeSelected,
      valuesSelected.serviceTypesSelected,
      valuesSelected.stateSelected,
      valuesSelected.regionSelected
    ).then((response) => {
      console.log(response);
      setReclamos(response);
    });
  }, [id_service, valuesSelected]);

  const onSave = async (test, teamDate, team, priority) => {
    const res = await createCalendar(test, teamDate, team, priority);
    setRes(res);
    return res;
  };

  const handlerReclamo = (reclamo) => {
    setSelectedReclamo(reclamo);
    if (!open) {
      const styles = {
        width: "40%",
        transition: "width 1s",
      };
      setStyle(styles);
      setOpen(true);
    }
  };

  const handleClose = (e) => {
    const styles = {
      width: "0%",
      transition: "width 1s",
    };
    setStyle(styles);
    setOpen(false);
    e.preventDefault();
  };

  const toTask = (reclamo) => {
    console.log(reclamo);
    let state = {
      id_task: reclamo.id,
      id_account: reclamo.id_account,
      id_service: id_service,
      task: reclamo,
    };
    history.push("/reclamo", state);
  };

  const createLiReclamos = (reclamos) => {
    if (reclamos[0]?.number) {
      return reclamos.map((reclamo, index) => {
        return (
          <AnimationListItem
            index={index}
            key={index}
            style={{ listStyleType: "none" }}
          >
            <div className={styles.card_wrapper}>
              <Card>
                <div className={styles.card}>
                  <div
                    className={styles.card_container}
                    onClick={() => toTask(reclamo)}
                  >
                    <div className={styles.card_content}>
                      <h4>{reclamo.account_name}</h4>
                      <div className={styles.card_item}>
                        <Status
                          description={reclamo.last_state_description}
                          name={reclamo.last_state}
                        />
                      </div>
                    </div>
                    <div className={styles.card_content}>
                      <div className={styles.card_item}>
                        <p>
                          <span className={styles.boldText}>
                            # {reclamo.number}{" "}
                          </span>
                        </p>
                        <div className={styles.mh}>
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            color="#fe6d73"
                            size="1x"
                          />
                        </div>
                        <p>{reclamo.region_name}</p>
                      </div>
                      <div className={styles.card_item}>
                        <div className={styles.mh}>
                          <FontAwesomeIcon
                            className={styles.icon}
                            color="#4299e1"
                            icon={faCalendarMinus}
                            size="1x"
                          />
                        </div>
                        <div>
                          <p>{reclamo.created_at}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.button_container}>
                    <button
                      className={styles.button}
                      onClick={() => handlerReclamo(reclamo)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} size="1x" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </AnimationListItem>
        );
      });
    } else {
      return (<div className={styles.error_title}>
        <h3>No hay resultados.</h3>
      </div>)
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h3 style={{ margin: "1rem" }}>
          <b>Reclamos</b>
        </h3>
        <div className={styles.filters}>
          <div className={styles.input_container}>
            <InputText
              type="number"
              name="numberTaskSelected"
              placeHolder="N° Reclamo..."
              icon={faListOl}
              iconColor="#fe6d73"
              onChange={(e) => {
                filterHandler(e);
              }}
            />
          </div>
          <div className={styles.input_container}>
            <Selector
              nameKey="taskTypeSelected"
              data={taskTypes}
              onSelected={filterHandler}
            />
          </div>
          <div className={styles.input_container}>
            <Selector
              nameKey="serviceTypesSelected"
              data={serviceTypes}
              onSelected={filterHandler}
            />
          </div>
          <div className={styles.input_container}>
            <Selector
              nameKey="regionSelected"
              data={regions}
              onSelected={filterHandler}
            />
          </div>
          <div className={styles.input_container}>
            <Selector
              nameKey="stateSelected"
              data={states}
              onSelected={filterHandler}
            />
          </div>
        </div>
      </div>
      <main>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <ul style={{ width: "100%", marginRight: "1rem" }}>
            {createLiReclamos(reclamos)}
          </ul>
          <AsignTeam
            style={style}
            close={handleClose}
            data={selectedReclamo}
            operators={operators}
            onsave={onSave}
            res={res}
          />
        </div>
      </main>
    </>
  );
};

export default Reclamos;
