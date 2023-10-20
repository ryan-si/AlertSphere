import { useState, useEffect } from 'react';

const useHealthTips = (keyword) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=${keyword}`;

    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }, [keyword]);

  return { data, loading, error };
}

export default useHealthTips;