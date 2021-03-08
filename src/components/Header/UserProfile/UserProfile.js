import React from "react";
import {
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./style.module.scss";

import Card from "../../Card/index";

import { useDispatch } from "react-redux";
import * as actions from '../../../store/actions/index'
import { useHistory } from "react-router-dom";

const UserProfile = (props) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(actions.authLogout())
    history.push('/')
  };

  return (
    <div className={style.options_menu_container}>
      <Card>
        <div className={style.options}>
          <button
            className={style.button_option}
            onClick={() => {
              props.onEdit();
            }}
          >
            <div className={style.option}>
              <FontAwesomeIcon icon={faCog} size="1x" className={style.icon} />
            </div>
            <p>Configuración</p>
          </button>
          <button
            className={style.button_option}
            onClick={() => {
              logoutHandler();
            }}
          >
            <div className={style.option}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size="1x"
                className={style.icon}
              />
            </div>
            <p>Cerrar sesión</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
