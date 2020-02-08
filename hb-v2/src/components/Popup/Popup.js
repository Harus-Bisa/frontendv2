import React from "react";
import { Dialog, DialogContent, useTheme, useMediaQuery, IconButton } from "@material-ui/core";
import {connect} from "react-redux";
import { Close } from '@material-ui/icons'

function Popup(props){
    const [open, setOpen] = React.useState(props.auto ? props.auto : false);
    const ContentComponent = props.content
    const Trigger = props.trigger ? props.trigger.component : null
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const openPopup = () =>{
        setOpen(true)
    }
    return(
        <React.Fragment>
            {Trigger && <Trigger className={props.trigger.className} onClick={openPopup} onChange={openPopup} style={props.trigger.style} id={props.trigger.id}>{props.purpose}</Trigger>}
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)} 
                style={{padding:0}} 
                onBackdropClick={props.disableFlag ? props.disableFlag : () =>{}}
                fullScreen={fullScreen}
            >
                <DialogContent style={{padding:'0'}}> 
                    <div className="content" style={{display:'flex', justifyContent:'flex-end', marginBottom:'-30px'}}>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close/>
                        </IconButton>
                    </div>
                    <ContentComponent closePopup={() => setOpen(false)}/>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )   
}

export default connect()(Popup)