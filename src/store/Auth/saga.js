import { AuthActionTypes, AuthReducerTypes } from "./type";
import { AppReducerTypes } from '../App/type';

import { call, put, takeEvery } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'

import History from '../../utils/History';

import AuthService from "../../service/AuthService";
const authService = new AuthService()

const signInForm = state => state.auth.signInForm;
const signUpForm = state => state.auth.signUpForm;

function* init () {
    yield takeEvery(AuthActionTypes.signIn, signIn);
    yield takeEvery(AuthActionTypes.signUp, signUp);
}

function* signIn () {
    yield put({ type: AuthReducerTypes.FORM_LOADING, loading: true })
    const data = yield select(signInForm)
    try {
        const response = yield call(authService.signIn, data)
        yield put({ type: AuthReducerTypes.FORM_LOADING, loading: false })
        yield put({ type: AuthReducerTypes.FORM_SUCCESS });
        yield put({ type: AppReducerTypes.LOGIN, isLoggedIn: true, accessToken: response.accessToken })
        yield put({ type: AppReducerTypes.UPDATE_USER, user: response.user })
    } catch (error) {
        yield put({ type: AuthReducerTypes.FORM_LOADING, loading: false })
        yield put({ type: AuthReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

function* signUp () {
    yield put({ type: AuthReducerTypes.FORM_LOADING, loading: true })
    const data = yield select(signUpForm)
    try {
        const response = yield call(authService.signUp, data)
        yield put({ type: AuthReducerTypes.FORM_LOADING, loading: false })
        yield put({ type: AuthReducerTypes.FORM_SUCCESS, response });
        History.push('/sign-in')
    } catch (error) {
        yield put({ type: AuthReducerTypes.FORM_LOADING, loading: false })
        yield put({ type: AuthReducerTypes.FORM_ERROR, errorMessage: error.message });
    }
}

export default init;