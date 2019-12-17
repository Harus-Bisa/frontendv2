import React from "react";
import { connect } from "react-redux";
import Rating from '@material-ui/lab/Rating';
import {ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import { Button } from "reactstrap";

function Review(props){
    const addReview = () =>{
        props.history.push("/review/1/add")
    }
    return(
        <div className="container content">
            <header>
                <h2>{props.professor.name}</h2>
                <p>{props.professor.school}</p>
            </header>
            <div style={{display:"flex", alignItems:'center', flexDirection:'column'}}>
                <Rating 
                    value={props.professor.overallRating} 
                    readOnly 
                    icon={<ThumbUp/>}
                    emptyIcon={<ThumbUpOutlined/>} />
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