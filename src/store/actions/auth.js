import * as actionTypes from "./actionTypes";
import { io } from 'socket.io-client'

export const authLogged = (user) => {
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
      //if (socket.connected) {
        socket.emit('storeClient', { customId: customClientID })
        dispatch(setSocketInstance(socket))
      //}
    })
  }
}

export const updatedService = (id_service) => {
  return {
    type: actionTypes.UPDATED_SERVICE_SELECTED,
    payload: id_service
  }
}