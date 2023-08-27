import Joi from "joi";

const create = {
    body: Joi.object().keys({
        formId: Joi.string().required(),
        answer: Joi.array().required().items(Joi.object({
            question: Joi.string().required(),
            answer: Joi.string().required()
        }))
    })
}

const find = {
    query: Joi.object().keys({
        formId: Joi.string().required()
    })
}

const findResponseById = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
}

export default {
    create,
    find,
    findResponseById
}