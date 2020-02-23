import React from "react";
import { FormGroup, Input, Label, Form, FormText } from "reactstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { signup, removeSuccess, setError, removeError } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import Feedback from "../Feedback/Feedback";

function SignUpForm(props){
    var [email, setEmail] = React.useState("")
    var [password, setPassword] = React.useState("")
    var [confirmPassword, setConfirmPassword] = React.useState("")
    var [showPasswordText, setShowPasswordText] = React.useState(false)
    var [name, setName] = React.useState("")

    const submit = async (event) =>{
        event.preventDefault();
        if(validEmail && validPassword && validName){
            const data = {
                name: name,
                email: email,
                password: password
            }
            props.removeError()
            await props.signup(data)
        }
        else{
            var errorMessage = "Tolong cek/isi berikut ini:\n"
            if(!validName){
                errorMessage += "- Isi nama Anda"
            }
            if(!validEmail){
                errorMessage += "- Pastikan Anda menggunakan email sekolah anda"
            }
            if(!validPassword){
                errorMessage += "- Pastikan password Anda benar"
            }
            props.setError(new Error(errorMessage))
        }
        
    }

    var validEmail = email !=="" && email.includes("ac.id")
    var validPassword = password === confirmPassword && password !== ""
    var validName = name !== ""
    if(props.success){
        if(props.closePopup){
            props.closePopup()
        }
        props.history.push('/verification/'+email)
        props.removeSuccess()
    }  
    return(
        <div className="container content" id="sign-up-form">
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Nama Lengkap<span className="red">*</span></Label>
                    <Input 
                        valid={validName} 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(event) => setName(event.target.value)} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email<span className="red">*</span></Label>
                    <p style={{marginBottom:'0.25rem'}}>Gunakan email universitas agar dapat memverifikasi status mahasiswa Anda</p>
                    <Input 
                        valid={validEmail} 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        placeholder={"dosenku@universitas.ac.id"} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password<span className="red">*</span></Label>
                    <Input 
                        valid={validPassword}
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        required
                        onFocus={() => setShowPasswordText(true)}
                        onBlur={() => setShowPasswordText(false)}
                        placeholder="******"
                    />
                    {showPasswordText  && <FormText>6+ characters/upper/lower/symbol</FormText>}
                </FormGroup>
                <FormGroup>
                    <Label>Konfirmasi Password<span className="red">*</span></Label>
                    <Input 
                        valid={validPassword}
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(event) => setConfirmPassword(event.target.value)} 
                        required
                        placeholder="******"
                    />
                </FormGroup>
                <FormGroup>
                    <p>Dengan melanjutkan, Anda menyetujui <a href="/info/termsandconditions">Syarat dan Ketentuan</a> Dosen Ku dan menyetujui <a href="/info/privacypolicy">Kebijakan Privasi</a> Dosen Ku</p>
                </FormGroup>
                {props.error && <Feedback color={"danger"} message={props.error.message}/>}
                <FormGroup>
                    <Button type="submit" className="contrast-button" fullWidth>Daftar</Button>
                </FormGroup>
            </Form>
        </div>
    )
}
function mapStateToProps(state){
    return{
        error: state.error,
        success: state.success
    }
}
export default connect(mapStateToProps, {signup, removeSuccess, removeError, setError})(withRouter(SignUpForm));