import React from "react";
import style from "./style.module.scss";
import PropTypes from "prop-types";

const Spinner = ({ color = "gray", size = "2rem" }) => {
  const obj = {
    borderTop: `1.1em solid ${color}`,
    borderRight: `1.1em solid ${color}`,
    borderBottom: `1.1em solid ${color}`,
    borderLeft: `1.1em solid #ffffff`,
    width: `${size}`,
    height: `${size}`,
  };
  return (
    <div className={style.loader} style={obj}>
      Loading...
    </div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};
export default Spinner;
