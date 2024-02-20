import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters'],
    maxLength: [40, "Name can't be greater than 40 characters"],
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\./, "Please enter a valid email"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long"],
  },
});

export default userSchema;
