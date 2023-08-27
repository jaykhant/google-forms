import { AppReducerTypes } from "./type";

const initialState = {
    isLoggedIn: false,
    accessToken: '',
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AppReducerTypes.UPDATE_IS_LOGGED_IN: return {
            ...state,
            isLoggedIn: action.isLoggedIn
        }
        case AppReducerTypes.UPDATE_ACCESS_TOKEN: return {
            ...state,
            accessToken: action.accessToken
        }
        case AppReducerTypes.UPDATE_USER: return {
            ...state,
            user: action.user
        }
        default: return state
    }
}

export default reducer;