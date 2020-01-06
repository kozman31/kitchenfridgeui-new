import * as act from './actions';
import axios from 'axios';

const initialState = {
    loggedIn:false,
    navLogin:{
        email:"",
        password:""
      },
    user: {
        email:"",
        username:"",
        jwt:""
    }
}

const reducer = (state = initialState, action:{type:string, payload:any}) =>{
    const payload = action.payload;

    switch(action.type){
        case act.LOG_IN: {
            if(payload.email=='user'){
                return {
                    ...state,
                    navLogin:{
                        email:"",
                        password:""
                    },
                    user:{
                        email:"user@xyz.com",
                        username:"userUses",
                        jwt:"1234"
                    },
                    loggedIn: true
                }
            } else {
                return {
                    ...state,
                    user:{
                        email:"",
                        username:"",
                        jwt:""
                    },
                    loggedIn: false
                }
            }

        }
        case act.LOG_OUT: {
            return {
                ...state,
                navLogin:{
                    email:"",
                    password:""
                },
                user:{
                    email:"",
                    username:"",
                    jwt:""
                },
                loggedIn: false
            }
        }
        case act.CREATE_USER: {
            return {
                ...state
            }
        }
        case act.EDIT_USER: {
            return {
                ...state
            }
        }
        case act.DELETE_USER: {
            return {
                ...state
            }
        }
        default: return state;
    }
}

export default reducer;