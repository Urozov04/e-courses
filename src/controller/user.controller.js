import User from '../model/user.model.js';
import { userValidator } from '../validations/user.validation.js';
import { catchError } from '../utils/error-response.js';
import { decode, encode } from '../utils/bcrypt-encrypt.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generate-token.js';
import { transporter } from '../utils/mailer.js';
import { otpGenerator } from '../utils/otp-generator.js';
import { getCache, setCache } from '../utils/cache.js';
import { refTokenwriteCookie } from '../utils/write-cookie.js';
import jwt from 'jsonwebtoken';

export class UserController {
  async createSuperAdmin(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }

      if (!value) {
        console.error('No value returned from validation');
        return res.status(400).json({ message: 'Validation failed, no data.' });
      }

      const { fullName, email, password } = value;

      const checkSuperAdmin = await User.findOne({ role: 'superadmin' });
      if (checkSuperAdmin) {
        return catchError(res, 409, 'superadmin already exist');
      }
      const hashedPassword = await encode(password, 7);
      console.log(hashedPassword);
      const newSuperAdmin = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: 'superadmin',
      });
      return res.status(201).json({
        statuscode: 201,
        message: 'succes',
        data: newSuperAdmin,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async createAdmin(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { fullName, email, password } = value;
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return catchError(res, 409, 'Email already exist');
      }
      const hashedPassword = await encode(password, 7);
      const newAdmin = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: 'admin',
      });
      return res.status(201).json({
        statuscode: 201,
        message: 'succes',
        data: newAdmin,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async createUser(req, res) {
    try {
      const { error, value } = userValidator(req.body);

      if (error) {
        return catchError(res, 400, error);
      }

      const { fullName, email, password } = value;
      const hashedPassword = await encode(password, 7);

      const admin = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: 'user',
      });

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: admin,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async createAuthor(req, res) {
    try {
      const { error, value } = userValidator(req.body);

      if (error) {
        return catchError(res, 400, error);
      }

      const { fullName, email, password } = value;
      const hashedPassword = await encode(password, 7);

      const author = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: 'author',
      });

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: author,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAllAdmins(req, res) {
    try {
      const users = await User.find({ role: 'admin' });
      return res.status(200).json({
        statuscode: 200,
        message: 'succes',
        data: users,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find({ role: 'user' })
      .populate({
        path: 'enrollment',
        populate: {
          path: 'courseId',
          model: 'Course'
        }
      });
      return res.status(200).json({
        statuscode: 200,
        message: 'succes',
        data: users,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAllAuthors(req, res) {
    try {
      const authors = await User.find({ role: 'author' }).populate('course');
      return res.status(200).json({
        statuscode: 200,
        message: 'succes',
        data: authors,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getById(req, res) {
    try {
      const admin = await UserController.findById(res, req.params.id);

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: admin,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserController.findById(res, id);
      if (req.body.email) {
        const existEmail = await User.findOne({
          email: req.body.email,
        });

        if (existEmail && existEmail._id != id) {
          return catchError(res, 409, 'Email already exists');
        }
      }
      let hashedPassword = user.hashedPassword;
      if (req.body.password) {
        hashedPassword = encode(req.body.password, 7);
        delete req.body.password;
      }
      const updateUser = await User.findByIdAndUpdate(id, req.body, {
        ...req.body,
        hashedPassword,
      });
      return res.status(200).json({
        statuscode: 200,
        message: 'succes',
        data: updateUser,
      });
    } catch (error) {
      console.log(error.message);
      return catchError(res, 500, error.message);
    }
  }

  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserController.findById(res, id);

      if (user.role === 'superadmin') {
        return catchError(res, 400, 'DANGGG\nSuper admin cannot be delete');
      }

      await User.findByIdAndDelete(id);

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async singinAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return catchError(res, 404, 'user not found');
      }
      const ismatchPassword = await decode(password, user.password);
      console.log(ismatchPassword);
      if (!ismatchPassword) {
        return catchError(res, 400, 'invalid password');
      }
      const otp = otpGenerator();
      const mailMessage = {
        from: process.env.SMTP_USER,
        to: 'durozov46@gmail.com',
        subject: 'Viscal Barca',
        text: otp,
      };
      transporter.sendMail(mailMessage, function (err, info) {
        if (err) {
          return catchError(res, 400, `Error on sending to mail: ${err}`);
        } else {
          console.log(info);
          setCache(user.email, otp);
        }
      });
      return res.status(200).json({
        statuscode: 200,
        message: 'succes',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async confirmsignIn(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return catchError(res, 404, 'User not found');
      }

      const otpcache = getCache(email);
      if (!otpcache || otp != otpcache) {
        return catchError(res, 400, 'OTP expired');
      }

      const payload = { id: user._id, role: user.role };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      refTokenwriteCookie(res, 'refreshTokenAdmin', refreshToken);

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: accessToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async signoutAdmin(req, res) {
    try {
      const refreshToken = req.cookies.refreshTokenAdmin;
      if (!refreshToken) {
        return catchError(res, 401, 'refresh token not found');
      }

      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );

      if (!decodedToken) {
        return catchError(res, 401, 'refresh token expired');
      }

      res.clearCookie('refreshTokenAdmin');

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async accessToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshTokenAdmin;

      if (!refreshToken) {
        return catchError(res, 401, 'refresh token expired');
      }

      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );

      const payload = { id: decodedToken.id, role: decodedToken.role };
      const accessToken = generateAccessToken(payload);

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: accessToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  static async findById(res, id) {
    try {
      const admin = await User.findById(id).populate('course')
      .populate({
        path: 'enrollment',
        populate: {
          path: 'courseId',
          model: 'Course'
        }
      })
      if (!admin) {
        return catchError(res, 404, `Admin not found by ID ${id}`);
      }
      return admin;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
