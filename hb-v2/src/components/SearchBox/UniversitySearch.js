import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {Autocomplete} from '@material-ui/lab'
import { TextField, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import {options} from '../../data/UniversityList';

function UniversitySearch(props){
    return(
        <Autocomplete
            className="search-input"
            options={options}
            freeSolo
            getOptionLabel={option => option}
            value={props.school}
            inputValue={props.school}
            onChange={(event, value) => props.setSchool(value)}
            onInputChange={(event, value) => props.setSchool(value)}
            disableClearable
            style={{ width: "100% "}}
            renderInput={params => (
                <TextField
                    {...params}
                    fullWidth
                    placeholder={"Nama perguruan tinggi/universitas"}
                />
            )}
        />
    )
}

UniversitySearch.propTypes={
    reviewees: PropTypes.array,
    findReviewees: PropTypes.func
}

function mapStateToProps(state){
    return{
        reviewees:state.reviewees,
        loading: state.loadReviewees
    }
}
export default connect(mapStateToProps)(withRouter(UniversitySearch));