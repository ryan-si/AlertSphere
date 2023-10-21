import React, { useState, useEffect} from "react";
import SideBarComponent from "./components/SideBarComponent";
import NewsListCard from "./NewsListCard";
import NewsDetail from "./NewsDetail";
import TopBarComponent from "./components/TopBarComponent";
import useWarnings from './hooks/useWarnings';

function NewsPage() {
  const { data: newsList, loading, error } = useWarnings();
  const [selectedNews, setSelectedNews] = useState(null);

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarComponent />
      <TopBarComponent />
      <div className="flex-1 flex overflow-hidden">
        
        <div className="w-1/3 overflow-y-auto">
          {console.log(newsList)}
          {newsList.map((news, index) => (
            <NewsListCard key={index} news={news} onClick={setSelectedNews} />
          ))}
        </div>
        <div className="w-2/3 border-l p-4">
          {selectedNews ? <NewsDetail news={selectedNews} /> : <p>No news selected</p>}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
