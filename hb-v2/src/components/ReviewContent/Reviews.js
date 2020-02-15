import React from "react";
import { connect } from "react-redux";
import ReviewCard from "../Card/ReviewCard";
import SignUpLoginPrompt from "../Card/SignUpLoginPrompt";

function Reviews(props){
    const makeReviewCard = () =>{
        var cards = [];
        if(props.loggedIn){
            for (let i=0; i<props.numberOfReviews; i++){
                cards.push(<ReviewCard type={props.type} key={i} id={i}/>)
            }
        }
        else{
            var max = props.numberOfReviews > 3 ? 3 : props.numberOfReviews
            if(max<3){
                for(let i=0; i<max; i++){
                    cards.push(<ReviewCard type={props.type} key={i} id={i}/>)
                }
                cards.push(
                    <div className="col-12" key={0}>
                        <div className="content">
                            <SignUpLoginPrompt/>
                        </div>
                    </div>
                )
            }
            else{
                for (let i=0; i<max; i++){
                    if (i === max-1){
                        cards.push(<ReviewCard type={props.type} key={i} id={i} blur={true}/>)
                    }
                    else{
                        cards.push(<ReviewCard type={props.type} key={i} id={i}/>)
                    }  
                }
            }
        }
        if(cards.length === 0){
            if(props.loggedIn){
                cards.push(
                    <div className="col-12">
                        <div className="blue-box" style={{marginTop:'1rem'}}>
                            <p>Dosen ini belum mempunyai review. Buatlah review pertamanya!</p>
                        </div>
                    </div>
                )
            }
            else{
                cards.push(
                    <div className="col-12" key={0}>
                        <div className="content">
                            <SignUpLoginPrompt/>
                        </div>
                    </div>
                )
            }
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
        numberOfReviews: state.professor.numberOfReviews,
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps)(Reviews);