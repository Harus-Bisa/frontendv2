import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";
import "../../css/landingPage.css";
import Footer from "../../components/Footer/Footer";
import newestReview from "../../img/newestreviewimg.png";

function Landing(props){
    return(
        <div className='page-container landing-page'>
            <div className="container footer-adjust">
                <header className="flex">
                    <div className="margin-auto">
                        <h1>Review Dosen anda Sekarang</h1>
                        <SearchBox/>
                    </div>
                </header>
                <div className="row justify-content-center" style={{marginTop: "30vh"}}>
                    <div className="col-lg-8">
                        <img src={newestReview} alt={"newestReview"} style={{width:"100%"}}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
function mapStateToProps(state){
    return{
        reviewees:state.reviewees
    }
}
export default connect(mapStateToProps)(Landing);