import React from "react";
import PropTypes from "prop-types";
import style from "./style.module.scss";

const Button = ({ type = "submit", variant, children, onClick, disabled = false }) => {
  let color = style.default;
  switch (variant) {
    case "dark":
      color = style.dark;
      break;
    case "blue":
      color = style.blue;
      break;
    case "medium":
      color = style.medium;
      break;
    case "light":
      color = style.light;
      break;
    case "outline":
      color = style.outline;
      break;
    default:
      color = style.default;
  }

  return (
    <button disabled={disabled ? disabled : false} className={color} id={style.button} type={type} onClick={onClick}>
      <p className={style.button_content}>{children}</p>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf(["dark", "blue", "medium", "light", "outline"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
