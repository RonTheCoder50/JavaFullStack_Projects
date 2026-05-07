import axios from "axios";

export async function signupAPI(data) {
    try {
        const response = await axios.post(`http://localhost:8080/user/signup`, data);
        return response;
    } catch(e) {
        console.log(e.response?.data);
    }
}

export async function loginAPI(data) {
    try {
        const response = await axios.post(`http://localhost:8080/user/login`, data);
        return response;
    } catch(e) {
        console.log(e.response.data);
    }
}