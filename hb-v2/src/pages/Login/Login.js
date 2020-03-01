import React from "react";
import sun from "../../img/sun.png";
import LoginForm from "../../components/Form/LoginForm";
import { Link } from "react-router-dom";

export default function Login(){
    return(
        <div className="page-container container flex">
            <div className="row justify-content-center no-gutters" style={{marginTop:"auto", marginBottom:'auto'}}>
                <div className="col-lg-7" style={{textAlign:'center'}}>
                    <div className="content container">
                        <img src={sun} alt={"sign-up"} style={{marginBottom:"1.5rem"}}/>
                        <h2>Masuk ke akun Anda</h2>
                    </div>
                </div>
                <div className="col-lg-5 flex">
                    <LoginForm className="margin-auto"/>
                    <div className="content container" style={{marginTop:'-30px', textAlign:'right'}}>
                        <p>Tidak punya akun? <Link to="/signup">Daftar!</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}