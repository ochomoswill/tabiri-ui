import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./Home/index"
import Browse from "./Browse/index"

const App = ({match}) => (
  <div>
    <Switch>
      <Redirect exact={true} from={`${match.url}`} to={`${match.url}home`}/>
        <Route path={`${match.url}home`} component={Home}/>
        <Route path={`${match.url}browse`} component={Browse}/>
        {/*<Route path={`${match.url}counties:code`} component={CountyLevel}/>*/}
    </Switch>
  </div>
);

export default App;
