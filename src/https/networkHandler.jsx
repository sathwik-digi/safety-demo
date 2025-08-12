import axios from 'axios';
// import {accessToken} from "../constants"
// import { getCookie } from '.';

const REACT_APP_API = import.meta.env.VITE_REACT_APP_API;
// const apiClient = axios.create({
//     baseURL:  REACT_APP_API,
//     timeout: 10000,
// });

const apiCall = async (method, microService, path, body = null) => {
    try {
        // const token = getCookie(accessToken)
        // const headers = {
        //     Token: `Bearer ${token}`
        // }
        // if (!headers.Token) {
        //     throw new Error("Authorization token is missing!");
        // }
        const config = {
            method,
            url: `https://sm-${microService}-${REACT_APP_API}${path}`,
            // headers,
            ...(body ? { data: body } : {}),
        };
        
        const response = await axios(config);
        return response.data;
    } catch (error) {
       console.log(error)
    }
};

export const networkHandler = {
    get: (microService, path ) => apiCall('get', microService, path),
    post: (microService, path, body) => apiCall('post', microService, path, body),
    put: (microService, path, body) => apiCall('put', microService, path, body),
    del: (microService, path, body) => apiCall('del', microService, path, body),
};
