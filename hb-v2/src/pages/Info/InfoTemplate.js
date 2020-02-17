import React from "react";
import { Divider } from "@material-ui/core";
import Footer from "../../components/Footer/Footer";

export default function InfoTemplate(props){
    return(
        <div className="page-container flex">
            <div className="flex footer-adjust">
                <div className="page-header">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col">
                                <h1>{props.title}</h1>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="container content">
                    <div>
                        {props.content}
                    </div>
                    <div className="flex help-page">
                        <Divider className="divider margin-auto"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}