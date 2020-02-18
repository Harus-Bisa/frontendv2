import React from "react";
import { connect } from "react-redux";
import {ThumbUp, ThumbUpOutlined, Info, Check, CheckOutlined, LocalCafe, LocalCafeOutlined, Search} from "@material-ui/icons"
import { StyledRating } from "../../components/Rating/StyledRating";
import ReviewContent from "../../components/ReviewContent/ReviewContent";
import "../../css/review.css";
import { getReviews } from "../../redux/actions";
import Popup from "../../components/Popup/Popup";
import LoginPopup from "../../components/Popup/LoginPopup";
import Feedback from "../../components/Feedback/Feedback";
import Footer from "../../components/Footer/Footer";
import { Divider, TextField, Tooltip } from "@material-ui/core";
import Reviews from "../../components/ReviewContent/Reviews";

export const WEB = "WEB";
export const MOBILE = "MOBILE";

function ThumbRating(props){
    return (<StyledRating
        name="thumb-rating"
        icon={<ThumbUp/>}
        emptyIcon={<ThumbUpOutlined/>} 
        className="large-rating"
        onChange={props.onChange}
    />)
}
function Review(props){
    var [rating, setRating] = React.useState(0)
    var [findReviewText, setFindReviewText] = React.useState("")

    const addReview = (event, value) =>{
        setRating(value)
        if(props.loggedIn){
            props.history.push("/review/"+props.professor.revieweeId+"/add/"+value)
        }
    }
    const revieweeId = props.match.params.revieweeId;
    const loggedIn = props.loggedIn
    const getReviews = props.getReviews;

    React.useEffect(() =>{
        getReviews(revieweeId)
    }, [getReviews, revieweeId, loggedIn])


    if(props.loading){
        return(<div className="container content page-container"><p>Loading</p></div>)
    }
    if (props.error && !props.professor){
        return(
            <div className="container content page-container">
                <Feedback color={"danger"} message={props.error.message}/>
            </div>
        )
    }
    if(props.professor){
        //web
        if(window.screen.width > 768){
            return(
                <div className="container content page-container">
                    <div className="footer-adjust">
                        {props.error && <Feedback color={"danger"} message={props.error.message}/>}
                        <header className="review-header">
                            <div className="row">
                                <div className="col-lg-7">
                                    <h2 style={{borderBottom:"4px solid #39A3FF", width:'fit-content', fontSize: "calc(100% + 17px)"}}>{props.professor.name}</h2>
                                    <p>{props.professor.school}</p>
                                </div>
                                <div className="col-lg-5">
                                    <div className="write-review">
                                        <p className="grey-text">{props.professor.numberOfReviews === 0 ? "Be the first to review!" : "Tulis Review Anda"}</p>
                                        {props.loggedIn && 
                                            <StyledRating
                                                name="addReview"
                                                id="addReview"
                                                onChange={addReview}
                                                value={rating}
                                                icon={<ThumbUp/>}
                                                emptyIcon={<ThumbUpOutlined/>} 
                                                className="large-rating"
                                            />
                                        }
                                        {!props.loggedIn && 
                                            <Popup
                                                trigger={{
                                                    component:ThumbRating,
                                                }}
                                                content={LoginPopup}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="review-statistics-web">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div style={{display:'flex', flexDirection:"row"}}>
                                        <h4>Penilaian keseluruhan </h4>
                                        <Tooltip 
                                            arrow
                                            placement="right" 
                                            title={
                                                <React.Fragment>
                                                    <p>5 Jempol: Sangat Bagus</p>
                                                    <p>4 Jempol: Bagus</p>
                                                    <p>3 Jempol: Sedang</p>
                                                    <p>2 Jempol: Buruk</p>
                                                    <p>1 Jempol: Sangat Buruk</p>
                                                </React.Fragment>
                                            }
                                        >
                                            <Info style={{color:"#0D7CBB", margin:'0 15px'}}/>
                                        </Tooltip>
                                    </div>
                                    
                                    <div className="row no-gutters">
                                        <div className="col-4 flex">
                                            <h1 className="margin-auto" style={{fontSize:"64px", fontWeight:'500'}}>{props.professor.overallRating === "-" ? 0 : props.professor.overallRating}</h1>
                                        </div>
                                        <div className="col-6 flex">
                                            <div className="margin-auto" style={{marginLeft:"0!Important"}}>
                                                <StyledRating
                                                    precision={0.1}
                                                    value={props.professor.overallRating === "-" ? 0 : props.professor.overallRating} 
                                                    readOnly 
                                                    icon={<ThumbUp/>}
                                                    emptyIcon={<ThumbUpOutlined/>} 
                                                />
                                                <p style={{margin:'auto'}}>Berdasarkan {props.professor.numberOfReviews} Review</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Divider orientation={"vertical"}/>
                                <div className={"col-lg-7 flex"}>
                                    <div className="margin-auto container">
                                        <h4 style={{color:'transparent'}}>DOSENKU DUMMY TEXT</h4>
                                        <div className="row no-gutters">
                                            <div className="col-1 flex">
                                                <h5 className="margin-auto">{props.professor.recommendationRating === "-" ? 0 : props.professor.recommendationRating}</h5>
                                            </div>
                                            <div className="col-3 flex">
                                                <StyledRating
                                                    precision={0.1}
                                                    value={props.professor.recommendationRating === "-" ? 0 : props.professor.recommendationRating} 
                                                    readOnly 
                                                    icon={<Check/>}
                                                    emptyIcon={<CheckOutlined/>} 
                                                    className="margin-auto"
                                                />
                                            </div>
                                            <div className="col flex" style={{display:'flex', flexDirection:"row"}}>
                                                <h5 style={{marginBottom:0}}>Kemungkinan untuk merekomendasikan </h5>
                                                <Tooltip 
                                                    arrow
                                                    placement="right" 
                                                    title={
                                                        <React.Fragment>
                                                            <p>5 Centang: Rekomen banget</p>
                                                            <p>4 Centang: Rekomen</p>
                                                            <p>3 Centang: Mungkin</p>
                                                            <p>2 Centang: Tidak</p>
                                                            <p>1 Centang: Tidak akan</p>
                                                        </React.Fragment>
                                                    }
                                                >
                                                    <Info style={{color:"#0D7CBB", margin:'0 15px'}}/>
                                                </Tooltip>
                                            </div>
                                            
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col-1 flex">
                                                <h5 className="margin-auto">{props.professor.difficultyRating === "-" ? 0 : props.professor.difficultyRating}</h5>
                                            </div>
                                            <div className="col-3 flex">
                                                <StyledRating
                                                    precision={0.1}
                                                    value={props.professor.difficultyRating === "-" ? 0 : props.professor.difficultyRating} 
                                                    readOnly 
                                                    icon={<LocalCafe/>}
                                                    emptyIcon={<LocalCafeOutlined/>} 
                                                    className="margin-auto"
                                                />
                                            </div>
                                            <div className="col flex" style={{display:'flex', flexDirection:"row"}}>
                                                <h5 style={{marginBottom:0}}>Kesusahan kelas </h5>
                                                <Tooltip 
                                                    arrow
                                                    placement="right" 
                                                    title={
                                                        <React.Fragment>
                                                            <p>5 Kopi: Susah banget</p>
                                                            <p>4 Kopi: Susah</p>
                                                            <p>3 Kopi: Lumayan</p>
                                                            <p>2 Kopi: Mudah</p>
                                                            <p>1 Kopi: Mudah banget</p>
                                                        </React.Fragment>
                                                    }
                                                >
                                                    <Info style={{color:"#0D7CBB", margin:'0 15px'}}/>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {!props.loggedIn && 
                                        <div className="blue-box" style={{width:'50%', height:'100%', position:'absolute'}}>
                                            <h5>Sign up dan lihat semua statistik. Gratis!</h5>
                                        </div>
                                    } */}
                                </div>
                            </div>
                        </div>
                        <div className="review-content-header">
                            <div className="row">
                                <div className="col-6">
                                    <TextField
                                        variant="outlined"
                                        placeholder="Cari review"
                                        value={findReviewText}
                                        onChange={(event) => {setFindReviewText(event.target.value)}}
                                        fullWidth
                                        InputProps={{
                                            startAdornment:(
                                                <React.Fragment>
                                                    <Search/>
                                                </React.Fragment>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="col-6">
                                    {/* <p>Urutkan berdasarkan</p> */}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Reviews type={WEB}/>
                        </div>                
                    </div>
                    <Footer/>
                </div>
            )
        }
        return(
            <div className="container content page-container">
                <div className="footer-adjust">
                {props.error && <Feedback color={"danger"} message={props.error.message}/>}
                    <header className="review-header">
                        <h2 style={{borderBottom:"4px solid #39A3FF", width:'fit-content', fontSize: "calc(100% + 17px)"}}>{props.professor.name}</h2>
                        <p>{props.professor.school}</p>
                        <div style={{display:'flex', marginTop:'10px'}}>
                            <StyledRating
                                precision={0.1}
                                value={props.professor.overallRating === "-" ? 0 : props.professor.overallRating} 
                                readOnly 
                                icon={<ThumbUp/>}
                                emptyIcon={<ThumbUpOutlined/>} 
                            />
                            <p style={{fontSize:'11px', marginLeft:'10px', marginBottom:'0px'}}>{props.professor.numberOfReviews} Review</p>
                        </div>
                    </header>
                    <div className="write-review">
                        <p className="grey-text">{props.professor.numberOfReviews === 0 ? "Be the first to review!" : "Tulis Review Anda"}</p>
                        {props.loggedIn && 
                            <StyledRating
                                name="addReview"
                                id="addReview"
                                onChange={addReview}
                                value={rating}
                                icon={<ThumbUp/>}
                                emptyIcon={<ThumbUpOutlined/>} 
                                className="large-rating"
                            />
                        }
                        {!props.loggedIn && 
                            <Popup
                                trigger={{
                                    component:ThumbRating,
                                }}
                                content={LoginPopup}
                            />
                        }
                    </div>
                    <div style={{margin:'1rem -30px'}}>
                        <ReviewContent/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        professor: state.professor,
        error: state.error,
        loggedIn: state.loggedIn,
        loading: state.loading
    }
}
export default connect(mapStateToProps, {getReviews})(Review);