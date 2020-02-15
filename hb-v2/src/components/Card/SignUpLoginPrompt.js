import React from "react";
import { Button } from "@material-ui/core";
import Popup from "../Popup/Popup";
import SignUpPopup from "../Popup/SignupPopup";
import LoginPopup from "../Popup/LoginPopup";

export default function SignUpLoginPrompt(props){
    return(
        <div className={props.float ? "blue-box float" : "blue-box"}>
            <div className="row justify-content-center">
                <div className="col-lg-9 col-md-10">
                    <div className="row">
                        <div className="col-lg-8 col-md-7">
                            <h3>Sign up dan lihat semua reviewnya. Gratis!</h3>
                        </div>
                        <div className="col-lg-4 col-md-5">
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
                </div>
            </div>
        </div>
    )
}
