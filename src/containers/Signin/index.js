import React, { useState } from 'react'

import styles from './signin.module.scss'
import Button from '../../components/Button/index'
import Input from '../../components/InputText/index'
import Spinner from '../../components/Spinner/index'

import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { getLoginUser } from '../../api/index'
import instance from '../../api/axios'


const Signin = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const userHandler = (newUser) => {
    const nickname = newUser
    setUser(nickname)
  }

  const passwordHandler = (newPassword) => {
    const pass = newPassword
    setPassword(pass)
  }

  const sumbitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    getLoginUser(1, user, password)
      .then((response) => {
        setLoading(false)
        if (response.error || response.token.length == 0) {
          setError(true)
          setLoading(false)
        } else {
          sessionStorage.setItem('token', JSON.stringify(response.token))
        }
      })
      .catch((err) => {
        console.log("error sigin", err)
        setError(true)
        setLoading(false)
      })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <div className={styles.content_logo}>
          <img className={styles.logo} src="/images/logon.png" alt="G2 Logo" />
        </div>
        <div className={styles.img_content}>
          <div className={styles.lines}>
            <div className={styles.line}></div>
            <div className={styles.line}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
          {/* <div className={styles.content_title}>
            <h3 className={styles.title}>TASKS</h3>
            <h3 className={styles.title}>MANAGE</h3>
          </div> */}
          <img className={styles.img} src="/images/login.png" alt="G2 Logo" />
        </div>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.logForm} onSubmit={(e) => sumbitHandler(e)}>
          <h4 className={styles.formContent}>
            <strong></strong>Inicie sesion para acceder
          </h4>
          <div className={styles.input}>
            <Input
              type="text"
              placeHolder="Usuario"
              icon={faUser}
              iconColor="#4299e1"
              //value={""}
              onChange={(e) => {
                userHandler(e.target.value)
              }}
            />
          </div>
          <div className={styles.input}>
            <Input
              type="password"
              placeHolder="Contraseña"
              icon={faLock}
              iconColor="#4299e1"
              //value={""}
              onChange={(e) => {
                passwordHandler(e.target.value)
              }}
            />
          </div>
          <div className={styles.content_button_options}>
            <Button variant="outline" type="" onClick={() => {}}>
              <p>Crear cuenta</p>
            </Button>
            <Button variant="outline" type="" onClick={() => {}}>
              <p>Olvido su contraseña?</p>
            </Button>
          </div>
          <div className={styles.content_button}>
            <Button variant="blue" type="submit" onClick={() => {}}>
              {loading ? <Spinner /> : 'Ingresar'}
            </Button>
            {error && (
              <p style={{ color: 'red' }}>Usuario y/o contraseña incorrecto.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
