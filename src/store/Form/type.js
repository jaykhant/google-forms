const form = `form`

const FormReducerTypes = {
    SET_FORMS: `${form}/SET_FORMS`,
    UPDATE_TOTAL_DATA: `${form}/UPDATE_TOTAL_DATA`,
    UPDATE_PAGE: `${form}/UPDATE_PAGE`,
    UPDATE_IS_LOADING_FOR_GET_FORM: `${form}/UPDATE_IS_LOADING_FOR_GET_FORM`,
    UPDATE_IS_LOADING_FOR_DELETE_FORM: `${form}/UPDATE_IS_LOADING_FOR_DELETE_FORM`,
    UPDATE_IS_LOADING_FOR_CREATE_FORM: `${form}/UPDATE_IS_LOADING_FOR_CREATE_FORM`,
    FORM_DELETE_SUCCESS: `${form}/FORM_DELETE_SUCCESS`,
    UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN: `${form}/UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN`
}

const FormActionTypes = {
    findAll: `${form}/findAll`,
    delete: `${form}/delete`,
    create: `${form}/create`,
}

module.exports = {
    FormReducerTypes,
    FormActionTypes
};