import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";
import { Container, Button } from "reactstrap";
import {Switch, Route} from 'react-router-dom';

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



const App = () => {
  return (
    <div>
      <Main></Main>
    </div>


  );
};

export default App;
