import React from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function ReportInappropriateForm(props){
    const [otherInformation, setOtherInformation] = React.useState("")
    const submit = () =>{
        const data = {
            type: props.type,
            otherInformation: otherInformation
        }
        console.log(data)
    }
    return(
        <Form onSubmit={submit}>
            <FormGroup>
                <Label>Adakah informasi lain yang ingin Anda tambahkan untuk membantu kami memahami kekhawatiran Anda?</Label>
                <Input 
                    type="textarea" 
                    id="otherInformation" 
                    value={otherInformation} 
                    placeholder="Opsional"
                    onChange={(event) => setOtherInformation(event.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Button className="contrast-button" id="back-button" onClick={() =>{}}>Kembali</Button>
                <Button className="contrast-button" id="submit-button">Kirim</Button>
            </FormGroup>
        </Form>
    )
}