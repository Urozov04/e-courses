import Category from "../model/category.model.js";
import { catchError } from "../utils/error-response.js";
import { CategoryValidator } from "../validations/category.validation.js";

export class CategoryController {
  async create(req, res) {
    try {
      const { error, value } = CategoryValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const category = await Category.create(value);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: category,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAll(_, res) {
    try {
      const categorys = await Category.find().populate('course');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: categorys,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getById(req, res) {
    try {
      const category = await CategoryController.findById(res, req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: category,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateById(req, res) {
    try {
      const id = req.params.id;
      await CategoryController.findById(res, id);
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: updatedCategory,
      });
    } catch (error) {
        return catchError(res, 500, error.message)
    }
  }

  async deleteById(req, res) {
    try {
      const id = req.params.id;
      await CategoryController.findById(res, id);
      await Category.findByIdAndDelete(id);
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
      const category = await Category.findById(id).populate('course');
      if (!category) {
        return catchError(res, 404, 'Category not found');
      }
      return category;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
