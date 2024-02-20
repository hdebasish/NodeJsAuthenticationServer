import "./env.js";
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dashboardRouter from "./src/features/dashboard/dashboard.routes.js";
import mongoose from "mongoose";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cookieParser());

// cors config
app.use( cors() );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes to user
app.use("/api/users", userRouter);

// routes to dashboard
app.use("/api/dashboard", jwtAuth, dashboardRouter);

// error handling middleware
app.use((err, req, res, next) => {

  if (err) {

    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(err.message);
    }

    console.log(err);
    res.status(500).send("Something went wrong, Please try later");
  }
});

// middleware to handle 404 request
app.use((req, res) => {
  res.status(404).send({ message: "404 Not Found!" });
});
