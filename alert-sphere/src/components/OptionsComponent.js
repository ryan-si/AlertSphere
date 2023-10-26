import React from "react";

function OptionsComponent() {
  return (
    <div className="bg-white p-8 rounded-lg border border-gray-300">
      <h2 className="text-2xl font-semibold mb-6">I want to ...</h2>

      <div className="grid grid-cols-2 gap-4">
        <a href="/settings">
          <div className="action-card p-4 rounded-lg shadow hover:shadow-md transition">
            <img
              src="Update.png"
              alt="Icon Description"
              className="mb-2 h-10 w-10"
            />

            <p>Update my details</p>
          </div>
        </a>
        <a href="/contact">
          <div className="action-card p-4 rounded-lg shadow hover:shadow-md transition">
            <img
              src="Call.png"
              alt="Icon Description"
              className="mb-2 w-8 h-8"
            />
            <p>Contact your company</p>
          </div>
        </a>
        {/* ... Add other cards similarly ... */}
      </div>
    </div>
  );
}

export default OptionsComponent;
