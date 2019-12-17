import React from "react";
import {connect} from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined } from "@material-ui/icons";

function ReviewForm(props){
    var [profName, setProfName] = React.useState("")
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
    }
    const style={
        ratingBox:{
            display:'flex',
            flexDirection:'column'
        },
        ratingSpan:{
            alignSelf:'center'
        }
    }
    return(
        <div className="container content">
            <h5>Terima Kasih anda sudah mau berkontribusi!</h5>
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Nama Dosen*</Label>
                    <Input type="text" id="profName" value={profName} required onChange={(event) => setProfName(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Nama Kelas*</Label>
                    <Input type="text" id="courseName" value={courseName} required onChange={(event) => setCourseName(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Apakah anda sedang mengambil kelas ini?*</Label>
                    <Input type="text" id="currentlyTaking" value={currentlyTaking} required onChange={(event) => setCurrentlyTaking(event.target.value)}/>
                </FormGroup>
                <FormGroup style={style.ratingBox}>
                    <Label>Penilaian*</Label>
                    <Rating 
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
                    <Rating 
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
                    <Rating style={style.ratingSpan} id="difficultyRating" value={difficultyRating} onChange={(event, value) => setDifficultyRating(value)}/>
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
            </Form>
        </div>
    )
}

export default connect()(ReviewForm);