import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHardHat,
  faHome,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import style from "./style.module.scss";

const SidebarMenu = () => {
  const navItems = [
    { path: "/home", icon: faHome },
    { path: "/client", icon: faUsers },
    { path: "/calendario", icon: faCalendar },
    { path: "/reclamos", icon: faSearch },
    { path: "/cuadrillas", icon: faHardHat },
  ];

  const createNavItems = () => {
    let listItems = navItems.map((item, index) => {
      const isCurrent = window.location.pathname === item.path;
      return (
        <li className={style.li} key={index}>
          <Link to={item.path}>
            <FontAwesomeIcon
              icon={item.icon}
              className={`${style.icon} ${isCurrent ? style.icon_active : ""}`}
            />
          </Link>
        </li>
      );
    });
    return listItems;
  };

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.logo} src="/images/logon.png" alt="G2 Logo" />
      </div>
      <ul className={style.ul}>
        {createNavItems()}
      </ul>
    </div>
  );
};

export default SidebarMenu;
