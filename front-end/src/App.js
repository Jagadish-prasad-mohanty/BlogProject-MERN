import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
// import Footer from './shared/components/UIElements/Footer';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Authnticate from './user/pages/Authnticate';

const App = () => {
  const userId=useSelector(state=>state.auth.currentUserId);
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          {userId &&<Route path="/places/new" >
            <NewPlace />
          </Route>}
          {userId &&<Route path="/places/:placeId" >
            <UpdatePlace/>
          </Route>}
          <Route path="/:userId/places">
            <UserPlaces/>
          </Route>
          {!userId && <Route path="/auth">
            <Authnticate/>
          </Route>}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
