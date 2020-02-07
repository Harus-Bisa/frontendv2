import React from "react";
import { connect } from "react-redux";
import { findReviewees } from "../../redux/actions";

function Query(props){
    const revieweeName = props.match.params.name;
    const revieweeSchool = props.match.params.school;
    React.useEffect(() =>{
        props.findReviewees(revieweeName)
    },[])

    const renderQueryResults = () =>{
        var queryResultsComponent = []
        props.reviewees.forEach(r =>{
            queryResultsComponent.push(
                <div key={r.revieweeId}>
                    <a href={"/review/"+r.revieweeId}>{r.name}</a>
                    <p>{r.school}</p>
                </div>
            )
        })
        return queryResultsComponent
    }
    return(
        <div className="page-container">
            <div className="container">
                <header>
                    <h2>Hasil pencarian anda untuk:</h2>
                    <p>Nama dosen: {revieweeName}</p>
                    <p>Universitas/Perguruan Tinggi: {revieweeSchool}</p>
                </header>
                {props.loading && <p>Loading...</p>}
                <div>
                    {renderQueryResults()}
                </div>
                {props.found === false && 
                    <div style={{marginTop:'1.5rem'}}>
                        <p>Tidak ada dosen dengan nama dan di sekolah itu.</p>
                        <p>Silahkan mulai menulis dan <a href={"/review/new/"+revieweeName}>jadilah penulis pertama!</a></p>
                    </div>
                }   
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        reviewees: state.reviewees,
        loading: state.loadReviewees,
        found: state.found
    }
}
export default connect(mapStateToProps,{findReviewees})(Query);