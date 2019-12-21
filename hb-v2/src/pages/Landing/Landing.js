import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";

function Landing(props){
    return(
        <div className='container center'>
            <header>
                <h1>Review Dosen anda Sekarang</h1>
                <p>Bergabung dengan komunitas pelajar seluruh Indonesia</p>
            </header>
            <SearchBox/>
            {props.users && props.users.length === 0 && 
                <div style={{marginTop:'1.5rem'}}>
                    <p>Tidak menemukan nama Dosen Anda? <a href="/review/new/add">Laporkan Sekarang!</a></p>
                </div>}
        </div>
    )
}
function mapStateToProps(state){
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(Landing);