import React from "react";
import { connect } from "react-redux";
import { findReviewees, sortReviewees } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import { Divider, RadioGroup, Radio, FormControlLabel, withStyles } from "@material-ui/core";
import RevieweeCard from "../../components/Card/RevieweeCard";
import SearchBox from "../../components/SearchBox/SearchBox";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const BlueRadio = withStyles({
    root: {
      color: "#39A3FF",
      '&$checked': {
        color: "#39A3FF",
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

export const POPULARITY = "POPULARITY";
export const RATING = "RATING";
export const NAME = "NAME";

function Query(props){
    const [sortBy, setSortBy] = React.useState(POPULARITY)

    const handleChange = (event) =>{
        setSortBy(event.target.value)
        props.sortReviewees(event.target.value)
    }
    let query = useQuery();
    const revieweeName = query.get('name');
    const revieweeSchool = query.get('school');
    const findReviewees = props.findReviewees

    React.useEffect(() =>{
        findReviewees(revieweeName, revieweeSchool, "page")
    },[findReviewees, revieweeName, revieweeSchool])

    const renderQueryResults = () =>{
        var queryResultsComponent = []
        props.reviewees.forEach(r =>{
            queryResultsComponent.push(
                <RevieweeCard reviewee={r} key={r.revieweeId}/>
            )
        })
        return queryResultsComponent
    }
    return(
        <div className="page-container flex">
            <div className="container" style={{padding:'1rem 0rem'}}>
                <div className="row justify-content-center no-gutters">
                    <div className="col-lg-10 col">
                        <SearchBox/>
                    </div>
                </div> 
            </div>
            <div className="page-header">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col">
                            <p style={{fontStyle:'italic'}}>{props.reviewees.length} Hasil pencarian untuk</p>
                            <h2>
                                {revieweeName ? <span className="blue">revieweeName</span> : <span>Dosen</span>} {revieweeSchool  && <span>di <span className="blue">{revieweeSchool}</span></span>}
                            </h2>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="col-lg-3">
                        <h4>Urutkan berdasarkan</h4>
                        <RadioGroup aria-label="sortBy" name="sortBy" value={sortBy} onChange={handleChange}>
                            <FormControlLabel value={POPULARITY} control={<BlueRadio/>} label="Paling Populer" />
                            <FormControlLabel value={RATING} control={<BlueRadio/>} label="Penilaian Tertinggi" />
                            <FormControlLabel value={NAME} control={<BlueRadio/>} label="Nama"/>
                        </RadioGroup>
                    </div>
                    <Divider orientation={"vertical"}/>
                    <div className="col-lg-8">
                        <div className="row justify-content-end">
                            <div className="col-lg-12">
                                {renderQueryResults()}
                                {props.found === false && 
                                    <div>
                                        <p style={{fontWeight:'bold'}}>Dosen yang anda cari tidak ditemukan dalam database kami.</p>
                                        <a href={"/review/new/"+revieweeName}>Jadilah penulis pertama!</a>
                                    </div>
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        reviewees: state.pageReviewees,
        loading: state.loadReviewees,
        found: state.found
    }
}
export default connect(mapStateToProps,{findReviewees, sortReviewees})(Query);