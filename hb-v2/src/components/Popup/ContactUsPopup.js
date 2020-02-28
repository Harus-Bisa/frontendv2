import React from "react";
import PopupForm from "./PopupForm";
import ContactUsForm from "../Form/ContactUsForm";
import { Link } from "react-router-dom";

export default function ContactUsPopup(props){
    return(
        <PopupForm
            header={<h3 style={{textAlign:'left'}}>Hubungi Kami</h3>}
            form={<ContactUsForm closePopup={props.closePopup}/>}
            footer={
                <div style={{textAlign:'center'}}>
                    <p>Dengan melanjutkan, Anda telah mengkonfirmasi bahwa anda telah membaca <Link to="/info/termsandconditions">Syarat dan Ketentuan</Link> dan menyetujui <Link to="/info/privacypolicy">Kebijakan Privasi</Link> Dosen Ku</p>
                </div>
            }
        />
    )
}