import { FormActionTypes, FormReducerTypes } from "./type";

import { call, put, takeEvery } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'

import History from "../../utils/History";
import FormService from "../../service/FormService";
import { QUESTION_TYPES } from "../../Constants";
let formService = new FormService()

const formState = state => state.form;

function* init () {
    yield takeEvery(FormActionTypes.findAll, findAll)
    yield takeEvery(FormActionTypes.findOne, findOne)
    yield takeEvery(FormActionTypes.delete, deleteForm)
    yield takeEvery(FormActionTypes.create, create)
    yield takeEvery(FormActionTypes.update, update)
}

function* findAll () {
    yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: true })
    const { page } = yield select(formState)
    try {
        const response = yield call(formService.findAll, { page: page, size: 20 })
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: false })
        yield put({
            type: FormReducerTypes.SET_FORMS, forms: response.forms
        });
    } catch (error) {
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: false })
        //yield put({ type: FormReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

function* findOne ({ id }) {
    yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: true })
    try {
        const response = yield call(formService.findOne, { id })
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: false })
        yield put({
            type: FormReducerTypes.SET_FORM, form: response
        });
    } catch (error) {
        console.log(error);
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM, isLoadingForGetForm: false })
        //yield put({ type: FormReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

function* deleteForm ({ deleteIndex }) {
    yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_DELETE_FORM, isLoadingForDeleteForm: true })
    const { forms } = yield select(formState)
    try {
        yield call(formService.delete, { id: forms[deleteIndex].id })
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_DELETE_FORM, isLoadingForDeleteForm: false })
        yield put({ type: FormReducerTypes.UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN, isDeleteConfirmationDialogOpen: false });
        yield put({
            type: FormReducerTypes.FORM_DELETE_SUCCESS, deleteIndex
        });
    } catch (error) {
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_DELETE_FORM, isLoadingForDeleteForm: false })
        //yield put({ type: FormReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

function* create () {
    yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_CREATE_FORM, isLoadingForCreateForm: true })
    try {
        const response = yield call(formService.create, { title: 'Untitled form', questions: [{ type: QUESTION_TYPES.MULTIPLE_CHOICE, question: 'Untitled Question', options: ['Option 1'] }] })
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_CREATE_FORM, isLoadingForCreateForm: false })
        History.push(`/form/${response.id}`)
    } catch (error) {
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_CREATE_FORM, isLoadingForCreateForm: false })
        //yield put({ type: FormReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

function* update () {
    yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_UPDATE_FORM, isLoadingForUpdateForm: true })
    try {
        const { form } = yield select(formState)
        yield call(formService.update, form)
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_UPDATE_FORM, isLoadingForUpdateForm: false })
    } catch (error) {
        yield put({ type: FormReducerTypes.UPDATE_IS_LOADING_FOR_UPDATE_FORM, isLoadingForUpdateForm: false })
        //yield put({ type: FormReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

export default init;