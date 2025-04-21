import axios from 'axios';

// Access the environment variable using import.meta.env
const server = 'http://localhost:5000'

const finteckApi = axios.create({
    baseURL: `${server}/api`,
});

export default finteckApi;
