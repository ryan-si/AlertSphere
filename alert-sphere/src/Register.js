import React, { useState } from "react";
import "./Register.css";
import useRegister from './components/useRegister';
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const { register, loading, error } = useRegister();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, password, mobile, address1, address2, state };
    await register(data);
  };

  return (
    <div className="flex min-h-screen flex-1 justify-center px-6 py-12 lg:px-8 bg-gray-200">
      <div className="h-full bg-white rounded-lg shadow w-3/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
                  Address Line 1
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
                  id="address1"
                  name="address1"
                  type="address1"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address Line 2
                </label>
                <div className="text-sm">
                  <text className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Optional
                  </text>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="address2"
                  name="address2"
                  type="address2"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                {/* <div className="text-sm">
                  <text className="font-semibold text-indigo-600 hover:text-indigo-500">
                    
                  </text>
                </div> */}
              </div>
              <div className="mt-2">
                {/* <input
                  id="address2"
                  name="address2"
                  type="address2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}
                <select className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option className="bg-gray-200 hover:bg-gray-300" value="1">
                    NSW
                  </option>
                  <option className="bg-gray-200 hover:bg-gray-300" value="2">
                    Option 2
                  </option>
                  <option className="bg-gray-200 hover:bg-gray-300" value="3">
                    Option 3
                  </option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Sign up
              </button>
            </div>
            <div>&nbsp;</div>
          </form>
        </div>
      </div>
    </div>
  );
}
