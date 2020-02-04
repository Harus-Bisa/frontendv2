import React from "react";

export default function PopupForm(props){
    return(
        <div>
            <div className="content" style={{textAlign:'center'}}>
                {props.header}
            </div>
            <div>
                {props.form}
            </div>
            <div className="content" style={{textAlign:"center"}}>
                {props.footer}
            </div>
        </div>
    )
}