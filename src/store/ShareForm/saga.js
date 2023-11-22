import { ShareFormActionTypes, ShareFormReducerTypes } from "./type";

import { call, put, takeEvery } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'

import FormService from "../../service/FormService";
const formService = new FormService()


const shareFormState = state => state.share_form;

function* init() {
    yield takeEvery(ShareFormActionTypes.sendEmail, sendEmail)
}

function* sendEmail({formId}) {
    const { form } = yield select(shareFormState)
    try {
        yield call(formService.sendEmail, { formId, form })
        yield put({ type: ShareFormReducerTypes.CLEAR_FORM})
        yield put({ type: ShareFormReducerTypes.SET_ERROR_MESSAGE, error: { type: 'success', message: 'Form send successfully' } })
    } catch (error) {
        yield put({ type: ShareFormReducerTypes.SET_ERROR_MESSAGE, error: { type: 'error', message: 'Something wrong' } })
    }
}

export default init;