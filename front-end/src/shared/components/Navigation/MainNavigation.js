import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';
import BackDrop from '../UIElements/BackDrop';

const MainNavigation = props => {
  const [drawerIsOpen,setDrawerIsOpen]=useState(false);

  const openDrawer=()=>{
    console.log("Drawer opened");
    setDrawerIsOpen(true)
  }
  const closeDrawer=()=>{
    console.log("Drawer closed");
    setDrawerIsOpen(false)
  }
  return (
    <React.Fragment>
      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks/>
        </nav>
      </SideDrawer>
      
      {drawerIsOpen && 
      <BackDrop onClick={closeDrawer}/>
      }
      
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
