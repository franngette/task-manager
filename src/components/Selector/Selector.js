import React, { useState } from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Selector = ({ defaultValue = 1, onSelected, icons, data }) => {
  const valueIndex = data.findIndex((el) => el.id === defaultValue);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(valueIndex);

  const openHandler = () => {
    setOpen(!open);
  };

  const optionHandler = (i, el) => {
    setValue(i);
    setOpen(!open);
    onSelected(el.id);
  };

  const renderOptions = () => {
    return data.map((el, i) => {
      return (
        <div className={style.options} onClick={() => optionHandler(i, el)} key={i}>
          {icons[i] && (
            <div className={style.icon}>
              <FontAwesomeIcon icon={icons[i].icon} color={icons[i].color} />
            </div>
          )}
          <div>{el.name}</div>
        </div>
      );
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={`${style.select} ${open ? style.borderTop : ""} `} onClick={() => openHandler()}>
        <div className={style.selectedOption}>
          {icons[value] && (
            <div className={style.icon}>
              <FontAwesomeIcon icon={icons[value].icon} color={icons[value].color} />
            </div>
          )}
          <div>{data[value].name}</div>
        </div>
        <FontAwesomeIcon icon={faChevronCircleDown} color="#2c5282" />
      </div>
      {open && <div className={style.optionsWrapper}>{renderOptions()}</div>}
    </div>
  );
};

Selector.propstype = {
  defaultValue: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      color: PropTypes.string,
    })
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default Selector;
