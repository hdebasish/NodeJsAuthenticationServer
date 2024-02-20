import mongoose from "mongoose";

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected using Mongoose");
  } catch (error) {
    throw error;
  }
};

export default connectUsingMongoose;
