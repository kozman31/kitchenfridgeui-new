import * as jwtTools from '../security/jwtTools';

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const LOG_IN_FAIL = "LOG_IN_FAIL";
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const API = 'API';

export const loginSuccess = (data:any) => {
    console.log("login success callback data ", data);
    jwtTools.setToken(data.headers.authorization);
    return {type: LOG_IN, payload:{...data} };
  }
export const loginFailed = (data:any) => {
    console.log("login Failed error message ", data);
    return {type: LOG_IN_FAIL, payload:{...data} };
  }

  export const logOut = () => {
    jwtTools.logOut();
    return {type: LOG_OUT, payload:{} };
  }
  export const registerSuccess = (data:any) => {
    console.log("register success callback data ", data);
    return {type: REGISTER_SUCCESS, payload: {...data}};
  }

  export const loadState = () => {
    const initialState = {
      loggedIn:jwtTools.isExpired(),
      navLogin:{
          email:"",
          password:""
        },
      user: {
          username:jwtTools.getUsername(),
          email:"",
          authorities:jwtTools.getRoles(),
      }
    }
    return initialState;
  }

  