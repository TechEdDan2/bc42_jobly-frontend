import React, { useState, useEffect } from "react";
import JoblyApi from "../../api/api.js";
import { useParams } from "react-router-dom";

const JobDetail = () => {
    const { jobId } = useParams();
    const [jobData, setJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchJobDetail() {
            try {
                const data = await JoblyApi.getJob(jobId);
                console.log(data);
                setJobData(data);
            } catch (error) {
                console.error("Error fetching job detail:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobDetail();
    }, [jobId]);

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
        </div>
    );
};

export default JobDetail;