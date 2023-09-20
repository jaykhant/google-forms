import HttpCommon from "./HttpCommon"
import { ErrorWrapper, ResponseWrapper } from "./util"
export default class FormService {

    constructor() {
        this.http = new HttpCommon("form", true)
    }

    findOne = async ({ id }) => {
        try {
            const response = await this.http.get(`/${id}`)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    findAll = async ({ page, size }) => {
        try {
            const response = await this.http.get(`/?page=${page}&size=${size}`)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    delete = async ({ id }) => {
        try {
            const response = await this.http.delete(`/?id=${id}`)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    create = async (data) => {
        try {
            const response = await this.http.post('/', data)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    update = async (data) => {
        try {
            const response = await this.http.put('/', data)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }
}