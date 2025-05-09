import { ReviewValidator } from "../validations/review.validation.js";
import Review from "../model/reviews.model.js";


export class ReviewController {
  async create(req, res) {
    try {
      const { error, value } = ReviewValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const enrollment = await Review.create(value);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: enrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAll(_, res) {
    try {
      const review = await Review.find().populate('userId').populate('courseId');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: review,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getById(req, res) {
    try {
      const review = await ReviewController.findById(res, req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: review,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateById(req, res) {
    try {
      const id = req.params.id;
      await ReviewController.findById(res, id);
      const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: updatedReview,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteById(req, res) {
    try {
      const id = req.params.id;
      await ReviewController.findById(res, id);
      await Review.findByIdAndDelete(id);
      return res.status(200).json({
        statuscode: 200,
        message: 'success',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  static async findById(res, id) {
    try {
      const review = await Review.findById(id).populate('userId').populate('courseId');
      if (!review) {
        return catchError(res, 404, 'Enrollment not found');
      }
      return review;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}