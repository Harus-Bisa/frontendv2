import React from "react";
import { Button } from "@material-ui/core";
import Popup from "../Popup/Popup";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Sign Up/SignUp";

export default function SignUpLoginPrompt(props){
    return(
        <div className="blue-box" style={props.float ? {padding:'2rem', margin:"auto", position:'relative', top:'-250px'} : {padding:'2rem', margin:'auto'}}>
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
                content={SignUp}
            />
            <Popup
                trigger={{
                    component:Button,
                    className:"button",
                    id:'login'
                }}
                purpose="Login"
                content={Login}
            />
        </div>
    )
}
