import Joi from "joi"

export const EnrollmentValidator = (data) => {
    const enrollment = Joi.object({
        userId: Joi.string().required(),
        courseId: Joi.string().required()
    })
    return enrollment.validate(data)
}