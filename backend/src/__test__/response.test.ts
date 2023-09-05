import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import userAccessToken from '../fixtures/token.fixture';

const mockRresponse = {
    userId: "64ec96edb08805344f0da22e",
    formId: "64e704b12293841d80de62fc",
    answer: [
        {
            "question": "test",
            "answer": "test"
        },
        {
            "question": "test",
            "Option": [
                "test"
            ]
        }
    ]
}

const mockRuser = {
    email: "test@gmail.com",
    name: "test",
    password: "12345678"
}

const mockRImageurl = {
    signedUrl: "https://google-form-storage.s3.ap-south-1.amazonaws.com/64e86af91a6ac5e9d5a36d85/64ec46177e59caa489bb8ea7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYPBV5L2QJYZU7HET%2F20230829%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230829T114233Z&X-Amz-Expires=300&X-Amz-Signature=e675cc4de7de787d0ee3c86da6fb1a4e3b956208f16f554703e5f61bf2d0f494&X-Amz-SignedHeaders=host",
    name: "64ec46177e59caa489bb8ea7.png"
}

jest.mock('../services/ResponseService', () => {
    return {
        create: jest.fn().mockImplementation(() => mockRresponse),
        find: jest.fn().mockImplementation(() => [mockRresponse]),
        findResponseById: jest.fn().mockImplementation(() => mockRresponse),
    }
})

jest.mock('../services/AuthService', () => {
    return {
        find: jest.fn().mockImplementation(() => mockRuser)
    }
})

jest.mock('../utils/S3BucketManager', () => {
    return jest.fn().mockImplementation(() => ({
        generateSignedUrlForUpload: jest.fn().mockImplementation(() => mockRImageurl),
        generateSignedUrlForDownload: jest.fn().mockImplementation(() => mockRImageurl),
        removeObjects: jest.fn()
    }))
})

describe('FORM', () => {

    afterAll(() => mongoose.disconnect())

    describe('POST /response', () => {
        test('should create response', async () => {
            const res = await request(app)
                .post('/response')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .send({
                    formId: "64e704b12293841d80de62fc",
                    answer: mockRresponse.answer
                })
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                data: {
                    ...mockRresponse
                }
            })
        })
    })

    describe('GET /response/', () => {
        test('should fetch all response', async () => {
            const res = await request(app)
                .get('/response?formId=64e86af91a6ac5e9d5a36d85&page=1&size=20')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                data: [
                    mockRresponse
                ]
            })
        })
        test('should throw a error in case of page and size are empty', async () => {
            await request(app)
                .get('/response')
                .expect(httpStatus.BAD_REQUEST)
                .set('Authorization', `${userAccessToken.userAccessToken}`)
        })
    })

    describe('GET /response/64e86af91a6ac5e9d5a36d85', () => {
        test('should fetch response', async () => {
            const res = await request(app)
                .get('/response/64e86af91a6ac5e9d5a36d85')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                response: mockRresponse
            })
        })
    })

    describe('GET /response/generate-signed-url', () => {
        test('should fetch generate-signed-url', async () => {
            const res = await request(app)
                .get('/response/generate-signed-url/id?formId=64e86af91a6ac5e9d5a36d&ext=png')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual(
                { ...mockRImageurl }
            )
        });
    })
})