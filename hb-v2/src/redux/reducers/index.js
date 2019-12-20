import { FIND_USERS, GET_REVIEWS } from "../constants/action-types";

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
    return state;
}