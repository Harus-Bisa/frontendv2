import React from "react";
import { connect } from "react-redux";
import { StyledRating } from "../Rating/StyledRating";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, EmojiFlagsOutlined, ArrowUpward, ArrowDownward, LocalCafe, LocalCafeOutlined, KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { Button, Collapse } from "@material-ui/core";
import { voteReview } from "../../redux/actions";
import Popup from "../Popup/Popup";
import SignUpLoginPrompt from "./SignUpLoginPrompt";
import LoginPopup from "../Popup/LoginPopup";
import ReportInappropriatePopup from "../Popup/ReportInappropriatePopup";

function ReviewCard(props){
    var [expand, setExpand] = React.useState(false)
    const makeTags = () =>{
        var tags = [];
        for(let i=0; i<props.review.tags.length; i++){
            tags.push(
                <div className="tag" key={i}>
                    <p>{props.review.tags[i]}</p>
                </div>
            )
        }
        return tags;
    }
    const vote = (v) => {
        if (props.loggedIn){
            props.voteReview(props.revieweeId, props.review.reviewId, v)
        }
    }
    const ReportInappropriateTrigger = (props) =>{ 
        return(
        <div className="col" style={{display:'flex', justifyContent:'flex-end'}}>
            <Button className="button" onClick={props.onClick} style={{color:'black'}}>
                <p>Laporkan</p>
                <EmojiFlagsOutlined className="icon"/>
            </Button>
        </div>)
    }
    return(
        <div className='col-12' style={{paddingTop:'15px', paddingBottom:'15px'}}>
            <div className="review-card" style={props.blur ? {filter: "blur(4px)"} : {}}>
                <div className="review-details">
                    <p id="review">{props.review.review}</p>
                </div>
                <div className="review-details">
                    <div className="row justify-content-between">
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Penilaian Keseluruhan</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <p>{(props.review.overallRating).toFixed(1)}</p>
                            <StyledRating
                                size="small" 
                                id="overallRating"
                                precision={0.5}
                                value={props.review.overallRating} 
                                readOnly
                                icon={<ThumbUp/>} 
                                emptyIcon={<ThumbUpOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Likelihood to recommend teman</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <p>{(props.review.recommendationRating).toFixed(1)}</p>
                            <StyledRating
                                size="small" 
                                id="recommendationRating"
                                precision={0.5}
                                value={props.review.recommendationRating} 
                                readOnly
                                icon={<Check/>}
                                emptyIcon={<CheckOutlined/>}
                                style={{margin:'auto 0'}}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Tingkat kesusahan Kelas</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <p>{(props.review.difficultyRating).toFixed(1)}</p>
                            <StyledRating
                                size="small" 
                                id="difficultyRating"
                                precision={0.5}
                                value={props.review.difficultyRating} 
                                readOnly
                                icon={<LocalCafe/>}
                                emptyIcon={<LocalCafeOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-7">
                            <p >Kelas:</p>
                        </div>
                        <div className="col-5" style={{textAlign:'right'}}>
                            <p>{props.review.courseName}</p>
                        </div>
                    </div>
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                        <div style={{marginRight:'15px', marginLeft:'15px'}}>
                            <div className="row justify-content-between">
                                <div className="col-7">
                                    <p>Tahun mengambil kelas:</p>
                                </div>
                                <div className="col-5" style={{textAlign:'right'}}>
                                    <p>{props.review.yearTaken}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-7">
                                    <p>Nilai:</p>
                                </div>
                                <div className="col-5" style={{textAlign:'right'}}>
                                    <p>{props.review.grade ? props.review.grade : "-"}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-7">
                                    <p>Gaya Mengajar:</p>
                                </div>
                                <div className="col-5" style={{textAlign:'right'}}>
                                    <p>{props.review.teachingStyles.length === 0 ? "-" : props.review.teachingStyles.join(', ')}</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-7">
                                    <p>Membutuhkan textbook:</p>
                                </div>
                                <div className="col-5" style={{textAlign:'right'}}>
                                    <p>{props.review.textbookRequired ? "Iya" : "Tidak"}</p>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <Button className="show-button" onClick={() => setExpand(!expand)}>Show {expand ? "less" : "more"} {expand ? <KeyboardArrowUp/>: <KeyboardArrowDown/>}</Button>
                    <div id="tags" className="row">
                        {makeTags()}
                    </div>
                </div>
                <div className="review-footer">
                    <div className="row justify-content-between">
                        <div className="col" style={{display:'flex', flexDirection:'row'}}>
                            <p>Membantu?</p>
                            {props.loggedIn && 
                            <React.Fragment>
                                <Button className={props.review.userVote === "upVote" ? "vote-button vote-button-selected" : "vote-button"} onClick={() => vote("upVote")}>{props.review.helpfulUpVote}<ArrowUpward className="icon"/></Button>
                                <Button className={props.review.userVote === "downVote" ? "vote-button vote-button-selected" : "vote-button"} onClick={() => vote("downVote")}>{props.review.helpfulDownVote}<ArrowDownward className="icon"/></Button>
                            </React.Fragment>
                            }
                            {!props.loggedIn && 
                            <React.Fragment>
                                <Popup
                                    trigger={{
                                        component:Button,
                                        className:"vote-button",
                                    }}
                                    purpose={<React.Fragment>{props.review.helpfulUpVote}<ArrowUpward className="icon"/></React.Fragment>}
                                    content={LoginPopup}
                                />
                                <Popup
                                    trigger={{
                                        component:Button,
                                        className:"vote-button",
                                    }}
                                    purpose={<React.Fragment>{props.review.helpfulDownVote}<ArrowDownward className="icon"/></React.Fragment>}
                                    content={LoginPopup}
                                />
                            </React.Fragment>
                            }
                        </div>
                        <Popup 
                            content={ReportInappropriatePopup}
                            trigger={{
                                component:ReportInappropriateTrigger,
                                id:'report-inappropriate-button'
                            }}
                        />
                    </div>
                </div>
            </div>
            {props.blur && <SignUpLoginPrompt float/>}
        </div>
    )
}

function mapStateToProps(state, ownProps){
    return{
        review: state.professor.reviews[ownProps.id],
        revieweeId: state.professor.revieweeId,
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps,{voteReview})(ReviewCard);