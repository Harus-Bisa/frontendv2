import React from "react";
import {connect} from "react-redux";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, LocalCafe, LocalCafeOutlined } from "@material-ui/icons";
import { StyledRating } from "../Rating/StyledRating";
import { addReview } from "../../redux/actions";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from "@material-ui/core";

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


const teachingStyleOptions= ["Audio", "Visual"]
const tagsOptions=["Inspirasional","Memberi banyak feedback yang baik","Kalo kasi nilai susah","Lucu","Membosankan","Berwibawa","Peduli dengan mahasiswa"]

function ReviewForm(props){
    var [profName, setProfName] = React.useState(props.profName)
    var [profSchool, setProfSchool] = React.useState(props.profSchool)
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
        if (props.match.params.revieweeId !== "new"){
            props.addReview(props.match.params.revieweeId, newReview);
            props.history.push("/review/"+props.match.params.revieweeId)
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
                        icon={<LocalCafe/>}
                        emptyIcon={<LocalCafeOutlined/>}
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
                        options={["A", "B", "C", "D", "E", "F"]}
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
                        onChange={(event, value) => setTags(value)}
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