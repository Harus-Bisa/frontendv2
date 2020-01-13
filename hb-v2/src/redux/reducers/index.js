import { FIND_USERS, GET_REVIEWS, CLEAR_USERS, SET_ERROR, REMOVE_ERROR, VOTE, LOGIN, LOGOUT, SET_LOADING, REMOVE_LOADING } from "../constants/action-types";
import services from "../../Services";

const initialState ={
    loggedIn: services.isLoggedIn(),
    loadingCount:0,
    loading: true
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
    if(action.type === VOTE){
        let targetIndex = state.professor.reviews.findIndex((r) => {return r.reviewId === action.payload.reviewId})
        let newReviews = state.professor.reviews.slice();
        newReviews.splice(targetIndex,1, action.payload)
        return Object.assign({}, state, {
            professor: {
                ...state.professor,
                reviews: newReviews
                
            }
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
        if(state.error){
            return Object.assign({}, state, {
                error: null
            })
        } 
    }
    if(action.type === LOGIN){
        return Object.assign({}, state, {
            loggedIn: true,
            userId: action.payload
        })
    }
    if(action.type === LOGOUT){
        return Object.assign({}, state, {
            loggedIn: false,
            userId: null
        })
    }
    if(action.type === SET_LOADING){
        return Object.assign({}, state, {
            loadingCount: state.loadingCount + 1,
            loading: true
        })
    }
    if(action.type === REMOVE_LOADING){
        let count = state.loadingCount - 1;
        if(count<0){
            count = 0
        }
        return Object.assign({}, state, {
            loadingCount: count,
            loading: count !== 0
        })
    }
    return state;
}