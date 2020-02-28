import React from "react";
import PopupForm from "./PopupForm";
import SignUpForm from "../Form/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUpPopup(props){
    if(props.collapseNavbar){
        props.collapseNavbar()
    }
    return(
        <PopupForm
            header={<h3>Daftar Akun Gratis</h3>}
            form={<SignUpForm page={props.page} closePopup={props.closePopup}/>}
            footer={
                <div>
                    <p>Sudah punyai akun? <a href="/login">Log In!</a></p>
                </div>
            }
        />
    )
}