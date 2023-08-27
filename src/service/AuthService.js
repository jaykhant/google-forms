import HttpCommon from "./HttpCommon"
import { ErrorWrapper, ResponseWrapper } from "./util"
export default class AuthService {

    constructor() {
        this.http = new HttpCommon("auth")
    }

    signIn = async (data = {}) => {
        try {
            const response = await this.http.post("/sign-in", data)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }

    signUp = async (data = {}) => {
        try {
            const response = await this.http.post("/sign-up", data)
            return new ResponseWrapper(response).data
        } catch (error) {
            throw new ErrorWrapper(error)
        }
    }
}