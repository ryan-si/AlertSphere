import React, { useState, useEffect} from "react";
import Sidebar from "./SideBar";
import NewsListCard from "./NewsListCard";
import NewsDetail from "./NewsDetail";
import Topbar from "./TopBar";
import useWarnings from './hooks/useWarnings';

function NewsPage() {
  const { data: newsList, loading, error } = useWarnings('ea96b051dee542caab35b59d44d7047b');
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    if (newsList && newsList.length > 0) {
        setSelectedNews(newsList[0]);
    }
  }, [newsList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

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
          {selectedNews ? <NewsDetail news={selectedNews} /> : <p>No news selected</p>}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
