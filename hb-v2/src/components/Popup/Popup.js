import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import {connect} from "react-redux";

function Popup(props){
    const [open, setOpen] = React.useState(props.auto ? props.auto : false);
    const ContentComponent = props.content
    const Trigger = props.trigger ? props.trigger.component : null
    
    const openPopup = () =>{
        setOpen(true)
    }
    return(
        <React.Fragment>
            {Trigger && <Trigger className={props.trigger.className} onClick={openPopup} onChange={openPopup} style={props.trigger.style} id={props.trigger.id}>{props.purpose}</Trigger>}
            <Dialog open={open} onClose={() => setOpen(false)} style={{padding:0}} onBackdropClick={props.disableFlag ? props.disableFlag : () =>{}}>
                <DialogContent style={{padding:'0'}}> 
                    <ContentComponent closePopup={() => setOpen(false)}/>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )   
}

export default connect()(Popup)