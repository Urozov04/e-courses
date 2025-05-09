import Joi from 'joi';

export const ReviewValidator = (data) => {
  const review = Joi.object({
    userId: Joi.string().required(),
    courseId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(5).max(500).required(),
  });
  return review.validate(data);
};
