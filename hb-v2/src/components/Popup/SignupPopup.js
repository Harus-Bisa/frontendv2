import React from "react";
import PopupForm from "./PopupForm";
import SignUpForm from "../Form/SignUpForm";

export default function SignUpPopup(){
    return(
        <PopupForm
            header={<h1>Buat Akun Gratis</h1>}
            form={<SignUpForm/>}
            footer={
                <div>
                    <p>Sudah mempunyai akun? <a href="/login">Log In sekarang!</a></p>
                </div>
            }
        />
    )
}