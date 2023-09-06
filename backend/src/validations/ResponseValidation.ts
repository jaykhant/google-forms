import Joi from "joi";

const create = {
    body: Joi.object().keys({
        formId: Joi.string().required(),
        answer: Joi.array().required().items(Joi.object({
            question: Joi.string().required(),
            answer: Joi.string().optional(),
            Option: Joi.array().optional(),
            fileName: Joi.string().optional(),
            date: Joi.date().optional(),
            time: Joi.date().optional()
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