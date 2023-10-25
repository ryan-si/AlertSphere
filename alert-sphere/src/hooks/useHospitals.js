import { useState, useEffect } from "react";

function useHospitals() {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        fetch("https://myhospitalsapi.aihw.gov.au/api/v1/reporting-units")
            .then(response => response.json())
            .then(data => {
                // Ensure that data.result exists and is an array before filtering
                if (data.result && Array.isArray(data.result)) {
                    const filteredData = data.result.filter(item =>
                        item.reporting_unit_type.reporting_unit_type_code === "H" &&
                        typeof item.latitude === "number" &&
                        typeof item.longitude === "number"
                    );
                    setHospitals(filteredData);
                }
            })
            .catch(error => {
                console.error("Error fetching hospital data:", error);
            });

    }, []);

    return hospitals;
}
export default useHospitals;