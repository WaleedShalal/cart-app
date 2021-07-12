import * as actionTypes from './loginTypes';

const initialState = {
  userData: {
    username: localStorage.getItem('username')
      ? JSON.parse(localStorage.getItem('username'))
      : '',
    password: localStorage.getItem('password')
      ? JSON.parse(localStorage.getItem('password'))
      : '',
  },
  logged: false,
  errors: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_LOGGED:
      return { ...state, logged: action.log };
    case actionTypes.LOGIN_VALUE:
      return {
        ...state,
        values: { username: action.user, password: action.pass },
      };
    case actionTypes.LOGIN_DATA:
      return {
        ...state,
        userData: { username: action.user, password: action.pass },
      };
    case actionTypes.LOGIN_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};

export default loginReducer;
