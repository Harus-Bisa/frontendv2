import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {Autocomplete} from '@material-ui/lab'
import { TextField } from "@material-ui/core";

const profs = [
    {name:'Agus Hartanto', school:'Universitas Atma Jaya', id:'1'},
    {name:'Agus C. Kristiono', school:'Universitas Maranata', id:'2'},
    {name:'Agus W. Soehadi', school:'Universitas Prasetya Mulya', id:'3'}
]
function SearchBox(props){
    var [text, setText] = React.useState("")
    var [open, setOpen] = React.useState(false)
    var [options, setOptions] = React.useState([])
    const loading = open && options.length === 0

    React.useEffect(() => {
        let active = true;
        
        if (!loading){
            return undefined;
        }

        const find = (async () => {
            const response = props.search(text);
            if(active){
                setOptions(response)
            }
        });
        
        if(text.length > 0){
            find();
        }
        else{
            setOptions([])
        }
        return () =>{
            active = false
        }
    }, [loading, text])

    React.useEffect(() => {
        if(!open){
            setOptions([])
            setText("")
        }
    }, [open]);

    React.useEffect(() => {
        if (text.length === 0){
            setOptions([])
        }
    }, [text])

    const select = (id) =>{
        props.history.push("/review/"+id)
    }
    return(
        <div className="search-box">
            <Autocomplete
                id="search-box"
                style={{width:'100%'}}
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => setOpen(false)}
                options={options}
                loading={loading}
                noOptionsText="Dosen tidak ditemukan."
                renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Cari nama dosen Anda"
                      fullWidth
                      onChange={(event) => setText(event.target.value)}
                    />
                )}
                renderOption={option => {
                    return(
                        <div onClick={() => select(option.id)} style={{width:'100%'}} id={"option-"+option.name}>
                            <p style={{fontWeight:'bold', margin:0}}>{option.name}</p>
                            <p style={{fontSize:'12px', margin:0}}>{option.school}</p>    
                        </div>
                    )
                }}
            />
        </div>
    )
}

SearchBox.defaultProps={
    search: (text) => {return profs}
}

SearchBox.propTypes={
    search: PropTypes.func
}

export default withRouter(SearchBox);