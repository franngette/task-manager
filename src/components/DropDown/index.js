import style from './style.module.css'
import PropTypes from 'prop-types'

const DropDown = ({ data, form, name, id, onChange, selectedValue }) => {
  const displayOptions = (data) => {
    return data.map((el) => {
      return (
        <option value={el.id} key={el.id}>
          {el.name}
        </option>
      )
    })
  }
  return (
    <select
      className={style.select}
      name={name}
      form={form}
      id={id}
      onChange={onChange}
      defaultValue={selectedValue}
      required
    >
      {displayOptions(data)}
    </select>
  )
}

DropDown.propTypes = {
  form: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  selectedValue: PropTypes.number,
}

export default DropDown
