import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";
import "../../css/landingPage.css";
import Footer from "../../components/Footer/Footer";
import newestReview from "../../img/newestreviewimg.png";
import Popup from "../../components/Popup/Popup";
import { Person, School, KeyboardArrowDown } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";
import SearchBoxPopup from "../../components/Popup/SearchBoxPopup";
import { getTopSchools } from "../../redux/actions";

function Landing(props){
    const [school, setSchool] = React.useState("")

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

    React.useEffect(() =>{
        if(!topSchools){
            getTopSchools()
        }
    },[topSchools, getTopSchools])

    
    return(
        <div className='page-container landing-page'>
            <div className="container footer-adjust">
                <header className="flex">
                    <div className="margin-auto">
                        <h1>Review Dosen Anda Sekarang</h1>
                        {!props.isMobile && 
                        <React.Fragment>
                            <SearchBox school={school}/>
                            {props.topSchools && 
                            <div className="flex">
                                <h3 style={{fontWeight:'normal', fontSize:"24px"}}><span>Pencarian Populer:</span> <Button style={{color: "white"}} className="text-button" onClick={() => setSchool(topSchools[0])}>{topSchools[0]},</Button><Button style={{color: "white"}} className="text-button" onClick={() => setSchool(topSchools[1])}>{topSchools[1]}</Button></h3>
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
                <div className="row justify-content-center" style={{height:"50vh"}}>
                    <div className="col-lg-8 margin-auto">
                        {/* <img src={newestReview} alt={"newestReview"} style={{width:"100%"}}/> */}
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
        topSchools: state.topSchools
    }
}
export default connect(mapStateToProps,{getTopSchools})(Landing);