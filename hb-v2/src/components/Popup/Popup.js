import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import {connect} from "react-redux";

function Popup(props){
    const [open, setOpen] = React.useState(false);
    const ContentComponent = props.content
    const Trigger = props.trigger.component
    
    const openPopup = () =>{
        setOpen(true)
    }
    return(
        <div>
            <Trigger className={props.trigger.className} onClick={openPopup} onChange={openPopup} style={props.trigger.style} id={props.trigger.id}>{props.purpose}</Trigger>
            <Dialog open={open} onClose={() => setOpen(false)} style={{padding:0}}>
                <DialogContent style={{padding:'0'}}> 
                    <ContentComponent closePopup={() => setOpen(false)}/>
                </DialogContent>
            </Dialog>
        </div>
    )   
}

export default connect()(Popup)