
import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/">My Games</NavigationItem>
        <NavigationItem link="/">Sign up</NavigationItem>
        <NavigationItem link="/">Log in</NavigationItem>
        {/* <NavigationItem link="/">Log out</NavigationItem> */}
    </ul>

  );


}

export default navigationItems;
