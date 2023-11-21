import axios from 'axios';
import {useUserStore} from "@/store";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


export function get(url, params) {
    return apiClient.get(url, {
        params: {
            ...params
        },
        headers: {
            'Authorization': 'Bearer ' + useUserStore().token()
        }
    })
}

export function post(url, data) {
    return apiClient.post(url, data,{
        headers: {
            'Authorization': 'Bearer ' + useUserStore().token()
        }
    })
}

export function postNoAuth(url, data) {
    return apiClient.post(url, data)
}
