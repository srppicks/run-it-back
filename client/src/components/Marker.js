import React from 'react';
import './Marker.css'

const Marker = ( { changed, name, selector } ) => {
  let color;
  if (changed === true) {
    color = "red";
  }
  else {
    color = "green";
  }

  const stylingStruct = { backgroundColor: color, cursor: "pointer" }

  return (
    <div className="marker" style={stylingStruct} title={name} onClick={selector}>{name}
    </div>
  );



};

export default Marker;
