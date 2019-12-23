import React from "react";
import { connect } from "react-redux";
import {ThumbUp, ThumbUpOutlined} from "@material-ui/icons"
import { Button } from "reactstrap";
import { StyledRating } from "../../components/Rating/StyledRating";
import ReviewContent from "../../components/ReviewContent/ReviewContent";
import "../../css/review.css";
import { getReviews } from "../../redux/actions";

function Review(props){
    var [rating, setRating] = React.useState(0)

    const addReview = (event, value) =>{
        setRating(value)
        props.history.push("/review/"+props.professor.revieweeId+"/add/"+value)
    }
    React.useEffect(() =>{
        props.getReviews(props.match.params.revieweeId) 
    }, [props.match.params.revieweeId])


    if(!props.professor){
        return(<div>Loading</div>)
    }
    return(
        <div className="container content">
            <header className="review-header">
                <h2 style={{borderBottom:"4px solid #39A3FF"}}>{props.professor.name}</h2>
                <p>{props.professor.school}</p>
                <div style={{display:'flex', marginTop:'10px'}}>
                    <StyledRating
                        precision={0.1}
                        value={props.professor.overallRating} 
                        readOnly 
                        icon={<ThumbUp/>}
                        emptyIcon={<ThumbUpOutlined/>} 
                    />
                    <p style={{fontSize:'11px', marginLeft:'10px', marginBottom:'0px'}}>{props.professor.numberOfReviews} Review</p>
                </div>
            </header>
            <div style={{display:"flex", alignItems:'center', flexDirection:'column'}}>
                <p className="grey-text">Tulis Review Anda</p>
                <StyledRating
                    id="addReview"
                    onChange={addReview}
                    value={rating}
                    icon={<ThumbUp/>}
                    emptyIcon={<ThumbUpOutlined/>} 
                    className="large-rating"
                />
            </div>
            <div style={{margin:'1rem -30px'}}>
                <ReviewContent/>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        professor: state.professor,
        error: state.error
    }
}
export default connect(mapStateToProps, {getReviews})(Review);