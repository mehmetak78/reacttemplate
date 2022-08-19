import {LOGIN_USER, LOGOUT_USER} from "../actions/actionTypes";

const initialState = {
    isAuthenticatied : false,
    userId : 0,
    userName :""
};

export default function(state=initialState, action) {
    switch(action.type) {
        case  LOGIN_USER:
            return {isAuthenticatied:true, userId:1, userName:action.payload.name};
        case LOGOUT_USER:
            return {isAuthenticatied:false, userId:0, userName:""};
        default:
            return state;
    }
}