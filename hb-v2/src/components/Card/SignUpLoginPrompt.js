import React from "react";
import { Button } from "@material-ui/core";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa"
import { withRouter } from "react-router-dom";

function SignUpLoginPrompt(props){
    return(
        <div className="blue-box" style={{padding:'2rem'}}>
            <div style={{marginBottom:'1.5rem'}}>
                <h3>Sign up dan lihat semua reviewnya. Gratis!</h3>
            </div>
            <Button className="button google-button">
                <div className="col-1">
                    <FaGoogle/>
                </div>
                <div className="col" style={{marginLeft:'-15px'}}>
                    lanjutkan dengan Google
                </div>
            </Button>
            <Button className="button facebook-button">
                <div className="col-1">
                    <FaFacebookSquare/>
                </div>
                <div className="col" style={{marginLeft:'-15px'}}>
                    lanjutkan dengan Facebook
                </div>
            </Button>
            <div className="row">
                <div className="col-3" style={{display:'flex'}}>
                    <Button className="button" onClick={() => props.history.push("/login")}>Login</Button>
                </div>
                <div className="col" style={{display:'flex'}}>
                    <Button className="button" onClick={() => props.history.push("/signup")}>Sign up dengan email</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(SignUpLoginPrompt)
