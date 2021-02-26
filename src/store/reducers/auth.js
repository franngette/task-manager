import * as actionTypes from "../actions/actionTypes";

const isUserAuthenticated = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  user: isUserAuthenticated ? isUserAuthenticated : null,
  logged: isUserAuthenticated ? true : false,
  socket: null,
  isSocketConnected: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGGED:
      const user = isUserAuthenticated ? isUserAuthenticated : action.payload;
      return {
        ...state,
        logged: true,
        user: user,
      };
    case actionTypes.AUTH_LOGOUT:
      sessionStorage.clear();
      return {
        ...state,
        user: null,
        logged: false,
        socket: null,
        isSocketConnected: false
      };
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
        isSocketConnected: true
      };
    default:
      return state;
  }
};

export default authReducer;
