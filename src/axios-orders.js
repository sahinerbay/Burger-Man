import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-man-react.firebaseio.com/',
});

export default instance;