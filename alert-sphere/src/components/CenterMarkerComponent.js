import React from 'react';
import { Marker } from '@react-google-maps/api';
function CenterMarkerComponent({ position }) {
    return (
      <Marker
        position={position}
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }}

      />
    );
  }
  
  export default CenterMarkerComponent;