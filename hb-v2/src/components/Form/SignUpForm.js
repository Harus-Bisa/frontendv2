import React from "react";
import { FormGroup, Input, Label, Form, FormText } from "reactstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { signup } from "../../redux/actions";

function SignUpForm(props){
    var [email, setEmail] = React.useState("")
    var [password, setPassword] = React.useState("")
    var [confirmPassword, setConfirmPassword] = React.useState("")
    var [name, setName] = React.useState("")

    const submit = (event) =>{
        event.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password
        }
        props.signup(data)
    }
    var validEmail = email.includes(".edu") && email !==""
    var validPassword = password === confirmPassword && password !== ""
    var validName = name !== ""

    return(
        <div className="container content">
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Nama*</Label>
                    <Input valid={validName} type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required autoFocus/>
                </FormGroup>
                <FormGroup>
                    <Label>Email*</Label>
                    <FormText>Untuk membuat Akun bersama kami, anda harus menggunakan email universitas anda</FormText>
                    <Input 
                        valid={validEmail} 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        placeholder={"contoh: userwah@sekolah.edu"} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password*</Label>
                    <Input 
                        valid={validPassword}
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password*</Label>
                    <Input 
                        valid={validPassword}
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(event) => setConfirmPassword(event.target.value)} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormText>Dengan Sign Up, Anda menerima Ketentuan Layanan dan Kebijakan Privasi Wah!</FormText>
                    <Button type="submit" className="contrast-button" fullWidth disabled={!(validName && validEmail && validPassword)}>Daftar</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default connect(null, {signup})(SignUpForm);