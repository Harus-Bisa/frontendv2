import React from "react";
import { connect } from "react-redux";
import { StyledRating } from "../StyledRating/StyledRating";

function ReviewCard(props){
    return(
        <div className='col-12'>
            <div>
                <div style={{marginBottom:'1rem'}}>
                    <p>{props.review.review}</p>
                </div>
                <div style={{marginBottom:'2rem'}}>
                    <div className="row" style={{margin:'15px -15px'}}>
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Penilaian Keseluruhan</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <StyledRating size="small" style={{margin:'auto'}} value={props.review.rating.overall} readOnly/>
                        </div>
                    </div>
                    <div className="row" style={{margin:'15px -15px'}}>
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Likelihood to recommend teman</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <StyledRating size="small" style={{margin:'auto'}} value={props.review.rating.recommendation} readOnly/>
                        </div>
                    </div>
                    <div className="row" style={{margin:'15px -15px'}}>
                        <div className="col-7" style={{display:'flex'}}>
                            <p style={{margin:'auto 0'}}>Tingkat kesusahan Kelas</p>
                        </div>
                        <div className="col-5" style={{display:'flex'}}>
                            <StyledRating size="small" style={{margin:'auto'}} value={props.review.rating.difficulty} readOnly/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <p>Kelas:</p>
                        </div>
                        <div className="col-7">
                            <p>{props.review.courseName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <p>Tahun mengambil kelas:</p>
                        </div>
                        <div className="col-5">
                            <p>{props.review.yearTaken}</p>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <div className="row justify-content-between">
                        <div className="col-5" style={{display:'flex', flexDirection:'row'}}>
                            <p>{props.review.vote.up}</p>
                            <p>{props.review.vote.down}</p>
                            <p>Membantu</p>
                        </div>
                        <div className="col-5">
                            <p>Laporkan</p>
                        </div>
                    </div>
                </div> */}
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