import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {Autocomplete} from '@material-ui/lab'
import { TextField, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { findSchools, clearSchools } from "../../redux/actions";
import { throttle, debounce } from "throttle-debounce";
import { School } from "@material-ui/icons";

function UniversitySearch(props){
    const debounced = debounce(500, props.findSchools);
    const throttled = throttle(500, props.findSchools);

    const handleChange = (event, value) =>{
        props.setSchool(value)
        if(value.length < 5 || value.endsWith(' ')){
            throttled(value)            
        }
        else{
            debounced(value)
        }
    }
    return(
        <Autocomplete
            className="search-input"
            options={props.schools}
            freeSolo
            onClose={() =>{
                props.clearSchools()
            }}
            getOptionLabel={option => option}
            value={props.school}
            inputValue={props.school}
            onChange={(event, value) => props.setSchool(value)}
            onInputChange={handleChange}
            disableClearable
            style={{ width: "100% "}}
            loading={props.loading}
            renderInput={params => (
                <TextField
                    {...params}
                    fullWidth
                    placeholder={"Ketik Nama Perguruan Tinggi/Universitas"}
                    onKeyPress={(event) => {
                        if(event.key === "Enter"){
                            if (props.submit){
                                props.submit(event);
                            }
                        }
                    }}
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
                                <School style={{color:"#40444D"}}/>
                                {params.InputProps.startAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    )
}

UniversitySearch.propTypes={
    reviewees: PropTypes.array,
    findSchools: PropTypes.func
}

function mapStateToProps(state){
    return{
        schools:state.schools,
        loading: state.loadSchools
    }
}
export default connect(mapStateToProps,{findSchools,clearSchools})(withRouter(UniversitySearch));