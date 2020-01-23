import * as act from './actions';
import * as jwtTools from '../security/jwtTools';

const reducer = (state:any, action:{type:string, payload:any}) =>{
    const payload = action.payload;

    switch(action.type){
        case act.LOG_IN: {
            return {
                ...state,
                navLogin:{
                    email:"",
                    password:""
                },
                user:{
                    username: jwtTools.getUsername(),
                    authorities: jwtTools.getRoles(),
                },
                loggedIn: jwtTools.isExpired(),
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
                    username:"",
                    authorities:[]
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
        case act.REGISTER_SUCCESS: {
            return {
                ...state
            }
        }
        default: return state;
    }
}

export default reducer;