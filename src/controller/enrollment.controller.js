import Enrollment from "../model/enrollment.model.js";
import { catchError } from "../utils/error-response.js";
import { EnrollmentValidator } from "../validations/enrollment.validation.js";




export class EnrollmentController {
  async create(req, res) {
    try {
      const { error, value } = EnrollmentValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const enrollment = await Enrollment.create(value);
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
      const enrollment = await Enrollment.find().populate('userId').populate('courseId');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: enrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getById(req, res) {
    try {
      const enrollment = await EnrollmentController.findById(res, req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: enrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateById(req, res) {
    try {
      const id = req.params.id;
      await EnrollmentController.findById(res, id);
      const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: updatedEnrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteById(req, res) {
    try {
      const id = req.params.id;
      await EnrollmentController.findById(res, id);
      await Enrollment.findByIdAndDelete(id);
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
      const enrollment = await Enrollment.findById(id).populate('userId').populate('courseId');
      if (!enrollment) {
        return catchError(res, 404, 'Enrollment not found');
      }
      return enrollment;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}