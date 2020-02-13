import React from "react";
import { FormGroup, Input, Label, Form, FormText } from "reactstrap";
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
        
    }
    const loggedIn = props.loggedIn
    const closePopup = props.closePopup
    React.useEffect(() =>{
        if(loggedIn && closePopup){
            closePopup()
        }
    }, [loggedIn, closePopup])
    if(props.loggedIn && props.page){
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
                    <FormText>Dengan masuk, Anda setuju dengan <a href="/info/termsandconditions">Syarat dan Ketentuan</a> dan <a href="/info/privacypolicy">Kebijakan Privasi</a>.</FormText>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" className="contrast-button" fullWidth>Login</Button>
                </FormGroup>
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