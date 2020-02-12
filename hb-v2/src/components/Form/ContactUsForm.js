import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

function ContactUsForm(props){
    var [email, setEmail] = React.useState(props.user ? props.user.email : "")
    var [subject, setSubject] = React.useState("")
    var [description, setDescription] = React.useState("")

    const submit = () =>{

    }
    return(
        <div className="container content">
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>Email Anda<span className="red">*</span></Label>
                    <Input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Subjek<span className="red">*</span></Label>
                    <Input 
                        type="text" 
                        id="subject" 
                        value={subject} 
                        onChange={(event) => setSubject(event.target.value)} 
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Deskripsi<span className="red">*</span></Label>
                    <Input 
                        type="textarea" 
                        id="description" 
                        value={description} 
                        onChange={(event) => setDescription(event.target.value)} 
                        required
                    />
                    <p>Silakan masukkan detail permintaan Anda. Tim pendukung kami akan merespons secepatnya.</p>
                </FormGroup>
                <FormGroup className="flex">
                    <Button className="margin-auto contrast-button button" type="submit">Kirim Pesan</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(ContactUsForm);