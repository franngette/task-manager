import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHardHat, faHome, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

import { Link } from "react-router-dom";

import style from "./style.module.scss";

const SidebarMenu = () => {
  const navItems = [
    { path: "/home", icon: faHome, mobile: true },
    { path: "/client", icon: faUsers, mobile: true },
    { path: "/calendario", icon: faCalendar, mobile: false },
    { path: "/reclamos", icon: faSearch, mobile: false },
    { path: "/cuadrillas", icon: faHardHat, mobile: false },
  ];

  const createNavItems = () => {
    let menuList = navItems;
    if (isMobile) {
      menuList = navItems.filter((e) => e.mobile);
    }
    let listItems = menuList.map((item, index) => {
      const isCurrent = window.location.pathname === item.path;
      return (
        <li className={style.li} key={index}>
          <Link to={item.path}>
            <FontAwesomeIcon icon={item.icon} className={`${style.icon} ${isCurrent ? style.icon_active : ""}`} />
          </Link>
        </li>
      );
    });
    return listItems;
  };

  return (
    <div className={style.container}>
      <BrowserView>
        <div className={style.logoContainer}>
          <img className={style.logo} src="/images/logon.png" alt="G2 Logo" />
        </div>
        <ul className={style.ul}>{createNavItems()}</ul>
      </BrowserView>
      <MobileView style={{ display: "flex", width: "100%" }}>
        <ul className={style.ul}>{createNavItems()}</ul>
      </MobileView>
    </div>
  );
};

export default SidebarMenu;
