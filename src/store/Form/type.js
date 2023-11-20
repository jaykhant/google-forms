const { moduleTypes } = require('../type')

const FormReducerTypes = {
    SET_FORMS: `${moduleTypes.FORM}/SET_FORMS`,
    UPDATE_TOTAL_DATA: `${moduleTypes.FORM}/UPDATE_TOTAL_DATA`,
    UPDATE_PAGE: `${moduleTypes.FORM}/UPDATE_PAGE`,
    UPDATE_IS_LOADING_FOR_GET_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_GET_FORM`,
    SET_ERROR_MESSAGE: `${moduleTypes.FORM}/SET_ERROR_MESSAGE`,
    CLEAR_ERROR_MESSAGE: `${moduleTypes.FORM}/CLEAR_ERROR_MESSAGE`,

    UPDATE_IS_LOADING_FOR_DELETE_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_DELETE_FORM`,
    FORM_DELETE_SUCCESS: `${moduleTypes.FORM}/FORM_DELETE_SUCCESS`,
    UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN: `${moduleTypes.FORM}/UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN`,

    UPDATE_IS_LOADING_FOR_CREATE_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_CREATE_FORM`,
    SET_FORM: `${moduleTypes.FORM}/SET_FORM`,
    UPDATE_FORM: `${moduleTypes.FORM}/UPDATE_FORM`,
    CLEAR_FORMS: `${moduleTypes.FORM}/CLEAR_FORMS`,
    CLEAR_FORM: `${moduleTypes.FORM}/CLEAR_FORM`,

    UPDATE_FORM_QUESTION: `${moduleTypes.FORM}/UPDATE_FORM_QUESTION`,
    ADD_FORM_QUESTION: `${moduleTypes.FORM}/ADD_FORM_QUESTION`,
    DELETE_FORM_QUESTION: `${moduleTypes.FORM}/DELETE_FORM_QUESTION`,
    COPY_FORM_QUESTION: `${moduleTypes.FORM}/COPY_FORM_QUESTION`,

    ADD_FORM_QUESTION_OPTION: `${moduleTypes.FORM}/ADD_FORM_QUESTION_OPTION`,
    DELETE_FORM_QUESTION_OPTION: `${moduleTypes.FORM}/DELETE_FORM_QUESTION_OPTION`,
    UPDATE_FORM_QUESTION_OPTION: `${moduleTypes.FORM}/UPDATE_FORM_QUESTION_OPTION`,

    UPDATE_IS_LOADING_FOR_UPDATE_FORM: `${moduleTypes.FORM}/UPDATE_IS_LOADING_FOR_UPDATE_FORM`,

}

const FormActionTypes = {
    findAll: `${moduleTypes.FORM}/findAll`,
    findOne: `${moduleTypes.FORM}/findOne`,
    delete: `${moduleTypes.FORM}/delete`,
    create: `${moduleTypes.FORM}/create`,
    update: `${moduleTypes.FORM}/update`,
}

module.exports = {
    FormReducerTypes,
    FormActionTypes
};