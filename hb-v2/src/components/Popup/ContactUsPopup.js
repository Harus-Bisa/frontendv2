import React from "react";
import PopupForm from "./PopupForm";
import ContactUsForm from "../Form/ContactUsForm";

export default function ContactUsPopup(props){
    return(
        <PopupForm
            header={<h3 style={{textAlign:'left'}}>Hubungi Kami</h3>}
            form={<ContactUsForm closePopup={props.closePopup}/>}
            footer={
                <div style={{textAlign:'center'}}>
                    <p>Dengan melanjutkan, Anda telah mengkonfirmasi bahwa anda telah membaca <a href="/info/termsandconditions">Syarat dan Ketentuan</a> dan menyetujui <a href="/info/privacypolicy">Kebijakan Privasi</a> Dosen Ku</p>
                </div>
            }
        />
    )
}