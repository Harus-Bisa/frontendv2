import React from "react";
import { connect } from "react-redux";
import { findReviewees } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import { Divider } from "@material-ui/core";
import RevieweeCard from "../../components/Card/RevieweeCard";
import SearchBox from "../../components/SearchBox/SearchBox";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function Query(props){
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
                                <span className="blue">{revieweeName}</span> {revieweeSchool  && <span>di <span className="blue">{revieweeSchool}</span></span>}
                            </h2>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="col-lg-3 d-none d-lg-block">
                        <h4>Urutkan berdasarkan</h4>
                    </div>
                    <Divider orientation={"vertical"}/>
                    <div className="col-lg-8">
                        <div className="row justify-content-end">
                            <div className="col-lg-12">
                                {renderQueryResults()}
                                {props.found === false && 
                                    <div>
                                        <p>Tidak ada dosen dengan nama dan di sekolah itu.</p>
                                        <p>Silahkan mulai menulis dan <a href={"/review/new/"+revieweeName}>jadilah penulis pertama!</a></p>
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
export default connect(mapStateToProps,{findReviewees})(Query);