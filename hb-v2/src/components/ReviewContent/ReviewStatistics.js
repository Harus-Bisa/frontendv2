import React from "react";
import { connect } from "react-redux";
import { Check, LocalCafe } from "@material-ui/icons";
import SignUpLoginPrompt from "../Card/SignUpLoginPrompt";

function ReviewStatistics(props){
    if(!props.loggedIn){
        return(
            <div className="container content">
                <SignUpLoginPrompt/>
            </div>
        )
    }
    return(
        <div className="container review-statistics">
            <div className="row">
                <div className="col-3">
                    <h2>{props.professor.recommendationRating.toFixed(1)}</h2>
                </div>
                <div className="col-3">
                    <Check className="icon"/>
                </div>
                <div className="col-6">
                    <p>Merekomendasi untuk mengambil Dosen ini</p>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <h2>{props.professor.difficultyRating.toFixed(1)}</h2>
                </div>
                <div className="col-3">
                    <LocalCafe className="icon"/>
                </div>
                <div className="col-6">
                    <p>Kesusahan Kelas</p>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        professor: state.professor,
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps)(ReviewStatistics)