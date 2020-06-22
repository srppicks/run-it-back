import React from "react";
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
  const [location, setLocation] = React.useState(null);
  const [playersNeeded, setPlayersNeeded] = React.useState(0);
  const [playersIn, setPlayersIn] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

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
      </Container>
    </div>
  );



};

export default GameCreator;
