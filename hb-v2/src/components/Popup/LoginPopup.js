import React from "react";
import PopupForm from "./PopupForm";
import LoginForm from "../Form/LoginForm";

export default function LoginPopup(props){
    return(
        <PopupForm
            header={<h3>Masuk Ke Akun Anda</h3>}
            form={<LoginForm page={props.page} closePopup={props.closePopup}/>}
            footer={
                <div>
                    {/* <a href="/">Lupa password anda?</a> */}
                    <p>Tidak punya akun? <a href="/signup">Sign up!</a></p>
                </div>
            }
        />
    )
}