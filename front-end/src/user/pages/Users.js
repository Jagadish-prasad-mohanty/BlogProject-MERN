import React from 'react';
import {useSelector} from 'react-redux';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = useSelector(state=>state.auth.users);
  console.log("Users",USERS);

  return <UsersList items={USERS} />;
};

export default Users;
