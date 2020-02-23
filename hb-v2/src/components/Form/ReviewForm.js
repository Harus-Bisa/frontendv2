import React from "react";
import {connect} from "react-redux";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { ThumbUp, ThumbUpOutlined, Check, CheckOutlined, LocalCafe, LocalCafeOutlined } from "@material-ui/icons";
import { StyledRating } from "../Rating/StyledRating";
import { addReview, getReviews, setError, removeError, findSchools } from "../../redux/actions";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles, Divider } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import Popup from "../Popup/Popup";
import LoginPopup from "../Popup/LoginPopup";
import { teachingStyleOptions } from "../../data/TeachingStyle";
import { tagsOptions } from "../../data/TagsOptions";
import Feedback from "../Feedback/Feedback";
import { overallRatingLabels, recommendationRatingLabels, difficultyRatingLabels } from "../Rating/RatingLabel";
import "../../css/review.css";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

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
    var [yearTaken, setYearTaken] = React.useState((new Date()).getFullYear())
    var [textbookRequired, setTextbookRequired] = React.useState(true)
    var [agree, setAgree] = React.useState(false)
    var [submitted, setSubmitted] = React.useState(false)
    var [flag, setFlag] = React.useState(false)

    const [overallHover, setOverallHover] = React.useState(-1);
    const [recommendationHover, setRecommendationHover]  = React.useState(-1);
    const [difficultyHover, setDifficultyHover] =  React.useState(-1);

    const valid = profName !== "" && profSchool !== "" && courseName !== "" && overallRating !== 0 && recommendationRating !== 0 && difficultyRating !== 0 && grade !== "" && teachingStyle.length >0 && tags.length > 0 && review !== "" && agree
    const SubmitButton = (props) => {
        return(
        <Button 
            className="blue-button" 
            style={{width:'100%'}}
        >
            Kirim Review Anda
        </Button>)
    }
    const BlueCheckbox = withStyles({
        root: {
            color: "#39A3FF",
            '&$checked': {
            color: "#39A3FF",
            },
        },
        checked: {},
    })(props => <Checkbox color="default" {...props} />);

    const revieweeId = props.match.params.revieweeId;
    const revieweeName = props.match.params.revieweeName;
    const getReviews = props.getReviews;
    const professor = props.professor
    const history = props.history
    const schools = props.schools
    const findSchools = props.findSchools
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
            if(localStorage.getItem("review")){
                const savedReview = JSON.parse(localStorage.getItem('review'));
                if(savedReview.name === revieweeName){
                    setProfSchool(savedReview.school);
                    setCourseName(savedReview.courseName);
                    setCurrentlyTaking(savedReview.currentlyTaking);
                    setOverallRating(savedReview.overallRating);
                    setRecommendationRating(savedReview.recommendationRating)
                    setDifficultyRating(savedReview.difficultyRating)
                    setGrade(savedReview.grade)
                    setTeachingStyle(savedReview.teachingStyles)
                    setTags(savedReview.tags)
                    setReview(savedReview.review)
                    setYearTaken(savedReview.yearTaken)
                    setTextbookRequired(savedReview.textbookRequired)
                }
            }
            if(submitted && professor){
                history.push("/review/"+professor.revieweeId)
            }
        }

        if(schools.length === 0){
            findSchools("")
        }

    }, [getReviews, revieweeId, existingProf, professor, revieweeName, submitted, history,schools, findSchools])

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
            if(localStorage.getItem("review")){
                localStorage.removeItem("review");
            }
            setSubmitted(true)
        }   
        else if(!valid){
            var errorMessage = makeErrorMessage()
            props.setError(new Error(errorMessage) )
            window.scrollTo(0, 0)
        }   
        else if(!props.loggedIn){
            if(props.error){
                props.removeError()
            }
            newReview.name = profName;
            newReview.school = profSchool;
            newReview.currentlyTaking = currentlyTaking;
            localStorage.setItem('review', JSON.stringify(newReview));
            setFlag(true)
        } 
    }
    const makeErrorMessage = () =>{
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
            errorMessage += "- Kesusahan Kelas\n"
        }
        if(grade === ""){
            errorMessage += "- Nilai (Silahkan pilih nilai jika tidak nyaman untuk mengisi nilai)\\n"
        }
        if(teachingStyle.length === 0){
            errorMessage += "- Gaya mengajar\n"
        }
        if(tags.length === 0){
            errorMessage += "- Tag\n"
        }
        if(review === ""){
            errorMessage += "- Review anda\n"
        }
        if(!agree){
            errorMessage += "- Setuju dengan Syarat dan Ketentuan"
        }
        return errorMessage
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
            yearOptions.push(<option value={currentYear} key={currentYear}>{currentYear}</option>)
            currentYear -= 1
        }
        return yearOptions;
    }
    const makeTags = () =>{
        var tagsComponent = []
        for (let i=0; i<tagsOptions.length; i++){
            const selected = tags.includes(tagsOptions[i])
            tagsComponent.push(
                <ToggleButton 
                    value={tagsOptions[i]} 
                    key={i} 
                    className={selected ? "tag button tag-button-selected" : "tag button tag-button"}
                >
                    {tagsOptions[i]}
                </ToggleButton>
            )
        }
        return tagsComponent;
    }
    return(
        <div className="page-container">
            {existingProf && 
                <div className="page-header" style={{backgroundColor:'#F7F7F7'}}>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col">
                                <h2 className="blue">{profName}</h2>
                                <p className="italic">{profSchool}</p>
                            </div>  
                            <div className="col-2" style={{textAlign:'right'}}>
                                <a href={"/review/new/Dosen"}>Ganti Dosen?</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="container content">
                <div className="row">
                    <div className="col-md-9">
                        <div style={{marginBottom:'2.5rem'}}>
                            <h4>Terima kasih atas kontribusinya! Review <span className="blue">anonimus</span> Anda sangat membantu mahasiswa lainnya!</h4>
                        </div>
                        {props.error && <Feedback color={"danger"} message={props.error.message}/>}
                        <form onSubmit={submit} className="review-form"> 
                            {!existingProf && 
                            <React.Fragment>
                                <FormGroup>
                                    <Label>Nama Dosen<span className="red">*</span></Label>
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
                                    <Label>Nama Perguruan Tinggi<span className="red">*</span></Label>
                                    <Autocomplete
                                        id="profSchool"
                                        options={schools}
                                        freeSolo
                                        disableClearable
                                        getOptionLabel={option => option}
                                        value={profSchool}
                                        inputValue={profSchool}
                                        onChange={(event, value) => setProfSchool(value)}
                                        onInputChange={(event, value) => setProfSchool(value)}
                                        style={{ width: "100% "}}
                                        disabled={existingProf}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        )}
                                    />
                                </FormGroup>
                            </React.Fragment>
                            }
                            <div style={{margin:"2rem 0"}}>
                                <FormGroup row>
                                    <div className="col-lg-5 col-md-5">
                                        <Label>Penilaian keseluruhan kamu<span className="red">*</span></Label>
                                    </div>
                                    <div className="col flex">
                                        <div className="row">
                                            <div className="col-md-6 flex">
                                                <StyledRating
                                                    className="margin-auto large-rating"
                                                    style={style.ratingSpan} 
                                                    id="overallRating" 
                                                    value={overallRating} 
                                                    onChange={(event, value) => setOverallRating(value)}
                                                    icon={<ThumbUp/>}
                                                    emptyIcon={<ThumbUpOutlined/>}
                                                    size="large"
                                                    onChangeActive={(event, newHover) => {
                                                        setOverallHover(newHover);
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-4 flex">
                                                {overallRating !== null && <p className="margin-auto">{overallRatingLabels[overallHover !== -1 ? overallHover : overallRating]}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className="col-lg-5 col-md-5">
                                        <Label>Akan merekomendasi ke teman?<span className="red">*</span></Label>
                                    </div>
                                    <div className="col flex">
                                        <div className="row">
                                            <div className="col-md-6 flex">
                                                <StyledRating
                                                    className="margin-auto large-rating"
                                                    style={style.ratingSpan} 
                                                    id="recommendationRating" 
                                                    value={recommendationRating} 
                                                    onChange={(event, value) => setRecommendationRating(value)}
                                                    icon={<Check/>}
                                                    emptyIcon={<CheckOutlined/>}
                                                    onChangeActive={(event, newHover) => {
                                                        setRecommendationHover(newHover);
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-4 flex">
                                                {recommendationRating !== null && <p className="margin-auto">{recommendationRatingLabels[recommendationHover !== -1 ? recommendationHover : recommendationRating]}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className="col-lg-5 col-md-5">
                                        <Label>Kesusahan kelas<span className="red">*</span></Label>
                                    </div>
                                    <div className="col flex">
                                        <div className="row">
                                            <div className="col-md-6 flex">
                                                <StyledRating 
                                                    className="margin-auto large-rating"
                                                    style={style.ratingSpan} 
                                                    id="difficultyRating" 
                                                    value={difficultyRating} 
                                                    onChange={(event, value) => setDifficultyRating(value)}
                                                    icon={<LocalCafe/>}
                                                    emptyIcon={<LocalCafeOutlined/>}
                                                    onChangeActive={(event, newHover) => {
                                                        setDifficultyHover(newHover);
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-4 flex">
                                                {difficultyRating !== null && <p className="margin-auto">{difficultyRatingLabels[difficultyHover !== -1 ? difficultyHover : difficultyRating]}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <Label>Nama Kelas<span className="red">*</span></Label>
                                <TextField 
                                    id="courseName" 
                                    value={courseName} 
                                    required 
                                    onChange={(event) => setCourseName(event.target.value)}
                                    fullWidth 
                                    variant="outlined"
                                    placeholder="Nama kelas yang anda ambil"
                                />
                            </FormGroup>
                            <FormGroup style={style.ratingBox}>
                                <Label>Apakah anda sedang mengambil kelas ini?<span className="red">*</span></Label>
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
                                <Label>Nilai yang Anda dapatkan<span className="red">*</span></Label>
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
                                <Label>Gaya mengajar dosen<span className="red">*</span></Label>
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
                                <Label>Apakah wajib mengunakan buku pelajaran?<span className="red">*</span></Label>
                                <div className="button-group-container" id="textbookRequired">
                                    <Button type="button" id="textbookRequired-Yes" onClick={(event) => setTextbookRequired(true)} className={textbookRequired ? "button-group-selected" : "button-group"}>Iya</Button>
                                    <Button type="button" id="textbookRequired-No" onClick={(event) => setTextbookRequired(false)} className={!textbookRequired ? "button-group-selected" : "button-group"}>Tidak</Button>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Pilih <span style={{fontWeight:"bold"}}>tag</span> yang sesuai dengan pengalamanmu!<span className="red">*</span> (maks: 3)</Label>
                                <Autocomplete
                                    className="d-md-none"
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
                                <div className="d-none d-md-block">
                                    <ToggleButtonGroup 
                                        className="tags-button-group"
                                        value={tags} 
                                        onChange={(event, value) => {
                                            if(value.length > 3){
                                                value = value.slice(1,value.length)
                                            }
                                            setTags(value)
                                        }}
                                    >
                                        {makeTags()}
                                    </ToggleButtonGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Review anda<span className="red">*</span></Label>
                                <Input 
                                    type="textarea" 
                                    rows={8} 
                                    id="review" 
                                    value={review} 
                                    required 
                                    onChange={(event) => setReview(event.target.value)}
                                    placeholder="Beri tahu mahasiswa lainnya tentang pengalaman Anda"
                                />
                            </FormGroup>
                            <FormGroup className="container">
                                <div className="row">
                                    <div className="col-1">
                                        <BlueCheckbox checked={agree} onChange={() => setAgree(!agree)}/>
                                    </div>
                                    <div className="col">
                                        <p>Dengan ini saya menyatakan bahwa review ini dibuat berdasarkan pengalaman saya dan benar-benar opini pribadi saya tentang dosen ini, dan saya tidak menerima tawaran insentif maupun pembayaran apapun dari dosen ini untuk menulis review ini. Saya memahami bahwa Dosenku sama sekali tidak mentoleransi ulasan palsu Dengan melanjutkan, Anda menyetujui <a href="/info/termsandconditions">Syarat dan Ketentuan</a> dan <a href="/info/privacypolicy">Kebijakan Privasi</a> Dosen Ku<span className="red">*</span></p>
                                    </div>
                                </div>
                            </FormGroup>
                            {flag && <Popup content={LoginPopup} auto disableFlag={() => setFlag(false)}/>}
                            <SubmitButton/>
                        </form>
                    
                    </div>
                    <Divider orientation={"vertical"} className="d-none d-md-block"/>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        professor: state.professor,
        loggedIn: state.loggedIn,
        error: state.error,
        schools: state.schools
    }
}
export default connect(mapStateToProps,{addReview, getReviews, setError, removeError,findSchools})(ReviewForm);