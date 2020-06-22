import React from "react";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import content from "../../pages/Help/Content";

export default function FAQPanel(props){
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const makePanels = () =>{
        var panels = []
        for(let i=0; i<content.faqs.length; i++){
            var faq = content.faqs[i]
            var panel= (
                <ExpansionPanel expanded={expanded === 'panel'+i} onChange={handleChange('panel'+i)} key={i}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls={'panel'+i}
                    id={'panel'+i}
                    >
                        <p className="question">{faq.question}</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <p>{faq.answer}</p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
            panels.push(panel)
        }   
        return panels     
    }

    return (
        <div className="expansion-panel">
            {makePanels()}
        </div>
    );
}