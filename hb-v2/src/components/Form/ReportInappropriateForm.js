import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { reportInappropriateness } from "../../redux/actions";

function ReportInappropriateForm(props){
    const [otherInformation, setOtherInformation] = React.useState("")
    const submit = async (event) =>{
        event.preventDefault();
        const report = {
            authorId:props.userId,
            reviewId:props.reviewId,
            revieweeId: props.revieweeId,
            issueType: props.type,
            additionalMessage: otherInformation
        }
        await props.reportInappropriateness(report)
        alert("Terima kasih sudah melaporkan review ini! Tim Dosen Ku akan segera menangani kasus ini.")
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
                <Button className="contrast-button button" fullWidth id={"submit-button"+props.type} type="submit">Kirim</Button>
            </FormGroup>
        </Form>
    )
}

function mapStateToProps(state){
    return{
        userId: state.user.userId,
        revieweeId: state.professor.revieweeId
    }
}
export default connect(mapStateToProps,{reportInappropriateness})(ReportInappropriateForm)