import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://localhost:7122/api/'
});

export default instance;
