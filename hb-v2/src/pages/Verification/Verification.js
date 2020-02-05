import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { resendVerification } from "../../redux/actions";
import Feedback from "../../components/Feedback/Feedback";

function Verification(props){

    const resend = async () =>{
        if(props.match.params.email){
            const email = props.match.params.email
            await props.resendVerification(email)
        }
    }
    return(
        <div className="container content page-container">
            {props.success && <Feedback color={"success"} message="Email Konfirmasi sudah terkirim kembali!"/>}
            {props.error && <Feedback color={"danger"} message={props.error.message}/>}
            <header style={{marginBottom:'30px'}}>
                <h3 style={{textAlign:'center'}}>Konfirmasi Email Anda</h3>
                <p>Silakan periksa inbox Anda untuk email konfirmasi. Klik link dalam email untuk mengonfirmasi email Anda</p>
            </header>
            <Button fullWidth className="contrast-button" onClick={resend} disabled={props.success}>Kirim Ulang Email Konfirmasi</Button>
        </div>
    )
}

function mapStateToProps(state){
    return{
        error: state.error,
        success: state.success
    }
}
export default connect(mapStateToProps,{resendVerification})(Verification)