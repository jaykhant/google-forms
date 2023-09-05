import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import userAccessToken from '../fixtures/token.fixture';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

let mockRuser = {
    email: "test@gmail.com",
    name: "test"
}

const mockRuser1 = {
    email: "test@gmail.com",
    name: "test",
    password: "12345678"
}

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjkzODI3MDY5LCJleHAiOjE2OTM4MzQyNjl9.V3L71Z5wkxyW-60EfZBqw2iPl4YXXNKkhJfwSOemPbM"

jest.mock('../services/AuthService', () => {
    return {
        create: jest.fn().mockImplementation(() => mockRuser1),
        find: jest.fn().mockImplementationOnce(() => mockRuser).mockImplementationOnce(() => mockRuser)
    }
})

jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true))
jest.spyOn(jwt, 'sign').mockImplementation(() => accessToken)

describe('AUTH', () => {

    afterAll(() => mongoose.disconnect())

    describe('POST /auth/sign-in', () => {
        test('should sign-in user', async () => {
            const res = await request(app)
                .post('/auth/sign-in')
                .send({
                    email: "test@gmail.com",
                    password: "12345678"
                })
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                "user": {
                    ...mockRuser
                },
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjkzODI3MDY5LCJleHAiOjE2OTM4MzQyNjl9.V3L71Z5wkxyW-60EfZBqw2iPl4YXXNKkhJfwSOemPbM"
            })
        })
    })

    describe('GET /auth/user/current', () => {
        test('should fetch current user', async () => {
            const res = await request(app)
                .get('/auth/user/current')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK);
            expect(res.body).toEqual({
            })
        })
    })

    describe('POST /auth/sign-up', () => {
        test('should sign-up user', async () => {
            const res = await request(app)
                .post('/auth/sign-up')
                .send(mockRuser1)
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                "user": {
                    ...mockRuser1
                }
            })
        })
    })
})