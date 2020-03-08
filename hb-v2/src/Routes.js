import React from 'react';
import { Route, Switch, withRouter, useHistory} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Review from './pages/Review/Review';
import ReviewForm from './components/Form/ReviewForm';
import Login from './pages/Login/Login';
import SignUp from './pages/Sign Up/SignUp';
import Verification from './pages/Verification/Verification';
import Query from './pages/Query/Query';
import About from './pages/About/About';
import Help from './pages/Help/Help';
import TermsAndConditions from './pages/Info/TermsAndConditions';
import PrivacyPolicy from './pages/Info/PrivacyPolicy';
import CommunityGuidelines from './pages/Info/CommunityGuidelines';
import NotFound from './pages/NotFound/NotFound';

function Routes() {
    const history = useHistory()
    const [ locationKeys, setLocationKeys ] = React.useState([])

    React.useEffect(() => {
    return history.listen(location => {
        if (history.action === 'PUSH') {
            setLocationKeys([ location.key ])
        }

        if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
            setLocationKeys(([ _, ...keys ]) => keys)
        } else {
            setLocationKeys((keys) => [ location.key, ...keys ])
        }
        }
    })
    }, [ locationKeys, history])
    return(
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/help" component={Help}/>
            <Route exact path="/info/termsandconditions" component={TermsAndConditions}/>
            <Route exact path="/info/privacypolicy" component={PrivacyPolicy}/>
            <Route exact path="/info/communityguidelines" component={CommunityGuidelines}/>
            <Route exact path={["/review/new/:revieweeName", "/review/:revieweeId/add/:overallRating" ]}component={ReviewForm}/>
            <Route exact path="/review/:revieweeId" component={Review}/>
            <Route exact path="/query" component={Query}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/verification/:email" component={Verification}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default withRouter(Routes);