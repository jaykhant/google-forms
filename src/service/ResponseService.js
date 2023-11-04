import axios from "axios"
import HttpCommon from "./HttpCommon"
import { ErrorWrapper, ResponseWrapper } from "./util"
export default class ResponseService {

    constructor() {
        this.http = new HttpCommon("response", true)
    }

    findOne = async ({ responseId }) => {
        try {
            const response = await this.http.get(`/${responseId}`)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    findAll = async ({ formId, page, size }) => {
        try {
            const response = await this.http.get(`/?formId=${formId}&page=${page}&size=${size}`)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    generateSignedUrl = async ({ formId, ext }) => {
        try {
            const response = await this.http.get(`/generate-signed-url/id?formId=${formId}&ext=${ext}`)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    uploadFile = async ({ signedUrl, file }) => {
        try {
            const resp = await axios.put(signedUrl, file, {
                headers: { "Content-Type": file.type },
            });
            return new ResponseWrapper(resp).data;
        } catch (e) {
            throw new ErrorWrapper(e);
        }
    }
}