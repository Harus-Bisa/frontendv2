import services from "../../Services"
import { FIND_USERS, GET_REVIEWS } from "../constants/action-types"


export function findUsers(name){
    return async function(dispatch){
        return await services.findUsers(name)
        .then(async response =>{
            await dispatch({type:FIND_USERS, payload: response})
        })
    }
}

export function getReviews(userId){
    return async function(dispatch){
        return await services.getReviews(userId)
        .then(async response =>{
            await dispatch({type:GET_REVIEWS, payload:response})
        })
    }
}