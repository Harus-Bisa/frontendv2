import React from "react";
import Footer from "../../components/Footer/Footer";
import { Button, Divider } from "@material-ui/core";
import "../../css/helpPage.css";
import Popup from "../../components/Popup/Popup";
import ContactUsPopup from "../../components/Popup/ContactUsPopup";

export default function Help(){
    return(
        <div className="page-container flex help-page">
            <div className="flex footer-adjust">
                <div className="row header no-gutters padding">
                    <div className="col">
                        <h1>Bantuan</h1>
                        <p>Temukan jawaban Anda disini</p>
                    </div>  
                </div>
                <div className="container">
                    <div className="row justify-content-center faq padding">
                        <div className="col-lg-9">
                            <h3>PERTANYAAN POPULER</h3>
                            <p>Bagaimana apabila tidak ada nama Dosen saya disini?</p>
                            <p>Cara membuat review</p>
                            <p>Bagaimana cara menghitung penilaian overall?</p>
                            <p>Bagaimana cara tahu penulis review?</p>
                        </div>
                    </div>
                    <div className="flex">
                        <Divider className="margin-auto divider"/>
                    </div>
                    <div className="row contact-us justify-content-center content">
                        <div className="col-lg-6">
                            <h2>Butuh Bantuan Lebih</h2>
                            <p>Tidak menemukan jawaban Anda?</p>
                            <div className="flex">
                                <Popup
                                    trigger={{
                                        component:Button,
                                        id:'contact-us-button',
                                        className:"contrast-button button margin-auto"
                                    }}
                                    purpose="Hubungi Kami"
                                    content={ContactUsPopup}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}