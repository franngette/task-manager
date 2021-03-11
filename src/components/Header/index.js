import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

//import Notification from "../Notification/Notification";
import UserProfile from "./UserProfile/UserProfile";
import Modal from "../Modal";
import Button from "../Button/index";
import Spinner from "../Spinner/index";
import DropDown from "../DropDown/index";

import useVisible from "../../hooks/useVisible";
import { useDispatch, useSelector } from "react-redux";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as actions from "../../store/actions/index";
import { getServices, updatedUserProfile } from "../../api/index";


const Header = () => {
  const userStorage = useSelector((state) => state.auth.user);

  const { ref, isVisible, setIsVisible } = useVisible(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorValidation, setErrorValidation] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [services, setServices] = useState([]);
  const [image, setImage] = useState();
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  const getData = async () => {
    const servicesData = await getServices();
    setServices(servicesData);
  };
  useEffect(() => {
    getData();
    setUser(userStorage);
    setEmail(userStorage.email_address);
  }, [userStorage]);

  const menuHablder = () => {
    setIsVisible(!isVisible);
  };

  const userProfileHandler = () => {
    setIsVisibleModal(!isVisibleModal);
    setError(false);
    setErrorValidation(false);
  };

  const inputHandler = (e) => {
    e.preventDefault();
    setErrorValidation(false);
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
    const validated = new RegExp(pattern).test(email);
    if (!validated) {
      setErrorValidation(true);
    } else {
      setDisabled(!disabled);
    }
  };

  const emailHandler = (email) => {
    const newEmail = email;
    setEmail(newEmail);
  };

  const updateService = (id_service) => {
    const serviceSelected = parseInt(id_service);
    dispatch(actions.updatedService(serviceSelected));
  };

  const uploadImageHandler = (e) => {
    const image = e.target.files;
    console.log(image);
    if (image.length > 0) {
      setImage(image);
    } else {
      setErrorValidation(true);
    }
  };

  const onSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (errorValidation) {
      setError(true);
      setLoading(false);
    } else {
      let formData = new FormData();
      formData.append("user", user.id);
      formData.append("file", image[0]);
      formData.append("email", email);
      const result = await updatedUserProfile(formData);
      if (result.error) {
        setError(true);
        setLoading(false);
      } else {
        let newUser = user;
        newUser["photo"] = result.photo;
        newUser["email_address"] = email;
        dispatch(actions.authLogged(newUser));
        setLoading(false);
        setError(false);
      }
    }
  };

  return (
    <div ref={ref} className={style.container}>
      <div className={style.container_services}>
        <DropDown
          selectedValue={user ? user.id_service : 1}
          data={services}
          name="services"
          form="services"
          id="services"
          onChange={(e) => {
            updateService(e.target.value);
          }}
        />
      </div>
      {/*       <Notification
        icon={faBell}
        cantNotifications={countNotifications}
        iconColor={"black"}
      /> */}

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
          <img className={style.img} src={user?.photo ? user.photo : "/images/notfound.png"} alt="" />
        </button>
      </div>
      {isVisible && <UserProfile onEdit={userProfileHandler} />}
      {isVisibleModal && (
        <Modal title="Configuración" onClose={userProfileHandler}>
          <form onSubmit={(e) => onSumbit(e)}>
            <div className={style.form_content}>
              <div className={style.user_content}>
                <p>N° de usuario: {user.id}</p>
                <p>Nombre: {user.first_name + " " + user.last_name}</p>
                <p>Nombre de usuario: {user.username}</p>
              </div>
              <div className={style.img_selector_content}>
                <div>
                  <img
                    style={{
                      height: "9rem",
                      width: "9rem",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #2c5282",
                    }}
                    src={user?.photo ? user.photo : "/images/notfound.png"}
                    alt=""
                  />
                </div>
                <div>
                  <label htmlFor="file_upload" className={style.option}>
                    <FontAwesomeIcon icon={faCamera} />
                  </label>

                  <input
                    id="file_upload"
                    style={{ display: "none" }}
                    type="file"
                    name="imagen"
                    onChange={(e) => {
                      uploadImageHandler(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={style.form_content}>
              <input
                value={email}
                onChange={(e) => {
                  emailHandler(e.target.value);
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
                <p>{disabled ? "Editar" : "Confirmar"}</p>
              </Button>
            </div>
            {errorValidation && (
              <p style={{ color: "red" }}>El email es incorrecto!.</p>
            )}
            <div className={style.form_content_button}>
              <Button variant="blue" type="submit" onClick={() => {}}>
                {loading ? <Spinner size={"1.2rem"} /> : "Guardar"}
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
        </Modal>
      )}
    </div>
  );
};

export default Header;
