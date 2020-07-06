import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Button, Container } from "reactstrap";

const Welcome = styled.h3`
  text-align: center;
  padding: 1rem;
  background-color: #fff000;
  color: red;
`;

const Question = styled.input`
  text-align: center;
`;


const GameCreator = ( { currPlayer } ) => {
  const [location, setLocation] = React.useState("");
  const [areas, setAreas] = React.useState([]);
  const [playersNeeded, setPlayersNeeded] = React.useState(0);
  const [playersIn, setPlayersIn] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [ampm, setAMPM] = React.useState("PM");
  const [timezone, setTimeZone] = React.useState("EST");

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
      fetchAreas();
    }, []);

  const htmlArray = [];
  areas.forEach((area) => {
    if (area.currGameId === 0) {
      htmlArray.push(<option key={area.name} value={area.name}>{area.name}</option>)
    }
    else {
        htmlArray.push(<option key={area.name} value={area.name}>{area.name} (currently filled)</option>)
    }
  });

  return (
    <div>
      <Container>
        <Row>
          <Welcome>Details for game created by {currPlayer.name}</Welcome>
        </Row>
        <Row>
          <Col>
            <label>Game Type: </label>
          </Col>
          <Col>
            <select value={playersNeeded} onChange={(event) => setPlayersNeeded(parseInt(event.target.value,10))}>
              <option key="5on5" value={10}>5 vs. 5</option>
              <option key="4on4" value={8}>4 vs. 4</option>
              <option key="3on3" value={6}>3 vs. 3</option>
              <option key="2on2" value={4}>2 vs. 2</option>
              <option key="1on1" value={2}>1 vs. 1</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Players Already In (Assure this number is less than the amount fitting into the game type!): </label>
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Select location of game: </label>
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Give a date for the game: </label>
          </Col>
          <Col>
            <Question value={date} onChange={event => setDate(event.target.value)}></Question>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Select a time: </label>
          </Col>
          <Col>
            <Question value={time} onChange={event => setTime(event.target.value)}></Question>
          </Col>
          <Col>
            <select value={ampm} onChange={(event) => setAMPM(parseInt(event.target.value,10))}>
              <option key="AM" value={"AM"}>AM</option>
              <option key="PM" value={"PM"}>PM</option>
            </select>
            <select value={timezone} onChange={(event) => setTimeZone(event.target.value)}>
              <option key="EST" value={"AM"}>EST</option>
              <option key="CT" value={"CT"}>CT</option>
              <option key="MT" value={"MT"}>MT</option>
              <option key="PST" value={"PST"}>PST</option>
            </select>
          </Col>
        </Row>
      </Container>
    </div>
  );



};

export default GameCreator;
