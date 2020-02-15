import React from "react";
import PropTypes from 'prop-types';
import {Autocomplete} from '@material-ui/lab'
import { TextField, CircularProgress } from "@material-ui/core";
import { throttle, debounce } from "throttle-debounce";
import { findReviewees, clearReviewees } from "../../redux/actions";
import { connect } from "react-redux";
import { Person } from "@material-ui/icons";

function RevieweeSearch(props){

    const handleChange = (event, value) =>{
        props.setReviewee(value)
        if(value.length < 2 || value.endsWith(' ')){
            throttle(500, props.findReviewees(value, "", "searchBox"))
        }
        else{
            debounce(500, props.findReviewees(value, "", "searchBox"))
        }
    }
    return(
        <Autocomplete
            className="search-input"
            style={{width:'100%'}}
            freeSolo
            getOptionLabel={option => option.name}
            onClose={() => {
                props.clearReviewees()
            }}
            onChange={(event, value) => {
                if(value){
                    props.setReviewee(value.name)
                    props.setSchool(value.school)
                }
            }}
            disableClearable
            onInputChange={handleChange}
            options={props.reviewees}
            loading={props.loading}
            noOptionsText="Dosen tidak ditemukan."
            renderInput={params => (
                <TextField
                    {...params}
                    placeholder="Ketik Nama Dosen Anda"
                    fullWidth
                    value={props.reviewee}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {props.loading ? <CircularProgress color="inherit" size={15} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                        startAdornment:(
                            <React.Fragment>
                                <Person/>
                                {params.InputProps.startAdornment}
                            </React.Fragment>
                        )
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
    )
}

RevieweeSearch.propTypes={
    reviewees: PropTypes.array,
    findReviewees: PropTypes.func
}

function mapStateToProps(state){
    return{
        reviewees:state.reviewees,
        loading: state.loadReviewees
    }
}
export default connect(mapStateToProps, {findReviewees, clearReviewees})(RevieweeSearch);