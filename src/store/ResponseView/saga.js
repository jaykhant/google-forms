import { ResponseViewReducerTypes, ResponseViewActionTypes } from "./type";

import { call, put, takeEvery } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'

import ResponseService from "../../service/ResponseService";
import FormService from "../../service/FormService";
import ValidationSchemaBuilder from "../../utils/ValidationSchemaBuilder";
import { QUESTION_TYPES } from "../../Constants";
const responseService = new ResponseService()
const formService = new FormService()

const responseViewState = state => state.response_view;

function* init() {
    yield takeEvery(ResponseViewActionTypes.create, create)
    yield takeEvery(ResponseViewActionTypes.findAll, findAll)
    yield takeEvery(ResponseViewActionTypes.findOne, findOne)
    yield takeEvery(ResponseViewActionTypes.findOneForm, findOneForm)
    yield takeEvery(ResponseViewActionTypes.uploadFile, uploadFile)
}

function* create({ formId, response }) {
    yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_RESPONSE, isLoadingForSubmitResponse: true })
    try {
        yield call(responseService.create, { formId, answers: response.answers })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_RESPONSE, isLoadingForSubmitResponse: false })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY, isSubmitResponseSuccessfully: true })
    } catch (error) {
        console.log("create :-", error);
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY, isSubmitResponseSuccessfully: false })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_RESPONSE, isLoadingForSubmitResponse: false })
    }
}

function* findAll({ formId }) {
    const { page } = yield select(responseViewState)
    if (page === -1) yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: true })
    try {
        const response = yield call(responseService.findAll, { formId, page: page === -1 ? 1 : page === 1 ? 2 : page, size: 20 })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: false })
        yield put({ type: ResponseViewReducerTypes.UPDATE_PAGES, page: page === -1 ? 1 : page === 1 ? 3 : page })
        yield put({ type: ResponseViewReducerTypes.SET_RESPONSES, responses: response.data });
        yield put({ type: ResponseViewReducerTypes.UPDATE_TOTAL_DATA, totalData: response.totalData })
    } catch (error) {
        console.log(error);
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: false })
        //yield put({ type: ResponseViewReducerTypes.RESPONSE_ERROR, errorMessage: error.message });
    }
}

function* findOne({ responseId }) {
    yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: true })
    try {
        const response = yield call(responseService.findOne, { responseId })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: false })
        yield put({
            type: ResponseViewReducerTypes.SET_RESPONSE, response
        });
    } catch (error) {
        console.log(error);
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: false })
        //yield put({ type: ResponseViewReducerTypes.RESPONSE_ERROR, errorMessage: error.message });
    }
}

function* findOneForm({ formId }) {
    yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: true })
    try {
        let response = yield call(formService.findOne, { formId })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: false })
        response.answers = []
        response.questions.forEach(question => {
            let answer = {
                type: question.type,
                question: question.question,
                options: question.options,
            }

            if (
                answer.type === QUESTION_TYPES.SHORT_ANSWER ||
                answer.type === QUESTION_TYPES.PARAGRAPH ||
                answer.type === QUESTION_TYPES.DROP_DOWN ||
                answer.type === QUESTION_TYPES.MULTIPLE_CHOICE
            ) answer.answer = ''
            else if (
                answer.type === QUESTION_TYPES.CHECKBOX
            ) answer.answers = []
            else if (
                answer.type === QUESTION_TYPES.DATE ||
                QUESTION_TYPES.TIME
            ) answer.dateTime = NaN
            else if (
                answer.type === QUESTION_TYPES.FILE_UPLOAD
            ) {
                answer.fileName = ''
                answer.fileType = ''
            }

            response.answers.push(answer)
        });
        yield put({
            type: ResponseViewReducerTypes.SET_RESPONSE, response
        });
        const validationSchema = ValidationSchemaBuilder(response.questions)
        yield put({
            type: ResponseViewReducerTypes.SET_VALIDATION_SCHEMA, validationSchema
        })
    } catch (error) {
        console.log(error);
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE, isLoadingForGetResponse: false })
        //yield put({ type: ResponseViewReducerTypes.RESPONSE_ERROR, errorMessage: error.message });
    }
}

function* uploadFile({ formId, file, questionIndex }) {
    yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_FILE_UPLOAD, isLoadingForFileUpload: true })
    try {
        const response = yield call(responseService.generateSignedUrl, { formId, ext: file.name.split('.').pop() })
        yield call(responseService.uploadFile, { signedUrl: response.signedUrl, file })
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_FILE_UPLOAD, isLoadingForFileUpload: false })
        yield put({ type: ResponseViewReducerTypes.UPDATE_ANSWER_IN_RESPONSE, key: 'fileName', value: response.name, questionIndex })
        yield put({ type: ResponseViewReducerTypes.UPDATE_ANSWER_IN_RESPONSE, key: 'fileType', value: file.type.split('/')[0], questionIndex })
    } catch (error) {
        console.log(error);
        yield put({ type: ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_FILE_UPLOAD, isLoadingForFileUpload: false })
        //yield put({ type: ResponseViewReducerTypes.RESPONSE_ERROR, errorMessage: error.message });
    }
}

export default init;