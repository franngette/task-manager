import React, { useState, useEffect } from "react";
import style from "./reclamo.module.scss";

import Card from "../../../components/Card/index";
import Status from "../../../components/Status/index";
import Spinner from "../../../components/Spinner/index";
import Incident from "./Incident/Incident";
import Button from "../../../components/Button/index";
import Modal from "../../../components/Modal/index";
import NewIssueModal from "./NewIssueModal/NewIssueModal";
import CloseTaskModal from "./CloseTaskModal/CloseTaskModal";
import {
  faAddressCard,
  faClipboardCheck,
  faExclamationCircle,
  faHardHat,
  faMapMarkerAlt,
  faPhone,
  faHdd,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getTask, getSubAccountData, createIncident, closeTask } from "../../../api/index";
import { useSelector } from "react-redux";

const Reclamo = (props) => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const id_account = props.location.state.id_account;
  const id_task = props.location.state.id_task;
  const user_id = useSelector((state) => state.auth.user.id);
  const [task, setTask] = useState();
  const [subAccount, setSubAccount] = useState();
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showCloseModal, setShowShowModal] = useState(false);

  const renderPhones = (phones) => {
    return phones.map((phone, index) => (
      <div className={style.info_content} key={index}>
        <FontAwesomeIcon icon={faPhone} size="1x" color="#4299e1" />
        <p className={style.phone_content}>{phone.phone_number}</p>
      </div>
    ));
  };

  const renderIncidents = (incidents) => {
    return incidents.map((incident, index) => {
      return (
        <li key={index} style={{ listStyleType: "none" }}>
          <Incident key={index} incident={incident} />
        </li>
      );
    });
  };

  const renderTeam = (teams) => {
    return teams.map((team, index) => {
      return (
        <div key={index}>
          <img className={style.img} src={`${team.photo}`} alt="" title={team.operator_name} />
        </div>
      );
    });
  };

  const incidentHandler = (description) => {
    return createIncident(id_task, description, user_id).then((res) => {
      getTask(id_service, id_task).then((res) => {
        setTask(res);
      });
      return res;
    });
  };

  const closeTaskHandler = (description) => {
    getTask(id_service, id_task).then((res) => {
      const resultTaks = res;
      setTask(resultTaks);
    });
    return closeTask(id_task, user_id, task.id_calendar, description);
  };

  useEffect(() => {
    getTask(id_service, id_task).then((res) => {
      const resultTaks = res;
      getSubAccountData(id_service, id_account).then((res) => {
        setTask(resultTaks);
        setSubAccount(res);
      });
    });
  }, [id_service, id_task, id_account]);

  let loaded = (
    <div className={style.contentCentered}>
      <Spinner color="#4299e1" size="4rem" />
    </div>
  );
  if (task) {
    loaded = (
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.headerChild}>
            <h3 style={{ margin: "1rem" }}>
              <b>{"Reclamo #" + task.number + " - " + task.created_at}</b>
            </h3>
            {task.last_state ? <Status description={task.last_state_description} name={task.last_state} /> : ""}
          </div>
          {task.is_active ? (
            <Button onClick={() => setShowShowModal(true)} variant="outline">
              <p style={{ fontSize: "18px" }}>Cerrar reclamo</p>
            </Button>
          ) : null}
        </div>
        <div className={style.wrapper_content_header}>
          <div className={style.card_container}>
            <Card>
              <div className={style.card_content_title}>
                <div className={style.card_content_icon}>
                  <FontAwesomeIcon icon={faExclamationCircle} size="1x" color="#c30000" />
                </div>
                <h4 className={style.card_title}>Descripcion</h4>
              </div>
              <div className={style.card_content}>
                {task.description ? <p> {task.description}</p> : <p>Sin descripcion</p>}
              </div>
            </Card>
          </div>
          <div className={style.card_content_header}>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content_title}>
                  <div className={style.card_content_icon}>
                    <FontAwesomeIcon icon={faWifi} size="1x" color="#84B5FF" />
                  </div>
                  <h4 className={style.card_title}>Datos Tecnicos</h4>
                </div>
                <div className={style.card_content}>
                  {!subAccount?.dslam ? (
                    <div className={style.error_message_content}>
                      <h4 className={style.boldText}>No existen datos.</h4>
                    </div>
                  ) : (
                    <>
                      <p>
                        {subAccount?.dslam[0]?.dslam && <span className={style.boldText}>DSLAM: </span>}
                        {subAccount?.node[0]?.node && <span className={style.boldText}>Nodo: </span>}
                        <a href={subAccount?.dslam[0]?.nas_ip ?? subAccount?.node[0]?.ip}>
                          {subAccount?.dslam[0]?.dslam ?? subAccount?.node[0]?.node}
                        </a>
                      </p>
                      {subAccount?.dslam[0]?.dslam || subAccount?.node[0]?.node ? null : (
                        <p>
                          <span className={style.boldText}>DSLAM/Nodo: </span> Sin datos
                        </p>
                      )}
                      <p>
                        <span className={style.boldText}>Login: </span>
                        {subAccount.info[0].radius_login}
                      </p>
                      <p>
                        <span className={style.boldText}>Password: </span>
                        {subAccount.info[0].radius_passwd}
                      </p>
                    </>
                  )}
                </div>
              </Card>
            </div>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content_title}>
                  <div className={style.card_content_icon}>
                    <FontAwesomeIcon icon={faHdd} size="1x" color="#777777" />
                  </div>
                  <h4 className={style.card_title}>Equipamiento</h4>
                </div>
                <div className={style.card_content}>
                  {task?.equipment ? (
                    <div className={style.error_message_content}>
                      <h4 className={style.boldText}>No existen datos.</h4>
                    </div>
                  ) : (
                    <>
                      <div className={style.info_content}>
                        <p>
                          <span className={style.boldText}>Modo:</span>
                          {task.equipment[0].model} | {task.equipment[0].mode}
                        </p>
                      </div>
                      <div className={style.info_content}>
                        <p>
                          <span className={style.boldText}>IP:</span>
                          {task.equipment[0].ip}
                        </p>
                      </div>
                      <div className={style.info_content}>
                        <p>
                          <span className={style.boldText}>Mac:</span>
                          {task.equipment[0].mac}{" "}
                        </p>
                      </div>
                      <div className={style.info_content}>
                        <p>
                          <span className={style.boldText}>Wifi:</span>
                          {task.equipment[0].wifi ? "Si" : "No"}{" "}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content_title}>
                  <div className={style.card_content_icon}>
                    <FontAwesomeIcon icon={faEdit} size="1x" color="#5DCE68" />
                  </div>

                  <h4 className={style.card_title}>Servicios</h4>
                </div>
                <div className={style.card_content}>
                  {task.error ? (
                    <div className={style.error_message_content}>
                      <h4 className={style.boldText}>No existen datos.</h4>
                    </div>
                  ) : (
                    <div className={style.wrapper_info_content}>
                      <div className={style.info_content}>
                        <p>
                          <span className={style.boldText}>Servicio: </span>
                          {task.service_type_name} / {task.service_name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className={style.wrapper_content_main}>
          <div className={style.card_container}>
            <div className={style.content_column}>
              <Card>
                <div className={style.wrapper_info_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon icon={faClipboardCheck} size="1x" color="#a91ec1" />
                    </div>
                    <h4 className={style.card_title}>Incidentes</h4>
                  </div>
                  {task.is_active ? (
                    <div className={style.card_content_icon}>
                      <Button
                        onClick={() => {
                          setShowIssueModal(true);
                        }}
                        variant="outline"
                      >
                        Nuevo Incidente
                      </Button>
                    </div>
                  ) : null}
                </div>
                <div className={style.card_content}>
                  {task.incidents[0] ? (
                    <ul>{renderIncidents(task.incidents)}</ul>
                  ) : (
                    <div className={style.error_message_content}>
                      <h4 className={style.boldText}>No existen datos.</h4>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className={style.card_content_main}>
            <div className={style.card_container}>
              <div className={style.content_column}>
                <Card>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon icon={faUserCircle} size="1x" color="#ffca75" />
                    </div>
                    <h4 className={style.card_title}>Cuenta # {task.id_account}</h4>
                  </div>
                  <div className={style.card_content}>
                    {task.error ? (
                      <div className={style.error_message_content}>
                        <h4 className={style.boldText}>No existen datos.</h4>
                      </div>
                    ) : (
                      <>
                        <div className={style.wrapper_info_content}>
                          <div className={style.info_content}>
                            <p>
                              <span className={style.boldText}>Nombre:</span>
                              {task.account_name}
                            </p>
                          </div>
                          <div className={style.info_content}>
                            <FontAwesomeIcon icon={faAddressCard} size="1x" color="#17c3b2" />
                            <p>
                              <span className={style.boldText}>N° Documento:</span>
                              {task.doc_number}
                            </p>
                          </div>
                        </div>
                        <div className={style.wrapper_info_content}>
                          <div>
                            <div className={style.info_content}>
                              <div className={style.card_content_icon}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#fe6d73" />
                              </div>
                              <p>
                                <span className={style.boldText}>Ubicación</span>
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>Domicilio: </span>
                                {task.address}
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>Localidad: </span>
                                {task.region_name}
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>Zona: </span>
                                {task.region_name}
                              </p>
                            </div>
                          </div>
                          <div>{renderPhones(task.phone)}</div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content_title}>
                  <div className={style.card_content_icon}>
                    <FontAwesomeIcon icon={faHardHat} size="1x" color="#ff791a" />
                  </div>
                  <h4 className={style.card_title}>Cuadrilla</h4>
                </div>
                <div className={style.card_content}>
                  {task.team[0] ? (
                    <div>
                      <Card>
                        <div className={style.team_content}>
                          <p> #{task.team[0].id_team}</p>
                          <p> {task.team[0].vehicle_name}</p>
                          <div className={style.img_content}>{renderTeam(task.team)}</div>
                        </div>
                      </Card>
                    </div>
                  ) : (
                    <div className={style.error_message_content}>
                      <h4 className={style.boldText}>No existen datos.</h4>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
        {showIssueModal && (
          <Modal title="Nuevo Incidente" onClose={() => setShowIssueModal(false)}>
            <NewIssueModal
              onClose={() => setShowIssueModal(false)}
              onSave={(description) => incidentHandler(description)}
            />
          </Modal>
        )}
        {showCloseModal && (
          <Modal title="Cerrar reclamo" onClose={() => setShowShowModal(false)}>
            <CloseTaskModal onClose={() => setShowShowModal(false)} onSave={closeTaskHandler} />
          </Modal>
        )}
      </div>
    );
  }

  return <>{loaded}</>;
};

export default Reclamo;
