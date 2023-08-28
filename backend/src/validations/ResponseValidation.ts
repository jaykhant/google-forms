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
        formId: Joi.string().required(),
        page: Joi.number().required().min(1),
        size: Joi.number().required().min(1),
    })
}

const findResponseById = {
        id: Joi.string().required()

}

export default {
    create,
    find,
    findResponseById
}