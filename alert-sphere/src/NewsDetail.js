import React from "react";

function NewsDetail({ news }) {
  return (
    <div className="p-4 mt-10">
      <img
        src={news.urlToImage}
        alt={news.title}
        className="w-full h-64 object-cover"
      />
      <h2 className="text-2xl font-bold mt-4">{news.title}</h2>
      <span className="text-sm text-gray-500 block mt-2">{news.publishedAt}</span>
      <span className="text-sm text-gray-500 block mt-2">{news.author}</span>
      <p className="mt-6 text-gray-700">{news.description}</p>
      <p className="mt-2 text-gray-600">{news.content}</p>
      <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Get full content
      </a>

    </div>
  );
}

export default NewsDetail;
