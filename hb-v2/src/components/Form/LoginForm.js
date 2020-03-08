import React from "react";
import { FormGroup, Input, Label, Form } from "reactstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { login, removeError } from "../../redux/actions";
import { withRouter, Link } from "react-router-dom";
import Feedback from "../Feedback/Feedback";

function LoginForm(props){
    var [email, setEmail] = React.useState("")
    var [password, setPassword] = React.useState("")
    const submit = async (event) =>{
        event.preventDefault();
        await props.login(email, password)
        
    }
    const loggedIn = props.loggedIn
    const closePopup = props.closePopup
    const error = props.error
    const history = props.history
    const removeError = props.removeError
    React.useEffect(() =>{
        if(loggedIn && closePopup){
            closePopup()
        }
        if(error && error.message.includes("401")){
            closePopup()
            removeError()
            history.push("/verification/"+email)
        }
    }, [loggedIn, closePopup, error, history, removeError, email])
    if(props.loggedIn && !props.loading){
        if(localStorage.getItem("review")){
            var name = JSON.parse(localStorage.getItem('review')).name
            props.history.push("/review/new/"+name)
        }
        else{
            props.history.push("/")
        }
    }
    
    return(
        <div className="container content">
            {props.error && <Feedback color={"danger"} message={props.error.message}/>}
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Email<span className="red">*</span></Label>
                    <Input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        required
                        placeholder="Email Sekolah Anda"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password<span className="red">*</span></Label>
                    <Input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <p>Dengan masuk, Anda setuju dengan <Link to="/info/termsandconditions">Syarat dan Ketentuan</Link> dan <Link to="/info/privacypolicy">Kebijakan Privasi</Link>.</p>
                </FormGroup>
                <FormGroup style={{position:'relative'}}>
                    <Button type="submit" className="contrast-button" fullWidth disabled={props.loading}>Login</Button>
                    {props.loading && <CircularProgress size={14} style={{position:'absolute', top:'50%', left:"50%"}}/>}
                </FormGroup>
            </Form>
        </div>
    )
}

function mapStateToProps(state){
    return{
        error: state.error,
        loggedIn:state.loggedIn,
        loading: state.loading
    }
}
export default connect(mapStateToProps, {login, removeError})(withRouter(LoginForm));