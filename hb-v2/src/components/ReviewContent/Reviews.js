import React from "react";
import { connect } from "react-redux";
import ReviewCard from "../Card/ReviewCard";
import SignUpLoginPrompt from "../Card/SignUpLoginPrompt";

function Reviews(props){
    const makeReviewCard = () =>{
        var cards = [];
        var max = props.numberOfReviews > 3 ? 3 : props.numberOfReviews
        for (let i=0; i<max; i++){
            if (i === max-1){
                cards.push(<ReviewCard key={i} id={i} blur={true}/>)
            }
            else{
                cards.push(<ReviewCard key={i} id={i}/>)
            }  
        }
        return cards
    }
    return(
        <div className="container">
            <div className="row">
                {makeReviewCard()}
                <SignUpLoginPrompt/>
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