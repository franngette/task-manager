import React, { useState, useEffect } from "react";
import Card from "../../components/Card/index";
import Status from "../../components/Status/index";
import Spinner from "../../components/Spinner/index";
import Layout from "../Layout/index";

import style from "./reclamo.module.css";

import { getStatusTask, getTask } from "../../api/index";
import { useLocation } from "react-router-dom";

const Reclamo = (props) => {
  //const location = useLocation()
  const [task, setTask] = useState(props.location.state.task);
  const cuadrilla = { error: true };
  //const cuenta = { error: true };
  const equipamientos = { error: true };
  //const servicios = { error: true };
  const incidentes = { error: true };


  let loaded = <Spinner />;
  if (task) {
    loaded = (
      <div>
        <div className={style.title_container}>
          <h3 style={{ margin: "1rem" }}>
            <b>{"Reclamo #" + task.number + " - " + task.created_at}</b>
          </h3>

          <div className={style.status_container}>
            {task.last_state ? (
              <Status
                description={task.last_state_description}
                name={task.last_state}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={style.wrapper}>
          <div className={style.wrapper_content}>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <h4 className={style.card_title}>Descripcion</h4>
                  <div className={style.description}>
                    <p> {task.description}</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <h4 className={style.card_title}>Cuadrilla</h4>
                  {cuadrilla.error ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className={style.wrapper_content}>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <h4 className={style.card_title}>Incidentes</h4>
                  {incidentes.error ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </div>
            <div className={style.card_container}>
              <div className={style.content_column}>
                <Card style={{ marginBottom: "0.5rem" }}>
                  <div className={style.card_content}>
                    <h4 className={style.card_title}>
                      Cuenta # {task.id_account}
                    </h4>
                    {task.error ? (
                      <p className={style.error_message}>No existen datos.</p>
                    ) : (
                      <div className={style.info_reclamo}>
                        <div className={style.info_content}>
                          <p className={style.title_content}>Nombre:</p>
                          <p> {task.account_name}</p>
                        </div>
                        <div className={style.info_content}>
                          <p className={style.title_content}>N° Telefono: </p>
                          {/*                         <p>
                          {" "}
                          {task.phone.phone_number
                            ? task.phone.phone_number
                            : ""}
                        </p> */}
                        </div>
                        <div className={style.info_content}>
                          <p className={style.title_content}>N° Documento:</p>
                          <p> {task.doc_number}</p>
                        </div>
                        <div className={style.info_content}>
                          <p className={style.title_content}>Domicilio: </p>
                          <p> {task.address}</p>
                        </div>
                        <div className={style.info_content}>
                          <p className={style.title_content}>Localidad: </p>
                          <p> {task.region_name}</p>
                        </div>
                        <div className={style.info_content}>
                          <p className={style.title_content}>Zona: </p>
                          <p> {task.region_name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
                <Card>
                  <div className={style.card_content}>
                    <h4 className={style.card_title}>Servicios</h4>
                    {task.error ? (
                      <p className={style.error_message}>No existen datos.</p>
                    ) : (
                      <p> {task.service_type_name}</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className={style.wrapper_content}>
            <div className={style.card_container}>
              <Card>
                <div className={style.card_content}>
                  <h4 className={style.card_title}>Equipamientos</h4>
                  {equipamientos.error ? (
                    <p className={style.error_message}>No existen datos.</p>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{loaded}</div>;
};

export default Reclamo;
