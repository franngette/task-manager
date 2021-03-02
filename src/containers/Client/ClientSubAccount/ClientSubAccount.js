import React, { useEffect, useState } from "react";
import { getTaskTypes, getSubAccountData, getSubAccountConnections } from "../../../api/index";
import { useHistory } from "react-router-dom";

import styles from "./style.module.scss";
import Card from "../../../components/Card/index";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import NewTaskModal from "../../../components/Modal/NewTaskModal/index";
import Spinner from "../../../components/Spinner/index";
import ConnectionsTable from "./Tables/ConnectionsTable/ConnectionsTable";

const months = 24212;

const ClientSubAccount = (props) => {
  const id_service = 1;
  const [show, setShow] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [subAccData, setSubAccData] = useState();
  const [connectSubAcc, setConnecSubAcc] = useState([]);

  let history = useHistory();

  const getData = async () => {
    const resTaskType = await getTaskTypes();
    const resSubAcc = await getSubAccountData(id_service, props.location.state.client_sub_account);
    setTaskTypes(resTaskType);
    setSubAccData(resSubAcc);
  };

  const getConnections = async () => {
    const connecSubAcc = await getSubAccountConnections(subAccData.info[0].radius_login, months);
    setConnecSubAcc(connecSubAcc);
  };

  useEffect(() => {
    console.log(props.location.state);
    if (props.location?.state?.client_sub_account) {
      getData();
      subAccData?.info && getConnections();
    } else {
      history.push("/client");
    }
  }, [props.location.state]);

  return (
    <>
      {subAccData ? (
        <div className={styles.client_sub}>
          <div className={styles.header}>
            <div className={styles.child}>
              <h3 styles={{ marginRight: "1rem" }}>
                <b>Cliente # {props.location.state.client_id}</b>
              </h3>
            </div>
            <div className={styles.child}>
              <Button type="button" variant="light" onClick={() => setShow(true)}>
                <p>Nuevo Reclamo</p>
              </Button>
            </div>
          </div>
          <div className={styles.ctnr_sm}>
            <div className={styles.content}>
              <div className={styles.card_wrapper}>
                <Card>
                  <div style={{ margin: "0.5rem", height: "100%" }}>
                    <h4 className={styles.cardTitle}>Subcuenta: #{subAccData.info[0].account_name}</h4>
                    <p>Razon social: {subAccData.info[0].account_name}</p>
                    <p>Domicilio: {subAccData.info[0].account_name}</p>
                    <p>DNI: {subAccData.info[0].account_name}</p>
                  </div>
                </Card>
              </div>
              <div className={styles.card_wrapper}>
                <Card>
                  <div style={{ margin: "0.5rem", height: "100%" }}>
                    <h4 className={styles.cardTitle}>Servicios</h4>
                    <p>Servicio: {subAccData.service[0].service}</p>
                  </div>
                </Card>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.card_wrapper}>
                <Card>
                  <div style={{ margin: "0.5rem", height: "100%" }}>
                    <h4 className={styles.cardTitle}>Datos Tecnicos</h4>
                    <a href={subAccData?.dslam[0]?.nas_ip ?? subAccData?.node[0]?.ip}>
                      {subAccData?.dslam[0] ? "DSLAM" : "Nodo"}:{" "}
                      {subAccData?.dslam[0]?.dslam ?? subAccData?.node[0]?.node}
                    </a>
                    <p>
                      {subAccData?.dslam[0] ? "Port" : "Banda"}:{" "}
                      {subAccData?.dslam[0]?.port_number ?? subAccData?.node[0]?.band}
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.card_wrapper}>
                <Card>
                  <div style={{ margin: "0.5rem", height: "100%" }}>
                    <h4 className={styles.cardTitle}>Equipamiento</h4>
                    {subAccData?.equipment[0]?.model &&
                      subAccData.equipment.map((e) => {
                        return (
                          <>
                            <p>Modelo: {e?.model}</p>
                            <p>MAC: {e?.mac}</p>
                            <p>IP: {e?.ip}</p>
                            <p>Modo: {e?.mode}</p>
                          </>
                        );
                      })}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className={styles.ctnr_lg}>
            <div className={styles.card_wrapper}>
              <Card>
                <div style={{ margin: "0.5rem", height: "100%" }}>
                  <h4 className={styles.cardTitle}>Conexiones</h4>
                  <div className={styles.connectionsWrapper}>
                    {connectSubAcc.length > 0 && (
                      <ConnectionsTable headers={["Tiempo de sesion", "IP", "Ancho de banda"]} data={connectSubAcc} />
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className={styles.card_wrapper}>
              <Card>
                <div style={{ margin: "0.5rem", height: "100%" }}>
                  <h4 className={styles.cardTitle}>Observaciones</h4>
                  {subAccData?.obs[0] &&
                    subAccData.obs.map((e) => {
                      return (
                        <>
                          <p>{e.text}</p>
                          <p>{e.obs_date}</p>
                        </>
                      );
                    })}
                </div>
              </Card>
            </div>
          </div>

          <div className={styles.ctnr_lg}>
            <div className={styles.card_wrapper}>
              <Card>
                <div style={{ margin: "0.5rem", width: "100%" }}>
                  <h4 className={styles.cardTitle}>Reclamos</h4>{" "}
                </div>
              </Card>
            </div>

            <div className={styles.card_wrapper}>
              <Card>
                <div style={{ margin: "0.5rem", width: "100%" }}>
                  <h4 className={styles.cardTitle}>Reclamo N*</h4>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.spinnerContainer}>
          <Spinner color="#4299e1" size="4rem" />
        </div>
      )}

      {show && (
        <Modal title="Nuevo Reclamo" onClose={() => setShow(false)}>
          <NewTaskModal
            id={props.location.state.client_id}
            sid={props.location.state.client_sub_account}
            taskTypes={taskTypes}
            onClose={() => setShow(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ClientSubAccount;
