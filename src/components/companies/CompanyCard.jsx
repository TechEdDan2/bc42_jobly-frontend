import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

/**
 * CompanyCard component
 * Displays a card with company information
 *
 * @param company object containing company details
 */
const CompanyCard = ({ company }) => {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component={Link} to={`/companies/${company.handle}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {company.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CompanyCard; 