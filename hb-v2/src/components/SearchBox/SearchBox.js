import React from "react";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { findReviewees } from "../../redux/actions";
import { connect } from "react-redux";
import Feedback from "../Feedback/Feedback";
import RevieweeSearch from "./RevieweeSearch";
import { Button, Divider } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import "../../css/searchBox.css";
import UniversitySearch from "./UniversitySearch";

function SearchBox(props){
    const [reviewee, setReviewee] = React.useState("");
    const [school, setSchool] = React.useState("");
    let history = useHistory()

    const find = async (event) =>{
        event.preventDefault();
        props.findReviewees(reviewee, school)
        .then(response =>{
            if(props.reviewees.length === 1){
                var id = props.reviewees[0].revieweeId
                history.push("/review/"+id)
            }
            else{
                history.push("/query?name="+reviewee+"&school="+school)
            }
            
            if(props.close){
                props.close();
            }
        })

    }

    return(
        <div>
            <div className="search-box">
                <form onSubmit={find}>
                    <div className="row no-gutters">
                        <div className="col-md-4 search-input-wrapper">
                            <RevieweeSearch reviewee={reviewee} setReviewee={setReviewee} setSchool={setSchool}/>
                        </div>
                        <div className="col-md-7 search-input-wrapper left-border">
                            <UniversitySearch school={school} setSchool={setSchool}/>
                        </div>
                        <div className="col-md-1">
                            <Button className="grey-box search-button" fullWidth type="submit">
                                <Search/>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
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
        reviewees:state.reviewees,
        error: state.error,
        found: state.found
    }
}
export default connect(mapStateToProps, {findReviewees})(SearchBox);