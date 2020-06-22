import React from "react";
import InfoTemplate from "./InfoTemplate";
import CGContent from "./content/CGContent";

export default function CommunityGuidelines(){
    return(
        <InfoTemplate
            title={"Pengaturan Konten DosenKu"}
            content={<CGContent/>}
        />
    )
}