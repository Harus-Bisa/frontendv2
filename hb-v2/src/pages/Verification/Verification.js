import React from "react";
import { Button } from "@material-ui/core";

export default function Verification(props){
    return(
        <div className="container content page-container">
            <header style={{marginBottom:'30px'}}>
                <h3 style={{textAlign:'center'}}>Konfirmasi Email Anda</h3>
                <p>Silakan periksa inbox Anda untuk email konfirmasi. Klik link dalam email untuk mengonfirmasi email Anda</p>
            </header>
            <Button fullWidth className="contrast-button">Kirim Ulang Konfirmasi Email</Button>
        </div>
    )
}