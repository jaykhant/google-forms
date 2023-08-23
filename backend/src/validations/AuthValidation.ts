import Joi from "joi";

const signUp = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}

const signIn = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}

export default {
    signUp,
    signIn
}