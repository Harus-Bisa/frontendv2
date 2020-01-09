import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";

function Landing(props){
    return(
        <div className='container center page-container'>
            <header>
                <h1>Review Dosen anda Sekarang</h1>
                <p>Bergabung dengan komunitas pelajar seluruh Indonesia</p>
            </header>
            <SearchBox/>
        </div>
    )
}
function mapStateToProps(state){
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Landing);