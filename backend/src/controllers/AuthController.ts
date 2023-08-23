import { Request, Response } from 'express';
import httpStatus from 'http-status';
import AuthService from '../services/AuthService';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/CatchAsync';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from '../config/index'

const signUp = catchAsync(async (req: Request, res: Response) => {
    const { email, username, password } = req.body

    const existingUser = await AuthService.find(email)
    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Credentials')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await AuthService.create(email, username, hashedPassword)

    res.json({ user })
})

const signIn = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await AuthService.find(email)
    if (!existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Credentials')
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)
    if (!matchPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Credentials')
    }

    const token = jwt.sign(
        { email: existingUser.email, id: existingUser.id },
        config.secretkey
    )

    res.json({ user: existingUser, token })
})

export default {
    signUp,
    signIn
}