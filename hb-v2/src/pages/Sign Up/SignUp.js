import React from "react";
import SignUpForm from "../../components/Form/SignUpForm";
import sun from "../../img/sun.png";

export default function SignUp(){
    return(
        <div className="page-container container flex">
            <div className="row justify-content-center no-gutters" style={{marginTop:"auto", marginBottom:'auto'}}>
                <div className="col-lg-7" style={{textAlign:'center'}}>
                    <div className="content container">
                        <img src={sun} alt={"sign-up"} style={{marginBottom:"1.5rem"}}/>
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