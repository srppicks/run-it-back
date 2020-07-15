
import React from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( { handleGoogleLogin, handleGoogleLogout, handleGoogleFailure, setMode, googleID, currPlayer } ) => {
  console.log(googleID);
  if (currPlayer === null) {
    return (
      <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem type="Home" setMode={setMode} active>Home</NavigationItem>
            <GoogleLogin
              clientId={googleID}
              buttonText="Login with Google"
              isSignedIn
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleFailure}/>
        </ul>

      </div>


    );

  }

  return (
      <div>
        <ul className={classes.NavigationItems}>
            <NavigationItem type="Home" setMode={setMode} active>Home</NavigationItem>
            <NavigationItem type="My Profile" setMode={setMode}>My Profile</NavigationItem>
            <GoogleLogout
              clientId={googleID}
              buttonText="Logout"
              onLogoutSuccess={handleGoogleLogout}
            />
        </ul>

      </div>
  );



}

export default navigationItems;
