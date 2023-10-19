import React from "react";

function CardComponent({ title, description, actionText, actionHandler }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <button
        onClick={actionHandler}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {actionText}
      </button>
    </div>
  );
}

export default CardComponent;
