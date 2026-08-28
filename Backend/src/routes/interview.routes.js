const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const interviewController = require("../controllers/interview.controller");

const interviewRouter = express.Router();

const upload = require("../middleware/file.middleware");


// 1. Generate interview report

interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.generateInterViewReportController
);


// 2. Get report by ID

interviewRouter.get(
    "/report/:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportByIdController
);


// 3. Get all reports

interviewRouter.get(
    "/",
    authMiddleware.authUser,
    interviewController.getAllInterviewReportsController
);


// 4. Generate / download resume PDF

interviewRouter.get(
    "/:interviewId/resume",
    authMiddleware.authUser,
    interviewController.generateResumePdfController
);


module.exports = interviewRouter;