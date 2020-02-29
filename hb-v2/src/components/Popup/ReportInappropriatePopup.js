import React from "react";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import ReportInappropriateForm from "../Form/ReportInappropriateForm";
import { Link } from "react-router-dom";

export default function ReportInappropriatePopup(props){
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        <div>
            <div className="content" style={{ marginBottom:'-15px'}}>
                <h3>Baca sebelum laporkan</h3>
                <p>Silakan merujuk pada <Link to="/info/communityguidelines">Peraturan Konten</Link> dan <Link to="/info/termsandconditions">Syarat dan Ketentuan</Link> kami dan beri tahu kami mengapa menurut Anda konten yang Anda laporkan melanggar pedoman ini:</p>
            </div>
            <div>
                <div className="content" style={{paddingBottom:0}}>
                    <h4>Apa Permasalahannya?</h4>
                </div>
                <div>
                    <ExpansionPanel id="inaccurate-content" expanded={expanded === 'inaccurate-content'} onChange={handleChange('inaccurate-content')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten yang ada tidak tepat</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="content">
                            <ReportInappropriateForm reviewId={props.reviewId} closePopup={props.closePopup} type="inaccurate" />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel id="irrelevant-content" expanded={expanded === 'irrelevant-content'} onChange={handleChange('irrelevant-content')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten yang ada tidak relevan</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="content">
                            <ReportInappropriateForm reviewId={props.reviewId} closePopup={props.closePopup} type="irrelevant"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel id="inconsistent-content" expanded={expanded === 'inconsistent-content'} onChange={handleChange('inconsistent-content')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten yang ada tidak konsisten</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="content">
                            <ReportInappropriateForm reviewId={props.reviewId} closePopup={props.closePopup} type="inconsistent"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>  
                    <ExpansionPanel id="foulLanguage-content" expanded={expanded === 'foulLanguage-content'} onChange={handleChange('foulLanguage-content')}>  
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten terdapat bahasa yang kasar, ungkapan kebencian, prasangka, ancaman, atau hinaan pribadi.</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="content">
                            <ReportInappropriateForm reviewId={props.reviewId} closePopup={props.closePopup} type="foulLanguage"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>                
            </div>
        </div>
    )
}