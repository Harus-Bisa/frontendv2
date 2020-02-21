import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import { connect } from "react-redux";
import "../../css/landingPage.css";
import Footer from "../../components/Footer/Footer";
import newestReview from "../../img/newestreviewimg.png";
import Popup from "../../components/Popup/Popup";
import { Person, School, KeyboardArrowDown } from "@material-ui/icons";
import { TextField, Button } from "@material-ui/core";

function Landing(props){
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
    return(
        <div className='page-container landing-page'>
            <div className="container footer-adjust">
                <header className="flex">
                    <div className="margin-auto">
                        <h1>Review Dosen Anda Sekarang</h1>
                        {!props.isMobile && <SearchBox/>}
                        {props.isMobile &&
                            <Popup
                                trigger={{
                                    component:DummyMobileSearchBox
                                }}
                                content={SearchBox}
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
        isMobile: state.isMobile
    }
}
export default connect(mapStateToProps)(Landing);