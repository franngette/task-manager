import React, { useState } from "react";
import styles from "./style.module.scss";
import PropTypes from "prop-types";

import InputText from "../../../../components/InputText/index";
import DropDown from "../../../../components/DropDown/index";
import Button from "../../../../components/Button/index";
import Message from "../../../../components/Message/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../components/Card";
import Signature from "../../../../components/Signature/Signature";
import { isMobile } from "react-device-detect";

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
  const [response, setResponse] = useState();
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [description, setDescription] = useState("");

  const onSaveHandler = () => {
    if (description.length < 4) {
      setResponse({ error: true, message: "Caracteres insuficientes en descripcion" });
      setTimeout(() => {
        setResponse();
      }, 6000);
    } else {
      onSave(description).then((res) => {
        console.log(res);
        setResponse(res);
        setTimeout(() => {
          setResponse();
          onClose();
        }, 6000);
      });
    }
  };

  /*   const materialHandler = () => {
    if (selectedQuantity.length > 0) {
      const newOb = {
        material: selectedMaterial,
        quantity: selectedQuantity,
      };
      setSelectedMaterials((selectedMaterials) => [...selectedMaterials, newOb]);
    } else {
      setResponse({ error: true, message: "Ingrese cantidad" });
      setTimeout(() => {
        setResponse();
      }, 6000);
    }
  }; */

  const removeItemHandler = (el) => {
    const newArray = selectedMaterials.filter((item) => item !== el);
    setSelectedMaterials(newArray);
  };

  const renderMaterialList = () => {
    return selectedMaterials.map((el, i) => (
      <li style={{ listStyleType: "none" }} key={i}>
        <Card>
          <div className={styles.gridContainer}>
            <p className={styles.gridItem}>{teamMaterials.find((e) => e.id.toString() === el.material).name}</p>
            <p className={styles.gridItem}>{el.quantity}</p>
            <div className={styles.gridItem}>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => removeItemHandler(el)}
                color="red"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </Card>
      </li>
    ));
  };

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.contentWrapper}>
        {/* <div className={styles.content}>
          <h4>Materiales</h4>
          <div className={styles.contentRow}>
            <div className={styles.contentCentered}>
              <h5>Material</h5>
              <DropDown data={teamMaterials} onChange={(e) => setSelectedMaterial(e.target.value)} />
            </div>
            <div className={styles.contentCentered}>
              <h5>Cantidad</h5>
              <InputText type="number" onChange={(e) => setSelectedQuantity(e.target.value)} />
            </div>
            <div className={styles.contentCentered}>
              <Button variant="outline" onClick={() => materialHandler()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>
        </div> */}
        {/* <div className={styles.content}>
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
        </div> */}
        <div className={styles.content}>
          <h4>Tarea realizada:</h4>
          <textarea
            placeholder="Descripcion..."
            className={styles.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {isMobile && (
          <div className={styles.content}>
            <Signature />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => onSaveHandler()}>
          Guardar
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
      {response && <Message type={response.error ? "error" : "success"} message={response.message} />}
    </div>
  );
};

CloseTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CloseTask;
