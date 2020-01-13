export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const API = 'API';

export const loginSuccess = (data:any) => {
    console.log("login success callback data ", data);
    return {type: LOG_IN, payload:{...data} };
  }

  export const registerSuccess = (data:any) => {
    console.log("register success callback data ", data);
    return {type: REGISTER_SUCCESS, payload: {...data}};
  }