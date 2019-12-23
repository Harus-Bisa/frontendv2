import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Review from './pages/Review/Review';
import ReviewForm from './components/Form/ReviewForm';
import Login from './pages/Login/Login';
import SignUp from './pages/Sign Up/SignUp';

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/review/:revieweeId/add/:overallRating" component={ReviewForm}/>
            <Route exact path="/review/new/add" component={ReviewForm}/>
            <Route exact path="/review/:revieweeId" component={Review}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
        </Switch>
    )
}

export default withRouter(Routes);