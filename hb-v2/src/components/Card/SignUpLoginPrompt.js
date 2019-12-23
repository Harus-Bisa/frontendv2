import React from "react";
import { Button } from "@material-ui/core";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa"
import { withRouter } from "react-router-dom";

function SignUpLoginPrompt(props){
    return(
        <div className="blue-box" style={{padding:'2rem', position:'relative', margin:"auto", top:'-250px'}}>
            <div style={{marginBottom:'1.5rem'}}>
                <h3>Sign up dan lihat semua reviewnya. Gratis!</h3>
            </div>
            <Button className="button red-button" id="signup" onClick={() => props.history.push("/signup")}>Buat akun sekarang</Button>
            <Button className="button" fullWidth id="login" onClick={() => props.history.push("/login")}>Login</Button>
            
        </div>
    )
}

export default withRouter(SignUpLoginPrompt)
