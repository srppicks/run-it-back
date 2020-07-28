import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Button, Container } from "reactstrap";
import classes from "./GameCreator.module.css";

function FindId(location, areas) {
  let place = null;
  areas.forEach((area) => {
    if (area.name === location) {
      place = area;
    }
  });

  return place.id;

}

function HoldingGame(location, games) {
  let inGame = false
  if (games === null) {
    return inGame;
  }
  else {
    games.forEach((game) => {
      console.log(game);
      if (game.locationId === location.id) {
        inGame = true;
      }

    });

    return inGame;
  }



}

const GameCreator = ( { currPlayer, handleGameCreate } ) => {
  const [location, setLocation] = React.useState("Lakewood Gulch");
  const [areas, setAreas] = React.useState([]);
  const [currGames, setGames] = React.useState([]);
  const [playersNeeded, setPlayersNeeded] = React.useState(0);
  const [playersIn, setPlayersIn] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [ampm, setAMPM] = React.useState("PM");
  const [timezone, setTimeZone] = React.useState("EST");

  const constructNewGame = () => ({
    locationId: FindId(location, areas),
    ownerId: currPlayer.id,
    playersNeeded: playersNeeded,
    playersIn: playersIn,
    startDate: date,
    startTime: time,
    aMpM: ampm,
    timeZone: timezone
  });

  useEffect(() => {
      const fetchAreas = () => {
        fetch("/api/locations")
          .then(response => {
            if (!response.ok) {
            //alert("E");
            throw new Error(response.status_text);
          }
          //          alert("T");
            return response.json();
        })
          .then(data => {
            console.log(data);

            setAreas(data);
          })
          .catch(err => console.log(err)); // eslint-disable-line no-console
      };
      const fetchGames = () => {
        fetch("/api/games")
          .then(response => {
            if (!response.ok) {
            //alert("E");
            throw new Error(response.status_text);
          }
          //          alert("T");
            return response.json();
        })
          .then(data => {
            console.log(data);

            setGames(data);
          })
          .catch(err => console.log(err)); // eslint-disable-line no-console
      };
      fetchAreas();
      fetchGames();
    }, []);

  const submitButton = (
    <Button onClick={() => {
      const newVal = constructNewGame();
      handleGameCreate(newVal);
    }}>Process Game</Button>
  );
  const cancelButton = (
    <Button onClick={() => {
      handleGameCreate();
    }}>Cancel</Button>
  );

  const htmlArray = [];
  areas.forEach((area) => {
    if (!HoldingGame(area, currGames)) {
      htmlArray.push(<option key={area.name} value={area.name}>{area.name}</option>)
    }
    else {
        htmlArray.push(<option key={area.name} value={area.name}>{area.name} (currently filled)</option>)
    }
  });

  return (
    <div className={classes.GameCreator}>
      <Container>
        <Row>
          <h3 className={classes.Welcome}>Details for game created by {currPlayer.name}</h3>
        </Row>
        <Row>
          <Col>
            <h3 className={classes.Label}>Game Type: </h3>
          </Col>
          <Col>
            <div className={classes.Body}>
              <div className={classes.Form}>
                  <select value={playersNeeded} onChange={(event) => setPlayersNeeded(parseInt(event.target.value,10))}>
                    <option key="5on5" value={10}>5 vs. 5</option>
                    <option key="4on4" value={8}>4 vs. 4</option>
                    <option key="3on3" value={6}>3 vs. 3</option>
                    <option key="2on2" value={4}>2 vs. 2</option>
                    <option key="1on1" value={2}>1 vs. 1</option>
                  </select>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className={classes.Label}>Players Already In: </h3>
          </Col>
          <Col>
            <div className={classes.Body}>
              <div className={classes.Form}>
                <select value={playersIn} onChange={(event) => setPlayersIn(parseInt(event.target.value,10))}>
                  <option key="1" value={1}>1</option>
                  <option key="2" value={2}>2</option>
                  <option key="3" value={3}>3</option>
                  <option key="4" value={4}>4</option>
                  <option key="5" value={5}>5</option>
                  <option key="6" value={6}>6</option>
                  <option key="7" value={7}>7</option>
                  <option key="8" value={8}>8</option>
                  <option key="9" value={9}>9</option>
                  <option key="10" value={10}>10</option>
                </select>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className={classes.Label}>Select location of game: </h3>
          </Col>
          <Col>
            <div className={classes.Body}>
              <div className={classes.Form}>
                <select value={location} onChange={(event) => {
                  console.log(typeof(event.target.value));
                  if (event.target.value.indexOf("currently filled") !== -1) {
                    alert("Location is taken. Please select another area or add your own!");
                  }
                  else {
                    setLocation(event.target.value);
                  }
                }}>
                  {htmlArray}
                </select>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className={classes.Label}>Give a date for the game (MM/DD/YYYY): </h3>
          </Col>
          <Col>
            <div className={classes.Body}>
              <div className={classes.Form}>
                <input className={classes.Question} value={date} onChange={event => setDate(event.target.value)}></input>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <h3 className={classes.Label}>Select a time (HH:MM): </h3>
          <div className={classes.Body}>
            <div className={classes.Form}>
                <input className={classes.Question} onChange={event => setTime(event.target.value)}></input>
            </div>
          </div>
          <div className={classes.Body}>
            <div className={classes.Form}>
              <select value={ampm} onChange={(event) => setAMPM(event.target.value,10)}>
                <option key="AM" value={"AM"}>AM</option>
                <option key="PM" value={"PM"}>PM</option>
              </select>
              <select value={timezone} onChange={(event) => setTimeZone(event.target.value)}>
                <option key="EST" value={"EST"}>EST</option>
                <option key="CT" value={"CT"}>CT</option>
                <option key="MT" value={"MT"}>MT</option>
                <option key="PST" value={"PST"}>PST</option>
              </select>
            </div>
          </div>
        </Row>
      </Container>
      <div style={{top: '50%', left: '42.5%', position: 'absolute' }}>
          {submitButton}
          {cancelButton}
      </div>
    </div>
  );



};

export default GameCreator;
