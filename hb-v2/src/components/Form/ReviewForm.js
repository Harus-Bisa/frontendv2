import React from "react";
import {connect} from "react-redux";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, LocalCafe, LocalCafeOutlined } from "@material-ui/icons";
import { StyledRating } from "../Rating/StyledRating";
import { addReview } from "../../redux/actions";



function ReviewForm(props){
    var [profName, setProfName] = React.useState(props.profName)
    var [profSchool, setProfSchool] = React.useState(props.profSchool)
    var [courseName, setCourseName] = React.useState("")
    var [currentlyTaking, setCurrentlyTaking]= React.useState(true)
    var [overallRating, setOverallRating] = React.useState(0) 
    var [recommendationRating, setRecommendationRating] = React.useState(0)
    var [difficultyRating, setDifficultyRating] = React.useState(0)
    var [grade, setGrade] = React.useState(null)
    var [teachingStyle, setTeachingStyle] = React.useState("")
    var [review, setReview] = React.useState("")
    var [yearTaken, setYearTaken] = React.useState(2019)

    const submit = (event) =>{
        event.preventDefault()
        const newReview = {
            review: review,
            courseName: courseName,
            overallRating: overallRating,
            recommendationRating: recommendationRating,
            difficultyRating: difficultyRating,
            yearTaken: yearTaken,
        }
        if (props.match.params.userId !== "new"){
            props.addReview(props.match.params.userId, newReview);
            props.history.push("/review/"+props.match.params.userId)
        }
        else{
            newReview.name = profName;
            newReview.school = profSchool;
            props.addReview(null, newReview);
            props.history.push("/")
        }
        
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
    const renderYears = () =>{
        let yearOptions = []
        let currentYear = (new Date()).getFullYear()
        let min = currentYear - 10
        while (currentYear > min){
            yearOptions.push(<option value={currentYear}>{currentYear}</option>)
            currentYear -= 1
        }
        return yearOptions;
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
                    <Label>Nama Perguruan Tinggi*</Label>
                    <Input type="text" id="profSchool" value={profSchool} required onChange={(event) => setProfSchool(event.target.value)}/>
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
                {!currentlyTaking && 
                    <FormGroup>
                        <Label>Tahun mengambil kelas</Label>
                        <Input type="select" name="yearTaken" id="yearTaken" onChange={(event) => {setYearTaken(event.target.value)}}>
                            {renderYears()}
                        </Input>
                    </FormGroup>
                }
                <FormGroup style={style.ratingBox}>
                    <Label>Penilaian*</Label>
                    <StyledRating
                        // precision={0.5}
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
                        // precision={0.5}
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
                        // precision={0.5} 
                        style={style.ratingSpan} 
                        id="difficultyRating" 
                        value={difficultyRating} 
                        onChange={(event, value) => setDifficultyRating(value)}
                        icon={<LocalCafe/>}
                        emptyIcon={<LocalCafeOutlined/>}
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

function mapStateToProps(state, ownProps){
    if (state.professor){
        return{
            profName: state.professor.name,
            profSchool: state.professor.school
        }
    }
    else{
        return{
            profName: "",
            profSchool: ""
        }
    }
    
}
export default connect(mapStateToProps,{addReview})(ReviewForm);