import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/:userId/places" exact>
          <NewPlace />
        </Route>
        <Redirect to="/"/>
      </Switch>
    </>
  );
}

export default App;
