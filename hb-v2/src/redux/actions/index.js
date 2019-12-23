import services from "../../Services"
import { FIND_USERS, GET_REVIEWS, ADD_REVIEW, VOTE, CLEAR_USERS, REMOVE_ERROR, SET_ERROR } from "../constants/action-types"


export function findUsers(name){
    return async function(dispatch){
        return await services.findUsers(name)
        .then(async response =>{
            await dispatch({type:FIND_USERS, payload: response})
            removeError()
        })
        .catch(error =>{
            setError(error);
        })
    }
}

export function clearUsers(){
    return ({type:CLEAR_USERS})
}
export function getReviews(userId){
    return async function(dispatch){
        return await services.getReviews(userId)
        .then(async response =>{
            await dispatch({type:GET_REVIEWS, payload:response})
            removeError()
        })
        .catch(error =>{
            setError(error);
        })
    }
}

export function addReview(userId, review){
    return async function(dispatch){
        return await services.addReview(userId, review)
        .then(async response =>{
            await dispatch({type:ADD_REVIEW, payload: response})
            removeError()
        })
        .catch(error =>{
            setError(error);
        })
    }
}

export function voteReview(userId, reviewId, vote){
    return async function(dispatch){
        return await services.voteReview(userId, reviewId, vote)
        .then(async response =>{
            await dispatch({type: VOTE, payload: response})
            removeError()
        })
        .catch(error =>{
            setError(error);
        })
    }
}

export function setError(error){
    return {type: SET_ERROR, payload: error}
}

export function removeError(){
    return {type: REMOVE_ERROR}
}