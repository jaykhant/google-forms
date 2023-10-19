import { FormSubmitReducerTypes } from "./type"

const initialState = {
    form: {},
    isLoadingForGetForm: false,
    isLoadingForClearForm: false,
    isLoadingForSubmitForm: false,
    isSubmitResponseSuccessfully:false,
    isClearFormConfirmationDialogOpen: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FormSubmitReducerTypes.SUBMIT_FORM: return {
            ...state,
            form: action.form
        }
        case FormSubmitReducerTypes.CLEAR_FORM: return {
            ...state,
            form: {}
        }
        case FormSubmitReducerTypes.SUBMIT_FORM_ANSWER:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.index),
                        {
                            ...state.form.questions[action.index],
                            [action.key]: action.value
                        },
                        ...state.form.questions.slice(action.index + 1)
                    ]
                }
            }
        case FormSubmitReducerTypes.UPDATE_IS_CLEAR_CONFIRMATION_DIALOG_OPEN: return {
            ...state,
            isClearFormConfirmationDialogOpen: action.isClearFormConfirmationDialogOpen
        }
        case FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_CLEAR_FORM: return {
            ...state,
            isLoadingForClearForm: action.isLoadingForClearForm
        }
        case FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM: return {
            ...state,
            isLoadingForGetForm: action.isLoadingForGetForm
        }
        case FormSubmitReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_FORM: return {
            ...state,
            isLoadingForSubmitForm: action.isLoadingForSubmitForm
        }
        case FormSubmitReducerTypes.UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY: return {
            ...state,
            isSubmitResponseSuccessfully: action.isSubmitResponseSuccessfully
        }
        default: return state
    }
}

export default reducer;