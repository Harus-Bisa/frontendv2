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
import { MOBILE, WEB } from "../../pages/Review/Review";

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
    const reviewId = props.review.reviewId
    const _reportInappropriatePopup = (props) => {
        return(
            <ReportInappropriatePopup {...props} reviewId={reviewId}/>
        )
    }
    const getDateString = (millisecond) =>{
        var date = new Date(millisecond)
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }
    if(props.type === MOBILE){
        return(
            <div className='col-12' style={{paddingTop:'15px', paddingBottom:'15px'}}>
                <div className="review-card" style={props.blur ? {filter: "blur(4px)"} : {}}>
                    <div className="review-details">
                        <div className="row justify-content-between">
                            <div className="col">
                                <p id="course-name">{props.review.courseName}</p>
                            </div>
                            {props.review.createdAt && <div className="col">
                                <p style={{textAlign:'right'}}>{getDateString(props.review.createdAt)}</p>
                            </div>}
                        </div>
                        <p id="review">{props.review.review}</p>
                    </div>
                    <div className="review-details">
                        <div className="row justify-content-between">
                            <div className="col" style={{display:'flex'}}>
                                <p style={{margin:'auto 0'}}>Penilaian Keseluruhan</p>
                            </div>
                            <div className="col-5" style={{display:'flex'}}>
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
                                <p style={{margin:'auto 0'}}>Kemungkinan untuk merekomendasi</p>
                            </div>
                            <div className="col-5" style={{display:'flex'}}>
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
                        <Collapse in={expand} timeout="auto" unmountOnExit>
                            <div style={{marginRight:'15px', marginLeft:'15px'}}>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <p>Tahun mengambil kelas: <span className="bold">{props.review.yearTaken}</span></p>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <p>Nilai:<span className="bold"> {props.review.grade ? props.review.grade : "-"}</span></p>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <p>Gaya Mengajar: <span className="bold">{props.review.teachingStyles.length === 0 ? "-" : props.review.teachingStyles.join(', ')}</span></p>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <p>Membutuhkan textbook: <span className="bold">{props.review.textbookRequired ? "Iya" : "Tidak"}</span></p>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <Button className="show-button" onClick={() => setExpand(!expand)}>{expand ? "Baca lebih sedikit" : "Selengkapnya"} {expand ? <KeyboardArrowUp/>: <KeyboardArrowDown/>}</Button>
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
                                content={props.loggedIn ? _reportInappropriatePopup : LoginPopup}
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
    else if(props.type === WEB){
        return(
            <div className='col-12' style={{paddingTop:'15px', paddingBottom:'15px'}}>
                <div className="review-card" style={props.blur ? {filter: "blur(4px)"} : {}}>
                    <div className="row review-details">
                        <div className="col-8">
                            <div style={{height:"100%"}}>
                                <div style={{minHeight:'50%'}}>
                                    <p id="course-name">{props.review.courseName}</p>
                                    <h4 id="review">{props.review.review}</h4>
                                </div>
                                <div>
                                    <div className="row justify-content-between" style={{marginTop:"15px"}}>
                                        <div className="col-4 flex">
                                            <p className="margin-auto" style={{textAlign:'center', fontWeight:'500'}}>Penilaian Keseluruhan</p>
                                            <StyledRating
                                                id="overallRating"
                                                precision={0.5}
                                                value={props.review.overallRating} 
                                                readOnly
                                                icon={<ThumbUp/>} 
                                                emptyIcon={<ThumbUpOutlined/>}
                                                className="margin-auto"
                                            />
                                        </div>
                                        <div className="col-4 flex">
                                            <p className="margin-auto" style={{textAlign:'center', fontWeight:'500'}}>Kemungkinan untuk merekomendasi</p>
                                            <StyledRating
                                                id="recommendationRating"
                                                precision={0.5}
                                                value={props.review.recommendationRating} 
                                                readOnly
                                                icon={<Check/>}
                                                emptyIcon={<CheckOutlined/>}
                                                className="margin-auto"
                                            />
                                        </div>
                                        <div className="col-4 flex">
                                            <p className="margin-auto" style={{textAlign:'center', fontWeight:'500'}}>Tingkat kesusahan Kelas</p>
                                            <StyledRating
                                                id="difficultyRating"
                                                precision={0.5}
                                                value={props.review.difficultyRating} 
                                                readOnly
                                                icon={<LocalCafe/>}
                                                emptyIcon={<LocalCafeOutlined/>}
                                                className="margin-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-4" style={{borderLeft: "1px solid #F4F4F4"}}>
                            <div>
                                {props.review.createdAt && <div className="row justify-content-between">
                                    <div className="col" style={{textAlign:"right"}}>
                                        <p>{getDateString(props.review.createdAt)}</p>
                                    </div>
                                </div>}
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <h5><span className="light">Tahun mengambil kelas: </span>{props.review.yearTaken}</h5>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <h5><span className="light">Nilai:</span> {props.review.grade ? props.review.grade : "-"}</h5>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <h5><span className="light">Gaya Mengajar: </span>{props.review.teachingStyles.length === 0 ? "-" : props.review.teachingStyles.join(', ')}</h5>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <h5><span className="light">Membutuhkan textbook: </span>{props.review.textbookRequired ? "Iya" : "Tidak"}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review-footer" style={{borderTop:0}}>
                        <div className="row">
                            <div className="col-8">
                                <div id="tags" className="row">
                                    {makeTags()}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row justify-content-between no-gutters">
                                    <div className="col-8" style={{display:'flex', flexDirection:'row'}}>
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
                                    <div className="col-4">
                                        <Popup
                                            content={props.loggedIn ? _reportInappropriatePopup : LoginPopup}
                                            trigger={{
                                                component:ReportInappropriateTrigger,
                                                id:'report-inappropriate-button'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {props.blur && <SignUpLoginPrompt float/>}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        review: state.professor.reviews[ownProps.id],
        revieweeId: state.professor.revieweeId,
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps,{voteReview})(ReviewCard);