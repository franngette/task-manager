import style from "./style.module.css";
import PropTypes from "prop-types";

const DropDown = ({ data, form, name, id, onChange, selectedValue = 0 }) => {
  const newData = [{ id: 0, name: "Seleccione..." }, ...data];
  const displayOptions = (data) => {
    return data.map((el, index) => {
      return (
        <option value={el.id} key={el.name + el.id} disabled={index === 0 ? true : false}>
          {el.name ? el.name : "No hay datos"}
        </option>
      );
    });
  };
  return (
    <select
      className={style.select}
      name={name}
      form={form}
      id={id}
      defaultValue={selectedValue}
      onChange={onChange}
      required
    >
      {displayOptions(newData)}
    </select>
  );
};

DropDown.propTypes = {
  form: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  selectedValue: PropTypes.number,
  data: PropTypes.array,
};

export default DropDown;
