import React from "react";
import {connect} from "react-redux";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, LocalCafe, LocalCafeOutlined } from "@material-ui/icons";
import { StyledRating } from "../Rating/StyledRating";
import { addReview, getReviews, setError, removeError } from "../../redux/actions";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from "@material-ui/core";
import Popup from "../Popup/Popup";
import LoginPopup from "../Popup/LoginPopup";
import {options} from '../../data/UniversityList';
import { teachingStyleOptions } from "../../data/TeachingStyle";
import { tagsOptions } from "../../data/TagsOptions";
import Feedback from "../Feedback/Feedback";

const Icon = withStyles({
    root: {
      color: "#39A3FF",
      '&$checked': {
        color: "#39A3FF",
      },
    },
    checked: {},
  })(props => <CheckBoxOutlineBlankIcon fontSize="small" {...props} />);

const CheckedIcon = withStyles({
    root: {
      color: "#39A3FF",
      '&$checked': {
        color: "#39A3FF",
      },
    },
    checked: {},
  })(props => <CheckBoxIcon fontSize="small" {...props} />);

function ReviewForm(props){
    const existingProf = props.match.params.revieweeId ? true : false

    var [profName, setProfName] = React.useState("")
    var [profSchool, setProfSchool] = React.useState("")
    var [courseName, setCourseName] = React.useState("")
    var [currentlyTaking, setCurrentlyTaking]= React.useState(true)
    var [overallRating, setOverallRating] = React.useState(props.match.params.overallRating ? props.match.params.overallRating : 0) 
    var [recommendationRating, setRecommendationRating] = React.useState(0)
    var [difficultyRating, setDifficultyRating] = React.useState(0)
    var [grade, setGrade] = React.useState(null)
    var [teachingStyle, setTeachingStyle] = React.useState([])
    var [tags, setTags] = React.useState([])
    var [review, setReview] = React.useState("")
    var [yearTaken, setYearTaken] = React.useState(2019)
    var [textbookRequired, setTextbookRequired] = React.useState(true)
    var [submitted, setSubmitted] = React.useState(false)

    const valid = profName !== "" && profSchool !== "" && courseName !== "" && overallRating !== 0 && recommendationRating !== 0 && difficultyRating !== 0 && grade !== "" && teachingStyle.length >0 && tags.length === 3 && review !== ""

    const SubmitButton = (props) => {
        return(<Button className="blue-button" onClick={props.onClick} style={{width:'100%'}}>Selesai</Button>)
    }

    const revieweeId = props.match.params.revieweeId;
    const revieweeName = props.match.params.revieweeName;
    const getReviews = props.getReviews;
    const professor = props.professor
    const history = props.history
    React.useEffect(() =>{
        if(existingProf){
            if(!professor){
                getReviews(revieweeId)
            }
            else{
                setProfName(professor.name)
                setProfSchool(professor.school)
            }
        }
        else{
            setProfName(revieweeName)
            if(submitted && professor){
                history.push("/review/"+professor.revieweeId)
            }
        }
    }, [getReviews, revieweeId, existingProf, professor, revieweeName, submitted, history])

    const submit = (event) =>{
        event.preventDefault()
        
        const newReview = {
            review: review,
            courseName: courseName,
            overallRating: overallRating,
            recommendationRating: recommendationRating,
            difficultyRating: difficultyRating,
            yearTaken: yearTaken,
            tags: tags,
            teachingStyles: teachingStyle,
            textbookRequired: textbookRequired,
            grade: grade
        }
        if(props.loggedIn && valid){
            props.removeError()
            if (existingProf){
                props.addReview(revieweeId, newReview);
                props.history.push("/review/"+revieweeId)
            }
            else{
                newReview.name = profName;
                newReview.school = profSchool;
                props.addReview(null, newReview)               
            }
            setSubmitted(true)
        }   
        else{
            var errorMessage = "Tolong cek/isi berikut ini:\n"

            if(profName === ""){
                errorMessage += "- Nama dosen\n"
            }
            if(profSchool === ""){
                errorMessage += "- Nama Perguruan Tinggi\n"
            }
            if(courseName === ""){
                errorMessage += "- Nama kelas\n"
            }
            if(overallRating === 0){
                errorMessage += "- Penilaian\n"
            }
            if(recommendationRating === 0){
                errorMessage += "- Rekomendasi\n"
            }
            if(difficultyRating === 0){
                errorMessage += "- Kesulitan\n"
            }
            if(grade === ""){
                errorMessage += "- Nilai (Silahkan pilih nilai jika tidak nyaman untuk mengisi nilai)\\n"
            }
            if(teachingStyle.length === 0){
                errorMessage += "- Gaya mengajar\n"
            }
            if(tags.length !== 3){
                errorMessage += "- 3 tag\n"
            }
            if(review === ""){
                errorMessage += "- Review\n"
            }
            props.setError(new Error(errorMessage) )
            window.scrollTo(0, 0)
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
        let min = currentYear - 20
        while (currentYear > min){
            yearOptions.push(<option value={currentYear}>{currentYear}</option>)
            currentYear -= 1
        }
        return yearOptions;
    }
    return(
        <div className="container content page-container">
            <h5>Terima kasih atas berkontribusi anda!</h5>
            {props.error && <Feedback color={"danger"} message={props.error.message}/>}
            <form onSubmit={submit}> 
                <FormGroup>
                    <Label>Nama Dosen*</Label>
                    <TextField 
                        id="profName" 
                        value={profName} 
                        required 
                        onChange={(event) => setProfName(event.target.value)} 
                        fullWidth 
                        variant="outlined"
                        disabled={existingProf}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Nama Perguruan Tinggi*</Label>
                    <Autocomplete
                        id="profSchool"
                        options={options}
                        freeSolo
                        getOptionLabel={option => option}
                        value={profSchool}
                        onChange={(event, value) => setProfSchool(value)}
                        style={{ width: "100% "}}
                        disabled={existingProf}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                required
                                onChange={(event) => setProfSchool(event.target.value)}
                            />
                        )}
                    />
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
                    <Label>Apakah anda akan merekomendasi dosen ini ke teman anda?*</Label>
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
                        icon={<LocalCafe/>}
                        emptyIcon={<LocalCafeOutlined/>}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Nama Kelas*</Label>
                    <TextField 
                        id="courseName" 
                        value={courseName} 
                        required 
                        onChange={(event) => setCourseName(event.target.value)}
                        fullWidth 
                        variant="outlined"
                    />
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
                <FormGroup>
                    <Label>Nilai yang Anda dapatkan*</Label>
                    <Autocomplete
                        id="grade"
                        options={["A", "B", "C", "D", "E", "F", "N/A"]}
                        freeSolo
                        getOptionLabel={option => option}
                        value={grade}
                        onChange={(event, value) => setGrade(value)}
                        style={{ width: "100% "}}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                required
                                onChange={(event) => setGrade(event.target.value)}
                            />
                        )}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Gaya mengajar dosen*</Label>
                    <Autocomplete
                        multiple
                        id="teachingStyle"
                        options={teachingStyleOptions}
                        disableCloseOnSelect
                        getOptionLabel={option => option}
                        onChange={(event, value) => setTeachingStyle(value)}
                        value={teachingStyle}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <Checkbox
                                    icon={<Icon/>}
                                    checkedIcon={<CheckedIcon/>}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </React.Fragment>
                        )}
                        style={{ width: "100% "}}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </FormGroup>
                <FormGroup style={style.ratingBox}>
                    <Label>Apakah Textbook digunakan?*</Label>
                    <div className="button-group-container" id="textbookRequired">
                        <Button type="button" id="textbookRequired-Yes" onClick={(event) => setTextbookRequired(true)} className={textbookRequired ? "button-group-selected" : "button-group"}>Iya</Button>
                        <Button type="button" id="textbookRequired-No" onClick={(event) => setTextbookRequired(false)} className={!textbookRequired ? "button-group-selected" : "button-group"}>Tidak</Button>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Pilih 3 tag yang menjelaskan mengenai dosen ini*</Label>
                    <Autocomplete
                        multiple
                        id="tags"
                        options={tagsOptions}
                        disableCloseOnSelect
                        getOptionLabel={option => option}
                        value={tags}
                        onChange={(event, value) => {
                            if(value.length > 3){
                                value = value.slice(1,value.length)
                            }
                            setTags(value)
                        }}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <Checkbox
                                    icon={<Icon/>}
                                    checkedIcon={<CheckedIcon/>}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </React.Fragment>
                        )}
                        style={{ width: "100% "}}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Review anda*</Label>
                    <Input type="textarea" id="review" value={review} required onChange={(event) => setReview(event.target.value)}/>
                </FormGroup>
                {props.loggedIn && <SubmitButton/>}
                {!props.loggedIn && <Popup trigger={{component:SubmitButton}} purpose={"Selesai"} content={LoginPopup}/>}
            </form>
        </div>
    )
}

function mapStateToProps(state){
    return{
        professor: state.professor,
        loggedIn: state.loggedIn,
        error: state.error
    }
}
export default connect(mapStateToProps,{addReview, getReviews, setError, removeError})(ReviewForm);