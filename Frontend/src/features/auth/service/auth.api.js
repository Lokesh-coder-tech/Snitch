import axios from "axios";

const apiInstace = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export async function register({email, fullname, password, contact, isSeller}) {

    const response = await apiInstace.post("/api/auth/register", {
        email,
        fullname,
        password,
        contact,
        isSeller
    })
    return response.data;  
}

export async function login({email, password}) {
    const response = await apiInstace.post("/api/auth/login", {
        email,
        password
    })
    return response.data;
}