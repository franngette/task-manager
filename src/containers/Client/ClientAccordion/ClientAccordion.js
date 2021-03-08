import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import Card from "../../../components/Card/index";
import Status from "../../../components/Status/index";

import {
  faAddressCard,
  faBan,
  faCalendarTimes,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faPhone,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { getClientSubAccounts } from "../../../api/index";

const ClientAccordion = ({ service, client, history }) => {
  const [showAccount, setShowAccount] = useState(false);
  const [subAccounts, setSubAccounts] = useState([]);

  useEffect(() => {
    setShowAccount(false);
  }, [client]);
  
  const showSubAccountHandler = async (service, client) => {
    if (!showAccount) {
      setShowAccount(true);
      getClientSubAccounts(service, client.id_account).then((res) => {
        const updateSubAccount = res.length > 1 ? res : [res];
        console.log(updateSubAccount);
        setSubAccounts(updateSubAccount);
      });
    } else {
      setShowAccount(false);
      setSubAccounts([]);
    }
  };

  const toSubAcc = (item) => {
    let state = {
      client_sub_account: item.sub_account_id,
      client_id: client.id_account,
    };
    history.push("/client_sub_account", state);
  };

  const renderClient = (client) => {
    return (
      <>
        <div className={style.client_content}>
          <div className={style.id}>
            <p># {client.id_account}</p>
          </div>
          <div className={style.childs}>
            <div className={style.content_child_info}>
              <div className={style.child}>
                <h4>{client.account_name}</h4>
                <div className={style.content_left}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#4299e1" />
                  <p>{client.location}</p>
                </div>
              </div>
              <div className={style.child}>
                <div className={style.content_right}>
                  <Status
                    description={client.is_active ? "enabled" : "disabled"}
                    name={client.is_active ? "Activo" : "Inactivo"}
                  />
                </div>
                <div className={style.content_right}>
                  <FontAwesomeIcon icon={faAddressCard} size="1x" color="#17c3b2" />
                  <p>
                    {client.doc_type}: {client.doc_number}
                  </p>
                </div>
                <div className={style.content_right}>
                  <FontAwesomeIcon icon={faPhone} size="1x" color="#4299e1" />
                  <p>{client.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${showAccount ? style.show_accounts : style.hidden_accounts}`}>
          {subAccounts.length > 0 &&
            subAccounts.map((item, index) => {
              return (
                <div
                  className={style.client_card_child}
                  key={index}
                  onClick={() => {
                    toSubAcc(item);
                  }}
                >
                  <div className={style.client_content_childs}>
                    <div className={style.id} style={{ opacity: item.inactive ? "0.6" : "1" }}>
                      <p># {item.sub_account_id}</p>
                    </div>
                    <div className={style.childs}>
                      <div className={style.content_child_info}>
                        <div className={style.child}>
                          <div className={style.content_left}>
                            <FontAwesomeIcon icon={faWifi} size="1x" color="#4299e1" />
                            <p>{item.service_name}</p>
                          </div>
                          <div className={style.content_left}>
                            <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#4299e1" />
                            <p>{item.address}</p>
                          </div>
                        </div>

                        <div className={style.child} title="Baja de servicio">
                          {item.date_inactive ? (
                            <div className={style.content_right}>
                              <FontAwesomeIcon icon={faCalendarTimes} size="1x" color="#4299e1" />
                              <p>{moment(item.date_inactive).format("DD/MM/YYYY")}</p>
                              {/*                          <Status
                              name={item.inactive ? "disabled" : "enabled"}
                              description={
                                item.inactive ? "Inactivo" : "Activo"
                              } 
                            />*/}
                            </div>
                          ) : null}
                          {item.description_inactive ? (
                            <div className={style.content_right}>
                              <FontAwesomeIcon icon={faBan} size="1x" color="#4299e1" />
                              <p>{item.description_inactive}</p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  };
  return (
    <div className={style.client_card}>
      <Card>
        <div onClick={() => showSubAccountHandler(service, client)}>{renderClient(client)}</div>
      </Card>
    </div>
  );
};

export default ClientAccordion;
