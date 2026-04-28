import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function apiCall() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API}/post/all`, 
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

        const response = await axios.get(`${API}/auth/users`, 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(e) {
        console.log(e);
    }
}

export async function userRegisterAPI(info) {
    try {
        const response = await axios.post(`${API}/auth/register`, info);
        return response.data;
    } catch(err) {
        console.log(err);
        alert('User already exists with this email !');
        return;
    }
}

export async function userLoginAPI(info) {
    try {
        const response = await axios.post(`${API}/auth/login`, info);
        if(response.data === "bad404") {
            alert('wrong user-email or password, try again!');
        }

        console.log('token -> ', response.data);
        return response.data;
    } catch(err) {
        console.log("error while login -> ", err);
        
        if (err.response && err.response.status === 401) {
            alert("Invalid email or password ❌");
        } else {
            alert("Something went wrong ⚠️");
        }
    }
}

export async function userProfileAPI(token) {
    console.log('bearer -> ' + token);
    try {
        const response = await axios.get(`${API}/auth/profile`, 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        )

        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log("error while fetching profile -> ", err);
    }
}

export async function userDeleteAPI(id, token) {
    try {
        const response = await axios.delete(`${API}/auth/delete/${id}`, 
            {headers: {
                    Authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(err) {  
        console.log('error during user delete -> ', err);
    }
}

//other service api's

export async function likeAPI(postId, userId) {
    try {
        const response = await axios.post(
            `${API}/post/like/${postId}/${userId}`
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function postCommentAPI(token, data) {
    try {
        const response = await axios.post(`${API}/post/comment`, data, 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        )

        return response.data;        
    } catch(err) {
        console.log(err);
    }
}

export async function getPostAPI(id, token) {
    try {
        const response = await axios.get(`${API}/post/${id}`, 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export async function bookmarkAPI(postId, userId, token) {
    try {
        const response = await axios.post(`${API}/post/bookmark/${postId}/${userId}`, 
            {headers: {
                    authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export async function addPostAPI(data, token) {
    try {
        const response = await axios.post(`${API}/post/add`, data, 
            {headers: {
                authorization: `Bearer ${token}`
            }}
        );
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export async function deleteBlogAPI(postId, userId, token) {
    try {
        const confirmAction = window.confirm("Are you sure you want to delete?");
        if(!confirmAction) {
            alert('user click decline to delete blog!');
            return;
        } 

        const api = await axios.delete(
            `${API}/post/remove/${postId}/${userId}`,
            {headers: {
                authorization: `Bearer ${token}`
            }}
        );

        if(!api.status === 200) {
            alert('unable to delete something went wrong!');
            return;
        }  

        return api.data;
    } catch(err) {
        console.log(err);
    }
}

export async function updatePostAPI(data, token) {
    try {
        const response = await axios.put(`${API}/post/update`, 
            data,
            {headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
            }}
        );

        return response.data;
    } catch(err) {
        console.log(err);
    }
}