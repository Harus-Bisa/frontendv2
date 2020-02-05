import React from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { removeError } from "../../redux/actions";

function Feedback(props){
    const [visible, setVisible] = React.useState(true);
    const onDismiss = () => {
        setVisible(false)
        if(props.color === "danger"){
            props.removeError();
        }
        else if(props.color === "success"){
            //remove success
        }
    };
    const message = () =>{
        var content=[];
        var messages = props.message.split("\n")
        
        messages.forEach(m =>{
            content.push(<p key={m} style={{marginBottom:0}}>{m}</p>)
        })

        return content
    }
    return(
        <div style={{marginTop:'15px', marginBottom:"15px"}}>
            <Alert color={props.color} isOpen={visible} toggle={onDismiss}>
                {message()}
            </Alert>
        </div>
    )
}

Feedback.defaultProps={
    color:"danger",
    message: "default error"
}

export default connect(null,{removeError})(Feedback)