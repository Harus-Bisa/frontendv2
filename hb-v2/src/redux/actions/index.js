import services from "../../Services"
import { FIND_USERS, GET_REVIEWS, ADD_REVIEW, VOTE, CLEAR_USERS, REMOVE_ERROR, SET_ERROR } from "../constants/action-types"


export function findUsers(name){
    return async function(dispatch){
        return await services.findUsers(name)
        .then(async response =>{
            await dispatch({type:FIND_USERS, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error));
        })
    }
}

export function clearUsers(){
    return ({type:CLEAR_USERS})
}
export function getReviews(revieweeId){
    return async function(dispatch){
        return await services.getReviews(revieweeId)
        .then(async response =>{
            await dispatch({type:GET_REVIEWS, payload:response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error));
        })
    }
}

export function addReview(revieweeId, review){
    return async function(dispatch){
        return await services.addReview(revieweeId, review)
        .then(async response =>{
            await dispatch({type:ADD_REVIEW, payload: response})
            dispatch(getReviews(revieweeId))
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error));
        })
    }
}

export function voteReview(revieweeId, reviewId, vote){
    return async function(dispatch){
        return await services.voteReview(revieweeId, reviewId, vote)
        .then(async response =>{
            await dispatch({type: VOTE, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error));
        })
    }
}

export function setError(error){
    return {type: SET_ERROR, payload: error}
}

export function removeError(){
    return {type: REMOVE_ERROR}
}