import React from "react";
import PopupForm from "../../components/Popup/PopupForm";
import SignUpForm from "../../components/Form/SignUpForm";

export default function SignUp(props){
    return(
        <div className="page-container">
            <PopupForm
                header={<h1>Buat Akun Gratis</h1>}
                form={<SignUpForm/>}
                footer={
                    <div>
                        <p>Sudah mempunyai akun? <a>Log In sekarang!</a></p>
                    </div>
                }
            />
        </div>
    )
}