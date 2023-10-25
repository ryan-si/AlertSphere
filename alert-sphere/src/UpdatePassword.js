import React from "react";
import useUpdatePassword from "./hooks/useUpdatePassword";

export default function UpdatePassword() {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    msg,
    updatePassword,
  } = useUpdatePassword();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-6 lg:p-8">
      <div className="w-full sm:max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Update Password
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Current Password:
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full p-2 text-gray-900 border rounded-md focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            New Password:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 text-gray-900 border rounded-md focus:border-indigo-500"
          />
        </div>
        <button
          onClick={updatePassword}
          className="w-full text-white bg-gray-500 p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Password
        </button>
        <div className="mt-4 text-center text-gray-600">{msg}</div>
      </div>
    </div>
  );
}
