import { ResponseViewReducerTypes } from "./type"

const initialState = {
    responses: [],

    page: 1,
    totalData: -1,
    isLoadingForGetResponse: true,

    response: {},
    validationSchema: {},
    isLoadingForFileUpload: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_GET_RESPONSE: return {
            ...state,
            isLoadingForGetResponse: action.isLoadingForGetResponse
        }
        case ResponseViewReducerTypes.SET_RESPONSES: return {
            ...state,
            responses: [...(state.page === 1 ? [] : state.responses), ...action.responses]
        }
        case ResponseViewReducerTypes.SET_RESPONSE: return {
            ...state,
            response: action.response
        }
        case ResponseViewReducerTypes.SET_VALIDATION_SCHEMA: return {
            ...state,
            validationSchema: action.validationSchema
        }
        case ResponseViewReducerTypes.UPDATE_ANSWER_IN_RESPONSE: return {
            ...state,
            response: {
                ...state.response,
                answers: [
                    ...state.response.answers.slice(0, action.questionIndex),
                    {
                        ...state.response.answers[action.questionIndex],
                        [action.key]: action.value
                    },
                    ...state.response.answers.slice(action.questionIndex + 1)
                ]
            }
        }
        case ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_FILE_UPLOAD: return {
            ...state,
            isLoadingForFileUpload: action.isLoadingForFileUpload
        }
        default: return state
    }
}

export default reducer;