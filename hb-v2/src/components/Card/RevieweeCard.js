import React from "react";
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { StyledRating } from "../Rating/StyledRating";
import { ThumbUp, ThumbUpOutlined } from "@material-ui/icons";

export default function RevieweeCard(props){
    const reviewee = props.reviewee;
    const history = useHistory();
    return(
        <Button fullWidth onClick={() => history.push("/review/"+reviewee.revieweeId)} className="reviewee-card">
            <div className="reviewee-card-content">
                <div className="row justify-content-center no-gutters">
                    <div className="col-md-8 col-6">
                        <a href={"/review/"+reviewee.revieweeId}><h3>{reviewee.name}</h3></a>
                        <p>{reviewee.school}</p>
                    </div>
                    <div className="col-md-3 col-6 flex">
                        <div className="flex margin-auto">
                            <StyledRating
                                precision={0.1}
                                value={reviewee.overallRating === "-" ? 0 : reviewee.overallRating} 
                                readOnly 
                                icon={<ThumbUp/>}
                                emptyIcon={<ThumbUpOutlined/>} 
                                className="margin-auto"
                            />
                            <p className="margin-auto">{reviewee.numberOfReviews} Review</p>
                        </div>
                    </div>
                </div>
            </div>
        </Button>
    )
}