import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Landing from './pages/Landing/Landing';

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Landing}/>
        </Switch>
    )
}

export default withRouter(Routes);