import React from "react";
import { Button } from "@material-ui/core";
import Popup from "../Popup/Popup";
import SignUpPopup from "../Popup/SignupPopup";
import LoginPopup from "../Popup/LoginPopup";

export default function SignUpLoginPrompt(props){
    return(
        <div>
            <div className={props.float ? "blue-box float" : "blue-box"}>
                <div style={{marginBottom:'1.5rem'}}>
                    <h3>Sign up dan lihat semua reviewnya. Gratis!</h3>
                </div>
                <Popup
                    trigger={{
                        component:Button,
                        className:"button red-button",
                        id:'signup'
                    }}
                    purpose="Buat akun sekarang"
                    content={SignUpPopup}
                />
                <Popup
                    trigger={{
                        component:Button,
                        className:"button",
                        id:'login'
                    }}
                    purpose="Login"
                    content={LoginPopup}
                />
            </div>
        </div>
    )
}
