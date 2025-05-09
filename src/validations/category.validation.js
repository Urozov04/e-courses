import Joi from "joi";

export const CategoryValidator = (data) => {
    const category = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    })
    return category.validate(data)
}