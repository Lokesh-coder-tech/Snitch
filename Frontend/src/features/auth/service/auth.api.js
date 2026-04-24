import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

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