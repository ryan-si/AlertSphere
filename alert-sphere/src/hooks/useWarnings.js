import { useState, useEffect } from 'react';

function useWarnings(apiKey) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=disease&language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('An error occurred while fetching data.');
        }
        return response.json();
      })
      .then(result => {
        setData(result.articles); 
        setLoading(false);
       
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
     

  return { data, loading, error };
}

export default useWarnings;