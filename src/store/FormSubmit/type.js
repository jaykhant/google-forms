const { moduleTypes } = require('../type')

const FormSubmitReducerTypes = {
    CLEAR_FORM: `${moduleTypes.FORM_SUBMIT}/CLEAR_FORM`,
    SUBMIT_FORM: `${moduleTypes.FORM_SUBMIT}/SUBMIT_FORM`,
    SUBMIT_FORM_ANSWER: `${moduleTypes.FORM_SUBMIT}/SUBMIT_FORM_ANSWER`,
    UPDATE_IS_LOADING_FOR_GET_FORM: `${moduleTypes.FORM_SUBMIT}/UPDATE_IS_LOADING_FOR_GET_FORM`,
    UPDATE_IS_LOADING_FOR_CLEAR_FORM: `${moduleTypes.FORM_SUBMIT}/UPDATE_IS_LOADING_FOR_CLEAR_FORM`,
    UPDATE_IS_LOADING_FOR_SUBMIT_FORM: `${moduleTypes.FORM_SUBMIT}/UPDATE_IS_LOADING_FOR_SUBMIT_FORM`,
    UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY: `${moduleTypes.FORM_SUBMIT}/UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY`,
    UPDATE_IS_CLEAR_CONFIRMATION_DIALOG_OPEN: `${moduleTypes.FORM_SUBMIT}/UPDATE_IS_CLEAR_CONFIRMATION_DIALOG_OPEN`,
}

const FormSubmitActionTypes = {
    create: `${moduleTypes.FORM_SUBMIT}/create`,
    findOne: `${moduleTypes.FORM_SUBMIT}/findOne`,
    uploadSignedUrl: `${moduleTypes.FORM_SUBMIT}/uploadSignedUrl`,
}

module.exports = {
    FormSubmitActionTypes,
    FormSubmitReducerTypes
};