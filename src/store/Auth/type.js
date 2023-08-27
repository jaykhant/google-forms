const auth = `auth`

const AuthReducerTypes = {
    UPDATE_SIGN_IN_FORM: `${auth}/UPDATE_SIGN_IN_FORM`,
    UPDATE_SIGN_UP_FORM: `${auth}/UPDATE_SIGN_UP_FORM`,
    RESET: `${auth}/RESET`,
    FORM_LOADING: `${auth}/FORM_LOADING`,
    FORM_ERROR: `${auth}/FORM_ERROR`,
    FORM_SUCCESS: `${auth}/FORM_SUCCESS`
}

const AuthActionTypes = {
    signIn: `${auth}/signIn`,
    signUp: `${auth}/signUp`,
}

module.exports = {
    AuthReducerTypes,
    AuthActionTypes
};