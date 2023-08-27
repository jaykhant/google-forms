import { AuthReducerTypes } from "./type";

const initialState = {
    signInForm: {
        email: '',
        password: '',
    },

    signUpForm: {
        name: '',
        email: '',
        password: '',
    },

    isFormLoading: false,
    formErrorMessage: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthReducerTypes.UPDATE_SIGN_IN_FORM: return {
            ...state,
            signInForm: {
                ...state.signInForm,
                [action.key]: action.value
            }
        }
        case AuthReducerTypes.UPDATE_SIGN_UP_FORM: return {
            ...state,
            signUpForm: {
                ...state.signUpForm,
                [action.key]: action.value
            }
        }
        case AuthReducerTypes.RESET: return {
            ...state,
            signUpForm: {
                name: '',
                email: '',
                password: '',
            },
            signInForm: {
                email: '',
                password: ''
            },
            isFormLoading: false,
            formErrorMessage: ''
        }
        case AuthReducerTypes.FORM_LOADING: return {
            ...state,
            isFormLoading: action.loading
        }
        case AuthReducerTypes.FORM_SUCCESS:
            return {
                ...state,
                formErrorMessage: action.errorMessage
            }
        case AuthReducerTypes.FORM_ERROR:
            return {
                ...state,
                formErrorMessage: action.errorMessage
            }
        default: return state
    }
}

export default reducer;