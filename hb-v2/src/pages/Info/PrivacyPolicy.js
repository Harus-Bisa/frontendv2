import React from "react";
import InfoTemplate from "./InfoTemplate";
import PPContent from "./content/PPContent";

export default function PrivacyPolicy(){
    return(
        <InfoTemplate
            title={"Kebijakan Privasi DosenKu"}
            content={<PPContent/>}
        />
    )
}