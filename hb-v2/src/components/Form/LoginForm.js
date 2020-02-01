import React from "react";
import { FormGroup, Input, Label, Form } from "reactstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import Feedback from "../Feedback/Feedback";

function LoginForm(props){
    var [email, setEmail] = React.useState("")
    var [password, setPassword] = React.useState("")
    const submit = async (event) =>{
        event.preventDefault();
        await props.login(email, password)
        if(props.loggedIn && props.page){
            props.history.push("/")
        }
    }
    return(
        <div className="container content">
            {props.error && <Feedback color={"danger"} message={props.error.message}/>}
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Email*</Label>
                    <Input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoFocus/>
                </FormGroup>
                <FormGroup>
                    <Label>Password*</Label>
                    <Input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                </FormGroup>
                <Button type="submit" className="contrast-button" fullWidth>Login</Button>
            </Form>
        </div>
    )
}

function mapStateToProps(state){
    return{
        error: state.error,
        loggedIn:state.loggedIn
    }
}
export default connect(mapStateToProps, {login})(withRouter(LoginForm));