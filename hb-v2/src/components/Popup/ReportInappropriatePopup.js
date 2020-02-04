import React from "react";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import ReportInappropriateForm from "../Form/ReportInappropriateForm";

export default function ReportInappropriatePopup(){
    return(
        <div>
            <div className="content" style={{ marginBottom:'-15px'}}>
                <h3>Baca sebelum laporkan</h3>
                <p>Silakan merujuk pada Peraturan Konten dan Syarat dan Ketentuan kami dan beri tahu kami mengapa menurut Anda konten yang Anda laporkan melanggar pedoman ini:</p>
            </div>
            <div>
                <div className="content" style={{paddingBottom:0}}>
                    <h4>Apa Permasalahannya?</h4>
                </div>
                <div>
                    <ExpansionPanel id="inaccurate-content">
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten yang ada tidak tepat</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ReportInappropriateForm type="inaccurate"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel id="irrelevant-content">
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten yang ada tidak relevan</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ReportInappropriateForm type="irrelevant"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel id="inconsistent-content">
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten yang ada tidak konsisten</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ReportInappropriateForm type="inconsistent"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>  
                    <ExpansionPanel id="foulLanguage-content">  
                        <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                            <p>Konten terdapat bahasa yang kasar, ungkapan kebencian, prasangka, ancaman, atau hinaan pribadi.</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ReportInappropriateForm type="foulLanguage"/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>                
            </div>
        </div>
    )
}