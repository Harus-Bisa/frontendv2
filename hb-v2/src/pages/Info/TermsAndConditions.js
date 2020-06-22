import React from "react";
import InfoTemplate from "./InfoTemplate";
import TCContent from "./content/TCContent";

export default function TermsAndConditions(){
    return(
        <InfoTemplate
            title={"Syarat & Ketentuan DosenKu"}
            content={<TCContent/>}
        />
    )
}