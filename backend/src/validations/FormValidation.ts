import Joi from "joi";

const create = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().allow(''),
        questions: Joi.array().required().items(Joi.object({
            type: Joi.string().required(),
            question: Joi.string().required(),
            options: Joi.array().optional().items(Joi.string().required()),
            isRequired: Joi.boolean().required()
        }))
    })
}

const update = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required().allow(''),
        questions: Joi.array().required().items(Joi.object({
            type: Joi.string().required(),
            question: Joi.string().required(),
            options: Joi.array().optional().items(Joi.string().required()),
            isRequired: Joi.boolean().required()
        }))
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