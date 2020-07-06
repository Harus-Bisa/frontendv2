import React from "react";
import { connect } from "react-redux";
import { findReviewees, sortReviewees, clearReviewees } from "../../redux/actions";
import { useLocation, Link } from "react-router-dom";
import { Divider, RadioGroup, Radio, FormControlLabel, withStyles, Select, MenuItem, InputLabel, FormControl, Button } from "@material-ui/core";
import RevieweeCard from "../../components/Card/RevieweeCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import Pagination from "@material-ui/lab/Pagination";


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

export const POPULARITY = "totalReviews";
export const RATING = "overallRating";
export const NAME = "name";
export const SCHOOL = "school";

function Query(props){
    const [sortBy, setSortBy] = React.useState(NAME)
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [maxPage, setMaxPage] = React.useState(1)

    const handleChange = (event) =>{
        // changePagination(1)
        let sort = event.target.value;
        let isAscending = true;
        if(sort === POPULARITY || sort === RATING){
            isAscending = false;
        }
        setSortBy(sort)
        findReviewees(revieweeName, revieweeSchool, "page", 0, limit, sort, isAscending)
    }
    let query = useQuery();
    const revieweeName = query.get('name');
    const revieweeSchool = query.get('school');
    const {findReviewees, clearReviewees, totalReviewees} = props

    React.useEffect(() =>{
        findReviewees(revieweeName, revieweeSchool, "page", 0, 10)
        setMaxPage(Math.ceil(totalReviewees/10) !== 0 ? Math.ceil(totalReviewees/10) : 1);
        return () =>{
            clearReviewees()
        }
    },[findReviewees, revieweeName, revieweeSchool, clearReviewees, totalReviewees])

    const renderQueryResults = () =>{
        var queryResultsComponent = []
        props.reviewees.forEach(r =>{
            queryResultsComponent.push(
                <RevieweeCard reviewee={r} key={r.revieweeId}/>
            )
        })
        return queryResultsComponent
    }

    const changePagination = (i) =>{
        setPage(i)
        var startIndex = (i-1)*10
        findReviewees(revieweeName, revieweeSchool, "page", startIndex, 10)
        setSortBy(NAME)
    }
    const loadMore = () =>{
        setLimit(limit+10)
        findReviewees(revieweeName, revieweeSchool, "page", 0, limit+10)
    }
    const renderPagination = () =>{
        let pagination = [];
        for(let i=1; i<maxPage+1; i++){
            pagination.push(
                <PaginationItem active={i === page} key={i}>
                    <PaginationLink onClick={() => changePagination(i)}>
                    {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }
        return pagination;
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
                            <p style={{fontStyle:'italic'}}>{props.totalReviewees} Hasil pencarian untuk</p>
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
                                <FormControlLabel style={{marginBottom:0}} value={NAME} control={<BlueRadio/>} label="Nama Dosen"/>
                                <FormControlLabel style={{marginBottom:0}} value={SCHOOL} control={<BlueRadio/>} label="Nama Sekolah"/>
                                <FormControlLabel style={{marginBottom:0}} value={POPULARITY} control={<BlueRadio/>} label="Paling Populer" />
                                <FormControlLabel style={{marginBottom:0}} value={RATING} control={<BlueRadio/>} label="Penilaian Tertinggi" />
                            </RadioGroup>
                        </React.Fragment>
                        }
                        {props.isMobile && 
                        <FormControl style={{margin:'0 0 15px 0', width:'100%'}}>
                            <InputLabel>Urutkan berdasarkan</InputLabel>
                            <Select fullWidth value={sortBy} onChange={handleChange}>
                                <MenuItem value={NAME}>Nama Dosen</MenuItem>
                                <MenuItem value={SCHOOL}>Nama Sekolah</MenuItem>
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
                                {!props.loading && renderQueryResults()}
                                {(props.found === false || props.reviewees.length === 0) && !props.loading && 
                                    <div>
                                        <p style={{fontWeight:'bold'}}>Dosen yang anda cari tidak ditemukan dalam database kami.</p>
                                        <Link to={"/review/new/"+(revieweeName ? revieweeName : "Dosen")}>Jadilah penulis pertama!</Link>
                                    </div>
                                } 
                                {props.found === true && !props.isMobile &&
                                <div style={{display:'flex', justifyContent:'center', paddingTop:'2rem'}}>
                                    <Pagination>
                                        <PaginationItem disabled={page === 1}>
                                            <PaginationLink previous onClick={() => changePagination(page-1)}/>
                                        </PaginationItem>
                                        {renderPagination()}
                                        <PaginationItem disabled={page === maxPage}>
                                            <PaginationLink
                                                onClick={() => changePagination(page+1)}
                                                next
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                                }
                                {props.found === true && props.isMobile && props.reviewees.length !== totalReviewees &&
                                    <Button onClick={loadMore} fullWidth>More results</Button>
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
        totalReviewees: state.totalReviewees,
        loading: state.loadPageReviewees,
        found: state.found,
        isMobile: state.isMobile
    }
}
export default connect(mapStateToProps,{findReviewees, sortReviewees, clearReviewees})(Query);