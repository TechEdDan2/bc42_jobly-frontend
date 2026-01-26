import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api.js";
import JobsCard from "./JobCard.jsx";
import Search from "../search-bar/Search.jsx";

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


    const onSearch = async (searchTerm) => {
        try {
            const jobs = await JoblyApi.getJobs(searchTerm); // Pass searchTerm directly
            setJobs(jobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

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
            <Search onSearch={onSearch} />
            {jobs.map(job => (
                <JobsCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobsList;