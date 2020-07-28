import React from "react";
import styled from "styled-components";
import { Row, Col, Button, Container } from "reactstrap";
import LocalGameMap from "./LocalGameMap"
import classes from "./PersonPage.module.css";

const Welcome = styled.h3`
  text-align: center;
  padding: 1rem;
  background-color: #fff000;
  color: red;
`;

const Labels = styled.label`
  text-align: center;
  padding: 10rem;
  color: black;
`;

const Statistic = styled.input`
  text-align: center;
`;

function PrimLocationReader(location) {
  if (location.includes(',')) {
    return true;
  }
  else {
    return false;
  }
}

function BirthdayReader(bdayString) {
  if (bdayString.length === 10) {
    if (!isNaN(bdayString.charAt(0)) && !isNaN(bdayString.charAt(1)) && !isNaN(bdayString.charAt(3)) && !isNaN(bdayString.charAt(4)) && !isNaN(bdayString.substring(6)) && bdayString[2] === '/' && bdayString[5] === '/') {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}

function VerifyInput(objectUncheck) {
  if (objectUncheck.primaryPos < 1 || objectUncheck.primaryPos > 5) {
    return false;
  }
  else if (objectUncheck.height > 90 || objectUncheck.height < 40) {
    return false;
  }
  else if (objectUncheck.weight > 450 || objectUncheck.weight < 50) {
    return false;
  }
  else if (!BirthdayReader(objectUncheck.birthday)) {
    return false;
  }
  else if (objectUncheck.latitude === 0 && objectUncheck.longitude === 0) {
    return false;
  }

  return true;



}

const PersonPage = ( { currPlayer, handleEditReturn } ) => {
  const [newheight, setNewHeight] = React.useState(currPlayer.height ? currPlayer.height.toString() : "");
  const [newweight, setNewWeight] = React.useState(currPlayer.height ? currPlayer.weight.toString() : "");
  const [newbirthday, setNewBirthday] = React.useState(currPlayer.birthday ? currPlayer.birthday : "");
  const [newposition, setNewPosition] = React.useState(currPlayer.primaryPos ? currPlayer.primaryPos.toString() : "");
  const [newlatitude, setNewLatitude] = React.useState(currPlayer.latitude ? currPlayer.latitude : 0);
  const [newlongitude, setNewLongitude] = React.useState(currPlayer.longitude ? currPlayer.longitude : 0);

  console.log(newlatitude);
  console.log(newlongitude);
  console.log(typeof(newlongitude));

  const constructNewPerson = () => ({
      name: currPlayer.name,
      googleId: currPlayer.googleId,
      primaryPos: parseInt(newposition, 10),
      height: parseInt(newheight, 10),
      weight: parseInt(newweight, 10),
      birthday: newbirthday,
      longitude: newlongitude,
      latitude: newlatitude,
      loggedIn: true,
      isAdmin: false,
      currGameID: 0
    });

  const saveButton = (
    <Button onClick={() => {
      const newVal = constructNewPerson();
      const checkedObj = VerifyInput(newVal);
      if (checkedObj) {
        handleEditReturn(newVal);
      }
      else {
        alert("Invalid input! Please try again");
      }
    }}>Save Changes</Button>
  );

  const cancelButton = (
    <Button onClick={() => {
      handleEditReturn()
    }}>Cancel Changes</Button>
  );

  return (
    <div className={classes.PersonPage}>
        <Container>
          <Row>
            <h3 className={classes.Welcome}>{currPlayer.name}'s Profile</h3>
          </Row>
          <Row>
            <h3 className={classes.Labels}>Height (in inches): </h3>
            <div className={classes.Body}>
              <div className={classes.Form}>
                <input className={classes.Statistic} value={newheight} onChange={event => setNewHeight(event.target.value)}></input>
              </div>
            </div>
          </Row>
          <Row>
          <h3 className={classes.Labels}>Weight (in pounds): </h3>
          <div className={classes.Body}>
            <div className={classes.Form}>
              <input className={classes.Statistic} value={newweight} onChange={event => setNewWeight(event.target.value)}></input>
            </div>
          </div>
          </Row>
          <Row>
            <h3 className={classes.Labels}>Birthday (MM/DD/YYYY): </h3>
            <div className={classes.Body}>
              <div className={classes.Form}>
                <input className={classes.Statistic} value={newbirthday} onChange={event => setNewBirthday(event.target.value)}></input>
              </div>
            </div>
          </Row>
          <Row>
            <h3 className={classes.Labels}>Position (1- PG, 2- SG, ...): </h3>
            <div className={classes.Body}>
              <div className={classes.Form}>
                <input className={classes.Statistic} value={newposition} onChange={event => setNewPosition(event.target.value)}></input>
              </div>
            </div>
          </Row>
          <Row>
            <h3 className={classes.Labels}>Select Location on Map: </h3>
            <LocalGameMap currPlayer={currPlayer} setNewLatitude={setNewLatitude} setNewLongitude={setNewLongitude}></LocalGameMap>
          </Row>
          <div style={{top: '85%', left: '42.5%', position: 'absolute' }}>
              {saveButton}
              {cancelButton}
          </div>
        </Container>


    </div>


  );


}

export default PersonPage;
