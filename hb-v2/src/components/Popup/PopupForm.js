import React from "react";

export default function PopupForm(props){
    return(
        <div>
            <div className="content" style={{textAlign:'center', marginBottom:'-15px'}}>
                {props.header}
            </div>
            <div>
                {props.form}
            </div>
            <div className="content" style={{textAlign:"right", marginTop:'-30px'}}>
                {props.footer}
            </div>
        </div>
    )
}