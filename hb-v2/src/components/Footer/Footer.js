import React from "react";
import { Divider, IconButton } from "@material-ui/core";
import "../../css/footer.css";
import { IoLogoFacebook, IoLogoTwitter } from 'react-icons/io';
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <div className="footer container">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="row justify-content-center no-gutters">
                        <div className="col-lg-3 col-md-4 col-12" style={{display:'flex'}}>
                            <h2 style={{margin:'auto'}}>DOSEN <span className="blue">KU</span></h2>
                        </div> 
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <IoLogoFacebook/>
                                </IconButton>
                                <IconButton>
                                    <AiFillInstagram/>
                                </IconButton>
                                <IconButton>
                                    <IoLogoTwitter/>
                                </IconButton>
                            </div>
                        </div>               
                    </div>
                    <div className="row links no-gutters justify-content-center">
                        <div className="col-3 col-lg-2 flex">
                            <Link to="/help">Bantuan</Link>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className="col-4 col-lg-2 flex">
                            <Link to="/about">Tentang Kami</Link>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className="col-4 col-lg-2 flex">
                            <Link to="/info/privacypolicy">Kebijakan Privasi</Link>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className="col-5 col-lg-2 flex">
                            <Link to="/info/termsandconditions">Syarat & Kententuan</Link>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className="col-5 col-lg-2 flex">
                            <Link to="/info/communityguidelines">Peraturan Konten</Link>
                        </div>
                    </div>
                    <div>
                    <p className="trademark">2020 DOSEN KU | All Rights Reserved</p>
                </div>
                </div>
            </div>
        </div>
    )
}