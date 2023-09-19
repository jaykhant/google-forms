const { moduleTypes } = require('../type')

const FormReducerTypes = {
    SET_FORMS: `${moduleTypes.FORM}/SET_FORMS`,
    UPDATE_TOTAL_DATA: `${moduleTypes.FORM}/UPDATE_TOTAL_DATA`,
    UPDATE_PAGE: `${moduleTypes.FORM}/UPDATE_PAGE`,
    UPDATE_IS_LOADING_FOR_GET_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_GET_FORM`,

    UPDATE_IS_LOADING_FOR_DELETE_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_DELETE_FORM`,
    FORM_DELETE_SUCCESS: `${moduleTypes.FORM}/FORM_DELETE_SUCCESS`,
    UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN: `${moduleTypes.FORM}/UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN`,

    UPDATE_IS_LOADING_FOR_CREATE_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_CREATE_FORM`,
    SET_FORM: `${moduleTypes.FORM}/SET_FORM`,
    UPDATE_FORM: `${moduleTypes.FORM}/UPDATE_FORM`,
    UPDATE_FORM_QUESTION: `${moduleTypes.FORM}/UPDATE_FORM_QUESTION`,
    ADD_FORM_QUESTION: `${moduleTypes.FORM}/ADD_FORM_QUESTION`
}

const FormActionTypes = {
    findAll: `${moduleTypes.FORM}/findAll`,
    findOne: `${moduleTypes.FORM}/findOne`,
    delete: `${moduleTypes.FORM}/delete`,
    create: `${moduleTypes.FORM}/create`,
}

module.exports = {
    FormReducerTypes,
    FormActionTypes
};