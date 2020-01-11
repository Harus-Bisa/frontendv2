import React from "react";
import PopupForm from "./PopupForm";
import LoginForm from "../Form/LoginForm";

export default function LoginPopup(){
    return(
        <PopupForm
            header={<h1>Log In</h1>}
            form={<LoginForm/>}
            footer={
                <div>
                    <a href="/">Lupa password anda?</a>
                    <p>Tidak punya akun? <a href="/signup">Sign up sekarang!</a></p>
                </div>
            }
        />
    )
}