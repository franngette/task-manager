import { useEffect, useState } from 'react'
import style from './style.module.scss'

import Card from '../Card/index'
import Button from '../Button/index'
import DropDown from '../DropDown/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const CrearCuadrilla = (props) => {
  const [selectedVehicle, setselectedVehicle] = useState({})
  const [selectedOperators, setSelectedOperators] = useState([])

  useEffect(() => {
    if (props.valueState.operators) {
      setSelectedOperators(props.valueState.operators)
    } else setSelectedOperators(props.valueState)
  }, [props.valueState])

  const handlerOperators = (e) => {
    let found
    if (selectedOperators) {
      found = selectedOperators.find(
        (operator) => operator.id == e.target.value
      )

      if (!found) {
        let operator = props.operators.find(
          (operario) => operario.id == e.target.value
        )
        typeof e.target.value

        setSelectedOperators([...selectedOperators, operator])
      }
      e.preventDefault()
    }
  }

  const handlerVehicles = (e) => {
    let found = props.vehicles.find((car) => car.id == e.target.value)
    if (found) {
      setselectedVehicle(found)
    }
  }

  const deleteOperator = (e, operator) => {
    let found = selectedOperators.findIndex((op) => op.id === operator.id)
    if (found !== -1) {
      let newOperators = selectedOperators.filter((op) => op.id !== operator.id)
      setSelectedOperators(newOperators)
    }
    e.preventDefault()
  }

  const sendData = async (e) => {
    props.sendData(selectedVehicle, selectedOperators)
    e.preventDefault()
  }

  let wrapperStyle = style.wrapper
  if (props.style.width === '0%') {
    wrapperStyle = style.wrapper_hidden
  }

  const List = (values) => {
    return values.map((value, index) => {
      return (
        <li key={index} className={style.operator_selected}>
          <Card>
            <div className={style.operator}>
              <span>{value.id}</span>
              <span>{value.name}</span>
              <button onClick={(e) => deleteOperator(e, value)}>
                <FontAwesomeIcon className="text-red-600" icon={faTrashAlt} />
              </button>
            </div>
          </Card>
        </li>
      )
    })
  }

  return (
    <div style={props.style}>
      <Card>
        <div className={wrapperStyle}>
          <div className={style.container}>
            <div className={style.header}>
              <h3>
                {props.valueState.id_team
                  ? `Editar Cuadrilla # ${props.valueState.id_team}`
                  : 'Nueva Cuadrilla'}
              </h3>
            </div>
            <form>
              <div className={style.content}>
                <label htmlFor="vehiculo">
                  <h4>Vehiculo</h4>
                </label>
                <DropDown
                  selectedValue={props.valueState.vehicle_id}
                  data={props.vehicles}
                  name="vehiculo"
                  form="crear"
                  id="vehiculo"
                  onChange={(e) => {
                    handlerVehicles(e)
                  }}
                />
              </div>
              <div className={style.content}>
                <label htmlFor="operarios">
                  <h4>Operarios</h4>
                </label>
                <div>
                  <DropDown
                    data={props.operators}
                    name="operarios"
                    form="crear"
                    id="operarios"
                    onChange={(e) => handlerOperators(e)}
                  />
                </div>
              </div>
              <div className={style.content_team}>
                <p>Operarios seleccionados: </p>
                <div className={style.team}>
                  <ul>
                    {selectedOperators ? (
                      List(selectedOperators)
                    ) : (
                      <div className={style.content_message}>
                        <p>No tiene operarios seleccionados.</p>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              <div className={style.content_center}>
                <div className={style.content_buttons}>
                  <Button
                    disabled={false}
                    variant="dark"
                    type="submit"
                    onClick={(e) => sendData(e)}
                  >
                    Guardar
                  </Button>
                  <Button
                    disabled={false}
                    variant="outline"
                    type="submit"
                    onClick={props.onClose}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CrearCuadrilla
