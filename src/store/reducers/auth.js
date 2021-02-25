import * as actionTypes from "../actions/actionTypes";

const isUserAuthenticated = JSON.parse(sessionStorage.getItem("token"));

const initialState = {
  token: isUserAuthenticated ? isUserAuthenticated : null,
  logged: isUserAuthenticated ? true : false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGGED:
      const token = isUserAuthenticated ? isUserAuthenticated : action.payload
      return {
        ...state,
        logged: true,
        token: token
      };
    case actionTypes.AUTH_LOGOUT:
      sessionStorage.clear();
      return {
        ...state,
        token: null,
        logged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
