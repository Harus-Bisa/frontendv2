import React from "react";
import { connect } from "react-redux";
import { findReviewees, sortReviewees } from "../../redux/actions";
import { useLocation, Link } from "react-router-dom";
import { Divider, RadioGroup, Radio, FormControlLabel, withStyles, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
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
    const [sortBy, setSortBy] = React.useState(NAME)

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
                                {revieweeName ? <span className="blue">{revieweeName}</span> : <span>Dosen</span>} {revieweeSchool  && <span>di <span className="blue">{revieweeSchool}</span></span>}
                            </h2>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="col-lg-3">
                        {!props.isMobile && 
                        <React.Fragment>
                            <h4>Urutkan berdasarkan</h4>
                            <RadioGroup aria-label="sortBy" name="sortBy" value={sortBy} onChange={handleChange}>
                                <FormControlLabel style={{marginBottom:0}} value={NAME} control={<BlueRadio/>} label="Nama"/>
                                <FormControlLabel style={{marginBottom:0}} value={POPULARITY} control={<BlueRadio/>} label="Paling Populer" />
                                <FormControlLabel style={{marginBottom:0}} value={RATING} control={<BlueRadio/>} label="Penilaian Tertinggi" />
                            </RadioGroup>
                        </React.Fragment>
                        }
                        {props.isMobile && 
                        <FormControl style={{margin:'0 0 15px 0', width:'100%'}}>
                            <InputLabel>Urutkan berdasarkan</InputLabel>
                            <Select fullWidth value={sortBy} onChange={handleChange}>
                                <MenuItem value={NAME}>Nama</MenuItem>
                                <MenuItem value={POPULARITY}>Paling Populer</MenuItem>
                                <MenuItem value={RATING}>Penilaian Tertinggi</MenuItem>
                            </Select>
                        </FormControl>
                        }
                    </div>
                    <Divider orientation={"vertical"}/>
                    <div className="col-lg-8">
                        <div className="row justify-content-end">
                            <div className="col-lg-12">
                                {props.loading && <p>Loading...</p>}
                                {renderQueryResults()}
                                {props.found === false && 
                                    <div>
                                        <p style={{fontWeight:'bold'}}>Dosen yang anda cari tidak ditemukan dalam database kami.</p>
                                        <Link to={"/review/new/"+(revieweeName ? revieweeName : "Dosen")}>Jadilah penulis pertama!</Link>
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
        loading: state.loadPageReviewees,
        found: state.found,
        isMobile: state.isMobile
    }
}
export default connect(mapStateToProps,{findReviewees, sortReviewees})(Query);