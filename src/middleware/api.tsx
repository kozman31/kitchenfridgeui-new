import axios from 'axios';
import { API } from '../store/actions';

const apiMiddleware = ( dispatch: any ) => (next:any) => (action:any) => {
    next(action);
  
    if (action.type !== API) return;
  
    const {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
      headers
    } = action.payload;
    
    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
    
    // const formInput = parseInputToJSON(data);
    console.log(data)
    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.defaults.headers.common["Content-Type"]="application/json";
    // axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
  
    // User for loading label
    if (label) {
      next(apiStart(label));
    }
  
    axios
      .request({
        url,
        method,
        headers,
        [dataOrParams]: data,
      })
      .then((response) => {
        console.log("data received: ", response);
        next(onSuccess(response));
      })
      .catch(error => {
        next(apiError(error));
        next(onFailure(error));

        // if (error.response && error.response.status === 403) {
        //   next(accessDenied(window.location.pathname));
        // }
      })
     .finally(() => {
        // remove loading message
        if (label) {
            next(apiEnd(label));
        }
     });
  };

  const apiStart = (label: any) => {
      return {type: 'API_START'}
  }

  const apiEnd = (label: any) => {
    return {type: 'API_END'}
  }

  const apiError = (error: any) =>{
    console.log('Oops, An error occurred.', error)
    return {type: 'API_ERROR'}
  }

  export const parseInputToJSON =(data: any) => {
    let formInput:{[index:string]:any}={};
    for(let key in data){
      formInput[key]= data[key].value
    }
    return formInput;
  }

export default apiMiddleware;
