import React from "react";
import { GoogleMap } from "@react-google-maps/api";

function MapComponent({ center }) {
  // Default coordinates provided
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center} // Use the passed or default center
      zoom={10}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
      }}
    ></GoogleMap>
  );
}

export default MapComponent;
