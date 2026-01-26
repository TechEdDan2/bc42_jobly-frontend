import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api.js";
import JobsCard from "./JobCard.jsx";

/**
 * The JobsList component
 * Displays a list of job postings fetched from the API
 * Each job is rendered using the JobsCard component
 *
 * Route: /jobs
 *
 *  
 */

const JobsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const jobsData = await JoblyApi.getJobs();
                setJobs(jobsData);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobs();
    }, []);

    if (isLoading) {
        return <p>Loading jobs...</p>;
    }

    return (
        <div>
            <h2>Jobs List</h2>

            {jobs.map(job => (
                <JobsCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobsList;