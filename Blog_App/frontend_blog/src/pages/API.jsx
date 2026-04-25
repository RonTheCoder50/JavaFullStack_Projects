import axios from "axios";

export async function apiCall() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8080/post/all', 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export async function userInfoApiCall() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8080/auth/users', 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(e) {
        console.log(e);
    }
}