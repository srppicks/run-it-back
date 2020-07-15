import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout'
import Header from '../components/Header/Header';

import { GoogleLogin, GoogleLogout } from "react-google-login";

import PersonPage from "../components/PersonPage"
import LocalGameMap from "../components/LocalGameMap"
import GameCreator from "../components/GameCreator"

const GOOGLE_CLIENT_ID = "891271447458-2tacoegsns3ccft1b88g46t3a0kkn6ep.apps.googleusercontent.com";

const Main = () => {
  const [loggedIn, setLogin] = React.useState(false);
  const [currPlayer, setPlayer] = React.useState(null);
  const [mode, setMode] = React.useState("Home");

  console.log(loggedIn);
  console.log(currPlayer);


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
   console.log("FAIL");
   alert(response.error);
 };

 const handleGoogleLogout = () => {
   console.log("BLAHH");
   fetch("/logout", {
     method: "POST"
   }).then(fetchResponse => {
     if (!fetchResponse.ok) {
       alert("Error logging out", fetchResponse.statusText);
     }
     console.log("Here");
     setLogin(false);
     setPlayer(null);
     console.log(loggedIn);
     console.log(currPlayer);
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
   setMode("Home");

 };

 if (mode === "Home") {
   if (currPlayer === null) {
     console.log("Here");
     return (
       <Layout handleGoogleLogin={handleGoogleLogin}
               handleGoogleLogout={handleGoogleLogout}
               handleGoogleFailure={handleGoogleFailure}
               setMode={setMode}
               googleID={GOOGLE_CLIENT_ID}
               currPlayer={currPlayer}>
         <Header setMode={setMode} currPlayer={currPlayer}/>
       </Layout>
     );
   }

   return (
       <Layout handleGoogleLogin={handleGoogleLogin}
               handleGoogleLogout={handleGoogleLogout}
               handleGoogleFailure={handleGoogleFailure}
               setMode={setMode}
               googleID={GOOGLE_CLIENT_ID}
               currPlayer={currPlayer}>
         <Header setMode={setMode} currPlayer={currPlayer}/>
       </Layout>
   );

 }
 else if (mode === "My Profile") {
   return(<Layout handleGoogleLogin={handleGoogleLogin}
           handleGoogleLogout={handleGoogleLogout}
           handleGoogleFailure={handleGoogleFailure}
           setMode={setMode}
           googleID={GOOGLE_CLIENT_ID}
           currPlayer={currPlayer}>
     <PersonPage currPlayer={currPlayer} handleEditReturn={handleEditReturn}/>
   </Layout>);


 }
 else if (mode === "Create Games") {
   return(<Layout handleGoogleLogin={handleGoogleLogin}
           handleGoogleLogout={handleGoogleLogout}
           handleGoogleFailure={handleGoogleFailure}
           setMode={setMode}
           googleID={GOOGLE_CLIENT_ID}
           currPlayer={currPlayer}>
     <GameCreator currPlayer={currPlayer}/>
   </Layout>);

 }
 else if (mode === "Search Games") {
   return(<Layout handleGoogleLogin={handleGoogleLogin}
           handleGoogleLogout={handleGoogleLogout}
           handleGoogleFailure={handleGoogleFailure}
           setMode={setMode}
           googleID={GOOGLE_CLIENT_ID}
           currPlayer={currPlayer}>
     <LocalGameMap currPlayer={currPlayer}/>
   </Layout>);

 }
 else {
   return (
     <div>
     </div>
   );

 }


}

export default Main;
