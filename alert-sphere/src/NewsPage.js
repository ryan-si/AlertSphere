import React, { useState } from "react";
import Sidebar from "./SideBar";
import NewsListCard from "./NewsListCard";
import NewsDetail from "./NewsDetail";
import Topbar from "./TopBar";

function NewsPage() {
  const newsList = [
    {
      thumbnail: "NewsPic.png",
      title: "The Benefits of Balanced Diet",
      summary:
        "A balanced diet is essential for good health and wellbeing. Food provides our bodies with the energy...",
      date: "Mon 10 2022",
    },
    {
      thumbnail: "NewsPic2.png",
      title: "Regular Exercise: Key to a Healthy Heart",
      summary:
        "Studies show that regular physical activity can greatly reduce the risk of heart disease and stroke...",
      date: "Wed 12 2022",
    },
    {
      thumbnail: "NewsPic.png",
      title: "Mental Health Awareness Month",
      summary:
        "Mental health is just as important as physical health. This month, let's raise awareness and destigmatize mental health issues...",
      date: "Fri 14 2022",
    },
    {
      thumbnail: "NewsPic2.png",
      title: "The Dangers of Processed Foods",
      summary:
        "Processed foods often contain unhealthy fats, sugars, and sodium. Learn how to identify and limit these ingredients for a healthier lifestyle...",
      date: "Sun 16 2022",
    },
    {
      thumbnail: "NewsPic.png",
      title: "Importance of Hydration",
      summary:
        "Drinking enough water is essential for bodily functions. Discover the benefits and learn how to stay hydrated...",
      date: "Tue 18 2022",
    },
  ];

  const [selectedNews, setSelectedNews] = useState(newsList[0]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 overflow-y-auto">
          {newsList.map((news, index) => (
            <NewsListCard key={index} news={news} onClick={setSelectedNews} />
          ))}
        </div>
        <div className="w-2/3 border-l p-4">
          <NewsDetail news={selectedNews} />
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
