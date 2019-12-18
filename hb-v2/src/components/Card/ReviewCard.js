import React from "react";
import { connect } from "react-redux";
import { StyledRating } from "../Rating/StyledRating";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, EmojiFlagsOutlined, ArrowUpward, ArrowDownward } from "@material-ui/icons";
import {GiCoffeeCup} from "react-icons/gi"
import { Button } from "@material-ui/core";

function ReviewCard(props){
    return(
        <div className='col-12' style={{paddingTop:'15px', paddingBottom:'15px', borderBottom:'3px solid #EEEEEE'}}>
            <div>
                <div style={{marginBottom:'2rem'}}>
                    <p id="review">{props.review.review}</p>
                </div>
                <div style={{marginBottom:'2rem'}} className="review-details">
                    <div className="row justify-content-between" style={{margin:'15px -15px'}}>
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Penilaian Keseluruhan</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <StyledRating 
                                id="overallRating"
                                style={{margin:'auto'}} 
                                value={props.review.rating.overall} 
                                readOnly
                                icon={<ThumbUp/>} 
                                emptyIcon={<ThumbUpOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between" style={{margin:'15px -15px'}}>
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Likelihood to recommend teman</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <StyledRating 
                                id="recommendationRating"
                                style={{margin:'auto'}} 
                                value={props.review.rating.recommendation} 
                                readOnly
                                icon={<Check/>}
                                emptyIcon={<CheckOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between" style={{margin:'15px -15px'}}>
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Tingkat kesusahan Kelas</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <StyledRating 
                                id="difficultyRating"
                                style={{margin:'auto'}} 
                                value={props.review.rating.difficulty} 
                                readOnly
                                icon={<GiCoffeeCup/>}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-7">
                            <p >Kelas:</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <p style={{margin:'auto'}}>{props.review.courseName}</p>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-7">
                            <p>Tahun mengambil kelas:</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <p style={{margin:'auto'}}>{props.review.yearTaken}</p>
                        </div>
                    </div>
                </div>
                <div className="review-footer">
                    <div className="row justify-content-between">
                        <div className="col-6" style={{display:'flex', flexDirection:'row'}}>
                            <p>Membantu?</p>
                            <Button className="vote-button">{props.review.vote.up}<ArrowUpward className="icon"/></Button>
                            <Button className="vote-button">{props.review.vote.down}<ArrowDownward className="icon"/></Button>
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
        review: state.professor.reviews[ownProps.id]
    }
}
export default connect(mapStateToProps)(ReviewCard);