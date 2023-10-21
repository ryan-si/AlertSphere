import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function MapComponent({ center, markerPosition, zoom }) {
  // Default coordinates provided
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center} // Use the passed or default center
      zoom={zoom}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
      }}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
}

export default MapComponent;
