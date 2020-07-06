
import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ( { children } ) => {
    const [showSideDrawer, setShowSideDrawer] = React.useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        if (showSideDrawer === false) {
          setShowSideDrawer(true);
        }
        else {
          setShowSideDrawer(false);
        }
    };
    return (
            <Fragment>
                <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {children}
                </main>
            </Fragment>
    );

};

export default Layout;
