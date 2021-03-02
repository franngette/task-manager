import * as actionTypes from "./actionTypes";
import { io } from 'socket.io-client'

export const authLogged = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user))
  return {
    type: actionTypes.AUTH_LOGGED,
    payload: user
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const setSocketInstance = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    payload: socket
  }
}

export const connectSocket = (customClientID) => {
  return dispatch => {
    const socket = io('http://localhost:4000')
    socket.on('connect', () => {
      if (socket.connected) {
        socket.emit('storeClient', { customId: customClientID })
        dispatch(setSocketInstance(socket))
      }
    })
  }
}