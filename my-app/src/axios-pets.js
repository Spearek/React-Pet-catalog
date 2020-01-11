import axios from 'axios';

const instance = axios.create({
    baseURL:'https://pet-app-5a986.firebaseio.com/'
});

export default instance;