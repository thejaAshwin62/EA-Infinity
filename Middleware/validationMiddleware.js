import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import User from "../Models/UserModels.js";
import Games from "../Models/GamesModel.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          return next(new NotFoundError(errorMessages[0]));
        }
        if (errorMessages[0].startsWith("not authorized")) {
          return next(
            new UnauthorizedError("not authorized to access this route")
          );
        }
        return next(new BadRequestError(errorMessages[0]));
      }
      next();
    },
  ];
};

export const validIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    console.log("Checking ID:", value); // Debug output

    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestError("invalid MongoDB id");
    }

    const game = await Games.findById(value);
    if (!game) {
      throw new NotFoundError(`no game found with id ${value}`);
    }

    const isAdmin = req.user.role === "admin";
    const isUser = req.user.userId === game.createdBy;
    if (!isAdmin && !isUser) {
      throw new UnauthorizedError("not authorized to access this route");
    }
  }),
]);


// Validation for register input
export const ValidateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

// Validation for login input
export const ValidateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

// Logout function
export const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// Validation for updating user input
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("status").notEmpty().withMessage("status is required"),
]);
