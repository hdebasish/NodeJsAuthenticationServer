import express from "express";
import UserController from "./user.controller.js";
import Validator from "../../middleware/validator.middleware.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post(
  "/signup",
  Validator.userSignUpRules(),
  Validator.validate,
  (req, res, next) => {
    userController.signUp(req, res, next);
  }
);

userRouter.post(
  "/signin",
  Validator.userSignInRules(),
  Validator.validate,
  (req, res, next) => {
    userController.signIn(req, res, next);
  }
);

userRouter.post("/continuewithgoogle", (req, res, next) => {
  userController.continueWithGoogle(req, res, next);
});

userRouter.post("/sendverificationemail", (req, res, next) => {
  userController.sendVerificationEmail(req, res, next);
});

userRouter.post("/resetpassword", Validator.resetPasswordRules(), Validator.validate, (req, res, next) => {
  userController.resetPassword(req, res, next);
});

export default userRouter;
