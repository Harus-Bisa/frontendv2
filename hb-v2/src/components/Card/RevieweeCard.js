import React from "react";

export default function RevieweeCard(props){
    const reviewee = props.reviewee
    return(
        <div className="reviewee-card">
            <a href={"/review/"+reviewee.revieweeId}><h3>{reviewee.name}</h3></a>
            <p>{reviewee.school}</p>
        </div>
    )
}