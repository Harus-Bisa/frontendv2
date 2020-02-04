import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {Autocomplete} from '@material-ui/lab'
import { TextField, CircularProgress } from "@material-ui/core";
import { throttle, debounce } from "throttle-debounce";
import { findReviewees, clearUsers } from "../../redux/actions";
import { connect } from "react-redux";
import Feedback from "../Feedback/Feedback";

function SearchBox(props){
    var [text, setText] = React.useState("")
    var [open, setOpen] = React.useState(false)

    const handleChange = (event) =>{
        var query = event.target.value
        setText(query)
        setOpen(true)
        if(query.length < 2 || query.endsWith(' ')){
            throttle(500, props.findReviewees(query))
        }
        else{
            debounce(500, props.findReviewees(query))
        }
    }
    
    const select = (id) =>{
        props.history.push("/review/"+id)
        if(props.close){
            props.close()
        }
    }
    return(
        <div className="search-box">
            <Autocomplete
                id={props.close ? "search-box-navbar" : "search-box"}
                style={{width:'100%'}}
                freeSolo
                getOptionLabel={option => option.name}
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => {
                    setOpen(false) 
                    props.clearUsers()
                }}
                onChange={(event, value) => {
                    if(value && value.revieweeId){
                        select(value.revieweeId)
                    }
                }}
                options={props.users}
                loading={props.loading}
                noOptionsText="Dosen tidak ditemukan."
                renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Cari nama dosen Anda"
                      fullWidth
                      onChange={handleChange}
                      value={text}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {props.loading ? <CircularProgress color="inherit" size={15} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                )}
                renderOption={option => {
                    return(
                        <div style={{width:'100%'}} id={"option-"+option.name}>
                            <p style={{fontWeight:'bold', margin:0}}>{option.name}</p>
                            <p style={{fontSize:'12px', margin:0}}>{option.school}</p>    
                        </div>
                    )
                }}
            />
            {props.found === false && 
                <div style={{marginTop:'1.5rem'}}>
                    <p>Tidak menemukan nama Dosen Anda? <a href={"/review/new/"+ (text === "" ? "Nama Dosen" : text)}>Jadilah penulis pertama!</a></p>
                </div>
            }
            {props.error && <Feedback color={"danger"} message={props.error.message}/>}
        </div>
    )
}

SearchBox.propTypes={
    users: PropTypes.array,
    findReviewees: PropTypes.func
}

function mapStateToProps(state){
    return{
        users:state.users,
        error: state.error,
        found: state.found,
        loading: state.loadUsers
    }
}
export default connect(mapStateToProps, {findReviewees, clearUsers})(withRouter(SearchBox));