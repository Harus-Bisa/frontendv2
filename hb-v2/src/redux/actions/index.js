import services from "../../Services"
import { FIND_REVIEWEES, GET_REVIEWS, ADD_REVIEW, VOTE, CLEAR_REVIEWEES, REMOVE_ERROR, SET_ERROR, LOGIN, LOGOUT, SET_LOADING, REMOVE_LOADING, LOAD_REVIEWEES, SET_SUCCESS, REMOVE_SUCCESS, LOAD_SCHOOLS, FIND_SCHOOLS, CLEAR_SCHOOLS, SORT_REVIEWEES, REPORT_INAPPROPRIATE_REVIEW, CHANGE_IS_MOBILE, GET_TOP_SCHOOLS, SORT_REVIEWS } from "../constants/action-types"


export function signup(newUserData){
    return async function(dispatch){
        dispatch(setLoading())
        dispatch(removeSuccess())
        return await services.signup(newUserData)
        .then(async response => {
            await dispatch(setSuccess())
            dispatch(removeError())
            dispatch(removeLoading())
        })
        .catch(error =>{
            dispatch(setError(error))
            dispatch(removeLoading())
        })
    }
}
export function login(email, password){
    return async function(dispatch){
        dispatch(removeError())
        dispatch(setLoading())
        return await services.login(email, password)
        .then(async userId => {
            await dispatch(getUser(userId))    
            dispatch(removeLoading())    
        })
        .catch(error =>{
            dispatch(setError(error))
            dispatch(removeLoading())  
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
            dispatch(setSuccess({message:"Email konfirmasi Anda sudah terkirim kembali. Silahkan cek email Anda."}))
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

export function getTopSchools(){
    return async function(dispatch){
        return await services.getTopSchools()
        .then(async response => {
            await dispatch({type: GET_TOP_SCHOOLS, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}
export function findSchools(school){
    return async function(dispatch){
        dispatch({type:LOAD_SCHOOLS})
        return await services.findSchools(school)
        .then(async response =>{
            await dispatch({type:FIND_SCHOOLS, payload: response})
            dispatch(removeError())
        })
        .catch(error =>{
            dispatch(setError(error))
        })
    }
}
export function clearSchools(){
    return ({type:CLEAR_SCHOOLS})
}
export function sortReviewees(sortBy){
    return ({type:SORT_REVIEWEES, payload: sortBy})
}
export function findReviewees(name, school, type){
    return async function(dispatch){
        dispatch({type:LOAD_REVIEWEES, payload:type})
        return await services.findReviewees(name, school)
        .then(async response =>{
            const payload = {
                response: response,
                type: type
            }
            await dispatch({type:FIND_REVIEWEES, payload: payload})
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

export function sortReviews(sortBy){
    return ({type:SORT_REVIEWS, payload: sortBy})
}
export function addReview(revieweeId, review){
    return async function(dispatch){
        dispatch(removeSuccess())
        return await services.addReview(revieweeId, review)
        .then(async response =>{
            await dispatch({type:ADD_REVIEW, payload: response.data})
            if(revieweeId){
                dispatch(getReviews(revieweeId))
            }
            else{
                dispatch({type:GET_REVIEWS, payload: response.data})
            }
            dispatch(setSuccess({message:response.statusText}))
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
export function reportInappropriateness(report){
    return async function(dispatch){
        return await services.reportInappropriateness(report)
        .then(async response =>{
            await dispatch({type: REPORT_INAPPROPRIATE_REVIEW, payload: response})
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
export function setSuccess(success){
    window.scrollTo(0,0)
    return {type: SET_SUCCESS, payload: success}
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

export function changeIsMobile(isMobile){
    return {type: CHANGE_IS_MOBILE, payload: isMobile}
}