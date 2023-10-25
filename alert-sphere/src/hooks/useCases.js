import { useState, useEffect } from "react";

function useCases() {
  const [cases, setCases] = useState([]);
  const token = sessionStorage.getItem("token");
  const url = `${process.env.REACT_APP_API_BASE_URL}/emergency/cases`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching cases");
        }
        return response.json();
      })
      .then((data) => {
        const promises = data.data.Cases.map((caseItem) => {
          return fetch(
            `${process.env.REACT_APP_API_BASE_URL}/emergency/disease/${caseItem.disease_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((diseaseResponse) => {
              if (!diseaseResponse.ok) {
                throw new Error("Error fetching disease details");
              }
              return diseaseResponse.json();
            })
            .then((diseaseData) => {
              return {
                case_id: caseItem.case_id,
                latitude: caseItem.latitude,
                longitude: caseItem.longitude,
                disease_name: diseaseData.data.disease_name,
                disease_level: diseaseData.data.disease_level,
              };
            });
        });

        return Promise.all(promises);
      })
      .then((combinedData) => {
        setCases(combinedData);
      })
      .catch((error) => {
        console.error("Error fetching case data:", error);
      });
  }, []);

  return {cases, setCases};
}

export default useCases;
