import Course from "../model/course.model.js";
import { catchError } from "../utils/error-response.js";
import { CourseValidator } from "../validations/course.validation.js";

export class CourseController {
  async create(req, res) {
    try {
      const { error, value } = CourseValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const course = await Course.create(value);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAll(_, res) {
    try {
      const courses = await Course.find()
        .populate('category')
        .populate('author');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: courses,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getByFilter(req, res) {
    try {
      const { category, price } = req.query;
      const categoryData = await Category.findOne({ name: category });
      const courses = await Course.find({
        price: parseFloat(price),
        categoryId: categoryData._id,
      })
        .populate('categoryId')
        .populate('userId');

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: courses,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getById(req, res) {
    try {
      const course = await CourseController.findById(res, req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateById(req, res) {
    try {
      const id = req.params.id;
      await CourseController.findById(res, id);
      const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: updatedCourse,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteById(req, res) {
    try {
      const id = req.params.id;
      await CourseController.findById(res, id);
      await Course.findByIdAndDelete(id);
      return res.status(200).json({
        statuscode: 200,
        message: 'succes',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  static async findById(res, id) {
    try {
      const course = await Course.findById(id)
        .populate('category')
        .populate('author');
      if (!course) {
        return catchError(res, 404, 'Course not found');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
