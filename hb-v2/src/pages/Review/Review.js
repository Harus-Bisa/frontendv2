import React from "react";
import { connect } from "react-redux";
import {ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import { StyledRating } from "../../components/Rating/StyledRating";
import ReviewContent from "../../components/ReviewContent/ReviewContent";
import "../../css/review.css";
import { getReviews } from "../../redux/actions";
import Popup from "../../components/Popup/Popup";
import LoginPopup from "../../components/Popup/LoginPopup";
import Feedback from "../../components/Feedback/Feedback";

function ThumbRating(props){
    return (<StyledRating
        name="thumb-rating"
        icon={<ThumbUp/>}
        emptyIcon={<ThumbUpOutlined/>} 
        className="large-rating"
        onChange={props.onChange}
    />)
}
function Review(props){
    var [rating, setRating] = React.useState(0)

    const addReview = (event, value) =>{
        setRating(value)
        if(props.loggedIn){
            props.history.push("/review/"+props.professor.revieweeId+"/add/"+value)
        }
    }
    const revieweeId = props.match.params.revieweeId;
    const loggedIn = props.loggedIn
    const getReviews = props.getReviews;

    React.useEffect(() =>{
        getReviews(revieweeId)
    }, [getReviews, revieweeId, loggedIn])


    if(props.loading){
        return(<div className="container content page-container"><p>Loading</p></div>)
    }
    if (props.error && !props.professor){
        return(
            <div className="container content page-container">
                <Feedback color={"danger"} message={props.error.message}/>
            </div>
        )
    }
    if(props.professor){
        return(
            <div className="container content page-container">
                {props.error && <Feedback color={"danger"} message={props.error.message}/>}
                <header className="review-header">
                    <h2 style={{borderBottom:"4px solid #39A3FF", width:'fit-content', fontSize: "calc(100% + 17px)"}}>{props.professor.name}</h2>
                    <p>{props.professor.school}</p>
                    <div style={{display:'flex', marginTop:'10px'}}>
                        <StyledRating
                            precision={0.1}
                            value={props.professor.overallRating === "-" ? 0 : props.professor.overallRating} 
                            readOnly 
                            icon={<ThumbUp/>}
                            emptyIcon={<ThumbUpOutlined/>} 
                        />
                        <p style={{fontSize:'11px', marginLeft:'10px', marginBottom:'0px'}}>{props.professor.numberOfReviews} Review</p>
                    </div>
                </header>
                <div style={{display:"flex", alignItems:'center', flexDirection:'column'}}>
                    <p className="grey-text">{props.professor.numberOfReviews === 0 ? "Be the first to review!" : "Tulis Review Anda"}</p>
                    {props.loggedIn && 
                        <StyledRating
                            name="addReview"
                            id="addReview"
                            onChange={addReview}
                            value={rating}
                            icon={<ThumbUp/>}
                            emptyIcon={<ThumbUpOutlined/>} 
                            className="large-rating"
                        />
                    }
                    {!props.loggedIn && 
                        <Popup
                            trigger={{
                                component:ThumbRating,
                            }}
                            content={LoginPopup}
                        />
                    }
                </div>
                <div style={{margin:'1rem -30px'}}>
                    <ReviewContent/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        professor: state.professor,
        error: state.error,
        loggedIn: state.loggedIn,
        loading: state.loading
    }
}
export default connect(mapStateToProps, {getReviews})(Review);