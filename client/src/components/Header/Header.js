import React, {Component} from 'react';
import classes from "./Header.module.css";
import {Link} from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {ic_keyboard_arrow_right} from 'react-icons-kit/md/ic_keyboard_arrow_right';
import {ic_search} from 'react-icons-kit/md/ic_search';
import Button from '../UI/Button/Button'

const Header = ( { setMode, currPlayer } ) => {
        if (currPlayer === null) {
          return (
            <div className={classes.Header}>
                <div className={classes.Content}>
                    <h1 className={classes.Title}>Run It Back</h1>
                    <h2 className={classes.Subtitle}>BALL EVERYWHERE. PLAY ANYTIME.</h2>
                    <h3 className={classes.Subtitle}>Sign-in Above to Access Games on this Website!</h3>
                </div>
            </div>



          );

        }
        return (
            <div className={classes.Header}>
                <div className={classes.Content}>
                    <h1 className={classes.Title}>Run It Back</h1>
                    <h2 className={classes.Subtitle}>BALL EVERYWHERE. PLAY ANYTIME.</h2>
                    <Button className={classes.Button} purpose={setMode} name="Create Games">
                        Create Games
                        <Icon className={classes.Icon} icon={ic_keyboard_arrow_right} size={37}/>
                    </Button>
                    <Button className={classes.Button} purpose={setMode} name="Search Games">
                        Search Games
                        <Icon className={classes.Icon} icon={ic_search} size={37}/>
                    </Button>
                </div>
            </div>
        );
}

export default Header;
