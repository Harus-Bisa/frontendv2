import React from "react";
import SignUpPopup from "../../components/Popup/SignupPopup";
import SignUpForm from "../../components/Form/SignUpForm";


export default function SignUp(){
    return(
        <div className="page-container container flex">
            <div className="row justify-content-center no-gutters" style={{marginTop:"auto", marginBottom:'auto'}}>
                <div className="col-lg-7" style={{textAlign:'center'}}>
                    <div className="content container">
                        <h2>Daftar Akun Gratis</h2>
                    </div>
                </div>
                <div className="col-lg-5 flex">
                    <SignUpForm className="margin-auto"/>
                    <div className="content container" style={{marginTop:'-30px', textAlign:'right'}}>
                        <p>Sudah punyai akun? <a href="/login">Log In!</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}