import axios from 'axios';
import { getToken } from './auth';

export const loginUrl = 'https://localhost:44321/';
export const catalogoUrl = 'https://localhost:44391';

export interface Error{
    title: string;
    status: number;
    errors: Errors;
}
interface Errors{
    Mensagens: string[];
}

const api = axios.create({
    baseURL: loginUrl
});

api.interceptors.request.use(async config => {
    const token = getToken();

    if(token){
        config.headers = {
            Authorization: `Bearer ${token.acessToken}`
        };
    }

    return config;
});

api.interceptors.response.use(function(onResponse){
        return onResponse;
    }, 
    function(onError) {
        switch(onError.response.status){
            case 401:
                window.location.href = "/login";
                break;
            case 403:
                console.log("Forbidden");
                break;
            case 500:
                console.log("Ocorreu um erro!");
                break;
        };
        return Promise.reject(onError);
    }
);

export default api;