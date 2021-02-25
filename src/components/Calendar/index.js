import { useEffect, useState } from 'react'

import style from './style.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faHardHat,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import Button from '../Button/index'
import CalendarTask from '../CalendarTask/index'
import Modal from '../Modal/index'
import CalendarButton from '../CalendarButton/index'
import Status from './Status/index'
import AssignTask from './AssignTask/index'
import Spinner from '../Spinner/index'


import { getCalendar, getStatus, getTeams } from '../../api/index'

const id_service = 1

const monthNow = moment().format('MM')
const yearNow = moment().format('YYYY')

const Calendar = ({ tasksCalendar }) => {
  const [year, setYear] = useState(yearNow)
  const [month, setMonth] = useState(monthNow)
  const [week, setWeek] = useState(0)
  const [calendar, setCalendar] = useState([])
  const [dateSelected, setDateSelected] = useState(yearNow + '-' + monthNow)
  const [editType, setEditType] = useState('')
  const [tasks, setTasks] = useState(tasksCalendar)
  const [task, setTask] = useState({})
  const [show, setShow] = useState(false)
  const [states, setStates] = useState()
  const [teams, setTeams] = useState([])

  /* useEffect(() => {
    client.on('calendar', (socket) => {
      getCalendar(id_service, dateSelected).then((res) => {
        const newTasks = res
        setTasks(newTasks)
      })
    })
  }, []) */
  
  const getData = async () => {
    const status = await getStatus();
    const teams = await getTeams(1)
    setStates(status)
    setTeams(teams)
  }

  useEffect(() => {
    let calendar = getDaysArray(tasks, year, month)
    setCalendar(calendar)
    getData()
  }, [tasks])

  const content = {
    display: 'grid',
    gridTemplateRows: `repeat(${teams.length}, minmax(300px, auto))`,
    background: '#2c5282',
    marginRigth: '5px',
    width: '75px',
    color: 'white',
    minWidth: '75px',
  }

  const column = {
    width: '100%',
    background: 'aliceblue',
    display: 'grid',
    gridTemplateRows: `repeat(${teams.length}, minmax(300px, auto))`,
  }
  const dateHandler = (date) => {
    const updateDateSelected = date.toString()
    setDateSelected(updateDateSelected)
    const resultDate = updateDateSelected.replace('-', '')
    const year = moment(resultDate.substring(0, 4)).format('YYYY')
    const month = moment(resultDate.substring(4, 6)).format('MM')
    setWeek(0)
    setMonth(month)
    setYear(year)
    getCalendar(id_service, dateSelected).then((res) => {
      const newTasks = res
      setTasks(newTasks)
    })
  }

  const nextWeek = (e) => {
    e.preventDefault()
    let selectedWeek = week
    const calendarMonth = calendar.length
    if (selectedWeek == calendarMonth - 1) {
      setWeek(0)
    } else {
      selectedWeek = selectedWeek + 1
      setWeek(selectedWeek)
    }
  }

  const prevWeek = (e) => {
    e.preventDefault()
    let selectedWeek = week
    const calendarMonth = calendar.length
    if (selectedWeek == 0) {
      setWeek(calendarMonth - 1)
    } else {
      setWeek(selectedWeek - 1)
    }
  }

  const getDaysArray = (tasks, year, month) => {
    let monthIndex = month - 1 // 0..11 instead of 1..12
    let date = new Date(year, monthIndex, 1)
    let result = []
    let week = []
    let dayData = {}
    let daysOfMonth = moment(`${year}-${month}`).daysInMonth()
    while (date.getMonth() == monthIndex) {
      let dayDate = moment(`${month}/${date.getDate()}/${year}`).format(
        'DD/MM/YYYY'
      )
      let tasksOfDay = tasks.filter((task) => {
        return task.date === dayDate
      })
      dayData = {
        day: dayDate,
        isMonth: true,
        tasks: tasksOfDay,
      }
      if (week.length <= 6) {
        week.push(dayData)
      } else {
        result.push(week)
        week = []
        week.push(dayData)
      }
      date.setDate(date.getDate() + 1)
      if (date.getDate() === daysOfMonth) {
        result.push(week)
      }
    }
    return result
  }

  const editHandler = (task, type) => {
    setShow(true)
    setTask(task)
    setEditType(type)
  }

  const closeModalHandler = () => {
    setShow(false)
  }

  let renderContent = null

  if (editType == 'assign') {
    renderContent = (
      <AssignTask
        task={task}
        onClose={closeModalHandler}
      />
    )
  }

  if (editType == 'status') {
    renderContent = (
      <Status task={task} onClose={closeModalHandler} />
    )
  }

  let renderModal = null
  if (show) {
    renderModal = (
      <Modal
        title={editType == 'assign' ? 'Editar Asignación' : 'Nuevo Estado'}
        onClose={() => {
          setShow(false)
        }}
      >
        {renderContent}
      </Modal>
    )
  }

  const renderCalendar = () => {
    // var Week is index weeks on month selected
    return calendar[week].map((day, index) => {
      return (
        <div key={index} style={column}>
          {teams.map((team, i) => {
            return (
              <div
                key={i}
                className={day.isMonth ? style.rows : style.rows_false}
              >
                {day.tasks.map((task, index) => {
                  return team.id_team == task.id_team &&
                    task.date == day.day ? (
                    <CalendarTask
                      key={index}
                      index={index}
                      task={task}
                      onEdit={editHandler}
                    />
                  ) : (
                    ''
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    })
  }

  const renderTeam = (teams) => {
    return teams.map((team, index) => {
      return (
        <div key={index} className={style.rows_team}>
          <div className={style.team}>
            <p>Team {team.id_team}</p>
          </div>
        </div>
      )
    })
  }

  const renderCalendarHeader = () => {
    return calendar[week].map((day, index) => {
      let dayName = moment(day.day, 'DD/MM/YYYY HH:mm:ss')
      return (
        <div key={index} className={style.calendar_header}>
          <h2>{dayName.date()}</h2>
          <h4>{dayName.locale('es').format('dddd').toUpperCase()}</h4>
        </div>
      )
    })
  }

  let loadedCalendar = <Spinner />
  if (calendar.length > 0 && teams.length > 0) {
    loadedCalendar = (
      <>
        <div className={style.container_header}>
          <div className={style.header}>
            <FontAwesomeIcon icon={faHardHat} size="2x" color="white" />
          </div>
          <div className={style.calendar}>{renderCalendarHeader()}</div>
        </div>
        <div className={style.container}>
          <div style={content}>{renderTeam(teams)}</div>
          <div className={style.calendar}>{renderCalendar()}</div>
        </div>
      </>
    )
  }
  const [statusInfo, setStatusInfo] = useState(false)
  const renderStatusInfo = () => {
    return states.map((state, index) => {
      return (
        <div key={index} className={style.info}>
          <div className={[style.status_color, state.description].join(" ")}></div> {state.name}
        </div>
      )
    })
  }

  return (
    <div className={style.wrapper}>
      {renderModal}
      <div className={style.header_options}>
        <h3 style={{ margin: '1rem' }}>
          <b>Calendario</b>
        </h3>
        <div className={style.header_buttons}>
          <div className={style.wrapperCalendarButton}>
            <CalendarButton
              id="fecha"
              type={'month'}
              value={dateSelected}
              name=""
              onChange={(e) => {
                e.preventDefault()
                dateHandler(e.target.value)
              }}
            />
          </div>
          <Button onClick={(e) => prevWeek(e)} variant="outline" type="">
            <FontAwesomeIcon icon={faChevronLeft} size="1x" color="#4299e1" />
          </Button>
          <Button onClick={(e) => nextWeek(e)} variant="outline" type="">
            <FontAwesomeIcon icon={faChevronRight} size="1x" color="#4299e1" />
          </Button>
          <button
            onClick={(e) => setStatusInfo(!statusInfo)}
            className={style.outline}
          >
            <FontAwesomeIcon icon={faQuestionCircle} size="1x" />
          </button>
          {statusInfo && <div className={style.info_option}>
            <div className={style.options_menu}></div>
            {renderStatusInfo()}
          </div>}
        </div>
      </div>
      {loadedCalendar}
    </div>
  )
}

export default Calendar
