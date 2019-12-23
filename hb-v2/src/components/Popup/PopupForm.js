import React from "react";

export default function PopupForm(props){
    return(
        <div>
            <div className="blue-box" style={{padding:'1.5rem'}}>
                {props.header}
            </div>
            <div>
                {props.form}
            </div>
            <div className="grey-box" style={{padding:'1.5rem', textAlign:"center"}}>
                {props.footer}
            </div>
        </div>
    )
}