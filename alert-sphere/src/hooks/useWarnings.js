import { useState, useEffect } from 'react';

function useWarnings(apiKey) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=au&category=health&apiKey=${apiKey}`);
        
        if (!response.ok) {
          const responseBody = await response.json();
          console.error("API Error Response:", responseBody);  // Log the error response for more details
          throw new Error(`API Error: ${responseBody.message || 'Network response was not ok'}`);
        }
        
        const result = await response.json();
        setData(result.articles);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useWarnings;