import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api.js";
import CompanyCard from "./CompanyCard.jsx";
import Search from "../search-bar/Search.jsx";


/**
 * Shows a list of companies with links to their details
 * Loads the companies from the API on component mount
 * 
 * the route is /companies
 * 
 */

const CompaniesList = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);

    const onSearch = async (searchTerm) => {
        try {
            const companies = await JoblyApi.getCompanies(searchTerm); // Pass searchTerm directly
            setCompanies(companies);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const companiesData = await JoblyApi.getCompanies();
                setCompanies(companiesData);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCompanies();
    }, []);

    if (isLoading) {
        return <p>Loading companies...</p>;
    }

    return (
        <div>
            <h2>Companies List</h2>
            <Search onSearch={onSearch} />
            {companies.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}

        </div>
    );
};

export default CompaniesList;