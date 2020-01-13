import services from "../../Services"
import { FIND_USERS, GET_REVIEWS, ADD_REVIEW, VOTE, CLEAR_USERS, REMOVE_ERROR, SET_ERROR, LOGIN, LOGOUT, SET_LOADING, REMOVE_LOADING } from "../constants/action-types"

export function signup(newUserData){
    return async function(dispatch){
        return await services.signup(newUserData)
        .then(response => {
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}
export function login(email, password){
    return async function(dispatch){
        return await services.login(email, password)
        .then(async response => {
            await dispatch({type: LOGIN, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}
export function logout(){
    return async function(dispatch){
        services.logout()
        return dispatch({type: LOGOUT})
    }
}
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
        dispatch(setLoading())
        return await services.getReviews(revieweeId)
        .then(async response =>{
            await dispatch({type:GET_REVIEWS, payload:response})
            dispatch(removeError())
            dispatch(removeLoading())
        })
        .catch(error =>{
            dispatch(setError(error));
            dispatch(removeLoading())
        })
    }
}

export function addReview(revieweeId, review){
    return async function(dispatch){
        return await services.addReview(revieweeId, review)
        .then(async response =>{
            await dispatch({type:ADD_REVIEW, payload: response})
            if(revieweeId){
                dispatch(getReviews(revieweeId))
            }
            else{
                dispatch({type:GET_REVIEWS, payload: response})
            }
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
    window.scrollTo(0,0)
    return {type: SET_ERROR, payload: error}
}

export function removeError(){
    return {type: REMOVE_ERROR}
}

export function setLoading(){
    return {type:SET_LOADING}
}

export function removeLoading(){
    return {type:REMOVE_LOADING}
}