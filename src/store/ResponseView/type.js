const { moduleTypes } = require('../type')

const ResponseViewReducerTypes = {
    UPDATE_IS_LOADING_FOR_GET_RESPONSE: `${moduleTypes.RESPONSE_VIEW}/UPDATE_IS_LOADING_FOR_GET_RESPONSE`,
    SET_RESPONSES: `${moduleTypes.RESPONSE_VIEW}/SET_RESPONSES`,
    SET_RESPONSE: `${moduleTypes.RESPONSE_VIEW}/SET_RESPONSE`,
    SET_VALIDATION_SCHEMA: `${moduleTypes.RESPONSE_VIEW}/SET_VALIDATION_SCHEMA`,

    UPDATE_ANSWER_IN_RESPONSE: `${moduleTypes.RESPONSE_VIEW}/UPDATE_ANSWER_IN_RESPONSE`,
    UPDATE_IS_LOADING_FOR_FILE_UPLOAD: `${moduleTypes.RESPONSE_VIEW}/UPDATE_IS_LOADING_FOR_FILE_UPLOAD`,
}

const ResponseViewActionTypes = {
    findAll: `${moduleTypes.RESPONSE_VIEW}/findAll`,
    findOne: `${moduleTypes.RESPONSE_VIEW}/findOne`,
    findOneForm: `${moduleTypes.RESPONSE_VIEW}/findOneForm`,
    uploadFile: `${moduleTypes.RESPONSE_VIEW}/uploadFile`
}

module.exports = {
    ResponseViewReducerTypes,
    ResponseViewActionTypes
};