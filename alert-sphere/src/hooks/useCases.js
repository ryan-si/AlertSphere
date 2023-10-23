import { useState, useEffect } from "react";

function useCases() {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        // Fetch all cases
        fetch("http://10.19.229.4:8080/emergency/cases")
            .then(response => response.json())
            .then(data => {
                // For each case, fetch the disease name
                const promises = data.map(caseItem => {
                    return fetch(`http://10.19.229.4:8080/emergency/disease/${caseItem.disease_id}`)
                        .then(response => response.json())
                        .then(diseaseData => {
                            return {
                                case_id: caseItem.case_id,
                                latitude: caseItem.latitude,
                                longitude: caseItem.longitude,
                                disease_name: diseaseData.data.disease_name
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