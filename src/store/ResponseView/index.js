import { ResponseViewReducerTypes } from "./type"

const initialState = {
    responses: [],

    page: -1,
    totalData: -1,
    isLoadingForGetResponse: false,
    isLoadingForSubmitResponse: false,

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
        case ResponseViewReducerTypes.UPDATE_IS_LOADING_FOR_SUBMIT_RESPONSE: return {
            ...state,
            isLoadingForSubmitResponse: action.isLoadingForSubmitResponse
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
        case ResponseViewReducerTypes.UPDATE_PAGES: return {
            ...state,
            page: action.page
        }
        case ResponseViewReducerTypes.UPDATE_TOTAL_DATA: return {
            ...state,
            totalData: action.totalData
        }
        case ResponseViewReducerTypes.CLEAR_RESPONSES: return {
            ...state,
            page: -1,
            totalData: -1,
            responses: [],
            isLoadingForGetResponse: false
        }
        default: return state
    }
}

export default reducer;