import React from "react";
import { connect } from "react-redux";
import ReviewCard from "../Card/ReviewCard";

function Reviews(props){
    const makeReviewCard = () =>{
        var cards = [];
        for (let i=0; i<props.numberOfReviews; i++){
            cards.push(<ReviewCard key={i} id={i}/>)
        }
        return cards
    }
    return(
        <div className="container">
            <div className="row">
                {makeReviewCard()}
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        numberOfReviews: state.professor.numberOfReviews
    }
}
export default connect(mapStateToProps)(Reviews);