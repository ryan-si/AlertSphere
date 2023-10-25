import { useState, useEffect } from "react";

function useDiseases() {
  const [diseases, setDiseases] = useState([]);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    // Fetch diseases from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/disease`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDiseases(data.data.diseases);
      })
      .catch((error) => {
        console.error("Error fetching diseases:", error);
      });
  }, []);

  return diseases;
}

export default useDiseases;
