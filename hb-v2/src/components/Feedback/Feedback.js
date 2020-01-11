import React from "react";
import { Alert } from "reactstrap";

export default function Feedback(props){
    return(
        <div style={{marginTop:'15px', marginBottom:"15px"}}>
            <Alert color={props.color}>
                {props.message}
            </Alert>
        </div>
    )
}

Feedback.defaultProps={
    color:"danger",
    message: "default error"
}