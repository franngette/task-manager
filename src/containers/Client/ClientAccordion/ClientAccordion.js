import React, { useState } from "react";
import Card from "../../../components/Card/index";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { useHistory } from "react-router-dom";

const ClientAccordion = ({ client }) => {
  const [hovered, setHovered] = useState(false);

  const toggleHover = () => setHovered(!hovered);
  const history = useHistory();

  let styledDiv = "hidden";
  if (hovered) {
    styledDiv = style.client_card_child;
  }

  const toSubAcc = (item) => {
    let state = { client_sub_account: item.sub_account_id, client_id: client.id_account };
    history.push("/clientSubAccount", state);
  };

  return (
    <div className={style.client_card} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <Card>
        <div className={style.client_content}>
          <div className={style.id}>
            <p># {client.id_account}</p>
          </div>
          <div className={style.child}>
            <h4>{client.account_name}</h4>
          </div>
          <div className={style.child}>
            <p>
              {client.doc_type}: {client.doc_number}
            </p>
          </div>
          <div className={style.child}>
            <p>{client.location}</p>
          </div>
        </div>
      </Card>

      <div style={{ width: "100%" }}>
        {client.sub_accounts &&
          client.sub_accounts.map((item, index) => {
            return (
              <div
                className={styledDiv}
                key={index}
                onClick={() => {
                  toSubAcc(item);
                }}
              >
                <div className={style.client_content}>
                  <div className={style.id} style={{ opacity: "0.6" }}>
                    <p># {item.sub_account_id}</p>
                  </div>
                  <div className={style.child}>
                    <p>Servicio: {item.service_name}</p>
                  </div>
                  <div className={style.child}>
                    <p>Dirrecion: {item.address}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientAccordion;
