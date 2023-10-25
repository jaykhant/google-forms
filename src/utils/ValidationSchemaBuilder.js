import * as yup from 'yup'
import { QUESTION_TYPES } from '../Constants';

const build = (questions) => {
    const validation = {}

    questions.forEach((question, index) => {
        switch (question.type) {
            case QUESTION_TYPES.SHORT_ANSWER:
                validation[index] = question.isRequired ? yup.string().required('This is required field') : yup.string().optional()
                break;
            case QUESTION_TYPES.PARAGRAPH:
                validation[index] = question.isRequired ? yup.string().required('This is required field') : yup.string().optional()
                break;
            case QUESTION_TYPES.DROP_DOWN:
                validation[index] = question.isRequired ? yup.string().required('This is required field') : yup.string().optional()
                break;
            case QUESTION_TYPES.MULTIPLE_CHOICE:
                validation[index] = question.isRequired ?
                    yup.string().required('This is required field') :
                    yup.string().optional()
                break
            case QUESTION_TYPES.CHECKBOX:
                validation[index] = question.isRequired ?
                    yup.array().required().of(yup.string().required('This is required field')).min(1) :
                    yup.array().optional().of(yup.string().required('This is required field'))
                break
            case QUESTION_TYPES.FILE_UPLOAD:
                validation[index] = question.isRequired ?
                    yup.string().required() :
                    yup.string().optional()
                break
            case QUESTION_TYPES.DATE:
                validation[index] = question.isRequired ? yup.date().required('This is required field') : yup.date().optional()
                break
            case QUESTION_TYPES.TIME:
                validation[index] = question.isRequired ? yup.date().required('This is required field') : yup.date().optional()
                break
            default:
                throw new Error('Unknown question type: ', question.type)
        }
    });

    return yup.object(validation);
}

export default build