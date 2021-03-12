import axios from "axios";
import { AUTH_LOGOUT } from "../store/actions/actionTypes";
import store from "../store/store";

//baseURL: 'http://192.168.77.244:4000',

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (request) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isUserAuthenticated = user ? true : false;
  if (isUserAuthenticated) {
    request.headers["authorization"] = `Bearer ${user.token}`;
  } else {
    request.headers["authorization"] = `Bearer ${" "}`;
    store.dispatch({ type: AUTH_LOGOUT });
  }
  return request;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error) {
      console.log(error);
      //store.dispatch({ type: AUTH_LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default instance;
