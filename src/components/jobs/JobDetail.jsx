import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api.js";
import { useParams } from "react-router-dom";
import UserContext from "../../helpers/UserContext.js";

// Component to display detailed information about a specific job
const JobDetail = () => {
    const { jobId } = useParams();
    const [jobData, setJobData] = useState(null);
    const { user, token } = React.useContext(UserContext); // Destructure token from UserContext
    const [isLoading, setIsLoading] = useState(true);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        async function fetchJobDetail() {
            try {
                const data = await JoblyApi.getJob(jobId);
                setJobData(data);
                setHasApplied(data.hasApplied || false); // Assuming `hasApplied` is part of the job data
            } catch (error) {
                console.error("Error fetching job detail:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobDetail();
    }, [jobId]);



    const handleApply = async () => {
        console.debug("From JobDetail - Applying to job with:", { username: user.username, jobId, token }); // Debugging log

        try {
            JoblyApi.setToken(token); // Ensure the token is set in JoblyApi
            await JoblyApi.applyToJob(user.username, jobId, token); // Pass username and jobId to applyToJob
            setHasApplied(true);
        } catch (error) {
            console.error("Error applying to job:", error);
        }
    };

    if (isLoading) {
        return <p>Loading job details...</p>;
    }

    return (
        <div>
            <h2>Job Detail</h2>
            <p>Title: {jobData.title}</p>
            <p>Salary: {jobData.salary}</p>
            <p>Equity: {jobData.equity}</p>
            <p>Company Handle: {jobData.companyHandle}</p>

            {hasApplied ? (
                <button disabled>Applied</button>
            ) : (
                <button onClick={handleApply}>Apply</button>
            )}
        </div>
    );
};

export default JobDetail;