import { call, put, select, takeEvery } from 'redux-saga/effects'
import { FormSubmitReducerTypes, FormSubmitActionTypes } from "./type";
import FormService from "../../service/FormService";
import ResponseService from "../../service/ResponseService";

let formService = new FormService()
let responseService = new ResponseService()

const formState = state => state.formSubmit;

function* init() {
    yield takeEvery(FormSubmitActionTypes.create, create)
    yield takeEvery(FormSubmitActionTypes.findOne, findOne)
    yield takeEvery(FormSubmitActionTypes.uploadSignedUrl, uploadSignedUrl)
}

function* create() {
    const { form } = yield select(formState)
    let answers = []
    
    for (let index = 0; index < form.questions.length; index++) {
        const question = form.questions[index];

        delete question.isRequired
        delete question.allowSpecificFileTypes
        delete question.allowMaximumFileSize

        if (question.type === 'time') {
            const currentDate = new Date()
            currentDate.setHours(question?.dateTime?.substring(0, 2))
            currentDate.setMinutes(question?.dateTime?.substring(3, 5))
            answers.push({
                type: question.type,
                question: question.question,
                dateTime: currentDate.getTime()
            })
        } else if (question.type === 'date') {
            const currentDate = new Date(question.dateTime)
            answers.push({
                type: question.type,
                question: question.question,
                dateTime: currentDate.getTime()
            })
        }
        else answers.push(question)
    }

    yield put({ type: FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_FORM, isLoadingForSubmitForm: true })
    try {
        yield call(responseService.create, {
            formId: form.id,
            answers
        })
        yield put({ type: FormSubmitReducerTypes.UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY, isSubmitResponseSuccessfully: true })
    } catch (error) {
        console.log(error);
    }
    yield put({ type: FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_FORM, isLoadingForSubmitForm: false })
}

function* findOne({ formId }) {
    yield put({ type: FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: true })
    try {
        const response = yield call(formService.findOne, { formId })
        yield put({ type: FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: false })
        yield put({
            type: FormSubmitReducerTypes.SUBMIT_FORM, form: response
        });
    } catch (error) {
        yield put({ type: FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: false })
    }
}

function* uploadSignedUrl({ signedUrl, file }) {
    try {
        const response = yield call(responseService.uploadSignedUrl, { signedUrl, file })
        return response
    } catch (error) {
        console.log(error);
    }
}

export default init;