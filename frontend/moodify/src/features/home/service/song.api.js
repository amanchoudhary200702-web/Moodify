import axios from "axios";


const api = axios.create({
    baseURL: "https://moodify-c0au.onrender.com",
    withCredentials: true
})


export async function getSong({ mood }) {
    const response = await api.get("/api/songs?mood=" + mood)
    console.log(response)
    return response.data
}