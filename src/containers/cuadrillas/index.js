import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './cuadrilla.module.scss'

import Layout from '../../components/Layout'
import WorkTeam from '../../components/WorkTeam'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Message from '../../components/Message'
import InputText from '../../components/InputText'
import {
  getTeams,
  getOperators,
  getVehicles,
  createTeam,
  updateTeam,
} from '../api/index'
import { icon } from '@fortawesome/fontawesome-svg-core'

const closedStyles = {
  width: '0%',
  transition: 'width 1s',
  marginLeft: '0.2rem',
}

const openStyles = {
  width: '40%',
  transition: 'width 1s',
  marginLeft: '0.5rem',
}

export default function Index({ teams, operators, vehicles }) {
  const [open, setOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState([])
  const [style, setStyle] = useState(closedStyles)
  const [currentIdTeam, setCurrentIdTeam] = useState('')
  const [teamOperators, setTeamOperators] = useState(operators)
  const [teamVehicles, setTeamVehicles] = useState(vehicles)
  const [error, setError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const id_service = 1

  const handleSendData = async (selectedVehicle, selectedOperators) => {
    let res
    if (selectedTeam.length == 0) {
      res = updateTeam(
        id_service,
        currentIdTeam,
        selectedVehicle,
        selectedOperators
      )
        .then((res) => {
          setShowMessage(true)
          setError(res.error)
          setMessage(res.message)
        })
        .catch((res) => {
          setShowMessage(true)
          setError(res.error)
          setMessage(res.message)
        })
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    } else {
      res = createTeam(id_service, selectedVehicle, selectedOperators)
        .then((res) => {
          setShowMessage(true)
          setError(res.error)
          setMessage(res.message)
        })
        .catch((res) => {
          setShowMessage(true)
          setError(res.error)
          setMessage(res.message)
        })
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }

  const handleEditTeam = async (val) => {
    setCurrentIdTeam(val.id_team)
    setSelectedTeam(val)
    operators = await getOperators(id_service, val.id_team)
    setTeamOperators(operators)
    vehicles = await getVehicles(id_service, val.id_team)
    setTeamVehicles(vehicles)
    if (!open) {
      setStyle(openStyles)
      setOpen(true)
    }
  }

  const handlerCreateTeam = async () => {
    setSelectedTeam([])
    setCurrentIdTeam('')
    operators = await getOperators(id_service, '')
    setTeamOperators(operators)
    vehicles = await getVehicles(id_service, '')
    setTeamVehicles(vehicles)
    if (!open) {
      setStyle(openStyles)
      setOpen(true)
    }
  }

  const handlerClose = (e) => {
    if (open) {
      setStyle(closedStyles)
      setOpen(false)
    }
    e.preventDefault()
  }
  return (
    <Layout title="Cuadrillas">
      <div className={styles.header}>
        <h3 style={{ margin: '1rem' }}>
          <b>Cuadrillas</b>
        </h3>
        {showMessage && (
          <Message type={error ? 'error' : 'info'} message={message} />
        )}
        <div className={styles.content_header}>
          <InputText
            type="text"
            placeHolder="Buscar..."
            onChange={() => {}}
            icon={faSearch}
          />
          <div>
            <Button
              variant="outline"
              disabled={false}
              type="submit"
              onClick={handlerCreateTeam}
            >
              Crear
            </Button>
          </div>
        </div>
      </div>
      <main>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Table
              columns={['id_team', 'vehicle_name', 'operators']}
              data={teams}
              columnsLarge={''}
              sendData={handleEditTeam}
            />
          </div>
          <WorkTeam
            style={{ ...style }}
            onClose={handlerClose}
            open={open}
            sendData={handleSendData}
            vehicles={teamVehicles}
            operators={teamOperators}
            valueState={selectedTeam ? selectedTeam : []}
          />
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const id_service = 1
  const teams = await getTeams(id_service)
  const operators = await getOperators(id_service, '')
  const vehicles = await getVehicles(id_service, '')
  return {
    props: {
      teams: teams,
      operators: operators,
      vehicles: vehicles,
    },
  }
}
