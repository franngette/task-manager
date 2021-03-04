import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import moment from "moment";
import Card from "../../../components/Card/index";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import NewTaskModal from "../../../components/Modal/NewTaskModal/index";
import Spinner from "../../../components/Spinner/index";
import ConnectionsTable from "./Tables/ConnectionsTable/ConnectionsTable";
import TaskList from "./TasksList/TaskList";
import TaskItem from "./TasksList/TaskItem/TaskItem";
import { getTaskTypes, getSubAccountData, getSubAccountConnections, getTasks, getTask } from "../../../api/index";

const months = 2412;

const ClientSubAccount = (props) => {
  const id_service = 1;
  const [show, setShow] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [subAccData, setSubAccData] = useState([]);
  const [connectSubAcc, setConnecSubAcc] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [subAccTasks, setSubAccTasks] = useState([]);

  const getSubAccTasks = async () => {
    const res = await getTasks(id_service, "", props.location.state.client_sub_account, "", "", "", "", "");
    setSubAccTasks(res);
    console.log(subAccTasks);
  };

  const listOfTasks = () => {
    return subAccTasks.map((e, i) => {
      return <TaskList index={i} task={e} onClick={(val) => taskHandler(val)} />;
    });
  };

  const taskHandler = async (id) => {
    const res = await getTask(id_service, id);
    setSelectedTask(res[0]);
  };

  const getData = async () => {
    const resSubAcc = await getSubAccountData(id_service, props.location.state.client_sub_account);
    setSubAccData(resSubAcc);
    const resTaskType = await getTaskTypes();
    setTaskTypes(resTaskType);
    getSubAccTasks();
  };

  useEffect(() => {
    props.location.state.client_sub_account ? getData() : props.history.goBack();
  }, []);

  const getConnections = async () => {
    const res = await getSubAccountConnections(subAccData.info[0].radius_login, months);
    setConnecSubAcc(res);
  };

  useEffect(() => {
    subAccData?.info && getConnections();
  }, [subAccData]);

  return (
    <>
      {subAccData.info ? (
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
                  <h4 className={styles.cardTitle}>Subcuenta: #{subAccData.info[0].id_sub_account}</h4>
                  <div className={styles.cardContent}>
                    <p>
                      <span className={styles.boldText}>Razon social:</span> {subAccData.info[0].account_name}
                    </p>
                    <p>
                      <span className={styles.boldText}>Domicilio: </span>
                      {subAccData.info[0].address}, {subAccData.info[0].region_name}
                    </p>
                    <p>
                      <span className={styles.boldText}>DNI: </span>
                      {subAccData.info[0].doc_number}
                    </p>
                    {subAccData?.phones.length > 0 ? (
                      subAccData.phones.map((e, i) => (
                        <p key={i}>
                          <span className={styles.boldText}>Contacto {i + 1}: </span>
                          {e.phone_number}
                        </p>
                      ))
                    ) : (
                      <p>
                        <span className={styles.boldText}>Contacto 1: </span>
                        {subAccData.phones.phone_number}
                      </p>
                    )}
                  </div>
                </Card>
              </div>
              <div className={styles.card_wrapper}>
                <Card>
                  <h4 className={styles.cardTitle}>Servicios</h4>
                  <div className={styles.cardContent}>
                    {subAccData.service.map((e, i) => (
                      <p key={i}>
                        <span className={styles.boldText}>Servicio: </span>
                        {e.service} desde {moment(e.date_from).format("DD-MM-YYYY")}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.card_wrapper}>
                <Card>
                  <h4 className={styles.cardTitle}>Datos Tecnicos</h4>
                  <div className={styles.cardContent}>
                    {subAccData?.dslam.length > 0 || subAccData?.node.length > 0 ? (
                      <>
                        <p>
                          {subAccData?.dslam[0] > 0 ? (
                            <span className={styles.boldText}>DSLAM: </span>
                          ) : (
                            <span className={styles.boldText}>Nodo: </span>
                          )}
                          <a href={subAccData?.dslam[0]?.nas_ip ?? subAccData?.node[0]?.ip}>
                            {subAccData?.dslam[0]?.dslam ?? subAccData?.node[0]?.node}
                          </a>
                        </p>
                        <p>
                          {subAccData?.dslam[0] ? (
                            <span className={styles.boldText}>Port: </span>
                          ) : (
                            <span className={styles.boldText}>Banda: </span>
                          )}
                          {subAccData?.dslam[0]?.port_number ?? subAccData?.node[0]?.band}
                        </p>
                      </>
                    ) : (
                      <h4 className={styles.boldText}>Sin datos tecnicos</h4>
                    )}

                    <p>
                      <span className={styles.boldText}>Login: </span>
                      {subAccData.info[0].radius_login}
                    </p>
                    <p>
                      <span className={styles.boldText}>Password: </span>
                      {subAccData.info[0].radius_passwd}
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.card_wrapper}>
                <Card>
                  <h4 className={styles.cardTitle}>Equipamiento</h4>
                  <div className={styles.cardContent}>
                    {subAccData?.equipment[0]?.model ? (
                      subAccData.equipment.map((e) => {
                        return (
                          <div>
                            <p>
                              <span className={styles.boldText}>Modelo: </span>
                              {e?.model}
                            </p>
                            <p>
                              <span className={styles.boldText}>MAC: </span>
                              {e?.mac}
                            </p>
                            <p>
                              <span className={styles.boldText}>IP: </span>
                              {e?.ip}
                            </p>
                            <p>
                              <span className={styles.boldText}>Modo: </span>
                              {e?.mode}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className={styles.contentCentered}>
                        <h4 className={styles.boldText}>No hay Datos</h4>{" "}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className={styles.ctnr_lg}>
            <div className={styles.card_wrapper}>
              <Card>
                <h4 className={styles.cardTitle}>Conexiones</h4>
                <div className={styles.cardContent}>
                  <div style={{ height: "100%" }}>
                    {connectSubAcc.length > 0 ? (
                      <ConnectionsTable headers={["Tiempo de sesion", "IP", "Ancho de banda"]} data={connectSubAcc} />
                    ) : (
                      <div className={styles.contentCentered}>
                        <Spinner color="#4299e1" size="2rem" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className={styles.card_wrapper}>
              <Card>
                <h4 className={styles.cardTitle}>Observaciones</h4>
                <div className={styles.cardContent}>
                  {subAccData?.obs[0] ? (
                    subAccData.obs.map((e, i) => {
                      return (
                        <li key={i} style={{ listStyleType: "none" }}>
                          <div style={{ marginBottom: "0.5rem" }}>
                            <Card>
                              <div className={styles.observationsContent}>
                                <p>{e.text}</p>
                                <h5 className={styles.boldText}>{moment(e.obs_date).format("DD/MM/YYYY")}</h5>
                              </div>
                            </Card>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <div className={styles.contentCentered}>
                      <h4 className={styles.boldText}>No hay Datos</h4>{" "}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
          <div className={styles.ctnr_lg}>
            <div className={styles.card_wrapper}>
              <Card>
                <h4 className={styles.cardTitle}>Reclamos</h4>
                <div className={styles.cardContent}>
                  {subAccTasks[0] ? (
                    <div className={styles.tbody}>{listOfTasks()}</div>
                  ) : (
                    <div className={styles.contentCentered}>
                      <Spinner color="#4299e1" size="2rem" />
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className={styles.card_wrapper}>
              <Card>
                <h4 className={styles.cardTitle}>Detalles</h4>
                <div className={styles.cardContent}>
                  <div className={styles.contentCentered}>
                    {selectedTask.id ? (
                      <TaskItem task={selectedTask} />
                    ) : (
                      <h4 className={styles.boldText}>Seleccione reclamo a visualizar</h4>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentCentered}>
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
