import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/index";
import Status from "../../../components/Status/index";
import Spinner from "../../../components/Spinner/index";

import style from "./reclamo.module.scss";

import {
  faAddressCard,
  faBroadcastTower,
  faClipboardCheck,
  faExclamationCircle,
  faFileContract,
  faHardHat,
  faMapMarkerAlt,
  faPhone,
  faServer,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getTask, getSubAccountData } from "../../../api/index";

import { useSelector } from "react-redux";

const Reclamo = (props) => {
  //const location = useLocation()
  const id_service = useSelector((state) => state.auth.user.id_service);
  const id_account = props.location.state.id_account;
  const id_task = props.location.state.id_task;

  const [task, setTask] = useState();
  const [subAccount, setSubAccount] = useState();

  const incidentes = { error: true };

  //console.log(props.location.state.task);

  const getData = async () => {
    const subAccounData = await getSubAccountData(id_service, id_account);
    setSubAccount(subAccounData);
    const taskData = await getTask(id_service, id_task);
    console.log("SUB", subAccounData, "taskDate", taskData);
    setTask(taskData);
  };
  useEffect(() => {
    getData();
  }, [id_account, id_task]);

  const renderPhones = (phones) => {
    return phones.map((phone, index) => {
      return (
        <div className={style.info_content} key={index}>
          <FontAwesomeIcon icon={faPhone} size="1x" color="#4299e1" />
          <p className={style.phone_content}>{phone.phone_number}</p>
        </div>
      );
    });
  };

  const renderTeam = (teams) => {
    return teams.map((team, index) => {
      return (
        <div key={index}>
          <img
            className={style.img}
            src={`${team.photo}`}
            alt=""
            title={team.operator_name}
          />
        </div>
      );
    });
  };

  let loaded = <Spinner />;
  if (task) {
    loaded = (
      <div className={style.wrapper}>
        <div className={style.header}>
          <h3 style={{ margin: "1rem" }}>
            <b>{"Reclamo #" + task.number + " - " + task.created_at}</b>
          </h3>

          {task.last_state ? (
            <Status
              description={task.last_state_description}
              name={task.last_state}
            />
          ) : (
            ""
          )}
        </div>
        <div className={style.wrapper_content_header}>
          <div className={style.card_container}>
            <Card>
              <div className={style.card_content}>
                <div className={style.card_content_title}>
                  <div className={style.card_content_icon}>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      size="1x"
                      color="#c30000"
                    />
                  </div>
                  <h4 className={style.card_title}>Descripcion</h4>
                </div>
                <p> {task.description}</p>
              </div>
            </Card>
          </div>
          <div className={style.card_content_header}>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon
                        icon={faBroadcastTower}
                        size="1x"
                        color="#d800ff"
                      />
                    </div>
                    <h4 className={style.card_title}>Datos Tecnicos</h4>
                  </div>
                  {subAccount?.dslam.length === 0 ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    <>
                      <p>
                        {subAccount?.dslam[0].length > 0 ? (
                          <span className={style.boldText}></span>
                        ) : (
                          <span className={style.boldText}></span>
                        )}
                        <a
                          href={
                            subAccount?.dslam[0]?.nas_ip ??
                            subAccount?.node[0]?.ip
                          }
                        >
                          {subAccount?.dslam[0]?.dslam ??
                            subAccount?.node[0]?.node}
                        </a>
                      </p>
                      <p>
                        {subAccount?.dslam[0] ? (
                          <span className={style.boldText}>Port: </span>
                        ) : (
                          <span className={style.boldText}></span>
                        )}
                        {subAccount?.dslam[0]?.port_number ??
                          subAccount?.node[0]?.band}
                      </p>
                      <p>{subAccount.info[0].radius_login}</p>
                      <p>{subAccount.info[0].radius_passwd}</p>
                    </>
                  )}
                </div>
              </Card>
            </div>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon
                        icon={faServer}
                        size="1x"
                        color="#777777"
                      />
                    </div>
                    <h4 className={style.card_title}>Equipamiento</h4>
                  </div>
                  {task?.equipment[0].error ? (
                    <p>No existen datos.</p>
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
                <div className={style.card_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon
                        icon={faFileContract}
                        size="1x"
                        color="#4299e1"
                      />
                    </div>

                    <h4 className={style.card_title}>Servicios</h4>
                  </div>
                  {task.error ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    <div className={style.wrapper_info_content}>
                      <div className={style.info_content}>
                        <p>
                          <span className={style.boldText}>Servicio:</span>
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
                <div className={style.card_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon
                        icon={faClipboardCheck}
                        size="1x"
                        color="#14c522"
                      />
                    </div>
                    <h4 className={style.card_title}>Incidentes</h4>
                  </div>
                  {incidentes.error ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className={style.card_content_main}>
            <div className={style.card_container}>
              <div className={style.content_column}>
                <Card>
                  <div className={style.card_content}>
                    <div className={style.card_content_title}>
                      <div className={style.card_content_icon}>
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          size="1x"
                          color="#ffca75"
                        />
                      </div>
                      <h4 className={style.card_title}>
                        Cuenta # {task.id_account}
                      </h4>
                    </div>
                    {task.error ? (
                      <p className={style.error_message}>No existen datos.</p>
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
                            <FontAwesomeIcon
                              icon={faAddressCard}
                              size="1x"
                              color="#17c3b2"
                            />
                            <p>
                              <span className={style.boldText}>
                                N° Documento:
                              </span>
                              {task.doc_number}
                            </p>
                          </div>
                        </div>
                        <div className={style.wrapper_info_content}>
                          <div>
                            <div className={style.info_content}>
                              <div className={style.card_content_icon}>
                                <FontAwesomeIcon
                                  icon={faMapMarkerAlt}
                                  size="1x"
                                  color="#fe6d73"
                                />
                              </div>
                              <p>
                                <span className={style.boldText}>
                                  Ubicación
                                </span>
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>
                                  Domicilio:{" "}
                                </span>
                                {task.address}
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>
                                  Localidad:{" "}
                                </span>
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
                          {renderPhones(task.phone)}
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon
                        icon={faHardHat}
                        size="1x"
                        color="#ff791a"
                      />
                    </div>
                    <h4 className={style.card_title}>Cuadrilla</h4>
                  </div>
                  {task.team[0].error ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    <div>
                      <Card>
                        <div className={style.team_content}>
                          <p> #{task.team[0].id_team}</p>
                          <p> {task.team[0].vehicle_name}</p>
                          <div className={style.img_content}>
                            {renderTeam(task.team)}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{loaded}</>;
};

export default Reclamo;
