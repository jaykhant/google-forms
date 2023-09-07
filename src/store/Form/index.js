import { FormReducerTypes } from "./type"

const initialState = {
    forms: [],

    page: 1,
    totalData: -1,

    isLoadingForGetForm: false,
    isLoadingForDeleteForm: false,
    isLoadingForCreateForm: false,

    isDeleteConfirmationDialogOpen: false,
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
        case FormReducerTypes.UPDATE_IS_LOADING_FOR_CREATE_FORM: return {
            ...state,
            isLoadingForCreateForm: action.isLoadingForCreateForm
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
        default: return state
    }
}

export default reducer;