import React from "react";

/**
 * CompanyDetail component
 * Displays detailed information about a specific company
 *
 * @param company object containing company details
 */
const CompanyDetail = ({ company }) => {
    return (
        <div>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            {/* Additional company details can be added here */}
        </div>
    );
};

export default CompanyDetail;