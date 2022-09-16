import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.100.5:3333',
    timeout: 10000
});

export default instance;