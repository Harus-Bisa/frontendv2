import services from "../../Services"
import { FIND_REVIEWEES, GET_REVIEWS, ADD_REVIEW, VOTE, CLEAR_REVIEWEES, REMOVE_ERROR, SET_ERROR, LOGIN, LOGOUT, SET_LOADING, REMOVE_LOADING, LOAD_REVIEWEES, SET_SUCCESS, REMOVE_SUCCESS } from "../constants/action-types"

export function signup(newUserData){
    return async function(dispatch){
        dispatch(removeSuccess())
        return await services.signup(newUserData)
        .then(async response => {
            await dispatch(setSuccess())
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}
export function login(email, password){
    return async function(dispatch){
        dispatch(removeError())
        return await services.login(email, password)
        .then(async userId => {
            await dispatch(getUser(userId))        
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}
export function getUser(userId){
    return async function(dispatch){
        return await services.getUser(userId)
        .then(async response => {
            await dispatch({type: LOGIN, payload: response})       
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}

export function resendVerification(email){
    return async function(dispatch){
        dispatch(removeSuccess())
        return services.resendVerification(email)
        .then(async response =>{
            dispatch(setSuccess())
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
export function findReviewees(name){
    return async function(dispatch){
        dispatch({type:LOAD_REVIEWEES})
        return await services.findReviewees(name)
        .then(async response =>{
            await dispatch({type:FIND_REVIEWEES, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error));
        })
    }
}

export function clearReviewees(){
    return ({type:CLEAR_REVIEWEES})
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
export function setSuccess(){
    return {type: SET_SUCCESS}
}

export function removeSuccess(){
    return {type: REMOVE_SUCCESS}
}

export function setLoading(){
    return {type:SET_LOADING}
}

export function removeLoading(){
    return {type:REMOVE_LOADING}
}