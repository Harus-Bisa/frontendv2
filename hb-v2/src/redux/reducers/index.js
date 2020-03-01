import { FIND_REVIEWEES, GET_REVIEWS, CLEAR_REVIEWEES, SET_ERROR, REMOVE_ERROR, VOTE, LOGIN, LOGOUT, SET_LOADING, REMOVE_LOADING, LOAD_REVIEWEES, REMOVE_SUCCESS, SET_SUCCESS, FIND_SCHOOLS, LOAD_SCHOOLS, CLEAR_SCHOOLS, SORT_REVIEWEES, CHANGE_IS_MOBILE, GET_TOP_SCHOOLS, GET_RECENT_REVIEWS, SORT_REVIEWS } from "../constants/action-types";
import services from "../../Services";
import { NAME, POPULARITY, RATING } from "../../pages/Query/Query";
import { sortName, sortPopularity, sortRating } from "./revieweeSortFunctions";
import { NEWEST, OLDEST } from "../constants/sort-types";
import { sortNewest, sortOldest } from "./reviewSortFunction";

const initialState ={
    loggedIn: services.isLoggedIn(),
    loadingCount:0,
    loading: false,
    reviewees:[],
    loadReviewees: false,
    pageReviewees: [],
    loadPageReviewees: false,
    schools: [],
    loadSchools: false,
    success: false,
    isMobile:(window.innerWidth < 768)
}

export default function rootReducer(state = initialState, action){
    if(action.type === SORT_REVIEWEES){
        const newPageReviewees = state.pageReviewees;
        if(action.payload === NAME){  
            newPageReviewees.sort(sortName);
        }
        else if(action.payload === POPULARITY){
            newPageReviewees.sort(sortPopularity);
        }
        else if(action.payload === RATING){
            newPageReviewees.sort(sortRating);
        }
        return Object.assign({}, state, {
            pageReviewees: newPageReviewees
        })
    }
    if(action.type === LOAD_REVIEWEES){
        if(action.payload === "page"){
            return Object.assign({}, state, {
                loadPageReviewees: true
            })
        }
        return Object.assign({}, state, {
            loadReviewees: true
        })
    }
    if(action.type === FIND_REVIEWEES){
        if(action.payload.type === "page"){
            return Object.assign({}, state, {
                pageReviewees: action.payload.response.sort(sortName),
                found: action.payload.response.length !== 0,
                loadPageReviewees: false
            })
        }
        else if (action.payload.type === "searchBox"){
            return Object.assign({}, state, {
                reviewees: action.payload.response,
                found: action.payload.response.length !== 0,
                loadReviewees: false
            })
        }
        
    }
    if(action.type === CLEAR_REVIEWEES){
        return Object.assign({}, state, {
            reviewees: [],
            pageReviewees:[]
        })
    }
    if(action.type === LOAD_SCHOOLS){
        return Object.assign({}, state, {
            loadSchools: true,
        })
    }
    if(action.type === FIND_SCHOOLS){
        return Object.assign({}, state, {
            schools: action.payload,
            loadSchools: false
        })
    }
    if(action.type === CLEAR_SCHOOLS){
        return Object.assign({}, state, {
            schools: []
        })
    }
    if(action.type === GET_TOP_SCHOOLS){
        return Object.assign({}, state, {
            topSchools: action.payload
        })
    }
    if(action.type === GET_RECENT_REVIEWS){
        return Object.assign({}, state, {
            recentReviews: action.payload
        })
    }
    if(action.type === GET_REVIEWS){
        return Object.assign({}, state, {
            professor: action.payload
        })
    } 
    if(action.type === SORT_REVIEWS){
        const newReviews = state.professor.reviews;
        if(action.payload === NEWEST){  
            newReviews.sort(sortNewest);
        }
        else if(action.payload === OLDEST){
            newReviews.sort(sortOldest);
        }
        return Object.assign({}, state, {
            professor: Object.assign({}, state.professor, {reviews:newReviews})
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
    if(action.type === CHANGE_IS_MOBILE){
        return Object.assign({}, state, {
            isMobile: action.payload
        })
    }
    return state;
}