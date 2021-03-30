import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import style from "./style.module.scss";

import Card from "../Card/index";
import Button from "../Button/index";
import DropDown from "../DropDown/index";
import Message from "../Message/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner";

const WorkTeam = ({
  selectedTeam,
  teamData,
  sendData,
  onClose,
  deleteData,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedVehicle(selectedTeam.id_vehicle);
    setSelectedOperators(selectedTeam.operators);
  }, [selectedTeam]);

  const handlerOperators = (e) => {
    let found;
    if (selectedOperators) {
      found = selectedOperators.find(
        (operator) => operator.id === +e.target.value
      );
      if (!found) {
        let operator = teamData.operators.find(
          (operator) => operator.id === +e.target.value
        );
        setSelectedOperators([...selectedOperators, operator]);
      }
    }
    e.preventDefault();
  };

  const handlerVehicles = (e) => {
    let vechicle = teamData.vehicles.find((car) => car.id === +e.target.value);
    if (vechicle) {
      setSelectedVehicle(vechicle);
    }
  };

  const deleteOperator = (e, operator) => {
    let found = selectedOperators.findIndex((op) => op.id === operator.id);
    if (found !== -1) {
      let newOperators = selectedOperators.filter(
        (op) => op.id !== operator.id
      );
      setSelectedOperators(newOperators);
    }
    e.preventDefault();
  };

  const sendDataHandler = async (e) => {
    if (selectedOperators.length > 0) {
      setLoading(true);
      sendData(selectedVehicle, selectedOperators).then((res) => {
        setError(error);
        setLoading(false);
      });
    } else {
      setError({ error: true, message: "No hay datos seleccionados!" })
      setTimeout(() => {
        setError({error: false, message: ""})
      }, 5000)
    }

    e.preventDefault();
  };

  const closeDataHandler = async (e) => {
    setLoading(true);
    deleteData(selectedTeam).then((res) => {
      setError(error);
      setLoading(false);
    });
    e.preventDefault();
  };

  const List = (values) => {
    return values.map((value, index) => {
      return (
        <li
          key={index}
          className={style.operator_selected}
          style={{ listStyleType: "none" }}
        >
          <Card>
            <div className={style.operator}>
              <span>{value.id}</span>
              <span>{value.name}</span>
              <button
                onClick={(e) => deleteOperator(e, value)}
                style={{ backgroundColor: "transparent" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          </Card>
        </li>
      );
    });
  };
  console.log(selectedTeam)
  return (
    <Card>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.header}>
            <h3>
              {selectedTeam.id_team
                ? `Editar Cuadrilla # ${selectedTeam.id_team}`
                : "Nueva Cuadrilla"}
            </h3>
            {selectedTeam.id_team && (
              <Button
                disabled={false}
                variant="outline"
                type="submit"
                onClick={(e) => closeDataHandler(e)}
              >
                Eliminar
              </Button>
            )}
          </div>
          <form>
            <div className={style.content}>
              <label htmlFor="vehiculo">
                <h4>Vehiculo</h4>
              </label>
              <DropDown
                data={teamData.vehicles}
                name="vehiculo"
                form="crear"
                id="vehiculo"
                onChange={(e) => {
                  handlerVehicles(e);
                }}
              />
            </div>
            <div className={style.content}>
              <label htmlFor="operarios">
                <h4>Operarios</h4>
              </label>
              <DropDown
                data={teamData.operators}
                name="operarios"
                form="crear"
                id="operarios"
                onChange={(e) => handlerOperators(e)}
              />
            </div>
            <div className={style.content_team}>
              <p>Operarios seleccionados: </p>
              <div className={style.team}>
                <ul>
                  {selectedOperators && selectedOperators.length > 0 ? (
                    List(selectedOperators)
                  ) : (
                    <div className={style.content_message}>
                      <p>No tiene operarios seleccionados.</p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <div className={style.content_center}>
              <div className={style.content_buttons}>
                <Button
                  variant="dark"
                  type="submit"
                  onClick={(e) => sendDataHandler(e)}
                >
                  {loading ? <Spinner /> : "Guardar"}
                </Button>
                <Button
                  disabled={false}
                  variant="outline"
                  type="submit"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </div>
            </div>
            {error.error && (
              <Message
                message={error.message}
                type={error.error ? "error" : "success"}
              />
            )}
          </form>
        </div>
      </div>
    </Card>
  );
};

WorkTeam.propTypes = {
  selectedTeam: PropTypes.object.isRequired,
  teamData: PropTypes.object.isRequired,
  sendData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WorkTeam;
