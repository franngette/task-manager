import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import InputText from "../../../../components/InputText/index";
import DropDown from "../../../../components/DropDown/index";
import Button from "../../../../components/Button/index";
import Message from "../../../../components/Message/index";
import { getTeams } from "../../../../api/index";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../components/Card";

const teamMaterials = [
  {
    id: 1,
    name: "Nano M5",
  },
  {
    id: 2,
    name: "Router TP-Link",
  },
  {
    id: 3,
    name: "Cable FTP",
  },
];

const CloseTask = ({ onClose, onSave }) => {
  const id_service = useSelector((state) => state.auth.user.id_service);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [teams, setTeams] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedOperators, setSelectedOperators] = useState("");

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("");

  const onSaveHandler = (description) => {
    if (description.length < 4) {
      setError(true);
    } else {
      onSave(description, selectedMaterials, selectedOperators);
      setSuccess(true);
    }
  };

  const materialHandler = () => {
    if (selectedQuantity.length > 0) {
      const newOb = {
        material: selectedMaterial,
        quantity: selectedQuantity,
      };
      setSelectedMaterials((selectedMaterials) => [...selectedMaterials, newOb]);
    } else {
      setError(true);
    }
  };

  const removeItemHandler = (el) => {
    const newArray = selectedMaterials.filter((item) => item !== el);
    setSelectedMaterials(newArray);
  };

  const arrOperators = [];

  const operatorHandler = () => {
    teams.forEach((el) => {
      let id = el.id_team;
      let op = el.operators.map((j) => {
        return j.name;
      });
      const newOp = {
        id: id,
        name: op.toString().replace(",", " - "),
      };
      arrOperators.push(newOp);
    });
  };

  operatorHandler();

  const renderMaterialList = () => {
    return selectedMaterials.map((el, i) => (
      <li style={{ listStyleType: "none", marginBottom: "0.25rem" }} key={i}>
        <Card>
          <div className={styles.gridContainer}>
            <p className={styles.gridItem}>{teamMaterials.find((e) => e.id == el.material).name}</p>
            <p className={styles.gridItem}>{el.quantity}</p>
            <div className={styles.gridItem}>
              <FontAwesomeIcon icon={faTrash} onClick={() => removeItemHandler(el)} color="red" style={{ cursor: "pointer" }}/>
            </div>
          </div>
        </Card>
      </li>
    ));
  };

  useEffect(() => {
    getTeams(id_service).then((res) => {
      setTeams(res);
    });
  }, [id_service]);

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h4>Operarios</h4>
          <DropDown data={arrOperators} onChange={(e) => setSelectedOperators(e.target.value)} />
        </div>
        <div className={styles.content}>
          <h4>Materiales</h4>
          <div className={styles.contentRow}>
            <div className={styles.contentCentered}>
              <h5>Material</h5>
              <DropDown data={teamMaterials} onChange={(e) => setSelectedMaterial(e.target.value)} />
            </div>
            <div className={styles.contentCentered}>
              <h5>Cantidad</h5>
              <InputText data={materials} type="number" onChange={(e) => setSelectedQuantity(e.target.value)} />
            </div>
            <div className={styles.contentCentered}>
              <Button variant="outline" onClick={() => materialHandler()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h4>Lista de materiales:</h4>
          {selectedMaterials.length > 0 ? (
            <>
              <div className={styles.gridContainerHeader}>
                <p className={styles.gridItem}>Material</p>
                <p className={styles.gridItem}>Cantidad</p>
              </div>
              {renderMaterialList()}
            </>
          ) : (
            <p>No hay materiales utilizados</p>
          )}
        </div>
        <div className={styles.content}>
          <h4>Tarea realizada:</h4>
          <textarea placeholder="Descripcion..." className={styles.description} />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => onSaveHandler()}>
          Guardar
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
      {success && <Message type="success" message="Incidente cargado" />}
      {error && !success && <Message type="error" message="Caracteres insuficientes" />}
    </div>
  );
};

export default CloseTask;
