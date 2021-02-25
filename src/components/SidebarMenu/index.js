import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHardHat,
  faHome,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import {Link } from "react-router-dom";

import style from "./style.module.scss";

const SidebarMenu = () => {
  const navItems = [
    { path: "/home", icon: faHome },
    { path: "/client", icon: faUsers },
    { path: "/calendario", icon: faCalendar },
    { path: "/reclamos", icon: faSearch },
    { path: "/cuadrillas", icon: faHardHat },
    { path: "/", icon: null},
  ];

  const createNavItems = () => {
    let listItems = navItems.map((item, index) => {
      return (
        <li className={style.li} key={index}>
          <Link to={item.path}>
            <FontAwesomeIcon icon={item.icon} color="white" size="lg" />
          </Link>
        </li>
      );
    });
    return listItems;
  };

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.logo} src="/images/logo.svg" alt="G2 Logo" />
      </div>
      <ul className={style.ul} style={{ width: "25px" }}>
        {createNavItems()}
      </ul>
    </div>
  );
};

export default SidebarMenu;
