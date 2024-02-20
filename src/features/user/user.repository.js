import mongoose from "mongoose";
import userSchema from "./user.schema.js";

const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async add(user) {
    try {
      const newUser = new UserModel(user);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      return await UserModel.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(id, password){

    try {

      return await UserModel.findByIdAndUpdate(id, {password : password});
      
    } catch (error) {
      throw error;
    }

  }
}
