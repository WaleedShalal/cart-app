import * as actionTypes from './loginTypes';

export const loginLogged = (log = false) => {
  return {
    type: actionTypes.LOGIN_LOGGED,
    log,
  };
};
export const loginValue = (user = '', pass = '') => {
  return {
    type: actionTypes.LOGIN_VALUE,
    user,
    pass,
  };
};
export const loginData = (user = '', pass = '') => {
  return {
    type: actionTypes.LOGIN_DATA,
    user,
    pass,
  };
};
export const loginErrors = (errors = {}) => {
  return {
    type: actionTypes.LOGIN_ERRORS,
    errors,
    // user: errors.username,
    // pass: errors.password,
  };
};
