import { useState, useEffect } from 'react';

function useDiseases() {
    const [diseases, setDiseases] = useState([]);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        // Fetch diseases from the API
        fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/diseases`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setDiseases(data);
            })
            .catch(error => {
                console.error("Error fetching diseases:", error);
            });
    }, []);

    const submitDiseaseData = (disease_id, lat, lng) => {
        // Submit data to backend (add your backend endpoint and logic here)
        // For demonstration purposes, we'll just console log the data
        console.log("Submitting data:", { disease_id, lat, lng });
    };

    return { diseases, submitDiseaseData };
}

export default useDiseases;