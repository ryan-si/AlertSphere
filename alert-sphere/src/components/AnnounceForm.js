import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
const token = sessionStorage.getItem("token");
function AnnounceFormComponent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async () => {
    if (!title || !content) {
      alert("Please enter the title and content first.");
      return;
    }
    const url = `${process.env.REACT_APP_API_BASE_URL}/emergency/user/sendEmail?title=${title}&content=${content}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setMsg("Network response was not ok");
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setMsg(responseData.msg);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="p-6 bg-e5e7eb rounded space-y-4">
      <div>
        <label htmlFor="title" className="block text-lg font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="block w-full p-2 border rounded"
          placeholder="Type the title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-lg font-semibold mb-2">
          Content
        </label>
        <textarea
          id="content"
          className="block w-full p-2 border rounded"
          rows="3"
          placeholder="Type the content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      {/* {console.log(title)}
      {console.log(content)} */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSubmit}
        >
          Send Notification
        </button>
        <div className="mt-4 text-center text-gray-600">{msg}</div>
      </div>
    </div>
  );
}

export default AnnounceFormComponent;
