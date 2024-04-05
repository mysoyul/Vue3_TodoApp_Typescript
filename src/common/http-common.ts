import axios, { AxiosInstance } from "axios"

const APIURL = process.env.VUE_APP_APIURL

const apiClient: AxiosInstance = axios.create({
    baseURL: APIURL,
    headers: {
        "Content-type": "application/json",
    },
})
export default apiClient