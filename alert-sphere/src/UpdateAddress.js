import React from "react";
import LoadingSpinner from "./components/LoadingSpinnerComponent";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import "./UpdateAddress.css";
import useUpdateAddress from "./hooks/useUpdateAddress";

export default function UpdateAddress() {
  const {
    currentPassword,
    setCurrentPassword,
    address,
    setAddress,
    msg,
    updateAddress,
  } = useUpdateAddress();

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleAddressSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    // Assuming you'll save latitude and longitude in the backend
    setAddress(value);
  };

  const searchOptions = {
    componentRestrictions: { country: "au" },
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-gray-200">
      <div className="w-full sm:max-w-md bg-white rounded-lg shadow">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Address
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={(event) => updateAddress(event)}
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password:
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Address:
              </label>
              <div className="mt-2">
                <PlacesAutocomplete
                  value={address}
                  onChange={handleAddressChange}
                  onSelect={handleAddressSelect}
                  searchOptions={searchOptions}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div className="relative">
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "block w-full p-3 rounded mb-4 border",
                        })}
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md">
                          {loading && <LoadingSpinner />}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "p-4 cursor-pointer bg-gray-100"
                              : "p-4 cursor-pointer";
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Update Address
              </button>
            </div>
            <div className="text-center text-gray-600">{msg}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
