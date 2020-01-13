import React from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { removeError } from "../../redux/actions";

function Feedback(props){
    const [visible, setVisible] = React.useState(true);
    const onDismiss = () => {
        setVisible(false)
        props.removeError();
    };

    return(
        <div style={{marginTop:'15px', marginBottom:"15px"}}>
            <Alert color={props.color} isOpen={visible} toggle={onDismiss}>
                {props.message}
            </Alert>
        </div>
    )
}

Feedback.defaultProps={
    color:"danger",
    message: "default error"
}

export default connect(null,{removeError})(Feedback)