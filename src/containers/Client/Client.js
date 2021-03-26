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
  const [error , setError] = useState(false);

  const getData = async ({id_service, account_name, account_number, doc_number, phone_number}) => {
    setError(false)
    setLoading(true);
    getClients(id_service, account_name, account_number, doc_number, phone_number)
    .then((res) => {
      if (res.error) {
        setClientList([]);
        setError(true)
      } else {
        setClientList(res);
      }
      setLoading(false);
    })
  };

  const InputsHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let params = {
      id_service,
      account_number: "",
      account_name: "",
      doc_number: "",
      phone_number: "",
    }
    params[name] = value;
    if (value === "") {
      setClientList([]);
    } else {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        getData(params);
      }, 500);
    }
  }

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
        {loading ? <Spinner size="2rem" color="#3182ce" /> : error ? <h3>No hay resultados.</h3> : null}
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
                name="account_number"
                placeHolder="N Cliente..."
                icon={faListOl}
                iconColor="#fe6d73"
                onChange={(e) => InputsHandler(e)}
              />
            </div>
            <div className={style.input_container}>
              <InputText
                type="text"
                name="account_name"
                icon={faUserCircle}
                iconColor="#ffcb77"
                placeHolder="Nombre..."
                onChange={(e) => InputsHandler(e)}
              />
            </div>
            <div className={style.input_container}>
              <InputText
                type="text"
                name="doc_number"
                icon={faAddressCard}
                iconColor="#17c3b2"
                placeHolder="DNI..."
                onChange={(e) => InputsHandler(e)}
              />
            </div>
            <div className={style.input_container}>
              <InputText
                type="text"
                name="phone_number"
                icon={faPhone}
                iconColor="#4299e1"
                placeHolder="Telefono..."
                onChange={(e) => InputsHandler(e)}
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
