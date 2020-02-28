import React from "react";
import SignUpForm from "../../components/Form/SignUpForm";
import sun from "../../img/sun.png";
import { useHistory, Link } from "react-router-dom";

export default function SignUp(){
    const history = useHistory()
    const [ locationKeys, setLocationKeys ] = React.useState([])

    React.useEffect(() => {
    return history.listen(location => {
        if (history.action === 'PUSH') {
            setLocationKeys([ location.key ])
            console.log("push")
        }

        if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
            setLocationKeys(([ _, ...keys ]) => keys)

            console.log("pop front")
        } else {
            setLocationKeys((keys) => [ location.key, ...keys ])

            console.log("pop back")

        }
        }
    })
    }, [ locationKeys, ])
    return(
        <div className="page-container container flex">
            <div className="row justify-content-center no-gutters" style={{marginTop:"auto", marginBottom:'auto'}}>
                <div className="col-lg-7" style={{textAlign:'center'}}>
                    <div className="content container">
                        <img src={sun} alt={"sign-up"} style={{marginBottom:"1.5rem"}}/>
                        <h2>Daftar Akun Gratis</h2>
                    </div>
                </div>
                <div className="col-lg-5 flex">
                    <SignUpForm className="margin-auto"/>
                    <div className="content container" style={{marginTop:'-30px', textAlign:'right'}}>
                        <p>Sudah punyai akun? <Link to="/login">Log In!</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}