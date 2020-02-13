import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";
import "../../css/landingPage.css";

function Landing(props){
    return(
        <div className='page-container landing-page'>
            <div className="container">
                <header className="flex">
                    <div className="margin-auto">
                        <h1>Review Dosen anda Sekarang</h1>
                        <SearchBox/>
                    </div>
                </header>
            </div>
        </div>
    )
}
function mapStateToProps(state){
    return{
        reviewees:state.reviewees
    }
}
export default connect(mapStateToProps)(Landing);