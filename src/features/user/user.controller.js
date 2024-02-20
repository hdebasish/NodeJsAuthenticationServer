import UserRepository from "./user.repository.js";
import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import * as nodemailer from "nodemailer";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const userExists = await this.userRepository.findUserByEmail(email);

      if (userExists) {
        if (!userExists.password) {
          return res.status(400).send("Please continue with google");
        }
      }

      console.log(name, email, password);

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel(name, email, hashedPassword);

      const result = await this.userRepository.add(user);

      if (result) {
         res.status(201).send("User Registered Successfully");

         const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "codingninjas2k16@gmail.com",
            pass: "slwvvlczduktvhdj",
          },
        });
  
        const mailOptions = {
          from: "codingninjas2k16@gmail.com",
          to: email,
          subject: "Welcome "+ name +"! Your account has been created.",
          text: `Hello ${name}, \n\nYour account has been successfully created.`
        };

         await transporter.sendMail(mailOptions);

      } else {
        return res.status(400).send("Error Registering User");
      }
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .send("User not found, please register to continue");
      }

      if (!user.password) {
        return res.status(400).send("Please continue with google");
      }

      const verifiedUser = await bcrypt.compare(password, user.password);

      if (!verifiedUser) {
        return res.status(403).send("Incorrect email or password");
      }

      const token = jsonwebtoken.sign(
        { userID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
      );

      res.status(200).send(token);
    } catch (error) {
      next(error);
    }
  }

  async continueWithGoogle(req, res, next) {
    try {
      const token = req.body.token;

      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "124491993428-tevuraohdmlbmj92ndamn0j31am1epqf.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();

      console.log(payload);

      const name = payload.name;
      const email = payload.email;

      if (!payload.email_verified) {
        return res.status(400).send("User registration failed!");
      }

      if (!name || !email) {
        return res.status(400).send("Name and Email are required from google");
      }

      const user = await this.userRepository.findUserByEmail(email);

      if (user) {
        const token = jsonwebtoken.sign(
          { userID: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "4h" }
        );
        res.status(200).send(token);
      } else {
        const newUser = {
          name: name,
          email: email,
        };

        const result = await this.userRepository.add(newUser);

        const token = jsonwebtoken.sign(
          { userID: result._id },
          process.env.JWT_SECRET,
          { expiresIn: "4h" }
        );
        res.status(200).send(token);
      }
    } catch (error) {
      next(error);
    }
  }

  async sendVerificationEmail(req, res, next) {
    try {
      const email = req.body.email;

      if (!email) {
        return res.status(400).send("Email not received");
      }

      let user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .send("User not found, please register to continue");
      }

      if (!user.password) {
        return res.status(400).send("Can't reset your password. Please continue with google.");
      }

      const token = jsonwebtoken.sign(
        { userID: user._id },
        process.env.JWT_SECRET_MAIL,
        { expiresIn: "5m" }
      );

      const link = `http://localhost:5501/resetpassword.html?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "codingninjas2k16@gmail.com",
          pass: "slwvvlczduktvhdj",
        },
      });

      const mailOptions = {
        from: "codingninjas2k16@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Hello,\n\nPlease click on the following link to reset your password:\n${link}\n\nIf you did not request this, please ignore this email.`,
      };

      const result = await transporter.sendMail(mailOptions);

      if(result){
        return res.status(200).send("A password reset link has been sent to your registered Email ID.");
      }

      if (!user.password) {
        return res.status(400).send("Can't reset your password. Please continue with google.");
      }



    } catch (error) {
      next(error);
    }
  }


  async resetPassword(req, res, next){
    try {

      const token = req.body.token;
      const password =  req.body.password;

      const payload = jsonwebtoken.verify(token,process.env.JWT_SECRET_MAIL);
      
      const id = payload.userID;

      const user = await this.userRepository.findUserById(id);

      if(!user){
        return res.status(404).send("User Not Found");
      };

      const verifiedUser = await bcrypt.compare(password, user.password);

      if(verifiedUser){
        return res.status(400).send("Please provide a new password");
      }


      const hashedPassword = await bcrypt.hash(password, 10);

      const  updatedUser = await this.userRepository.updateUserPassword(id, hashedPassword);

      if(updatedUser){
        return res.status(201).send("Password updated successfully");
      }

      return res.status(400).send("Failed to update password");

      
    } catch (error) {
      next(error);
    }
  }
  
  
  
}
