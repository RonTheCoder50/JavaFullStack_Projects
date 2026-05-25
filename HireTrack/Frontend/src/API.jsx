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

export async function getStoreAnalyzedAPI(filename) {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(
            `http://localhost:8080/file/get`,
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
        alert('daily ' + err.response?.data?.message);
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

export async function viewRecentAnalysisAPI(filename) {
   const token = localStorage.getItem('token');

    try {
        const response = await axios.get(
            `http://localhost:8080/file/view/${filename}`,
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
            `http://localhost:8080/file/remove/${filename}`,
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
            `http://localhost:8080/user/history`,
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
            'http://localhost:8080/admin-data',
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
            'http://localhost:8080/block',
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
            'http://localhost:8080/remove',
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
            'http://localhost:8080/view',
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
            `http://localhost:8080/chart/user`,
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
            `http://localhost:8080/chart/analyses`,
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