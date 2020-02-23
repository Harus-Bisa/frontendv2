import React from "react"
import SearchBox from "../SearchBox/SearchBox"
import { connect } from "react-redux"
import { Button } from "@material-ui/core"
import { getTopSchools } from "../../redux/actions";

function SearchBoxPopup(props){
    const [school, setSchool] = React.useState("")

    const topSchools = props.topSchools
    const getTopSchools = props.getTopSchools

    React.useEffect(() =>{
        if(!topSchools){
            getTopSchools()
        }
    },[topSchools, getTopSchools])

    const renderTopSchools = () =>{
        var components = []
        for(let i=0; i<topSchools.length; i++){
            components.push(
                <Button 
                    key={i} 
                    fullWidth 
                    onClick={() => setSchool(topSchools[i])}
                    className="text-button"
                >
                    {topSchools[i]}
                </Button>
            )
        }
        return components;
    }
    return(
        <div className="search-box-popup">
            <SearchBox showSchool={true} {...props} school={school}/>
            <div>
                <h4>PENCARIAN TERPOPULER</h4>
                {renderTopSchools()}
            </div>
        </div>
        
    )
}

function mapStateToProps(state){
    return{
        topSchools: state.topSchools
    }
}
export default connect(mapStateToProps, {getTopSchools})(SearchBoxPopup)