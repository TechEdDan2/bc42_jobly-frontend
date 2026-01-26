import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api.js";
import { useParams } from "react-router-dom";

/**
 * CompanyDetail component
 * Displays detailed information about a specific company
 *
 * @param company object containing company details
 */
const CompanyDetail = () => {
    const { company } = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanyDetail() {
            try {
                const data = await JoblyApi.getCompany(company);
                setCompanyData(data);
            } catch (error) {
                console.error("Error fetching company detail:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCompanyDetail();
    }, [company]);

    if (isLoading) {
        return <p>Loading company details...</p>;
    }
    return (
        <div>
            <h2>{companyData.name}</h2>
            <p>{companyData.description}</p>
            <p>Number of Employees: {companyData.numEmployees}</p>
            <img
                src={companyData.logo_url && companyData.logo_url.trim() ? `/src/assets${companyData.logo_url}` : "/src/assets/logos/logo2.png"}
                alt="Company Logo" style={{ width: '200px' }}
            />

        </div>
    );
};

export default CompanyDetail;