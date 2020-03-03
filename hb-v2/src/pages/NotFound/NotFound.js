import React from "react";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div className="container content page-container">
            <div className="footer-adjust flex">
                <div className="margin-auto" style={{textAlign:'center'}}>
                    <h1>Halaman Tidak Ditemukan</h1>
                    <p>Silahkan kembali ke <Link to="/">halaman utama</Link> atau <Link to="/help">hubungi kami</Link>.</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}