import React, { useEffect, useState } from 'react'
import style from './style.module.scss'

import DropDown from '../../DropDown/index'
import Button from '../../Button/index'
import Message from '../../Message/index'
import Spinner from '../../Spinner/index'

import { createStatusTask, getStatus } from '../../../api/index'

const Status = ({ task, onClose }) => {
  console.log('asgasg')

  const [stateSelected, setStateSelected] = useState()
  const [states, setStates] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const getData = async () => {
    const status = await getStatus();
    setStates(status)
  }
  useEffect(() => {
    getData()
  },[])

  const updateStateHandler = (e) => {
    e.preventDefault()
    const id_calendar = task.id
    const newStatus = stateSelected
    setLoading(true)
    createStatusTask(id_calendar, newStatus)
      .then((res) => {
        setMessage(res.message)
        setError(false)
        setLoading(false)
      })
      .catch((error) => {
        setError(true)
        setMessage(error.message)
        setLoading(false)
      })

    /* setTimeout(() => {
      setMessage('')
    }, 5000)*/

  }
  let render = null;
  if (states) {
    render = (    <div>
      <div className={style.modalContent}>
        <label htmlFor="status">
          <h4>Estados</h4>
        </label>
        <DropDown
          selectedValue={states[0].id}
          data={states}
          name="status"
          form="asignar"
          id="status"
          onChange={(e) => {
            setStateSelected(e.target.value)
          }}
        />
      </div>
      <div className={style.wrapper_message}>
        <div className={style.content_message}>
          {message.length > 0 && (
            <Message type={error ? 'error' : 'success'} message={message} />
          )}
        </div>
      </div>
      <div className={style.buttom}>
        <Button
          variant="dark"
          type="submit"
          onClick={(e) => updateStateHandler(e)}
        >
          {loading ? <Spinner /> : 'Guardar'}
        </Button>
        <Button
          variant="outline"
          type="submit"
          onClick={() => {
            onClose()
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>)
  }
  return (
    <div>{render}</div>
  )
}

export default Status
