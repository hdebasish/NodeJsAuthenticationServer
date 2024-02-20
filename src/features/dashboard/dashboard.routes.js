import express from "express";
import DashboardController from "./dashboard.controller.js";

const dashboardRouter = express.Router();

const dashboardController = new DashboardController();


dashboardRouter.get("/", (req, res, next) => {
  dashboardController.index(req, res, next);
});

export default dashboardRouter;
