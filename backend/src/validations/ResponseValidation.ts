import Joi from "joi";
import { QUESTION_TYPES, FILE_TYPES } from "../constants"

const create = {
    body: Joi.object().keys({
        formId: Joi.string().required(),
        answers: Joi.array().required().items(Joi.object({
            type: Joi.string().required().valid(
                QUESTION_TYPES.SHORT_ANSWER,
                QUESTION_TYPES.PARAGRAPH,
                QUESTION_TYPES.MULTIPLE_CHOICE,
                QUESTION_TYPES.CHECKBOX,
                QUESTION_TYPES.DROP_DOWN,
                QUESTION_TYPES.FILE_UPLOAD,
                QUESTION_TYPES.DATE,
                QUESTION_TYPES.TIME
            ),
            question: Joi.string().required(),
            answer: Joi.when('type', {
                "is": QUESTION_TYPES.SHORT_ANSWER,
                then: Joi.string().empty('').optional(),
                otherwise: Joi.when('type', {
                    "is": QUESTION_TYPES.PARAGRAPH,
                    then: Joi.string().empty('').optional(),
                    otherwise: Joi.when('type', {
                        "is": QUESTION_TYPES.DROP_DOWN,
                        then: Joi.string().empty('').optional(),
                        otherwise: Joi.when('type', {
                            "is": QUESTION_TYPES.MULTIPLE_CHOICE,
                            then: Joi.string().empty('').optional()
                        })
                    })
                })
            }).optional(),
            answers: Joi.when('type', {
                "is": QUESTION_TYPES.CHECKBOX,
                then: Joi.array().optional().items(Joi.string().optional())
            }).optional(),
            options: Joi.when('type', {
                "is": QUESTION_TYPES.MULTIPLE_CHOICE,
                then: Joi.array().required().items(Joi.string().required()),
                otherwise: Joi.when('type', {
                    "is": QUESTION_TYPES.DROP_DOWN,
                    then: Joi.array().required().items(Joi.string().required()),
                    otherwise: Joi.when('type', {
                        "is": QUESTION_TYPES.DROP_DOWN,
                        then: Joi.array().required().items(Joi.string().required()),
                    })
                })
            }),
            fileName: Joi.when('type', {
                "is": QUESTION_TYPES.FILE_UPLOAD,
                then: Joi.string().empty('').optional()
            }).optional(),
            fileType: Joi.when('type', {
                "is": QUESTION_TYPES.FILE_UPLOAD,
                then: Joi.string().required().valid(
                    FILE_TYPES.AUDIO,
                    FILE_TYPES.DOCUMENT,
                    FILE_TYPES.IMAGE,
                    FILE_TYPES.VIDEO
                ).allow('')
            }),
            dateTime: Joi.when('type', {
                "is": QUESTION_TYPES.DATE,
                then: Joi.date().allow(null).required(),
                otherwise: Joi.when('type', {
                    "is": QUESTION_TYPES.TIME,
                    then: Joi.date().allow(null).required()
                })
            }).optional()
        }))
    })
}

const find = {
    query: Joi.object().keys({
        formId: Joi.string().required(),
        page: Joi.number().required().min(1),
        size: Joi.number().required().min(1),
    })
}

const findResponseById = {
    id: Joi.string().required()
}

const generateSignedUrl = {
    query: Joi.object().keys({
        formId: Joi.string().required(),
        ext: Joi.string().required()
    })
}

export default {
    create,
    find,
    findResponseById,
    generateSignedUrl
}