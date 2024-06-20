import axios from 'axios';
import { useAuthStore } from '../stores/auth-store';

class HttpBase {
    constructor() {
        this.http = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            validateStatus: (status) => {
                return ACCEPTED_STATUS.includes(status);
            }
        });

        this.http.interceptors.request.use(
            (config) => {
                const authStore = useAuthStore();

                const token = authStore.token;
                if (token) {
                    console.log("Token from axios: ", token);
                    config.headers.Authorization = `Bearer ${token}`;
                    config.headers.Accept = 'application/json';
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.http.interceptors.response.use(
            (response) => {
                const status = response.status;
                const data = response.data;
                const body = data !== '' ? data : null;
                return { status: status, body: body };
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}

const ACCEPTED_STATUS = [200, 201, 202, 204, 400, 404];
const httpBase = new HttpBase();
const http = httpBase.http;

export { http };
export default {
    install: (app) => {
        app.config.globalProperties.$http = http;
    }
};
