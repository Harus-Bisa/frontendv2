import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Button } from "@material-ui/core";

export default function ReportInappropriateForm(props){
    const [otherInformation, setOtherInformation] = React.useState("")
    const submit = (event) =>{
        event.preventDefault();
        const data = {
            type: props.type,
            otherInformation: otherInformation
        }
        console.log(data)
        props.closePopup();
    }
    return(
        <Form onSubmit={submit}>
            <FormGroup>
                <Label>Adakah informasi lain yang ingin Anda tambahkan untuk membantu kami memahami kekhawatiran Anda?</Label>
                <Input 
                    type="textarea" 
                    id={"otherInformation-"+props.type} 
                    value={otherInformation} 
                    placeholder="Opsional"
                    onChange={(event) => setOtherInformation(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <div className="row justify-content-between">
                    <div className="col-6">
                        <Button className="contrast-button button contrast-opposite-button" fullWidth id={"back-button-"+props.type} onClick={props.closePopup}>Kembali</Button>
                    </div>
                    <div className="col-6">
                        <Button className="contrast-button button" fullWidth id={"submit-button"+props.type} type="submit">Kirim</Button>
                    </div>
                </div>
            </FormGroup>
        </Form>
    )
}