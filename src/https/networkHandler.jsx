import axios from 'axios';
import {accessToken} from "../constants"
import { getCookie } from '.';

const {REACT_APP_API} = process.env;
const apiClient = axios.create({
    baseURL:  REACT_APP_API,
    timeout: 10000,
});


const apiCall = async (method, path, body = null) => {
    try {
        const token = getCookie(accessToken)
        const headers = {
            Token: `Bearer ${token}`
        }
        if (!headers.Token) {
            throw new Error("Authorization token is missing!");
        }
        const config = {
            method,
            url: path,
            headers,
            ...(body ? { data: body } : {}),
        };
        
        const response = await apiClient(config);
        return response.data;
    } catch (error) {
       console.log(error)
    }
};

export const networkHandler = {
    get: (path) => apiCall('get', path),
    post: (path, body) => apiCall('post', path, body),
    put: (path, body) => apiCall('put', path, body),
    del: (path, body) => apiCall('del', path, body),
};
