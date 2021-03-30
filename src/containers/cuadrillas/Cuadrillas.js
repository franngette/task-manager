import React, { useState, useEffect } from "react";
import styles from "./cuadrilla.module.scss";

import { useSelector } from "react-redux";
import WorkTeam from "../../components/WorkTeam";
import Button from "../../components/Button";
import ListTeams from "./ListTeams/ListTeams";

import {
  getTeams,
  getOperators,
  getVehicles,
  createTeam,
  updateTeam,
  closeTeam,
} from "../../api/index";

const Cuadrillas = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);

  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({
    id_team: null,
    id_vehicle: null,
    operators: [],
  });
  const [teamData, setTeamData] = useState({
    vehicles: [],
    operators: [],
  });
  const [message, setMessage] = useState({ error: false, message: "" });

  const handlerCloseData = async () => {
    closeTeam(id_service, selectedTeam.id_team)
      .then((res) => {
        setMessage(res);
        getTeams(id_service).then((res) => {
          setTeams(res);
        });
        setSelectedTeam({
          id_team: null,
          id_vehicle: null,
          operators: [],
        });
      })
      .catch((res) => {
        setMessage(res);
      });
  };

  const handleSendData = async (selectedVehicle, selectedOperators) => {
    if (selectedTeam.id_team) {
      updateTeam(
        id_service,
        selectedTeam.id_team,
        selectedVehicle,
        selectedOperators
      )
        .then((res) => {
          setMessage(res);
          getTeams(id_service).then((res) => {
            setTeams(res);
          });
        })
        .catch((res) => {
          setMessage(res);
        });
    } else {
      createTeam(id_service, selectedVehicle, selectedOperators)
        .then((res) => {
          setMessage(res);
          getTeams(id_service).then((res) => {
            setTeams(res);
          });
        })
        .catch((res) => {
          setMessage(res);
        });
    }
  };

  const setDataHandler = async (id_team) => {
    let operators = await getOperators(id_service, id_team);
    let vehicles = await getVehicles(id_service, id_team);
    setTeamData({
      vehicles: vehicles,
      operators: operators,
    });
    setOpen(true);
    setMessage({ error: false, message: "" });
  };

  const handleEditTeam = async (val) => {
    setSelectedTeam({
      id_team: val.id_team,
      id_vehicle: val.id_vehicle,
      operators: val.operators,
    });
    setDataHandler(val.id_team);
  };

  const handlerCreateTeam = async () => {
    setSelectedTeam({
      id_team: null,
      id_vehicle: null,
      operators: [],
    });
    setDataHandler("");
  };

  const handlerClose = (e) => {
    setOpen(false);
    e.preventDefault();
  };

  useEffect(() => {
    getTeams(id_service).then((res) => {
      setTeams(res);
    });
  }, [id_service]);

  return (
    <>
      <div className={styles.header}>
        <h3 style={{ margin: "1rem" }}>
          <b>Cuadrillas</b>
        </h3>
        <Button
          variant="outline"
          disabled={false}
          type="submit"
          onClick={handlerCreateTeam}
        >
          <p style={{ fontSize: "16px" }}>Crear</p>
        </Button>
      </div>
      <div className={styles.wrapper}>
        {teams && (
          <>
            <ListTeams data={teams} sendData={handleEditTeam} />
            <div className={open ? styles.modal_open : styles.modal_close}>
              {open && (
                <WorkTeam
                  onClose={handlerClose}
                  sendData={handleSendData}
                  deleteData={handlerCloseData}
                  teamData={teamData}
                  selectedTeam={selectedTeam}
                  message={message}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cuadrillas;
