import { QUESTION_TYPES } from "../../Constants"
import { FormReducerTypes } from "./type"

const initialState = {
    forms: [],

    page: 1,
    totalData: -1,
    isLoadingForGetForm: false,

    isLoadingForDeleteForm: false,
    isDeleteConfirmationDialogOpen: false,

    isLoadingForCreateForm: false,
    form: {
        title: '',
        description: '',
        questions: [
            {
                question: '',
                type: QUESTION_TYPES.SHORT_ANSWER
            },
        ]
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FormReducerTypes.SET_FORMS: return {
            ...state,
            forms: [...(state.page === 1 ? [] : state.forms), ...action.forms]
        }
        case FormReducerTypes.UPDATE_PAGE: return {
            ...state,
            page: action.page
        }
        case FormReducerTypes.UPDATE_TOTAL_DATA: return {
            ...state,
            totalData: action.totalData
        }
        case FormReducerTypes.UPDATE_IS_LOADING_FOR_GET_FORM: return {
            ...state,
            isLoadingForGetForm: action.isLoadingForGetForm
        }

        case FormReducerTypes.UPDATE_IS_LOADING_FOR_DELETE_FORM: return {
            ...state,
            isLoadingForDeleteForm: action.isLoadingForDeleteForm
        }
        case FormReducerTypes.UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN: return {
            ...state,
            isDeleteConfirmationDialogOpen: action.isDeleteConfirmationDialogOpen
        }
        case FormReducerTypes.FORM_DELETE_SUCCESS: return {
            ...state,
            forms: [
                ...state.forms.slice(0, action.deleteIndex),
                ...state.forms.slice(action.deleteIndex + 1)
            ]
        }

        case FormReducerTypes.UPDATE_IS_LOADING_FOR_CREATE_FORM: return {
            ...state,
            isLoadingForCreateForm: action.isLoadingForCreateForm
        }
        case FormReducerTypes.UPDATE_FORM: return {
            ...state,
            form: {
                ...state.form,
                [action.key]: action.value
            }
        }
        case FormReducerTypes.UPDATE_FORM_QUESTION:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.index - 1),
                        {
                            ...state.form.questions[action.index],
                            [action.key]: action.value
                        },
                        ...state.form.questions.slice(action.index + 1)
                    ]
                }
            }
        case FormReducerTypes.ADD_FORM_QUESTION: return {
            ...state,
            form: {
                ...state.form,
                questions: [
                    ...state.form.questions, {
                        question: '',
                        type: QUESTION_TYPES.SHORT_ANSWER
                    }
                ]
            }
        }
        default: return state
    }
}

export default reducer;