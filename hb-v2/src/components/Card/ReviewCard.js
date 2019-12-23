import React from "react";
import { connect } from "react-redux";
import { StyledRating } from "../Rating/StyledRating";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, EmojiFlagsOutlined, ArrowUpward, ArrowDownward, LocalCafe, LocalCafeOutlined, KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { Button, Collapse } from "@material-ui/core";
import { voteReview } from "../../redux/actions";

function ReviewCard(props){
    var [expand, setExpand] = React.useState(false)
    const vote = (v) => {
        props.voteReview(props.userId, props.review.reviewId, v)
    }
    return(
        <div className='col-12' style={{paddingTop:'15px', paddingBottom:'15px'}}>
            <div className="review-card">
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
                                    <p>Nilai:</p>
                                </div>
                                <div className="col-5" style={{textAlign:'right'}}>
                                    <p>A</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-7">
                                    <p>Tahun mengambil kelas:</p>
                                </div>
                                <div className="col-5" style={{textAlign:'right'}}>
                                    <p>{props.review.yearTaken}</p>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <Button className="show-button" onClick={() => setExpand(!expand)}>Show {expand ? "less" : "more"} {expand ? <KeyboardArrowUp/>: <KeyboardArrowDown/>}</Button>
                </div>
                <div className="review-footer">
                    <div className="row justify-content-between">
                        <div className="col-6" style={{display:'flex', flexDirection:'row'}}>
                            <p>Membantu?</p>
                            <Button className="vote-button" onClick={() => vote("upVote")}>{props.review.helpfulUpVote}<ArrowUpward className="icon"/></Button>
                            <Button className="vote-button" onClick={() => vote("downVote")}>{props.review.helpfulDownVote}<ArrowDownward className="icon"/></Button>
                        </div>
                        <div className="col-6" style={{display:'flex', justifyContent:'flex-end'}}>
                            <a href="/" style={{color:'black'}}>Laporkan</a>
                            <EmojiFlagsOutlined className="icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    return{
        review: state.professor.reviews[ownProps.id],
        userId: state.professor.userId
    }
}
export default connect(mapStateToProps,{voteReview})(ReviewCard);