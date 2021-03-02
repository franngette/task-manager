import React, { useState } from "react";
import style from "./style.module.scss";

import Notification from "../Notification/Notification";
import UserProfile from "./UserProfile/UserProfile";
import Modal from "../Modal";
import Button from "../Button/index";
import Spinner from "../Spinner/index";

import useVisible from "../../hooks/useVisible";
import { useSelector } from "react-redux";

import { faBell, faEdit, faPen } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const countNotifications = 1;
  const user = useSelector((state) => state.auth.user);

  const { ref, isVisible, setIsVisible } = useVisible(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorValidation, setErrorValidation] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState(user.email_address);

  const menuHablder = () => {
    setIsVisible(!isVisible);
  };

  const userProfileHandler = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const inputHandler = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
  };

  const emailHandler = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (errorValidation) {
      setErrorValidation(false)
    }
  };

  const onSumbit = (e) => {
    e.preventDefault();
    var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
    const validated = new RegExp(pattern).test(email);
    if (!validated) {
      setErrorValidation(true)
    } else {
      if (errorValidation) {
        setError(false)
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);      
    }

  };

  return (
    <div ref={ref} className={style.container}>
      <Notification
        icon={faBell}
        cantNotifications={countNotifications}
        iconColor={"black"}
      />
      <div className={style.profile_container}>
        <button
          className={style.button}
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
          onClick={() => {
            menuHablder();
          }}
        >
          <img
            className={style.img}
            src="https://static.vix.com/es/sites/default/files/c/cringe_smile.png"
            alt=""
          />
        </button>
      </div>
      {isVisible && <UserProfile onEdit={userProfileHandler} />}
      {isVisibleModal && (
        <Modal title="Configuración" onClose={userProfileHandler}>
          <div className={style.user_content}>
            <p>N° de usuario: {user.id}</p>
            <p>Nombre: {user.first_name + " " + user.last_name}</p>
            <p>Nombre de usuario: {user.username}</p>
            <form onSubmit={(e) => onSumbit(e)}>
              <div className={style.form_content}>
                <input
                  value={email}
                  onChange={(e) => {
                    emailHandler(e);
                  }}
                  disabled={disabled}
                />
                <Button
                  variant="outline"
                  type=""
                  onClick={(e) => {
                    inputHandler(e);
                  }}
                >
                  <p>Editar</p>
                </Button>
              </div>
              {errorValidation && (
                  <p style={{ color: "red" }}>
                    El email es incorrecto!.
                  </p>
                )}
              <div className={style.form_content_button}>
                <Button variant="blue" type="submit" onClick={() => {}}>
                  {loading ? <Spinner size={"1.2rem"} /> : "Ingresar"}
                </Button>
                <Button
                  variant="outline"
                  type=""
                  onClick={() => {
                    userProfileHandler();
                  }}
                >
                  <p>Cancelar</p>
                </Button>
                {error && (
                  <p style={{ color: "red" }}>
                    Ocurrio un error, vuelva intentar!.
                  </p>
                )}
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Header;
