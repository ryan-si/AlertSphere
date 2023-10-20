import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const SearchBarComponent = ({ onAddressSelect }) => {
    const [address, setAddress] = useState("");

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            loadScript={false}
            onSelect={async (value) => {
                const results = await geocodeByAddress(value);
                const latLng = await getLatLng(results[0]);
                setAddress(value);
                onAddressSelect(latLng);  // Pass the coordinates to the parent component
            }}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input {...getInputProps({ placeholder: "Search address..." })} />
                    <div>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                            const style = suggestion.active
                                ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                                : { backgroundColor: "#ffffff", cursor: "pointer" };
                            return (
                                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

export default SearchBarComponent;