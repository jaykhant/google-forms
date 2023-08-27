import { NextFunction, Response } from 'express';
import httpStatus from 'http-status'
import config from '../config/index';
import jwt from 'jsonwebtoken'
import AuthService from '../services/AuthService';

const auth =

    async (req: any, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization
            if (accessToken) {
                accessToken.split(' ')[1]
                const payload = jwt.verify(accessToken, config.secretkey) as any
                const email = payload.email
                req.user = await AuthService.find(email)
            } else {
                res.statusCode = httpStatus.UNAUTHORIZED
                return res.send({ message: 'Unauthorized' })
            }
            next()
            return
        } catch (error: any) {
            res.statusCode = httpStatus.BAD_REQUEST
            return res.send(`Error: ${error.message}`)
        }
    }
export default auth