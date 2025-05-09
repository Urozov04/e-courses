import Joi from "joi";

export const userValidator = (data) => {
  const user = Joi.object({
    fullName: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(10).max(50).required(),
    password: Joi.string().min(8).max(22).required(),
  });
  return user.validate(data);
};
