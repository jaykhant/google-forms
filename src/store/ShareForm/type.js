const { moduleTypes } = require('../type')

const ShareFormReducerTypes = {
    UPDATE_FORM: `${moduleTypes.SHARE_FORM}/UPDATE_FORM`,
    UPDATE_VIEW_FORM_LINK: `${moduleTypes.SHARE_FORM}/UPDATE_VIEW_FORM_LINK`,
    UPDATE_IS_SELECT_EMAIL: `${moduleTypes.SHARE_FORM}/UPDATE_IS_SELECT_EMAIL`,
    UPDATE_IS_SHARE_FORM_DIALOG_OPEN: `${moduleTypes.SHARE_FORM}/UPDATE_IS_SHARE_FORM_DIALOG_OPEN`,
    UPDATE_IS_LOADING_FOR_SEND_FORM: `${moduleTypes.SHARE_FORM}/UPDATE_IS_LOADING_FOR_SEND_FORM`,
}

module.exports = {
    ShareFormReducerTypes
};