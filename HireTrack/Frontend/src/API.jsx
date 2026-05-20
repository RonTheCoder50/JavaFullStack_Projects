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

export async function getStoreAnalyzedAPI(userId, filename) {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(
            `http://localhost:8080/file/${userId}`,
            {
                params: {
                    filename: filename
                },
                
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        );

        console.log(response?.data);
        return response.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}

export async function analyzedResumeAPI(file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("file", file);

    try {    
        const response = await axios.post(
            `http://localhost:8080/file/upload`, 
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        console.log('response: ', response);
        return response.data;
    } catch(err) {
        console.log(err.response?.data);
        alert('something went wrong!');
    }
}

export async function getUserDataAPI() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            'http://localhost:8080/user/info',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}
 