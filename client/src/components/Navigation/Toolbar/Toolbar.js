
import React from 'react';

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = ( { drawerToggleClicked, handleGoogleLogin, handleGoogleLogout, handleGoogleFailure, setMode, googleID, currPlayer } ) => {
  console.log(googleID);
  return (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems handleGoogleLogin={handleGoogleLogin}
            handleGoogleLogout={handleGoogleLogout}
            handleGoogleFailure={handleGoogleFailure}
            setMode={setMode}
            googleID={googleID}
            currPlayer={currPlayer}/>
        </nav>
    </header>

  );
};

export default toolbar;
