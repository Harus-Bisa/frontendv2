import React from "react";
import {connect} from "react-redux";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined } from "@material-ui/icons";
import {GiCoffeeCup} from "react-icons/gi"
import { StyledRating } from "../StyledRating/StyledRating";



function ReviewForm(props){
    var [profName, setProfName] = React.useState(props.profName)
    var [courseName, setCourseName] = React.useState("")
    var [currentlyTaking, setCurrentlyTaking]= React.useState(true)
    var [overallRating, setOverallRating] = React.useState(0) 
    var [recommendationRating, setRecommendationRating] = React.useState(0)
    var [difficultyRating, setDifficultyRating] = React.useState(0)
    var [grade, setGrade] = React.useState(null)
    var [teachingStyle, setTeachingStyle] = React.useState("")
    var [review, setReview] = React.useState("")

    const submit = (event) =>{
        event.preventDefault()
        props.history.push("/review/"+props.match.params.profId)
    }
    const style={
        ratingBox:{
            display:'flex',
            flexDirection:'column'
        },
        ratingSpan:{
            alignSelf:'center',
        }
    }
    return(
        <div className="container content">
            <h5>Terima Kasih anda sudah mau berkontribusi!</h5>
            <form onSubmit={submit}>
                <FormGroup>
                    <Label>Nama Dosen*</Label>
                    <Input type="text" id="profName" value={profName} required onChange={(event) => setProfName(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Nama Kelas*</Label>
                    <Input type="text" id="courseName" value={courseName} required onChange={(event) => setCourseName(event.target.value)}/>
                </FormGroup>
                <FormGroup style={style.ratingBox}>
                    <Label>Apakah anda sedang mengambil kelas ini?*</Label>
                    <div className="button-group-container" id="currentlyTaking">
                        <Button type="button" id="currentlyTaking-Yes" onClick={(event) => setCurrentlyTaking(true)} className={currentlyTaking ? "button-group-selected" : "button-group"}>Iya!</Button>
                        <Button type="button" id="currentlyTaking-No" onClick={(event) => setCurrentlyTaking(false)} className={!currentlyTaking ? "button-group-selected" : "button-group"}>Sudah lama!</Button>
                    </div>
                </FormGroup>
                <FormGroup style={style.ratingBox}>
                    <Label>Penilaian*</Label>
                    <StyledRating
                        style={style.ratingSpan} 
                        id="overallRating" 
                        value={overallRating} 
                        onChange={(event, value) => setOverallRating(value)}
                        icon={<ThumbUp/>}
                        emptyIcon={<ThumbUpOutlined/>}
                    />
                </FormGroup>
                <FormGroup style={style.ratingBox}>
                    <Label>Apakah anda merekomendasi dosen ini ke teman anda?*</Label>
                    <StyledRating
                        style={style.ratingSpan} 
                        id="recommendationRating" 
                        value={recommendationRating} 
                        onChange={(event, value) => setRecommendationRating(value)}
                        icon={<Check/>}
                        emptyIcon={<CheckOutlined/>}
                    />
                </FormGroup>
                <FormGroup style={style.ratingBox}>
                    <Label>Kesusahan Kelas*</Label>
                    <StyledRating 
                        style={style.ratingSpan} 
                        id="difficultyRating" 
                        value={difficultyRating} 
                        onChange={(event, value) => setDifficultyRating(value)}
                        icon={<GiCoffeeCup/>}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Nilai yang Anda dapatkan*</Label>
                    <Input type="text" id="grade" value={grade} required onChange={(event) => setGrade(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Gaya mengajar dosen*</Label>
                    <Input type="text" id="teachingStyle" value={teachingStyle} required onChange={(event) => setTeachingStyle(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Review anda*</Label>
                    <Input type="textarea" id="review" value={review} required onChange={(event) => setReview(event.target.value)}/>
                </FormGroup>
                <Button className="blue-button" submit style={{width:'100%'}}>Selesai</Button>
            </form>
        </div>
    )
}

function mapStateToProps(state){
    return{
        profName: state.professor.name
    }
}
export default connect(mapStateToProps)(ReviewForm);