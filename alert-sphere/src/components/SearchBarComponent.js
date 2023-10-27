import React, { useState } from "react";
import TopBarComponent from "./TopBarComponent";
import SideBarComponent from "./SideBarComponent";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchBarComponent = ({ onAddressSelect }) => {
  const [address, setAddress] = useState("");
  const searchOptions = {
    componentRestrictions: { country: "au" },
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      loadScript={false}
      onSelect={async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        onAddressSelect(latLng); // Pass the coordinates to the parent component
      }}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({ placeholder: "Search address..." })}
            className="bg-blue bg-opacity-80 -ml-2.5 w-full border pl-2 rounded border-none focus:outline-none "
          />
          <img
            src="Magnifier.png"
            alt="Search"
            className="h-5 w-4.5 absolute top-0.5 right-2"
          />{" "}
          <div className="">
            {loading && <p>Loading...</p>}
            {suggestions.map((suggestion) => {
              const baseStyles =
                "-ml-2.5 border border-gray-300 p-2 cursor-pointer rounded hover:bg-blue-500";
              const activeStyle = suggestion.active
                ? "bg-blue-200"
                : "bg-white";
              return (
                <div
                  key={suggestion.placeId}
                  className={`${baseStyles} ${activeStyle}`}
                  {...getSuggestionItemProps(suggestion)}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchBarComponent;
