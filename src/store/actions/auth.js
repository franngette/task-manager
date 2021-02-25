import * as actionTypes from "./actionTypes";

export const authLogged = (token) => {
  return {
    type: actionTypes.AUTH_LOGGED,
    payload: token
  }
}

export const authLogOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}