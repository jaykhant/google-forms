import Joi from "joi";

const create = {
    body: Joi.object().keys({
        formId: Joi.string().required(),
        answer: Joi.array().required().items(Joi.object({
            type: Joi.string().required(),
            question: Joi.string().required(),
            answer: Joi.string().optional(),
            answers: Joi.array().optional().items(Joi.string().required()),
            options: Joi.array().optional().items(Joi.string().required()),
            fileName: Joi.object().optional().keys({
                type: Joi.string().required(),
                fileName: Joi.string().required()
            }),
            dateTime: Joi.date().optional()
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