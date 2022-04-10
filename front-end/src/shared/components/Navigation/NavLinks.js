import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import './NavLinks.css';
import { logOutHandler } from '../../store/actions/auth-action';

const NavLinks = props => {
  const userId=useSelector(state=>state.auth.currentUserId);
  const dispatch=useDispatch();
  const history= useHistory();
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {userId && <li>
      <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
    </li>}
    {userId && <li>
      <NavLink to="/places/new">ADD PLACE</NavLink>
    </li>}
    {!userId && <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>}
    {userId && <li>
      <button onClick={()=>{
        dispatch(logOutHandler());
        history.push("/auth")
        }}>LOG OUT</button>
    </li>}
  </ul>
};

export default NavLinks;