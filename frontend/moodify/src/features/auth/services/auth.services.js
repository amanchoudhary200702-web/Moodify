import axios from "axios"

const api = axios.create({
    baseURL:"https://moodify-c0au.onrender.com",
    withCredentials:true
})

export async function register({email,username,password}) {
    const response = await api.post("api/auth/register",{
        email,password,username
    })

    return response.data
    
}

export async function login({email,username,password}) {
    const response = await api.post("api/auth/login",{
        email,password,username
    })

    return response.data
    
}

export async function getme() {
    const response = await api.get("api/auth/get-me")

    return response.data
    }
export async function logout() {
    const response = await api.post("api/auth/logout")

    return response.data
    
}

