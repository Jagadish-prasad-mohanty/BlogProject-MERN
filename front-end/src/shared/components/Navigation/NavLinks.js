import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import './NavLinks.css';
import { logOutHandler } from '../../store/actions/auth-action';

const NavLinks = props => {
  const token=useSelector(state=>state.auth.currentToken);
  const userId=useSelector(state=>state.auth.currentUserId);
  const dispatch=useDispatch();
  const history= useHistory();
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {token && <li>
      <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
    </li>}
    {token && <li>
      <NavLink to="/places/new">ADD PLACE</NavLink>
    </li>}
    {!token && <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>}
    {token && <li>
      <button onClick={()=>{
        dispatch(logOutHandler());
        history.push("/auth")
        }}>LOG OUT</button>
    </li>}
  </ul>
};

export default NavLinks;