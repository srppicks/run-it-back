import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";
import { Container, Button } from "reactstrap";

import { GoogleLogin, GoogleLogout } from "react-google-login";

import PersonPage from "./components/PersonPage"
import LocalGameMap from "./components/LocalGameMap"
import GameCreator from "./components/GameCreator"

const Title = styled.h1`
  text-align: center;
  padding: 1rem;
  background-color: #6c757d;
  color: white;
`;
const ButtonBar = styled.div`
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
`;

const GOOGLE_CLIENT_ID = "891271447458-2tacoegsns3ccft1b88g46t3a0kkn6ep.apps.googleusercontent.com";

const App = () => {
  const [loggedIn, setLogin] = React.useState(false);
  const [currPlayer, setPlayer] = React.useState(null);
  const [mode, setMode] = React.useState("home");

  const handleGoogleLogin = (response) => {
  fetch('/login', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${response.tokenId}`,
    },
  }).then((fetchResponse) => {
    if (!fetchResponse.ok) {
      alert('Unable to authenticate', fetchResponse.statusText);
      setLogin(false);
    } else {
      setLogin(true);
      const customer = fetch(`/api/players/${response.googleId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status_text);
          }
          return response.json();
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          console.log(error);
        });
      customer
        .then(data => {
          setPlayer(data[0]);
        }).catch(error => {
          console.log(error);
        });
    }
  });
};

  const handleGoogleFailure = response => {
    alert(response.error);
  };

  const handleGoogleLogout = () => {
    fetch("/logout", {
      method: "POST"
    }).then(fetchResponse => {
      if (!fetchResponse.ok) {
        alert("Error logging out", fetchResponse.statusText);
      }
      setLogin(false);
    });
  };

  const handleEditReturn = (player) => {
    if (player) {
      const updatedPerson = { ...currPlayer, ...player };

      fetch(`/api/players/${updatedPerson.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPerson),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((fetchedPlayer) => {
          // Create a copy of the collections, replacing the current article if this is an edit
          console.log("Here");
          console.log(fetchedPlayer);
          setPlayer(fetchedPlayer);
        })
        .catch((err) => console.error(err)); // eslint-disable-line no-console
    }

    console.log("Mode");
    setMode("home");

  };

  const loginButton = (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      isSignedIn
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleFailure}
    />
  );
  const logoutButton = (
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={handleGoogleLogout}
    />
  );

  const profileButton = (
    <Button
      onClick={() => setMode("profile")}>
      Profile
      </Button>

  );

  const mapButton = (
    <Button
      onClick={() => setMode("map")}>
      Find Game
    </Button>

  );

  const createButton = (
    <Button
      onClick={() => setMode("create")}>
      Create Game
    </Button>

  );

  const returnHomeButton = (
    <Button onClick={() => setMode("home")}>Return Home</Button>
  );

  if (currPlayer === null) {
    return (
      <div>
        <Title>Welcome to Run It Back!</Title>
        {!loggedIn && loginButton}
      </div>
    );
  }

  if (mode === "home") {
    return (
      <div>
        <Title>Welcome to Run It Back, {currPlayer.name}!</Title>
        <ButtonBar>
          {!loggedIn && loginButton} {loggedIn && profileButton} {loggedIn && mapButton} {loggedIn && currPlayer.currGameID === 0 && createButton} {loggedIn && logoutButton}
        </ButtonBar>
      </div>

    );
  }
  else if (mode === "map") {
    return (
      <div>
        <Title>Find Game</Title>
        <LocalGameMap currPlayer={currPlayer} setNewLatitude={null} setNewLongitude={null}></LocalGameMap>
        {returnHomeButton}
      </div>

    );
  }
  else if (mode === "create") {
    return (
      <div>
        <Title>Create a Game for Players to Join</Title>
        <GameCreator currPlayer={currPlayer}></GameCreator>
      </div>

    );
  }

  return (
    <div>
      <Title>Profile Page</Title>
      <PersonPage backHome={setMode} currPlayer={currPlayer} handleEditReturn={handleEditReturn}></PersonPage>
    </div>

  );


};

export default App;
