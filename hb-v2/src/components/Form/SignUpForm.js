import React from "react";
import { FormGroup, Input, Label, Form, FormText } from "reactstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { signup, removeSuccess, setError, removeError } from "../../redux/actions";
import { withRouter, Prompt, Link } from "react-router-dom";
import Feedback from "../Feedback/Feedback";

function SignUpForm(props){
    var [email, setEmail] = React.useState("")
    var [password, setPassword] = React.useState("")
    var [confirmPassword, setConfirmPassword] = React.useState("")
    var [showPasswordText, setShowPasswordText] = React.useState(false)
    var [filled, setFilled] = React.useState(false);
    var [submitted, setSubmitted] = React.useState(false);

    const submit = async (event) =>{
        event.preventDefault();
        if(validPassword && validEmail){
            const data = {
                email: email,
                password: password
            }
            setSubmitted(true)
            props.removeError()
            await props.signup(data)
        }
        else{
            var errorMessage = "Tolong cek/isi berikut ini:\n"
            if(!validEmail){
                errorMessage += "- Pastikan Anda menggunakan email sekolah anda\n"
            }
            if(!validPassword){
                errorMessage += "- Pastikan password Anda benar\n"
            }
            props.setError(new Error(errorMessage))
        }
        
    }

    var validEmail = email !=="" //&& email.includes("ac.id")
    var validPassword = password === confirmPassword && password !== ""
    if(props.success){
        if(props.closePopup){
            props.closePopup()
        }
        props.history.push('/verification/'+email)
        props.removeSuccess()
    }  
    return(
        <div className="container content" id="sign-up-form">
            <Prompt
                when={filled && !submitted}
                message={"Apakah anda yakin? Kami tidak menyimpan data yang sudah terisi."}
            />
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Email<span className="red">*</span></Label>
                    <p style={{marginBottom:'0.25rem'}}>Gunakan email universitas agar dapat memverifikasi status mahasiswa Anda</p>
                    <Input 
                        valid={validEmail} 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(event) => {
                            setEmail(event.target.value)
                            setFilled(true)
                        }} 
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
                        onChange={(event) => {
                            setPassword(event.target.value)
                            setFilled(true)
                        }} 
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
                        onChange={(event) => {
                            setConfirmPassword(event.target.value)
                            setFilled(true)
                        }} 
                        required
                        placeholder="******"
                    />
                </FormGroup>
                <FormGroup>
                    <p>Dengan melanjutkan, Anda menyetujui <Link to="/info/termsandconditions">Syarat dan Ketentuan</Link> Dosen Ku dan menyetujui <Link to="/info/privacypolicy">Kebijakan Privasi</Link> Dosen Ku</p>
                </FormGroup>
                {props.error && <Feedback color={"danger"} message={props.error.message}/>}
                <FormGroup style={{position:'relative'}}>
                    <Button type="submit" className="contrast-button" fullWidth disabled={props.loading}>Daftar</Button>
                    {props.loading && <CircularProgress size={14} style={{position:'absolute', top:'50%', left:"50%"}}/>}
                </FormGroup>
            </Form>
        </div>
    )
}
function mapStateToProps(state){
    return{
        error: state.error,
        success: state.success,
        loading: state.loading
    }
}
export default connect(mapStateToProps, {signup, removeSuccess, removeError, setError})(withRouter(SignUpForm));