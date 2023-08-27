import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL
export default class HttpCommon {

    constructor(subURL = "") {
        let baseURL = API_URL
        if (subURL) {
            baseURL += `/${subURL}`
        }
        this.apiClient = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    get = (url = "") => {
        return this.apiClient.get(url)
    }

    post = (url = "", data = {}) => {
        return this.apiClient.post(url, data)
    }

    patch = (id, data = {}) => {
        return this.apiClient.patch(id, data)
    }

    delete = (id) => {
        return this.apiClient.delete(id)
    }
}
