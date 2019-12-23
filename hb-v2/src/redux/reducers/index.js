import { FIND_USERS, GET_REVIEWS, CLEAR_USERS, SET_ERROR, REMOVE_ERROR } from "../constants/action-types";

const initialState ={
}
export default function rootReducer(state = initialState, action){
    if(action.type === FIND_USERS){
        return Object.assign({}, state, {
            users: action.payload
        })
    }
    if(action.type === GET_REVIEWS){
        return Object.assign({}, state, {
            professor: action.payload
        })
    }
    if(action.type === CLEAR_USERS){
        return Object.assign({}, state, {
            users: []
        })
    }
    if(action.type === SET_ERROR){
        return Object.assign({}, state, {
            error: action.payload
        })
    }
    if(action.type === REMOVE_ERROR){
        return Object.assign({}, state, {
            error: null
        })
    }
    return state;
}