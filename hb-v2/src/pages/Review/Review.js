import React from "react";
import { connect } from "react-redux";
import {ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import { Button } from "reactstrap";
import { StyledRating } from "../../components/Rating/StyledRating";
import ReviewContent from "../../components/ReviewContent/ReviewContent";
import "../../css/review.css";

function Review(props){
    const addReview = () =>{
        props.history.push("/review/1/add")
    }
    return(
        <div className="container content">
            <header>
                <h2 style={{borderBottom:"4px solid #39A3FF"}}>{props.professor.name}</h2>
                <p>{props.professor.school}</p>
            </header>
            <div style={{display:"flex", alignItems:'center', flexDirection:'column'}}>
                <StyledRating
                    value={props.professor.overallRating} 
                    readOnly 
                    icon={<ThumbUp/>}
                    emptyIcon={<ThumbUpOutlined/>} />
                <p>{props.professor.numberOfReviews} Review</p>
                <Button className='blue-button' onClick={addReview}>Tambah Review</Button>
            </div>
            <div style={{margin:'1rem -15px'}}>
                <ReviewContent/>
            </div>

        </div>
    )
}

function mapStateToProps(state){
    return{
        professor: state.professor
    }
}
export default connect(mapStateToProps)(Review);