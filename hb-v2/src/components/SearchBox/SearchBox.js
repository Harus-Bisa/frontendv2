import React from "react";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { findReviewees } from "../../redux/actions";
import { connect } from "react-redux";
import Feedback from "../Feedback/Feedback";
import RevieweeSearch from "./RevieweeSearch";
import { Button } from "@material-ui/core";
import { Search, School, KeyboardArrowDown } from "@material-ui/icons";
import "../../css/searchBox.css";
import UniversitySearch from "./UniversitySearch";

function SearchBox(props){
    const [reviewee, setReviewee] = React.useState("");
    const [school, setSchool] = React.useState("");
    const [showSchool, setShowSchool] = React.useState(props.showSchool);
    let history = useHistory()
    const propsSchool = props.school
    React.useEffect(() =>{
        if(propsSchool !== school){
            setSchool(propsSchool)
        }
    },[propsSchool])
    const find = async (event) =>{
        event.preventDefault();        
        if(reviewee !== "" || school !== ""){
            props.findReviewees(reviewee, school, "searchBox")
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
        else{
            if(props.close){
                props.close();
            }
        }
        

    }
    if(props.isMobile){
        return(
            <div>
                <div className="search-box border">
                    <form onSubmit={find}>
                        <div className="row no-gutters">
                            <div className="col-10">
                                <div clasName="row">
                                    <div className="col-12 search-input-wrapper">
                                        <RevieweeSearch reviewee={reviewee} setReviewee={setReviewee} setSchool={setSchool} submit={find}/>
                                    </div>
                                    {showSchool && 
                                    <div className="col-12 search-input-wrapper">
                                        <UniversitySearch school={school} setSchool={setSchool} submit={find}/>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-2">
                                <Button className={props.type === "dark" ? "search-button dark-search-button": "search-button"} fullWidth type="submit" onClick={find}>
                                    <Search/>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                {!showSchool && 
                <div style={{marginTop:"-0.5rem"}}>
                    <Button onClick={() => setShowSchool(true)} className="button">
                        <School style={{marginRight:"10px"}}/><span style={{fontWeight:"300"}}>Universitas</span><KeyboardArrowDown style={{marginLeft:'10px'}}/>
                    </Button>
                </div>
                }
            </div>
        )
    }
    return(
        <div style={{height:'100%'}}>
            <div className="search-box">
                <form onSubmit={find}>
                    <div className="row no-gutters">
                        <div className="col-md-11 border">
                            <div className="row no-gutters">
                                <div className="col-md-5 search-input-wrapper">
                                    <RevieweeSearch reviewee={reviewee} setReviewee={setReviewee} setSchool={setSchool}/>
                                </div>
                                <div className="col-md-7 search-input-wrapper left-border">
                                    <UniversitySearch school={school} setSchool={setSchool}/>
                                </div> 
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="row" style={{height:"100%"}}>
                                <div className="col">
                                    <Button className={props.type === "dark" ? "search-button dark-search-button": "search-button"} fullWidth type="submit" onClick={find}>
                                        <Search/>
                                    </Button>
                                </div>
                            </div>
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

SearchBox.defaultProps={
    reviewees: [],
    findReviewees: () => {},
    type: "normal",
    showSchool:false,
    school: ""
}
function mapStateToProps(state){
    return{
        reviewees:state.reviewees,
        error: state.error,
        found: state.found,
        isMobile: state.isMobile
    }
}
export default connect(mapStateToProps, {findReviewees})(SearchBox);