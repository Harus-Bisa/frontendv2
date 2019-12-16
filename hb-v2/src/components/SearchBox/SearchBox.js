import React from "react";
import { Button, Input } from "reactstrap";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

function SearchBox(props){
    var [text, setText] = React.useState("")
    const search = () =>{
        props.search();
        props.history.push("/review/1")
    }
    return(
        <div className="search-box">
            <Input type='text' id="search-box" placeholder="Cari nama Dosen anda" value={text} onChange={(event) => setText(event.target.value) }/>
            <Button className="green-button" onClick={search}>Cari</Button>
        </div>
    )
}

SearchBox.defaultProps={
    search: () => {}
}

SearchBox.propTypes={
    search: PropTypes.func
}

export default withRouter(SearchBox);