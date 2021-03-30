import React, { useEffect, useState, useRef } from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Selector = ({ nameKey, onSelected, icons, data }) => {
  const defaultValue = { id: "", name: "Todos" }
  const arrData = data ? [defaultValue, ...data] : 0;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [valueName, setValueName] = useState("");
  const [newData, setNewData] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    setValueName("Todos");
    setNewData(arrData);
  }, [data]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setValueName("Todos");
      setOpen(false)
      optionHandler(0, defaultValue);
    }
  }

  const openHandler = () => {
    setOpen(!open);
    if (valueName === "") {
      setValueName("Todos");
      optionHandler(0, defaultValue);
    }
  };

  const optionHandler = (i, el) => {
    setValueName(el.name);
    setValue(i);
    onSelected({ target: { name: nameKey, value: el.id } });
    setOpen(false);
  };

  const filterValue = (value) => {
    setOpen(true);
    setValueName(value);
    if (value.length > 0) {
      const filteredData = newData.filter((data) => data.name.includes(value));
      if (filteredData.length > 0) {
        setNewData(filteredData);
      }
    }
    if (value === "") {
      setNewData(arrData);
    }
  };

  const renderOptions = (values) => {
    return values.map((el, i) => (
      <div
        className={style.options}
        onClick={() => optionHandler(i, el)}
        key={el.name}
      >
        {icons && icons[i] && (
          <div className={style.icon}>
            <FontAwesomeIcon icon={icons[i].icon} color={icons[i].color} />
          </div>
        )}
        <div>{el.name}</div>
      </div>
    ));
  };

  return (
    <>
      {data && (
        <div className={style.wrapper}>
          <div
            className={`${style.select} ${open ? style.borderTop : ""} `}
            onClick={() => {
              setValueName("");
              openHandler();
            }}
          >
            <div className={style.selectedOption}>
              {icons && icons[value] && (
                <div className={style.icon}>
                  <FontAwesomeIcon
                    icon={icons[value].icon}
                    color={icons[value].color}
                  />
                </div>
              )}
              <input
                style={{outline:"none"}}
                type="text"
                value={valueName}
                onChange={(e) => {
                  filterValue(e.target.value);
                }}
              />
              {/*               <div>{newData[value].name}</div> */}
            </div>
            <div onClick={() => openHandler()}>
              <FontAwesomeIcon icon={faChevronCircleDown} color="#2c5282" />
            </div>
          </div>
          {open && (
            <div ref={ref} className={style.optionsWrapper}>{renderOptions(newData)}</div>
          )}
        </div>
      )}
    </>
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
