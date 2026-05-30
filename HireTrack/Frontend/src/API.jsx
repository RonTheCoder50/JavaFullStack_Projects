import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function signupAPI(info) {
    try {
        const newInfo = {
            username: info.username.trim(),
            password: info.password.trim(),
            email: info.email.trim()
        }

        const response = await axios.post(`${API}/user/signup`,  newInfo);
        return response.data;
    } catch(e) {
        const errors = e.response?.data?.message;
        if(typeof errors === 'string') {
            alert(errors);
        } else {
            const allErrors = Object.values(errors).join("\n");
            alert(allErrors);
        }
    }
}

export async function loginAPI(info) {
    try {
        const newInfo = {
            username: info.username.trim(),
            password: info.password.trim(),
        }

        const response = await axios.post(`${API}/user/login`, newInfo);
        return response;
    } catch(e) {
        if(e.response?.status === 403) {
            alert('Invalid username or password!');
        } else {
            alert('Something went wrong!');
        }
    }
}

export async function analyzedResumeAPI(file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await axios.post(
        `${API}/file/upload`, 
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    console.log('response: ', response);
    return response.data;
}

export async function getUserDataAPI() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            `${API}/user/info`,
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

export async function viewRecentAnalysisAPI(filename) {
   const token = localStorage.getItem('token');

    try {
        const response = await axios.get(
            `${API}/file/view/${filename}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        );
        console.log(response);
        return response.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}
 
export async function removeRecentAnalysisAPI(filename) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(
            `${API}/file/remove/${filename}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch(err) {
        alert(err.response?.data || 'something went wrong');
    }
}

export async function getHistoryAnalysisAPI() {
    try {
        const response = await axios.get(
            `${API}/user/history`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        
        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}

//ADMIN API's

export async function fetchAdminDataAPI() {
    try {
        const response = await axios.get(
            `${API}/admin-data`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}

export async function toggleBlockAPI(userId, username) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `${API}/block`,
            null,
            {
                params: {
                    id: userId,
                    username: username
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}

export async function removeUserAPI(userId, username) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
            `${API}/remove`,
            {
                params: {
                    id: userId, 
                    username: username
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response?.data;
    } catch(err) {
        alert(err.response?.data);
    }
}

export async function viewAnalysesAPI(userId, filename) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            `${API}/view`,
            {
                params: {
                    id: userId,
                    filename: filename
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}

//Chart API
export async function fetchUserChartAPI(type) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(
            `${API}/chart/user`,
            {
                params: {
                    type: type
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}

export async function fetchAnalysesChartAPI(type) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(
            `${API}/chart/analyses`,
            {
                params: {
                    type: type
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response?.data;
    } catch(err) {
        console.log(err.response?.data);
    }
}