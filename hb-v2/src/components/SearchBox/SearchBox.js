import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {Autocomplete} from '@material-ui/lab'
import { TextField } from "@material-ui/core";
import { throttle, debounce } from "throttle-debounce";
import { findUsers } from "../../redux/actions";
import { connect } from "react-redux";

function SearchBox(props){
    var [text, setText] = React.useState("")
    var [open, setOpen] = React.useState(false)
    const loading = open && (!props.users)

    const handleChange = (event) =>{
        var query = event.target.value
        setText(query)
        if(query.length < 5 || query.endsWith(' ')){
            throttle(500, props.findUsers(query))
        }
        else{
            debounce(500, props.findUsers(query))
        }
    }
    const select = (id) =>{
        props.history.push("/review/"+id)
    }
    return(
        <div className="search-box">
            <Autocomplete
                id="search-box"
                style={{width:'100%'}}
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => setOpen(false)}
                options={props.users}
                loading={loading}
                noOptionsText="Dosen tidak ditemukan."
                renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Cari nama dosen Anda"
                      fullWidth
                      onChange={handleChange}
                      value={text}
                    />
                )}
                renderOption={option => {
                    return(
                        <div onClick={() => select(option.userId)} style={{width:'100%'}} id={"option-"+option.name}>
                            <p style={{fontWeight:'bold', margin:0}}>{option.name}</p>
                            <p style={{fontSize:'12px', margin:0}}>{option.school}</p>    
                        </div>
                    )
                }}
            />
        </div>
    )
}

SearchBox.propTypes={
    users: PropTypes.array,
    findUsers: PropTypes.func
}

function mapStateToProps(state){
    return{
        users:state.users
    }
}
export default connect(mapStateToProps, {findUsers})(withRouter(SearchBox));