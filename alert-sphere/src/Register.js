import React, { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinnerComponent";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Register.css";
import useRegister from "./hooks/useRegister";
export default function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    mobile,
    setMobile,
    msg,
    register,
    address,
    setAddress,
  } = useRegister();
  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleAddressSelect = (value) => {
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
            Register a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={(event) => register(event)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="uesrname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="uesrname"
                  name="uesrname"
                  type="uesrname"
                  required
                  onChange={(event) => setName(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="mobile"
                  autoComplete="mobile"
                  required
                  onChange={(event) => setMobile(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password?
                  </a>
                </div> */}
              </div>
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
                          {loading && (
                            <div className="h-screen flex flex-col relative">
                              <LoadingSpinner />
                            </div>
                          )}
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
                Sign up
              </button>
              <div className="mt-4 text-center text-gray-600">{msg}</div>
            </div>
        
          </form>
          <div className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
