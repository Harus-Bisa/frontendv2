import React from "react";
import { Button, Input } from "reactstrap";
import PropTypes from 'prop-types';

function SearchBox(props){
    var [text, setText] = React.useState("")
    return(
        <div className="search-box">
            <Input type='text' id="search-box" placeholder="Cari nama Dosen anda" value={text} onChange={(event) => setText(event.target.value) }/>
            <Button className="green-button" onClick={props.search}>Cari</Button>
        </div>
    )
}

SearchBox.defaultProps={
    search: () => {}
}

SearchBox.propTypes={
    search: PropTypes.func
}

export default SearchBox;