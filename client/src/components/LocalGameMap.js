import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from "styled-components";
import { Row, Col, Button, Container } from "reactstrap";
import Marker from "./Marker"
import LocationPage from "./LocationPage"

const LocalGameMap = ( { currPlayer, setNewLatitude, setNewLongitude } ) => {
  const [markLong, setMarkLong] = React.useState(currPlayer.longitude ? currPlayer.longitude : -73.940007);
  const [markLat, setMarkLat] = React.useState(currPlayer.latitude ? currPlayer.latitude : 40.698413);
  const [changed, setChanged] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [mode, setMode] = React.useState("map");
  const [selected, setSelected] = React.useState(null);

  const center = {lat: markLat, lng: markLong};

  useEffect(() => {
      const fetchLocations = () => {
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

            setLocations(data);
          })
          .catch(err => console.log(err)); // eslint-disable-line no-console
      };

      fetchLocations();

    }, []);


  const htmlArray = locations.map((place) => (
    <Marker
      lat={place.latitude}
      lng={place.longitude}
      name={place.name}
      changed={null}
      selector={() => {
        setMode("local");
        setSelected(place);
      }}
    ></Marker>
  ));

  htmlArray.push((
    <Marker
      lat={markLat}
      lng={markLong}
      name="Home"
      changed={null}
      selector={null}
      >
    </Marker>

  ));

  if (mode === "local") {
    return (
      <LocationPage place={selected} modeChange={setMode}></LocationPage>
    );
  }


  if (setNewLatitude && setNewLongitude) {
    return (
      <div style={{height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCIXHbmHW8R8wNWLQNI1ZmWpmqqwptmW5o"}}
          defaultCenter={center}
          defaultZoom={9}
          onClick={(obj) => {
            setNewLatitude(obj.lat);
            setNewLongitude(obj.lng);
            setMarkLong(obj.lng);
            setMarkLat(obj.lat);
            setChanged(true);
            console.log(obj.lat, obj.lng);
          }}
        >
          <Marker
            lat={markLat}
            lng={markLong}
            name="Home"
            changed={changed}
            >
          </Marker>


        </GoogleMapReact>
      </div>
    );

  }
  return (
  <div style={{height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCIXHbmHW8R8wNWLQNI1ZmWpmqqwptmW5o"}}
      defaultCenter={center}
      defaultZoom={9}
    >
      {htmlArray}
    </GoogleMapReact>
  </div>
);


};

export default LocalGameMap;
