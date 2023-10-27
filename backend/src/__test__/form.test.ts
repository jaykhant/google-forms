import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import userAccessToken from '../fixtures/Token.fixture';

const mockRform = {
    title: "test",
    status: "creating",
    userId: "64ec96edb08805344f0da22e",
    description: "test",
    questions: [
        {
            "type": "short_answer",
            "question": "tester",
            "isRequired": true
        },
        {
            "type": "multiple_choice",
            "question": "5",
            "options": [
                "test",
                "test1"
            ],
            "isRequired": false
        }
    ]
}

const mockRuser = {
    email: "test@gmail.com",
    name: "test",
    password: "12345678"
}

const mockRtotal = 1

jest.mock('../services/FormService', () => {
    return {
        create: jest.fn().mockImplementation(() => mockRform),
        find: jest.fn().mockImplementation(() => mockRform),
        update: jest.fn().mockImplementation(() => mockRform),
        getAll: jest.fn().mockImplementation(() => [mockRform]),
        getTotalCount: jest.fn().mockImplementation(() => mockRtotal),
        findForm: jest.fn().mockImplementation(() => mockRform),
        remove: jest.fn().mockImplementation(() => mockRform),
        updatestatus: jest.fn().mockImplementation(() => mockRform)
    }
})

jest.mock('../services/AuthService', () => {
    return {
        find: jest.fn().mockImplementation(() => mockRuser)
    }
})

describe('FORM', () => {

    afterAll(() => mongoose.disconnect())

    describe('POST /form', () => {
        test('should create form', async () => {
            const res = await request(app)
                .post('/form')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .send({
                    title: mockRform.title,
                    description: mockRform.description,
                    questions: mockRform.questions
                })
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                
            })
        })
    })

    describe('PUT /form', () => {
        test('should update form', async () => {
            const res = await request(app)
                .put('/form')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .send({
                    id: "64e86af91a6ac5e9d5a36d85",
                    title: mockRform.title,
                    description: mockRform.description,
                    questions: mockRform.questions
                })
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                data: {
                    ...mockRform
                }
            })
        })
    })

    describe('GET /form/', () => {
        test('should fetch all form', async () => {
            const res = await request(app)
                .get('/form?page=1&size=10')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                forms: [
                    mockRform
                ],
                totalData: 1
            })
        })
        test('should throw a error in case of page and size are empty', async () => {
            await request(app)
                .get('/form')
                .expect(httpStatus.BAD_REQUEST)
                .set('Authorization', `${userAccessToken.userAccessToken}`)
        })
    })

    describe('GET /form/64ec96edb08805344f0da22e', () => {
        test('should fetch form', async () => {
            const res = await request(app)
                .get('/form/64ec96edb08805344f0da22e')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual("")
        })
    })

    describe('DELETE /form/', () => {
        test('should delete form', async () => {
            const res = await request(app)
                .delete('/form?id=64e86af91a6ac5e9d5a36d85')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                "data": {
                    ...mockRform
                }
            })
        });
    })

    describe('PUT /form/publish', () => {
        test('should update form', async () => {
            const res = await request(app)
                .put('/form/publish?id=64e86af91a6ac5e9d5a36d85')
                .set('Authorization', `${userAccessToken.userAccessToken}`)
                .expect(httpStatus.OK)
            expect(res.body).toEqual({
                data: {
                    ...mockRform
                }
            })
        })
    })
})