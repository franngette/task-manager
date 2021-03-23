import React, { useEffect, useState } from "react";

import styles from "./reclamos.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarMinus, faMapMarkerAlt, faEllipsisV, faListOl } from "@fortawesome/free-solid-svg-icons";

import { createCalendar, getTasks, getTeams, getFilters } from "../../api/index";

import AsignTeam from "../../components/AsignTeam/index";
import Card from "../../components/Card/index";
import Status from "../../components/Status/index";
import Selector from "../../components/Selector/Selector";
import InputText from "../../components/InputText/index";
import { useSelector } from "react-redux";
import AnimationListItem from "../../components/Animations/AnimatedListItem/AnimatedListItem";
import Button from "../../components/Button";

const Reclamos = ({ history }) => {
  let timeout = null;

  const id_service = useSelector((state) => state.auth.user.id_service);
  const [reclamos, setReclamos] = useState([]);
  const [operators, setOperators] = useState([]);
  const [filtersData, setFiltersData] = useState({
    task_type: [],
    service_types: [],
    regions: [],
    states: [],
  });
  const [counter, setCounter] = useState(9);

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

  const filterHandler = (event) => {
    setValuesSelected({
      ...valuesSelected,
      [event.target.name]: event.target.value,
    });
  };

  const inputHandler = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      filterHandler(e);
    }, 500);
  };

  useEffect(() => {
    getFilters(id_service).then((res, filtersData) => setFiltersData({ ...filtersData, ...res }));
    getTeams(id_service).then((res) => setOperators(res));
  }, [id_service]);

  useEffect(() => {
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
      setReclamos(response);
    });
  }, [id_service, valuesSelected]);

  const onSave = (test, teamDate, team, priority) => {
    let response;
    createCalendar(test, teamDate, team, priority).then((res) => (response = res));
    setRes(response);
    return response;
  };

  const handlerReclamo = (reclamo) => {
    setSelectedReclamo(reclamo);
    if (!open) {
      setOpen(true);
    }
  };

  const handleClose = (e) => {
    setOpen(false);
    e.preventDefault();
  };

  const toTask = (reclamo) => {
    let state = {
      id_task: reclamo.id,
      id_account: reclamo.id_account,
      id_service: id_service,
      task: reclamo,
    };
    history.push("/reclamo", state);
  };
  const createLiReclamos = (reclamos) => {
    /*     let arr = reclamos.slice(0, 2);
         for (let i = 0; i <= 1; i++) {
      reclamos.slice(reclamos[i]);
    } 
    console.log([...reclamos[0], ...reclamos[1]]); */
    if (reclamos[0]?.number) {
      return reclamos.slice(0, counter).map((reclamo, index) => {
        let date = new Date(reclamo.created_at).toLocaleString();
        return (
          <AnimationListItem index={index} key={index} style={{ listStyleType: "none" }}>
            <div className={styles.card_wrapper}>
              <Card>
                <div className={styles.card}>
                  <div className={styles.card_container} onClick={() => toTask(reclamo)}>
                    <div className={styles.card_content}>
                      <h4>{reclamo.account_name}</h4>
                      <div className={styles.card_item}>
                        <Status description={reclamo.last_state_description} name={reclamo.last_state} />
                      </div>
                    </div>
                    <div className={styles.card_content}>
                      <div className={styles.card_item}>
                        <p>
                          <span className={styles.boldText}># {reclamo.number} </span>
                        </p>
                        <div className={styles.mh}>
                          <FontAwesomeIcon icon={faMapMarkerAlt} color="#fe6d73" size="1x" />
                        </div>
                        <p>{reclamo.region_name}</p>
                      </div>
                      <div className={styles.card_item}>
                        <div className={styles.mh}>
                          <FontAwesomeIcon className={styles.icon} color="#4299e1" icon={faCalendarMinus} size="1x" />
                        </div>
                        <div>
                          <p>{date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.button_container}>
                    <button className={styles.button} onClick={() => handlerReclamo(reclamo)}>
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
      return (
        <div className={styles.error_title}>
          <h3>No hay resultados.</h3>
        </div>
      );
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
                inputHandler(e);
              }}
            />
          </div>
          <div className={styles.input_container}>
            <Selector nameKey="taskTypeSelected" data={filtersData.task_type} onSelected={filterHandler} />
          </div>
          <div className={styles.input_container}>
            <Selector nameKey="serviceTypesSelected" data={filtersData.service_types} onSelected={filterHandler} />
          </div>
          <div className={styles.input_container}>
            <Selector nameKey="regionSelected" data={filtersData.regions} onSelected={filterHandler} />
          </div>
          <div className={styles.input_container}>
            <Selector nameKey="stateSelected" data={filtersData.states} onSelected={filterHandler} />
          </div>
        </div>
      </div>
      <main style={{ display: "flex" }}>
        <div className={styles.wrapper}>
          <ul>{createLiReclamos(reclamos)}</ul>
          {reclamos.length > counter && (
            <Button variant="outline" onClick={() => setCounter((counter) => counter * 2)}>
              <h4 className={styles.boldText}>Ver mas</h4>
            </Button>
          )}
        </div>
        <div className={open ? styles.modal_open : styles.modal_close}>
          {open && (
            <AsignTeam close={handleClose} data={selectedReclamo} operators={operators} onsave={onSave} res={res} />
          )}
        </div>
      </main>
    </>
  );
};

export default Reclamos;
