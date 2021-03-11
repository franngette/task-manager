import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./cuadrilla.module.scss";

import { useSelector } from "react-redux";
import WorkTeam from "../../components/WorkTeam";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Message from "../../components/Message";
import InputText from "../../components/InputText";
import { getTeams, getOperators, getVehicles, createTeam, updateTeam } from "../../api/index";

const styleClosed = {
  width: "0%",
  transition: "width 1s",
  marginLeft: "0.5rem",
};

const styleOpen = {
  width: "40%",
  transition: "width 1s",
  marginLeft: "0.5rem",
};

const Cuadrillas = () => {
  const [teams, setTeams] = useState();
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currentIdTeam, setCurrentIdTeam] = useState("");
  const [teamOperators, setTeamOperators] = useState([]);
  const [teamVehicles, setTeamVehicles] = useState([]);
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState(styleClosed);

  const id_service = useSelector((state) => state.auth.user.id_service);

  const handleSendData = async (selectedVehicle, selectedOperators) => {
    let res;
    if (selectedTeam.length === 0) {
      res = updateTeam(id_service, currentIdTeam, selectedVehicle, selectedOperators)
        .then((res) => {
          setShowMessage(true);
          setError(res.error);
          setMessage(res.message);
        })
        .catch((res) => {
          setShowMessage(true);
          setError(res.error);
          setMessage(res.message);
        });
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } else {
      res = createTeam(id_service, selectedVehicle, selectedOperators)
        .then((res) => {
          setShowMessage(true);
          setError(res.error);
          setMessage(res.message);
        })
        .catch((res) => {
          setShowMessage(true);
          setError(res.error);
          setMessage(res.message);
        });
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  };

  const handleEditTeam = async (val) => {
    setCurrentIdTeam(val.id_team);
    setSelectedTeam(val);
    let operators = await getOperators(id_service, val.id_team);
    setTeamOperators(operators);
    let vehicles = await getVehicles(id_service, val.id_team);
    setTeamVehicles(vehicles);
    setStyle(styleOpen);
    setOpen(true);
  };

  const handlerCreateTeam = async () => {
    setSelectedTeam([]);
    setCurrentIdTeam("");
    let operators = await getOperators(id_service, "");
    setTeamOperators(operators);
    let vehicles = await getVehicles(id_service, "");
    setTeamVehicles(vehicles);
    setStyle(styleOpen);
    setOpen(true);
  };

  const handlerClose = (e) => {
    setStyle(styleClosed);
    setOpen(false);
    e.preventDefault();
  };

  const getData = async () => {
    let resTeams = await getTeams(id_service);
    setTeams(resTeams);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h3 style={{ margin: "1rem" }}>
          <b>Cuadrillas</b>
        </h3>
        {showMessage && <Message type={error ? "error" : "info"} message={message} />}
        <div className={styles.content_header}>
          <InputText type="text" placeHolder="Buscar..." onChange={() => {}} icon={faSearch} />
          <div>
            <Button variant="outline" disabled={false} type="submit" onClick={handlerCreateTeam}>
              Crear
            </Button>
          </div>
        </div>
      </div>
      <main>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            {teams && (
              <Table
                columns={["id_team", "vehicle_name", "operators"]}
                data={teams}
                columnsLarge={""}
                sendData={handleEditTeam}
              />
            )}
          </div>
          <WorkTeam
            style={style}
            onClose={handlerClose}
            open={open}
            sendData={handleSendData}
            vehicles={teamVehicles}
            operators={teamOperators}
            valueState={selectedTeam ? selectedTeam : []}
          />
        </div>
      </main>
    </>
  );
};

export default Cuadrillas;
