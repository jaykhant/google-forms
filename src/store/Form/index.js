import { QUESTION_TYPES } from "../../Constants"
import { FormReducerTypes } from "./type"

const initialState = {
    forms: [],

    page: -1,
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
                type: QUESTION_TYPES.MULTIPLE_CHOICE,
                question: '',
                options: ['Option 1'],
                isRequired: true
            },
        ]
    },
    isLoadingForUpdateForm: false,

    error: {
        type: '',
        message: '',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FormReducerTypes.SET_FORMS: return {
            ...state,
            forms: [...(state.page === 1 ? [] : state.forms), ...action.forms]
        }
        case FormReducerTypes.SET_ERROR_MESSAGE: return {
            ...state,
            error: action.error
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

        case FormReducerTypes.CLEAR_ERROR_MESSAGE: return {
            ...state,
            error: {
                type: '',
                message: '',
            }
        }
        case FormReducerTypes.CLEAR_FORMS: return {
            ...state,
            forms: [],
            page: -1,
            totalData: -1,
            isLoadingForGetForm: false
        }
        case FormReducerTypes.CLEAR_FORM: return {
            ...state,
            form: {},
        }
        case FormReducerTypes.SET_FORM: return {
            ...state,
            form: action.form
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
            if (action.key === 'type') {
                delete state.form.questions[action.questionIndex].options
                delete state.form.questions[action.questionIndex].allowSpecificFileTypes
                delete state.form.questions[action.questionIndex].fileType
                delete state.form.questions[action.questionIndex].allowMaximumFileSize
            }
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.questionIndex),
                        {
                            ...state.form.questions[action.questionIndex],
                            [action.key]: action.value
                        },
                        ...state.form.questions.slice(action.questionIndex + 1)
                    ]
                }
            }
        case FormReducerTypes.ADD_FORM_QUESTION:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions,
                        {
                            type: QUESTION_TYPES.MULTIPLE_CHOICE,
                            question: 'Untitled Question',
                            options: ['Option 1'],
                            isRequired: true
                        }
                    ]
                }
            }
        case FormReducerTypes.DELETE_FORM_QUESTION:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.deleteIndex),
                        ...state.form.questions.slice(action.deleteIndex + 1)
                    ]
                }
            }
        case FormReducerTypes.COPY_FORM_QUESTION:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.copyIndex),
                        action.question,
                        ...state.form.questions.slice(action.copyIndex)
                    ]
                }
            }
        case FormReducerTypes.ADD_FORM_QUESTION_OPTION:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.questionIndex),
                        {
                            ...state.form.questions[action.questionIndex],
                            options: state.form.questions[action.questionIndex].options ? [
                                ...state.form.questions[action.questionIndex].options,
                                `Option ${state.form.questions[action.questionIndex].options.length + 1}`
                            ] : ['Option 1']
                        },
                        ...state.form.questions.slice(action.questionIndex + 1)
                    ],
                }
            }
        case FormReducerTypes.UPDATE_FORM_QUESTION_OPTION:
            return {
                ...state,
                form: {
                    ...state.form,
                    questions: [
                        ...state.form.questions.slice(0, action.questionIndex),
                        {
                            ...state.form.questions[action.questionIndex],
                            options: [
                                ...state.form.questions[action.questionIndex].options.slice(0, action.optionIndex),
                                action.option,
                                ...state.form.questions[action.questionIndex].options.slice(action.optionIndex + 1)
                            ]
                        },
                        ...state.form.questions.slice(action.questionIndex + 1)
                    ]
                }
            }
        case FormReducerTypes.DELETE_FORM_QUESTION_OPTION: return {
            ...state,
            form: {
                ...state.form,
                questions: [
                    ...state.form.questions.slice(0, action.questionIndex),
                    {
                        ...state.form.questions[action.questionIndex],
                        options: [
                            ...state.form.questions[action.questionIndex].options.slice(0, action.optionIndex),
                            ...state.form.questions[action.questionIndex].options.slice(action.optionIndex + 1)
                        ]
                    },
                    ...state.form.questions.slice(action.questionIndex + 1)
                ]
            }
        }
        case FormReducerTypes.UPDATE_IS_LOADING_FOR_UPDATE_FORM: return {
            ...state,
            isLoadingForUpdateForm: action.isLoadingForUpdateForm
        }
        default: return state
    }
}

export default reducer;