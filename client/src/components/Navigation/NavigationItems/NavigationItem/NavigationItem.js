import React from 'react';

import classes from './NavigationItem.module.css'

const navigationItem = ( { type, setMode, active, children } ) => {
  return (
    <li className={classes.NavigationItem}
            onClick={() => setMode(type)}>
        <a
            className={active ? classes.active : null}>{children}</a>
    </li>


  );

}

export default navigationItem;
