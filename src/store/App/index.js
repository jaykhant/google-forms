import { AppReducerTypes } from "./type";

const initialState = {
    isLoggedIn: false,
    accessToken: '',
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AppReducerTypes.LOGIN: return {
            ...state,
            isLoggedIn: action.isLoggedIn,
            accessToken: action.accessToken
        }
        case AppReducerTypes.LOGOUT: return {
            ...state,
            isLoggedIn: false,
            accessToken: '',
            user: {}
        }
        case AppReducerTypes.UPDATE_USER: return {
            ...state,
            user: action.user
        }
        default: return state
    }
}

export default reducer;