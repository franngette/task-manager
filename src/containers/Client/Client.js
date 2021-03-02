import React, { useState } from "react";

import { getClients } from "../../api/index";
import InputText from "../../components/InputText";
import { faAddressCard, faListOl, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ClientAccordion from "./ClientAccordion/ClientAccordion";
import style from "./style.module.scss";

const Client = (props) => {
  const id_service = 1;
  const [clientList, setClientList] = useState([]);

  const onChangeInputID = async (e) => {
    if (e === "") {
      setClientList([]);
    } else {
      const result = await getClients(id_service, "", e, "");
      console.log(result)
      setClientList(result);
    }
  };

  const onChangeInputName = async (e) => {
    if (e === "") {
      setClientList([]);
    } else {
      if (e.length > 3) {
        const result = await getClients(id_service, e, "", "");
        setClientList(result);
      }
    }
  };

  const onChangeInputDNI = async (e) => {
    if (e === "") {
      setClientList([]);
    } else {
      const result = await getClients(id_service, "", "", e.replace(/[,.]\s?/g, ""));
      setClientList(result);
    }
  };

  return (
    <div>
      <h3>
        <b>Buscar cliente</b>
      </h3>
      <div className={style.client}>
        <div className={style.search_container}>
          <div className={style.input_wrapper}>
            <div className={style.input_container}>
              <InputText
                type="number"
                placeHolder="N Cliente..."
                icon={faListOl}
                iconColor="#fe6d73"
                onChange={(e) => onChangeInputID(e.target.value)}
              />
            </div>
            <div className={style.input_container}>
              <InputText
                type="text"
                icon={faUserCircle}
                iconColor="#ffcb77"
                placeHolder="Nombre..."
                onChange={(e) => onChangeInputName(e.target.value)}
              />
            </div>
            <div className={style.input_container}>
              <InputText
                type="text"
                icon={faAddressCard}
                iconColor="#17c3b2"
                placeHolder="DNI..."
                onChange={(e) => onChangeInputDNI(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          {clientList.length > 0 && clientList[0] !== false ? (
            clientList.map((el, index) => {
              return (
                <div key={index}>
                  <ClientAccordion client={el} />
                </div>
              );
            })
          ) : (
            <div>
              <h3>Realice la busqueda</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Client;
