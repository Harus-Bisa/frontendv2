import React from "react";
import { StyledRating } from "../Rating/StyledRating";
import { ThumbUp, ThumbUpOutlined } from "@material-ui/icons";
import { GoQuote } from "react-icons/go"

export default function RecentReviewCard(props){
    return(
        <div className="container recent-review">
            <div className="row justify-content-center">
                <div className="col-md-4 flex h1-wrapper">
                    <h1>Review Terbaru</h1>
                </div>
                <div className="col-md-7 recent-review-card flex">
                    <div className="row justify-content-end" style={{height:"100%"}}>
                        <div className="col-md-9">
                            <GoQuote id="quote"/>
                            {props.review && 
                            <div className="flex" style={{justifyContent:'space-between', height:'100%'}}>
                                <h4 style={{fontWeight:"500"}}>{props.review.review}</h4>
                                <div style={{margin:"15px 0"}}>
                                    <p className="light">Review untuk</p>
                                    <p style={{fontSize:'20px'}} className="bold">{props.review.name}</p>
                                    <p>{props.review.school}</p>
                                    <StyledRating
                                        precision={0.1}
                                        value={props.review.overallRating} 
                                        readOnly 
                                        icon={<ThumbUp/>}
                                        emptyIcon={<ThumbUpOutlined/>} 
                                        size={"small"}
                                    />
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}