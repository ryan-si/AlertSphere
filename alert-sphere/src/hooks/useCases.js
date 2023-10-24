import { useState, useEffect } from "react";

function useCases() {
    const [cases, setCases] = useState([]);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        // Fetch all cases
        fetch("http://192.168.50.237:8080/emergency/cases", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // For each case, fetch the disease name
                const promises = data.map(caseItem => {
                    return fetch(`http://192.168.50.237:8080/emergency/disease/${caseItem.disease_id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(diseaseData => {
                            return {
                                case_id: caseItem.case_id,
                                latitude: caseItem.latitude,
                                longitude: caseItem.longitude,
                                disease_name: diseaseData.data.disease_name,
                                disease_level:diseaseData.data.disease_level
                            };
                        });
                });

                // Use Promise.all to wait for all fetches to complete
                Promise.all(promises).then(combinedData => {
                    setCases(combinedData);
                });
            })
            .catch(error => {
                console.error("Error fetching case data:", error);
            });
    }, []);

    return cases;
}
export default useCases