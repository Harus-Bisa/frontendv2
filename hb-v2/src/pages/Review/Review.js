import React from "react";
import { connect } from "react-redux";
import Rating from '@material-ui/lab/Rating';
import {ThumbUp} from "@material-ui/icons"
import { Button } from "reactstrap";

function Review(props){
    const addReview = () =>{
        props.history.push("/review/add")
    }
    return(
        <div className="container content">
            <header>
                <h2>{props.professor.name}</h2>
                <p>{props.professor.school}</p>
            </header>
            <div style={{display:"flex", alignItems:'center', flexDirection:'column'}}>
                <Rating name="half-rating" value={props.professor.overallRating} precision={0.5} disabled icon={<ThumbUp/>} />
                <p>{props.professor.numberOfReviews} Review</p>
                <Button className='blue-button' onClick={addReview}>Tambah Review</Button>
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