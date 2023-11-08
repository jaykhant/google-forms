import { ShareFormReducerTypes } from './type'

const initialState = {
    form: {
        to: '',
        subject: 'Untitled form',
        message: "I've invited you to fill in a form:"
    },
    viewFormLink: '',

    isSelectEmail:false,
    isShareFormDialogOpen: false,
    isLoadingForShareForm: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ShareFormReducerTypes.UPDATE_FORM: return {
            ...state,
            form: {
                ...state.form,
                [action.key]: action.value
            }
        }
        case ShareFormReducerTypes.UPDATE_VIEW_FORM_LINK: return {
            ...state,
            viewFormLink: action.viewFormLink
        }
        case ShareFormReducerTypes.UPDATE_IS_SELECT_EMAIL: return {
            ...state,
            isSelectEmail: action.isSelectEmail
        }
        case ShareFormReducerTypes.UPDATE_IS_SHARE_FORM_DIALOG_OPEN: return {
            ...state,
            isShareFormDialogOpen: action.isShareFormDialogOpen
        }
        case ShareFormReducerTypes.UPDATE_IS_LOADING_FOR_SEND_FORM: return {
            ...state,
            isLoadingForShareForm: action.isLoadingForShareForm
        }
        default: return state
    }
}

export default reducer;