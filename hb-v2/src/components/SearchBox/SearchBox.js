import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { findReviewees, clearReviewees } from "../../redux/actions";
import { connect } from "react-redux";
import Feedback from "../Feedback/Feedback";
import RevieweeSearch from "./RevieweeSearch";
import { Button, Divider } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import "../../css/searchBox.css";

function SearchBox(props){
    return(
        <div className="search-box">
            <div className="row no-gutters">
                <div className="col-md-4 search-input">
                    <RevieweeSearch/>
                </div>
                <div className="col-md-1 search-input d-none d-md-block" style={{display:'flex'}}>
                    <Divider orientation="vertical" style={{margin:'auto'}}/>
                </div>
                <div className="col-md-6 search-input">
                    <RevieweeSearch/>
                </div>
                <div className="col-md-1">
                    <Button className="grey-box search-button" fullWidth>
                        <Search/>
                    </Button>
                </div>
            </div>
            {props.found === false && 
                <div style={{marginTop:'1.5rem'}}>
                    {/* <p>Tidak menemukan nama Dosen Anda? <a href={"/review/new/"+ (text === "" ? "Nama Dosen" : text)}>Jadilah penulis pertama!</a></p> */}
                    <p>Tidak menemukan nama Dosen Anda? <a href={"/review/new/Nama Dosen"}>Jadilah penulis pertama!</a></p>
                </div>
            }
            {props.error && <Feedback color={"danger"} message={props.error.message}/>}
        </div>
    )
}

SearchBox.propTypes={
    reviewees: PropTypes.array,
    findReviewees: PropTypes.func
}

function mapStateToProps(state){
    return{
        // reviewees:state.reviewees,
        error: state.error,
        found: state.found,
        // loading: state.loadReviewees
    }
}
export default connect(mapStateToProps, {findReviewees, clearReviewees})(withRouter(SearchBox));