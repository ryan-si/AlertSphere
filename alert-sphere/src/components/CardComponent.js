import React from "react";

function CardComponent({ title, description, actions = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.handler}
          className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded mr-2"
        >
          {action.text}
        </button>
      ))}
    </div>
  );
}

export default CardComponent;
