import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

/**
 *  The JobsCard component
 *  Displays a summary of a job posting, including company name, job title, salary, and equity
 *  Each card is clickable and links to the detailed view of the job and is rendered within the JobsList component
 * 
 * @param {Object} job - The job object containing details to be displayed on the card
 * @returns - JSX element representing a card with job information
 */
const JobsCard = ({ job }) => {
    console.log("JobCard received job:", job);
    return (

        <div>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h5" component={Link} to={`/jobs/${job.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        Company: {job.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Title: {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Salary: {job.salary ? `$${job.salary}` : "Not specified"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Equity: {job.equity ? job.equity : "None"}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default JobsCard;