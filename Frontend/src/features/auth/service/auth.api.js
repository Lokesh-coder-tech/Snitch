import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://snitch-9ajg.onrender.com",
    withCredentials: true,
})

// Error interceptor
apiInstance.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || error.message || "An error occurred";
        console.error("Auth API Error:", message, error.response?.status);
        return Promise.reject(new Error(message));
    }
);

export async function register({email, fullname, password, contact, isSeller}) {

    const response = await apiInstance.post("/api/auth/register", {
        email,
        fullname,
        password,
        contact,
        isSeller
    })
    return response.data;  
}

export async function login({email, password}) {
    const response = await apiInstance.post("/api/auth/login", {
        email,
        password
    })
    return response.data;
}
export async function getMe() {
    const response = await apiInstance.get("/api/auth/me");
    return response.data;
}
export async function logout() {
    const response = await apiInstance.post("/api/auth/logout");
    return response.data;
}