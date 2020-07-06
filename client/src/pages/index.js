import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout'
import Header from '../components/Header/Header';

const Main = () => {
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

  //CONTINUE WORKING HERE


  return (
    <div>
      <Layout>
        <Header />
      </Layout>
    </div>
  );

}

export default Main;
