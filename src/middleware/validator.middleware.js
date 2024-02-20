import { body, validationResult } from "express-validator";

export default class Validator {
  static userSignUpRules() {
    return [
      body("name").notEmpty().withMessage("Name cannot be empty"),
      body("email").notEmpty().withMessage("Email cannot be empty"),
      body("password").notEmpty().withMessage("Password cannot be empty").isLength( { min:8, max:20 } ).withMessage("Password must be between 8 and 20 characters"),
    ];
  }

  static userSignInRules() {
    return [
      body("email").notEmpty().withMessage("Email cannot be empty"),
      body("password").notEmpty().withMessage("Password cannot be empty"),
    ];
  }

  static resetPasswordRules() {
    return [
      body("token").notEmpty().withMessage("token cannot be empty"),
      body("password").notEmpty().withMessage("Password cannot be empty").isLength( { min:8, max:20 } ).withMessage("Password must be between 8 and 20 characters")
    ];
  }

  static validate(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.path]: err.msg }));
      res.status(422).json({ errors: extractedErrors });
    }
  }
}
