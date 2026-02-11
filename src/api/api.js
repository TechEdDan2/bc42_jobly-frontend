import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        //console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Set the token for API requests. */
    static setToken(token) {
        this.token = token;
        localStorage.setItem("token", token); // Persist token in localStorage
    }

    /** Retrieve the token from localStorage on app load. */
    static loadTokenFromStorage() {
        const token = localStorage.getItem("token");
        if (token) {
            this.token = token;
        }
    }

    ////////////////////////////////
    // Individual API routes: GET //
    ////////////////////////////////

    /** Get a list of all companies. */
    static async getCompanies(searchTerm) {
        if (searchTerm) {
            let res = await this.request(`companies/filter`, { nameLike: searchTerm.toLowerCase() });
            return res.companies;
        }
        let res = await this.request(`companies`);
        return res.companies;
    }

    /** Get details on a company by handle. */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Get a list of all jobs. */
    static async getJobs(searchTerm) {
        if (searchTerm) {
            let res = await this.request(`jobs`, { title: searchTerm.toLowerCase() });
            return res.jobs;
        }
        let res = await this.request(`jobs`);
        return res.jobs;
    }

    /** Get details on a job by id. */
    static async getJob(id) {
        let res = await this.request(`jobs/${id}`);
        return res.job;
    }

    /** Signup a new user. */
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        this.setToken(res.token); // Store token in localStorage and class variable
        return res.token;
    }

    /** Login a user. */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        this.setToken(res.token); // Store token in localStorage and class variable
        return res.token;
    }

    /** Get details of the current user. */
    static async getCurrentUser(token, username) {
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        if (!username) {
            throw new Error("No username provided. Unable to fetch user details.");
        }

        const headers = { Authorization: `Bearer ${token}` }; // Use token from arguments
        let res = await this.request(`users/${username}`, {}, "get", headers);
        return res.user;
    }

    /** Helper to extract username from token. */
    static getUsernameFromToken(token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            return payload.username;
        } catch (err) {
            console.error("Error decoding token:", err);
            return null;
        }
    }

    /** Update user profile. */
    static async updateUser(username, data) {
        if (!this.token) {
            throw new Error("No token found. Please log in.");
        }

        const headers = { Authorization: `Bearer ${this.token}` }; // Use token from JoblyApi

        try {
            let res = await this.request(`users/${username}`, data, "patch", headers);
            return res.user;
        } catch (err) {
            console.error("Error updating user:", err.response);
            let message = err.response?.data?.error?.message || "Unknown error occurred.";
            throw Array.isArray(message) ? message : [message];
        }
    }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
