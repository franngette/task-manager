import React from 'react'

import Card from '../Card/index'
import style from './style.module.scss'
import useVisible from '../../hooks/useVisible'
import {Link, useHistory } from "react-router-dom";

import {
  faEllipsisV,
  faEye,
  faMapMarkerAlt,
  faTasks,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CalendarTask = ({ index, task, onEdit }) => {
  const { ref, isVisible, setIsVisible } = useVisible(false)
  
const history = useHistory()
const nextHandler = (task) => {
  history.push({
    pathname: '/reclamo',
    state: {task: task}
  })
} 

  return (
    <div key={index} className={style.card_container}>
      <Card key={index} style={task.last_state}>
        <div className={style.task}>
          <div className={style.task_content}>
            <p>
              #{task.id_account ? task.id_account : ''} -{' '}
              {task.account_name
                ? task.account_name.length > 17
                  ? task.account_name.substring(0, 17) + '...'
                  : task.account_name
                : 'Sin Titular'}
            </p>
            <div className={style.content_icon}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="1x"
                className={style.icon}
              />
              <p>{task.region ? task.region : 'Sin Region'}</p>
            </div>
          </div>
          <div className={style.content_icon}>
            {isVisible && (
              <div ref={ref} className={style.options_menu_container}>
                <div className={style.options_menu}></div>
                <Card>
                  <div className={style.options}>
                   <Link to={{pathname: '/reclamo',state: {task: task}}} >
                      <button className={style.option} /* onClick={() => {nextHandler(task)}} */>
                        <FontAwesomeIcon
                          icon={faEye}
                          size="1x"
                          className={style.icon}
                        />
                        <p>Ver</p>
                      </button>
                    </Link>
                    <div className={style.option_center}>
                      <button
                        className={style.option}
                        onClick={() => {
                          onEdit(task, 'assign')
                          setIsVisible(false)
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          size="1x"
                          className={style.icon}
                        />
                        <p>Editar Asignación</p>
                      </button>
                    </div>
                    <button
                      className={style.option}
                      onClick={() => {
                        onEdit(task, 'status')
                        setIsVisible(false)
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTasks}
                        size="1x"
                        className={style.icon}
                      />
                      <p>Nuevo estado</p>
                    </button>
                  </div>
                </Card>
              </div>
            )}
            <button
              id={index}
              className={style.options_button}
              onClick={() => setIsVisible(!isVisible)}
            >
              <FontAwesomeIcon icon={faEllipsisV} size="1x" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CalendarTask
