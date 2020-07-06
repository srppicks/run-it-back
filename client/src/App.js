import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";
import { Container, Button } from "reactstrap";
import {Switch, Route} from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from "react-google-login";

import PersonPage from "./components/PersonPage"
import LocalGameMap from "./components/LocalGameMap"
import GameCreator from "./components/GameCreator"

import Main from './pages';

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
  return (
    <div>
      <Main></Main>
    </div>


  );
};

export default App;
