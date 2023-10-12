import Joi from "joi";
import { QUESTION_TYPES, FILE_TYPES } from "../constants"

const questionsValidation = Joi.array().required().items(Joi.object({
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
    isRequired: Joi.boolean().required(),
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
    allowSpecificFileTypes: Joi.when('type', {
        "is": QUESTION_TYPES.FILE_UPLOAD,
        then: Joi.boolean().optional()
    }),
    fileType: Joi.when('type', {
        "is": QUESTION_TYPES.FILE_UPLOAD,
        then: Joi.when('allowSpecificFileTypes', {
            "is": true,
            then: Joi.array().required().items(Joi.string().required().valid(
                FILE_TYPES.AUDIO,
                FILE_TYPES.DOCUMENT,
                FILE_TYPES.IMAGE,
                FILE_TYPES.VIDEO
            ))
        })
    }),
    allowMaximumFileSize: Joi.when('type', {
        "is": QUESTION_TYPES.FILE_UPLOAD,
        then: Joi.number().required().valid(1, 5, 10)
    })
}))

const create = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().allow(''),
        questions: questionsValidation
    })
}

const update = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required().allow(''),
        questions: questionsValidation
    })
}

const findAll = {
    query: Joi.object().keys({
        page: Joi.number().required().min(1),
        size: Joi.number().required().min(1),
    })
}

const find = {
    id: Joi.string().required()
}

const remove = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
}

const updatestatus = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
}

export default {
    create,
    update,
    findAll,
    find,
    remove,
    updatestatus
}