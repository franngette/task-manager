import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Card from "../../../components/Card/index";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import NewTaskModal from "./Modals/NewTaskModal/index";
import Spinner from "../../../components/Spinner/index";
import ConnectionsTable from "./Tables/ConnectionsTable/ConnectionsTable";
import TaskList from "./TasksList/TaskList";
import TaskItem from "./TasksList/TaskItem/TaskItem";
import { getSubAccountData, getSubAccountConnections, getTasks, getTask, createTask } from "../../../api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEdit, faEye, faNewspaper, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faExchangeAlt, faHdd, faWifi } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AnimatedListItem from "../../../components/Animations/AnimatedListItem/AnimatedListItem";
import ConnectionsModal from "./Modals/ConnectionsModal/ConnectionsModal";

const ClientSubAccount = (props) => {
  const id_service = useSelector((state) => state.auth.user.id_service);

  const [showConnecModal, setShowCoonectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [subAccData, setSubAccData] = useState([]);
  const [connectSubAcc, setConnecSubAcc] = useState();
  const [selectedTask, setSelectedTask] = useState({});
  const [subAccTasks, setSubAccTasks] = useState([]);

  const getSubAccTasks = async () => {
    getTasks(id_service, "", props.location.state.client_sub_account, "", "", "", "", "").then((res) =>
      setSubAccTasks(res)
    );
  };

  const listOfTasks = () => {
    return subAccTasks.map((e, i) => (
      <AnimatedListItem key={i} index={i}>
        <TaskList key={i} task={e} onClick={(val) => taskHandler(val)} />
      </AnimatedListItem>
    ));
  };

  const taskHandler = async (id) => {
    const res = await getTask(id_service, id);
    setSelectedTask(res);
  };

  const getData = async () => {
    getSubAccountData(id_service, props.location.state.client_sub_account).then((res) => setSubAccData(res));
    getSubAccTasks();
  };

  console.log(connectSubAcc);

  useEffect(() => {
    props.location.state.client_sub_account ? getData() : props.history.goBack();
  }, []);

  const getConnections = async () => {
    getSubAccountConnections(subAccData.info[0].radius_login, "", "").then((res) => setConnecSubAcc(res));
  };

  useEffect(() => {
    subAccData?.info && getConnections();
  }, [subAccData]);

  const toTask = () => {
    let state = {
      id_task: selectedTask.id,
      id_account: subAccData.info[0].id_sub_account,
      id_service: id_service,
      task: selectedTask,
    };
    props.history.push("/reclamo", state);
  };

  const renderObservations = () => {
    return subAccData.obs.map((e, i) => (
      <AnimatedListItem index={i} key={i}>
        <li style={{ listStyleType: "none" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <Card>
              <div className={styles.observationsContent}>
                <p>{e.text}</p>
                <h5 className={styles.boldText}>{new Date(e.obs_date).toLocaleDateString().toString()}</h5>
              </div>
            </Card>
          </div>
        </li>
      </AnimatedListItem>
    ));
  };

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
              <Button type="button" variant="outline" onClick={() => setShowTaskModal(true)}>
                <p style={{ fontSize: "16px" }}>Nuevo Reclamo</p>
              </Button>
            </div>
          </div>
          <div className={styles.ctnr_sm}>
            <div className={styles.content}>
              <div className={styles.card_wrapper}>
                <Card>
                  <h4 className={styles.cardTitle}>
                    <FontAwesomeIcon icon={faUserCircle} color="#D7B644" style={{ marginRight: "0.5rem" }} /> Subcuenta:
                    #{subAccData.info[0].id_sub_account}
                  </h4>
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
                  <h4 className={styles.cardTitle}>
                    <FontAwesomeIcon icon={faEdit} color="#5DCE68" style={{ marginRight: "0.5rem" }} />
                    Servicios
                  </h4>
                  <div className={styles.cardContent}>
                    {subAccData.service.map((e, i) => (
                      <p key={i}>
                        <span className={styles.boldText}>Servicio: </span>
                        {e.service} desde {new Date(e.date_from).toLocaleDateString().toString()}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.card_wrapper}>
                <Card>
                  <h4 className={styles.cardTitle}>
                    <FontAwesomeIcon icon={faWifi} color="#84B5FF" style={{ marginRight: "0.5rem" }} />
                    Datos Tecnicos
                  </h4>
                  <div className={styles.cardContent}>
                    {subAccData?.dslam.length > 0 || subAccData?.node.length > 0 ? (
                      <>
                        <p>
                          {subAccData?.dslam[0] ? (
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
                  <h4 className={styles.cardTitle}>
                    <FontAwesomeIcon icon={faHdd} color="#656565" style={{ marginRight: "0.5rem" }} />
                    Equipamiento
                  </h4>
                  <div className={styles.cardContent}>
                    {subAccData?.equipment[0]?.model ? (
                      subAccData.equipment.map((e, i) => {
                        return (
                          <div key={i}>
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
                <div className={styles.innerHeader}>
                  <h4 className={styles.cardTitle}>
                    <FontAwesomeIcon icon={faExchangeAlt} color="#D133AF" style={{ marginRight: "0.5rem" }} />
                    Conexiones
                  </h4>
                  <div style={{ marginRight: "1rem", marginTop: "1rem" }}>
                    <Button onClick={() => setShowCoonectModal(true)} type="button" variant="outline">
                      Ver mas
                    </Button>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div style={{ height: "100%" }}>
                    {connectSubAcc ? (
                      connectSubAcc.length > 0 ? (
                        <ConnectionsTable headers={["Tiempo de sesion", "IP", "Ancho de banda"]} data={connectSubAcc} />
                      ) : (
                        <div className={styles.contentCentered}>
                          <h4 className={styles.boldText}>No hay datos</h4>
                        </div>
                      )
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
                <h4 className={styles.cardTitle}>
                  <FontAwesomeIcon icon={faEye} color="#BE2323" style={{ marginRight: "0.5rem" }} />
                  Observaciones
                </h4>
                <div className={styles.cardContent}>
                  {subAccData?.obs[0] ? (
                    renderObservations()
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
                <h4 className={styles.cardTitle}>
                  <FontAwesomeIcon icon={faNewspaper} color="#2B4E93" style={{ marginRight: "0.5rem" }} />
                  Reclamos
                </h4>
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
                <div className={styles.ctnr_sm}>
                  <div>
                    <h4 className={styles.cardTitle}>
                      <FontAwesomeIcon icon={faBookmark} color="#60ECFF" style={{ marginRight: "0.5rem" }} />
                      Detalles
                    </h4>
                  </div>
                  {selectedTask?.id && (
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toTask();
                        }}
                      >
                        <h4>Ver</h4>
                      </Button>
                    </div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.contentCentered}>
                    {selectedTask?.id ? (
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

      {showConnecModal && (
        <Modal title="Buscar Conexiones" onClose={() => setShowCoonectModal(false)}>
          <ConnectionsModal
            onClose={() => setShowCoonectModal(false)}
            connectSubAcc={connectSubAcc}
            login={subAccData.info[0].radius_login}
          />
        </Modal>
      )}

      {showTaskModal && (
        <Modal title="Nuevo Reclamo" onClose={() => setShowTaskModal(false)}>
          <NewTaskModal
            id={props.location.state.client_id}
            sid={props.location.state.client_sub_account}
            serviceType={subAccData?.service[0].id_service_type}
            onClose={() => setShowTaskModal(false)}
            onSave={(id_service, sid, taskType, idProblem, description) =>
              createTask(id_service, sid, taskType, idProblem, description)
            }
          />
        </Modal>
      )}
    </>
  );
};

export default ClientSubAccount;
