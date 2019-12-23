import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Review from './pages/Review/Review';
import ReviewForm from './components/Form/ReviewForm';

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/review/:revieweeId/add" component={ReviewForm}/>
            <Route exact path="/review/:revieweeId" component={Review}/>
        </Switch>
    )
}

export default withRouter(Routes);