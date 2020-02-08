import { FIND_REVIEWEES, GET_REVIEWS, CLEAR_REVIEWEES, SET_ERROR, REMOVE_ERROR, VOTE, LOGIN, LOGOUT, SET_LOADING, REMOVE_LOADING, LOAD_REVIEWEES, REMOVE_SUCCESS, SET_SUCCESS } from "../constants/action-types";
import services from "../../Services";

const initialState ={
    loggedIn: services.isLoggedIn(),
    loadingCount:0,
    loading: true,
    reviewees:[],
    loadReviewees: false,
    success: false
}
export default function rootReducer(state = initialState, action){
    if(action.type === LOAD_REVIEWEES){
        return Object.assign({}, state, {
            loadReviewees: true
        })
    }
    if(action.type === FIND_REVIEWEES){
        return Object.assign({}, state, {
            reviewees: action.payload,
            found: action.payload.length !== 0,
            loadReviewees: false
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
    if(action.type === CLEAR_REVIEWEES){
        return Object.assign({}, state, {
            reviewees: []
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
    if(action.type === SET_SUCCESS){
        return Object.assign({}, state, {
            success: true
        })
    }
    if(action.type === REMOVE_SUCCESS){
        return Object.assign({}, state, {
            success: false
        })
    }
    if(action.type === LOGIN){
        return Object.assign({}, state, {
            loggedIn: true,
            user: action.payload
        })
    }
    if(action.type === LOGOUT){
        return Object.assign({}, state, {
            loggedIn: false,
            user:null
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