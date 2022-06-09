import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
// import Footer from './shared/components/UIElements/Footer';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Authnticate from './user/pages/Authnticate';
import { logInHandler, logOutHandler } from './shared/store/actions/auth-action';
let logoutTimer;
const App = () => {
  const token=useSelector(state=>state.auth.currentToken);
  
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          {token &&<Route path="/places/new" >
            <NewPlace />
          </Route>}
          {token &&<Route path="/places/:placeId" >
            <UpdatePlace/>
          </Route>}
          <Route path="/:userId/places">
            <UserPlaces/>
          </Route>
          {!token && <Route path="/auth">
            <Authnticate/>
          </Route>}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
