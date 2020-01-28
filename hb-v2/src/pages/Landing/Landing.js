import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";
import landingpageimg from "../../img/landingpageimg.png";

function Landing(props){
    return(
        <div className='container page-container'>
            <div style={{margin:'32vh 0'}}>
                <header>
                    <h1>Review Dosen anda Sekarang</h1>
                    <p>Bergabung dengan komunitas pelajar seluruh Indonesia</p>
                </header>
                <SearchBox/>
            </div>
            <div style={{marginBottom:'10vh'}} className="d-sm-none">
                <img src={landingpageimg} alt="landing" style={{width:"100%"}}/>
            </div>
        </div>
    )
}
function mapStateToProps(state){
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Landing);