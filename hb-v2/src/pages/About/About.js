import React from "react";
import Footer from "../../components/Footer/Footer";
import aboutPageImg from "../../img/aboutpageimg.png";

export default function About(){
    return(
        <div className="container page-container flex">
            <div className="flex footer-adjust">
                <div className="row justify-content-center margin-auto">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-md-7 flex">
                                <div className="margin-auto">
                                    <h2>Kenapa Ada Dosen<span style={{color:"#39A3FF"}}>Ku</span>?</h2> 
                                    <p>Misi Dosen Ku adalah membuat pendidikan universitas di Indonesia lebih transparan dan akuntabel. Kita mau membuat suatu wadah bagi semua mahasiswa di Indonesia untuk bertukar pengalaman berkuliah mereka. Sebagai seorang mahasiswa, kita ada perbedaan ekspektasi antara mahasiswa dan dosen. Semoga dengan adanya wadah ini menjadi sarana bagi mahasiswa untuk mendapatkan gambaran mengenai dosen yang akan mereka ambil dan belajar untuk Indonesia yang lebih maju.</p>
                                </div>
                            </div>
                            <div className="col-md-5 flex">
                                <img className="margin-auto" src={aboutPageImg} alt={"aboutpage"}/>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <Footer/>
        </div>
    )
}