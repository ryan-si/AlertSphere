import React from "react";

function NewsDetail({ news }) {
  return (
    <div className="p-4 mt-10">
      <img
        src={news.thumbnail}
        alt={news.title}
        className="w-full h-64 object-cover"
      />
      <h2 className="text-2xl font-bold mt-4">{news.title}</h2>
      <span className="text-sm text-gray-500 block mt-2">{news.date}</span>
      <p className="mt-6 text-gray-700">详细的新闻内容...</p>
    </div>
  );
}

export default NewsDetail;
