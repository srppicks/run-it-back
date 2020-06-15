import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from "styled-components";
import { Row, Col, Button, Container } from "reactstrap";

class LocalGameMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  render(){
    return (
    <div style={{height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCIXHbmHW8R8wNWLQNI1ZmWpmqqwptmW5o"}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      ></GoogleMapReact>
    </div>
  );
  }

}

export default LocalGameMap;
