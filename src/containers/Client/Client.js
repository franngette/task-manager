import React, { useState } from "react";
import style from "./style.module.scss";

import { useSelector } from "react-redux";

import InputText from "../../components/InputText";
import Spinner from "../../components/Spinner/index";
import ClientAccordion from "./ClientAccordion/ClientAccordion";
import AnimatedListItem from "../../components/Animations/AnimatedListItem/AnimatedListItem";
import { faAddressCard, faListOl, faPhone, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { getClients } from "../../api/index";

const Client = (props) => {
  let timeout;
  const id_service = useSelector((state) => state.auth.user.id_service);
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (id_service, account_name, account_number, doc_number, phone_number) => {
    const result = await getClients(id_service, account_name, account_number, doc_number, phone_number);
    setClientList(result);
    setLoading(false);
  };

  const onChangeInputID = async (account_number) => {
    if (account_number === "") {
      setClientList([]);
    } else {
      const search_value = account_number; // this is the search text
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        getData(id_service, "", search_value, "", "");
      }, 500);
    }
  };

  const onChangeInputName = (account_name) => {
    if (account_name === "") {
      setClientList([]);
    } else {
      if (account_name.length > 3) {
        const search_value = account_name; // this is the search text
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          setLoading(true);
          getData(id_service, search_value, "", "", "");
        }, 500);
      }
    }
  };

  const onChangeInputDNI = async (doc_number) => {
    if (doc_number === "") {
      setClientList([]);
    } else {
      if (doc_number.length > 3) {
        const search_value = doc_number.replace(/[,.]\s?/g, ""); // this is the search text
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          getData(id_service, "", "", search_value, "");
        }, 500);
      }
    }
  };

  const onChangeInputPhone = async (phone_number) => {
    if (phone_number === "") {
      setClientList([]);
    } else {
      if (phone_number.length > 3) {
        const search_value = phone_number; // this is the search text
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          getData(id_service, "", "", "", search_value);
        }, 500);
      }
    }
  };

  const renderClientList = () => {
    return clientList.length > 0 && !loading ? (
      clientList.map((el, index) => {
        return (
          <AnimatedListItem index={index} key={index}>
            <ClientAccordion service={id_service} client={el} {...props} />
          </AnimatedListItem>
        );
      })
    ) : (
      <div className={style.error_title}>
        {loading ? <Spinner size="2rem" color="#3182ce" /> : <h3>No hay resultados.</h3>}
      </div>
    );
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
            <div className={style.input_container}>
              <InputText
                type="text"
                icon={faPhone}
                iconColor="#4299e1"
                placeHolder="Telefono..."
                onChange={(e) => onChangeInputPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
        {renderClientList()}
      </div>
    </div>
  );
};

export default Client;
