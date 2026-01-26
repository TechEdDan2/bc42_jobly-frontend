import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

/**
 * The Search component for searching the JobList or 
 * the CompaniesList.
 * 
 * Props:
 * - onSearch: function to call with the search term
 * 
 * State:
 * - searchTerm: the current value of the search input  
 * 
 */

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ backgroundColor: "white" }}
            />
            <Button type="submit" variant="contained" color="primary">
                Search
            </Button>
        </Box>
    );
};

export default Search;