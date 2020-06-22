import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Row, Col, Button, Container } from "reactstrap";

const LocationPage = ( { place, modeChange } ) => {
  return (
    <div>
      <Container>
        <Row>
          {place.name}
        </Row>
      </Container>
      <Button onClick={()=>modeChange("map")}>Back to Map</Button>
    </div>

  );


};

export default LocationPage;
