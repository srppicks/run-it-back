import React, {Component} from 'react';
import classes from "./Header.module.css";
import {Link} from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {ic_keyboard_arrow_right} from 'react-icons-kit/md/ic_keyboard_arrow_right';
import {ic_search} from 'react-icons-kit/md/ic_search';


const Header = () => {
        return (
            <div className={classes.Header}>
                <div className={classes.Content}>
                    <h1 className={classes.Title}>Run It Back</h1>
                    <h2 className={classes.Subtitle}>BALL EVERYWHERE. PLAY ANYTIME.</h2>
                    <Link className={classes.Button}>
                        Create Games
                        <Icon className={classes.Icon} icon={ic_keyboard_arrow_right} size={37}/>
                    </Link>
                    <Link className={classes.Button}>
                        Search Games
                        <Icon className={classes.Icon} icon={ic_search} size={37}/>
                    </Link>
                </div>
            </div>
        );
}

export default Header;
