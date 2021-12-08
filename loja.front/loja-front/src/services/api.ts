import axios from 'axios';
import { getToken } from './auth';

export interface Error{
    title: string;
    status: number;
    errors: Errors;
}
interface Errors{
    Mensagens: string[];
}

const api = axios.create({
    baseURL: 'https://localhost:44321/'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if(token){
        config.headers = {
            Authorization: `Bearer ${token}`
        };
    }

    return config;
});

export default api;