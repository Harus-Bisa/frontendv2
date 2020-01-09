import React from "react";
import { FormGroup, Input, Label, Form } from "reactstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login } from "../../redux/actions";

function LoginForm(props){
    var [email, setEmail] = React.useState("")
    var [password, setPassword] = React.useState("")
    const submit = (event) =>{
        event.preventDefault();
        props.login(email, password)
    }
    return(
        <div className="container content">
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

export default connect(null, {login})(LoginForm);