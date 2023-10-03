import Joi from "joi";
import { QUESTION_TYPES, FILE_TYPES } from "../constants"

const create = {
    body: Joi.object().keys({
        formId: Joi.string().required(),
        answer: Joi.array().required().items(Joi.object({
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
                then: Joi.string().required(),
                otherwise: Joi.when('type', {
                    "is": QUESTION_TYPES.PARAGRAPH,
                    then: Joi.string().required(),
                    otherwise: Joi.when('type', {
                        "is": QUESTION_TYPES.CHECKBOX,
                        then: Joi.string().required(),
                        otherwise: Joi.when('type', {
                            "is": QUESTION_TYPES.DROP_DOWN,
                            then: Joi.string().required(),
                        })
                    })
                })
            }),
            answers: Joi.when('type', {
                "is": QUESTION_TYPES.MULTIPLE_CHOICE,
                then: Joi.array().required().items(Joi.string().required())
            }),
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
                then: Joi.string().required()
            }),
            fileType: Joi.when('type', {
                "is": QUESTION_TYPES.FILE_UPLOAD,
                then: Joi.array().required().items(Joi.string().required().valid(
                    FILE_TYPES.AUDIO,
                    FILE_TYPES.DOC,
                    FILE_TYPES.IMAGE,
                    FILE_TYPES.VIDEO
                ))
            }),
            dateTime: Joi.when('type', {
                "is": QUESTION_TYPES.DATE,
                then: Joi.date().required(),
                otherwise: Joi.when('type', {
                    "is": QUESTION_TYPES.TIME,
                    then: Joi.date().required()
                })
            })
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