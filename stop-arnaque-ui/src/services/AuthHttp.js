import { http } from "../plugins/axios.js"

export class AuthHttp {

    async register(payload) {
        const url = `/users`;
        const response = await http.post(url, payload);
        return response;
    };

    async login(payload) {
        const url = `/users/sign-in`;
        const response = await http.post(url, payload);
        return response;
    }
    async verifyUserRegistration(token) {
        const url = `/auth/verify?code=${token}`;
        const response = await http.get(url);
        return response;
    }

}