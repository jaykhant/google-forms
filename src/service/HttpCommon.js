import axios from "axios"
import { moduleTypes } from '../store/type';
import { store } from "../store";
import { AppReducerTypes } from "../store/App/type";

const API_URL = process.env.REACT_APP_API_URL
export default class HttpCommon {

    constructor(subURL = "", auth = false) {
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

        if (auth) {
            this.attachAuthenticationToken();
            this.logoutInCaseOfInvalidToken();
        }
    }

    attachAuthenticationToken () {
        this.apiClient.interceptors.request.use(
            (request) => {
                const accessToken = store.getState()[moduleTypes.APP].accessToken
                request.headers.Authorization = accessToken
                    ? `${accessToken}`
                    : "";
                return request;
            },
            (error) => {
                console.log("error", error);
                return Promise.reject(error);
            }
        );
    }

    logoutInCaseOfInvalidToken () {
        this.apiClient.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    //clear the session and logout user
                    store.dispatch({ type: AppReducerTypes.LOGOUT })
                }
                return Promise.reject(error);
            }
        );
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
