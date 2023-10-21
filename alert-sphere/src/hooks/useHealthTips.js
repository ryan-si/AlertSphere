import { useState, useEffect } from 'react';

function useHealthTips() {
  const [eatingData, setEatingData] = useState({});
  const [exerciseData, setExerciseData] = useState({});
  const [eatingLoading, setEatingLoading] = useState(true);
  const [exerciseLoading, setExerciseLoading] = useState(true);

  const [eatingError, setEatingError] = useState(false);
  const [exerciseError, setExerciseError] = useState(false);

  useEffect(() => {
    fetch('https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=healthy%20eating')
      .then(async response => {
        const data = await response.json();
        setEatingData(data);
        setEatingLoading(false);
      })
      .catch(err => {
        setEatingError(true);
        setEatingLoading(false);
      });

    fetch('https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=exercise')
      .then(async response => {
        const data = await response.json();
        setExerciseData(data);
        setExerciseLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch exercise tips:", err);
        setExerciseError(true);
        setExerciseLoading(false);
      });
  }, []);

  return {
    eatingData, 
    exerciseData, 
    eatingLoading, 
    exerciseLoading, 
    eatingError, 
    exerciseError 
  };
}

export default useHealthTips;