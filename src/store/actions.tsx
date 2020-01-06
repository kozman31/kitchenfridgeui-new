export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const API = 'API';

export const login= (data:any) => {
    console.log("callback data ", data);
    return {type: LOG_IN, payload:{...data} };
  }
