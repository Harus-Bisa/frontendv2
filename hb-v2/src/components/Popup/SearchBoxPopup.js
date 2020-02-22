import React from "react"
import SearchBox from "../SearchBox/SearchBox"

export default function SearchBoxPopup(props){
    return(
        <SearchBox showSchool={true} {...props} />
    )
}