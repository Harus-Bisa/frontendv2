import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function Landing(){
    return(
        <div className='container center'>
            <header>
                <h1>Review Dosen anda Sekarang</h1>
                <p>Bergabung dengan komunitas pelajar seluruh Indonesia</p>
            </header>
            <SearchBox/>
        </div>
    )
}