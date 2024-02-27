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

  static resetPasswordEmailRules() {
    return [
      body("token").notEmpty().withMessage("token cannot be empty"),
      body("password").notEmpty().withMessage("Password cannot be empty").isLength( { min:8, max:20 } ).withMessage("Password must be between 8 and 20 characters")
    ];
  }

  static resetPasswordRules() {
    return [
      body("oldPassword").notEmpty().withMessage("Old Password cannot be empty").isLength( { min:8, max:20 } ).withMessage("Old Password must be between 8 and 20 characters"),
      body("newPassword").notEmpty().withMessage("New Password cannot be empty").isLength( { min:8, max:20 } ).withMessage("New Password must be between 8 and 20 characters"),
      body("cnfPassword").notEmpty().withMessage("Confirm Password cannot be empty").isLength( { min:8, max:20 } ).withMessage("Confirm Password must be between 8 and 20 characters")
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
