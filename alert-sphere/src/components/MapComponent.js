import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCxBkbx6cQ88YShFQTJLXBlhTu3mcupSv0">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}
      >
      </GoogleMap>
    </LoadScript>
  );
}
  
export default MapComponent;