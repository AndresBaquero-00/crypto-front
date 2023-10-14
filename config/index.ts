import axios from 'axios';
const hrtime = require('browser-process-hrtime');

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7500'
});

instance.interceptors.request.use((config) => {
	config.headers['request-startTime'] = hrtime();
	
	return config;
});

instance.interceptors.response.use((response) => {
	const start = response.config.headers['request-startTime'] ?? 0;
	const end = hrtime(start);
	const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000));
	response.headers['request-duration'] = milliseconds;
	return response;
});

export default instance;