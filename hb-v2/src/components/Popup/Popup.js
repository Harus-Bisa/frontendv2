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
            {Trigger && 
                <Trigger 
                    {...props}
                    className={props.trigger.className} 
                    onClick={openPopup} 
                    onChange={openPopup} 
                    // onFocus={openPopup}
                    style={props.trigger.style} 
                    id={props.trigger.id}
                >
                    {props.purpose}
                </Trigger>}
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)} 
                style={{padding:0}} 
                onBackdropClick={props.disableFlag ? props.disableFlag : () =>{}}
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={"sm"}
            >
                <DialogContent style={{padding:'0 0 2rem 0'}}> 
                    <div className="content" style={{display:'flex', justifyContent:'flex-end', marginBottom:'-30px'}}>
                        <IconButton onClick={() => {
                            setOpen(false)
                        }}>
                            <Close/>
                        </IconButton>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center no-gutters">
                            <div className="col-md-11 col-lg-10">
                                <ContentComponent 
                                    closePopup={() => setOpen(false)} 
                                    close={() =>{
                                        if(props.close){
                                            props.close();
                                        }
                                        setOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )   
}

export default connect()(Popup)