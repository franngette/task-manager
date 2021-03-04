import * as actionTypes from "../actions/actionTypes";

const isUserAuthenticated = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  user: isUserAuthenticated ? isUserAuthenticated : null,
  logged: isUserAuthenticated ? true : false,
  socket: null,
  isSocketConnected: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGGED:
      let newUser = action.payload
      newUser['id_service'] = 1
      sessionStorage.setItem('user', JSON.stringify(newUser))
      return {
        ...state,
        logged: true,
        user: newUser,
      };
    case actionTypes.AUTH_LOGOUT:
      sessionStorage.clear();
      return {
        ...state,
        user: null,
        logged: false,
        socket: null,
        isSocketConnected: false,
      };
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
        isSocketConnected: true,
      };
    case actionTypes.UPDATED_SERVICE_SELECTED:
      let newService = action.payload;
      let updatedUser = state.user;
      updatedUser["id_service"] = newService;
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    default:
      return state;
  }
};

export default authReducer;
