import { useEffect, useState } from 'react'

import styles from './reclamos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarMinus,
  faMapMarkerAlt,
  faEllipsisV,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'

import {
  createCalendar,
  getStates,
  getTasks,
  getTeams,
  getTask,
} from '../../api/index'
import {Link } from "react-router-dom";

import AsignTeam from '../../components/AsignTeam/index'
import Card from '../../components/Card/index'
import Status from '../../components/Status/index'
import DropDown from '../../components/DropDown/index'
import InputText from '../../components/InputText/index'

export default function Index(props) {
  const [reclamos, setReclamos] = useState(props.reclamos)
  const [open, setOpen] = useState(false)
  const [selectedReclamo, setSelectedReclamo] = useState({})
  const [res, setRes] = useState(false)
  const [tasksState, setTasksState] = useState(1)
  const [style, setStyle] = useState({
    width: '0%',
    transition: 'width 1s',
  })

  useEffect(() => {
    const refreshTasks = async () => {
      const response = await getTasks(1, '', '', '', '', '', tasksState, '')
      setReclamos(response)
    }
    refreshTasks()
  }, [tasksState])

  const inputTaskHandler = async (task_id) => {
    const res = await getTask(props.id_service, task_id)
    setReclamos(res)
  }

  const onSave = async (test, teamDate, team, priority) => {
    const res = await createCalendar(test, teamDate, team, priority)
    setRes(res)
    return res
  }

  const handlerReclamo = (reclamo) => {
    setSelectedReclamo(reclamo)
    if (!open) {
      const styles = {
        width: '40%',
        transition: 'width 1s',
      }
      setStyle(styles)
      setOpen(true)
    }
  }

  const handleClose = (e: any) => {
    const styles = {
      width: '0%',
      transition: 'width 1s',
    }
    setStyle(styles)
    setOpen(false)
    e.preventDefault()
  }
  const createLiReclamos = (reclamos) => {
    if (reclamos[0]) {
      const listReclamos = reclamos.map((reclamo, index) => {
        return (
          <li key={index}>
            <div className={styles.card_wrapper}>
              <Card>
                <div className={styles.card}>
                  <Link to={`/reclamos/${reclamo.id}/${reclamo.number}`}>
                    <div className={styles.card_container}>
                      <div className={styles.card_content}>
                        <h4>{reclamo.account_name}</h4>
                        <div className={styles.card_item}>
                          <Status
                            description={reclamo.last_state_description}
                            name={reclamo.last_state}
                          />
                        </div>
                      </div>
                      <div className={styles.card_content}>
                        <div className={styles.card_item}>
                          <p># {reclamo.number}</p>
                          <div className={styles.mh}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />
                          </div>
                          <p>{reclamo.region_name}</p>
                        </div>
                        <div className={styles.card_item}>
                          <div className={styles.mh}>
                            <FontAwesomeIcon
                              className={styles.icon}
                              icon={faCalendarMinus}
                              size="1x"
                            />
                          </div>
                          <div>
                            <p>{reclamo.created_at}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className={styles.button_container}>
                    <button
                      className={styles.button}
                      onClick={() => handlerReclamo(reclamo)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} size="1x" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </li>
        )
      })
      return listReclamos
    }
  }
  /*options para el select sort
  const createOptions = (tipos: any[]) => {
    let listOptions = tipos.map((tipo) => (
      <option key={tipo.id} value={tipo.id}>
        {tipo.descripcion}
      </option>
    ))
    return listOptions
  }
  const handleChange = (e) => {
    console.log(e.target.value)
    setTipoSelected(e.target.value)
  }*/

  return (
    <div>
      <div className={styles.header}>
        <h3 style={{ margin: '1rem' }}>
          <b>Reclamos</b>
        </h3>
        <div className={styles.filters}>
          <InputText
            icon={faSearch}
            type="text"
            placeHolder="Buscar reclamo..."
            onChange={(event) => inputTaskHandler(event.target.value)}
          />
          <DropDown
            data={props.states}
            onChange={(event) => setTasksState(event.target.value)}
          />
        </div>
      </div>
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ul style={{ width: '100%', marginRight: '1rem' }}>
            {createLiReclamos(reclamos)}
          </ul>
          <AsignTeam
            style={style}
            close={handleClose}
            data={selectedReclamo}
            operators={props.operators}
            onsave={onSave}
            res={res}
          />
        </div>
      </main>
    </div>
  )
}

/*export const getServerSideProps = async () => ({
  const reclamos = await getBuscarReclamos(2, 1, '')
  const inconvenientes = await getInconvenientes(1)
  const soluciones = await getSoluciones(1)
  const tipos = await getTipos()
  return { reclamos, inconvenientes, soluciones, tipos }
}); */

/* export const getServerSideProps = async () => {
  const id_service = 1
  const reclamos = await getTasks(id_service, '', '', '', '', '', 1, '')
  const operators = await getTeams(id_service)
  const states = await getStates()
  //const inconvenientes = await getInconvenientes(1)
  //const soluciones = await getSoluciones(1)
  //const tipos = await getTipos()
  return {
    props: {
      id_service: id_service,
      reclamos: reclamos,
      operators: operators,
      states: states,
      //inconvenientes: inconvenientes,
      //soluciones: soluciones,
      //tipos: tipos,
    },
  }
} */
