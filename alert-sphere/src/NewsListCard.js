import React from "react";

function NewsListCard({ news, onClick }) {
  return (
    <div
      className="border border-gray-300 rounded-md  p-4 m-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(news)}
    >
      <img
        src={news.urlToImage}
        alt={news.title}
        className="w-32 h-32 object-cover"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{news.title}</h3>
        <p className="text-gray-600 mt-2">{news.description}</p>
        <span className="text-sm text-gray-500">{news.publishedAt}</span>
      </div>
    </div>
  );
}

export default NewsListCard;
