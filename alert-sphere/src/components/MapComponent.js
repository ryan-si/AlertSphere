import React from "react";
import { GoogleMap } from '@react-google-maps/api';
function MapComponent() {
  return (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}
      >
      </GoogleMap>
  );
}
  
export default MapComponent;