import React from "react";
import PopupForm from "../../components/Popup/PopupForm";
import LoginForm from "../../components/Form/LoginForm";

export default function Login(props){
    return(
        <PopupForm
            header={<h1>Log In</h1>}
            form={<LoginForm/>}
            footer={
                <div>
                    <a>Lupa password anda?</a>
                    <p>Tidak punya akun? <a>Sign up sekarang!</a></p>
                </div>
            }
        />
    )
}