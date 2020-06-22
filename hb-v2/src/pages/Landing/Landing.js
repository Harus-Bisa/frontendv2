import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";
import "../../css/landingPage.css";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Popup/Popup";
import { Person, School, KeyboardArrowDown } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
import SearchBoxPopup from "../../components/Popup/SearchBoxPopup";
import { getTopSchools, getRecentReviews } from "../../redux/actions";
import RecentReviewCard from "../../components/Card/RecentReviewCard";
import useInterval from "../../components/functions/setInterval";

function Landing(props){
    const [school, setSchool] = React.useState("")
    const [recentReviewIndex, setRecentReviewIndex] = React.useState(0)

    const DummyMobileSearchBox = (props) =>{
        return(
            <React.Fragment>
                <div className="search-box border">
                    <TextField
                        placeholder="Ketik Nama Dosen Anda"
                        fullWidth
                        InputProps={{
                            startAdornment:(
                                <React.Fragment>
                                    <Person style={{color:"#40444D"}}/>
                                </React.Fragment>
                            )
                        }}
                        onClick={props.onClick}
                        onChange={props.onChange}
                        className="search-input-wrapper"
                    />
                </div>
                <div style={{marginTop:"-0.5rem"}}>
                    <Button onClick={props.onClick} className="button">
                        <School style={{marginRight:"10px"}}/><span style={{fontWeight:"300", color:"white"}}>Universitas</span><KeyboardArrowDown style={{marginLeft:'10px'}}/>
                    </Button>
                </div>
            </React.Fragment>
        )
    }
    const topSchools = props.topSchools
    const getTopSchools = props.getTopSchools
    const recentReviews = props.recentReviews
    const getRecentReviews = props.getRecentReviews

    React.useEffect(() =>{
        window.scroll(0,0)
        if(!topSchools){
            getTopSchools()
        }
        if(!recentReviews){
            getRecentReviews()
        }
    },[topSchools, getTopSchools, recentReviews, getRecentReviews])

    const changeIndex = () =>{
        if(recentReviews){
            setRecentReviewIndex((recentReviewIndex+1)%recentReviews.length)
        }
    }
    useInterval(changeIndex, 5000);
    
    return(
        <div className='page-container landing-page'>
            <div className="container footer-adjust">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <header className="flex">
                            <div className="margin-auto">
                                <h1>Review Dosen Anda Sekarang</h1>
                                {!props.isMobile && 
                                <React.Fragment>
                                    <SearchBox school={school}/>
                                    {props.topSchools && 
                                    <div className="flex" style={{textAlign:'center'}}>
                                        <h3 style={{fontWeight:'normal', fontSize:"20px"}}><span style={{fontWeight:"600"}}>Pencarian Populer: </span><Button style={{color: "white"}} className="text-button" onClick={() => setSchool(topSchools[0])}>{topSchools[0]},</Button><Button style={{color: "white"}} className="text-button" onClick={() => setSchool(topSchools[1])}>{topSchools[1]}</Button></h3>
                                    </div>
                                    }
                                </React.Fragment>
                                }
                                {props.isMobile &&
                                    <Popup
                                        trigger={{
                                            component:DummyMobileSearchBox
                                        }}
                                        content={SearchBoxPopup}
                                    />
                                }
                            </div>
                        </header>
                        {props.recentReviews && 
                        <div className="flex" style={{padding:"15rem 0 10rem 0"}}>
                            <div style={{margin:"auto 0"}}>
                               <RecentReviewCard review={props.recentReviews[recentReviewIndex]}/>
                            </div>
                        </div>}
                        <div className="flex" style={{textAlign:'center', borderTop:"1px solid #40444D", padding:"3rem 0"}}>
                            <div style={{marginBottom:'2rem'}}>
                                <h3>Sukseskan Mahasiswa Indonesia dengan membagikan pengalaman Anda</h3>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-3">
                                    <Button fullWidth className="contrast-button" onClick={() => {props.history.push("/signup")}}>Daftar Sekarang</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
function mapStateToProps(state){
    return{
        isMobile: state.isMobile,
        topSchools: state.topSchools,
        recentReviews:state.recentReviews
    }
}
export default connect(mapStateToProps,{getTopSchools, getRecentReviews})(Landing);