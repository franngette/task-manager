import { useState } from 'react'
import styles from './styles.module.scss'

import { getClients } from '../api/index'
import Layout from '../../components/Layout'
import InputText from '../../components/InputText'
import {
  faAddressCard,
  faListOl,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import ClientAccordion from '../../components/ClientAccordion/index'

const Client = ({ id_service }) => {
  const [clientList, setClientList] = useState([])

  const onChangeInputID = async (e: any) => {
    if (e === '') {
      setClientList([])
    } else {
      const result = await getClients(id_service, '', e, '')
      setClientList(result)
    }
  }

  const onChangeInputName = async (e: any) => {
    if (e === '') {
      setClientList([])
    } else {
      if (e.length > 3) {
        const result = await getClients(id_service, e, '', '')
        setClientList(result)
      }
    }
  }

  const onChangeInputDNI = async (e: any) => {
    if (e === '') {
      setClientList([])
    } else {
      const result = await getClients(
        id_service,
        '',
        '',
        e.replace(/[,.]\s?/g, '')
      )
      setClientList(result)
    }
  }

  return (
    <Layout title="Home">
      <h3 style={{ margin: '1rem' }}>
        <b>Buscar cliente</b>
      </h3>
      <div className={styles.wrapperClient}>
        <div className={styles.content}>
          <div className={styles.inputContainer}>
            <div className={styles.inputContent}>
              <InputText
                type="number"
                placeHolder="N Cliente..."
                icon={faListOl}
                iconColor="#fe6d73"
                onChange={(e) => onChangeInputID(e.target.value)}
              />
            </div>
            <div className={styles.inputContent}>
              <InputText
                type="text"
                icon={faUserCircle}
                iconColor="#ffcb77"
                placeHolder="Nombre..."
                onChange={(e) => onChangeInputName(e.target.value)}
              />
            </div>
            <div className={styles.inputContent}>
              <InputText
                type="text"
                icon={faAddressCard}
                iconColor="#17c3b2"
                placeHolder="DNI..."
                onChange={(e) => onChangeInputDNI(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.contentCards}>
          {clientList.length > 0 && clientList[0] != false ? (
            clientList.map((el, index) => {
              return (
                <div key={index}>
                  <ClientAccordion client={el} />
                </div>
              )
            })
          ) : (
            <div className={styles.searchMessage}>
              <h3>Realice la busqueda</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = () => {
  const id_service = 1
  return {
    props: {
      id_service: id_service,
    },
  }
}

export default Client
