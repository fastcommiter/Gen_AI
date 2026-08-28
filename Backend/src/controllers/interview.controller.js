const pdfParse = require("pdf-parse");

const { generateInterviewReport ,generateResumePdf} = require("../services/ai.service");

const interviewReportModel = require("../models/interviewReport.model");

// Generate Interview Report

async function generateInterViewReportController(req, res) {

    try {

        const {
            selfDescription,
            jobDescription
        } = req.body;


        // Resume OR Self Description required

        if (
            !req.file &&
            !selfDescription?.trim()
        ) {

            return res.status(400).json({
                message:
                    "Resume or self description is required"
            });

        }


        let resumeText = "";


        // If resume exists, extract text

        if (req.file) {

            const resumeContent = await (
                new pdfParse.PDFParse(
                    Uint8Array.from(req.file.buffer)
                )
            ).getText();

            resumeText = resumeContent.text;

        }


        // Generate report using AI

        const interViewReportByAi =
            await generateInterviewReport({

                resume: resumeText,

                selfDescription,

                jobDescription

            });


        // Save report

        const interViewReport =
            await interviewReportModel.create({

                user: req.user.id,

                resume: resumeText,

                selfDescription,

                jobDescription,

                ...interViewReportByAi

            });


        // Send report to frontend

        res.status(201).json({

            message:
                "Interview Report Generated Successfully",

            interviewReport:
                interViewReport

        });

    } catch (error) {

        console.error(
            "Generate Report Error:",
            error
        );

        res.status(500).json({

            message:
                "Error generating interview report",

            error:
                error.message

        });

    }
}



// Get Report By ID

async function getInterviewReportByIdController(
    req,
    res
) {

    try {

        const {
            interviewId
        } = req.params;


        const interviewReport =
            await interviewReportModel.findOne({

                _id: interviewId,

                user: req.user.id

            });


        if (!interviewReport) {

            return res.status(404).json({

                message:
                    "Interview report not found"

            });

        }


        res.status(200).json({

            message:
                "Interview report fetched successfully.",

            interviewReport

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Error fetching interview report",

            error:
                error.message

        });

    }
}



// Get All Reports

async function getAllInterviewReportsController(
    req,
    res
) {

    try {

        const interviewReports =
            await interviewReportModel

                .find({
                    user: req.user.id
                })

                .sort({
                    createdAt: -1
                })

                .select(
                    "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
                );


        res.status(200).json({

            message:
                "Interview reports fetched successfully",

            interviewReports

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Error fetching interview reports",

            error:
                error.message

        });

    }
}


async function generateResumePdfController(req, res) {

    try {

        const { interviewId } = req.params;


        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewId,
                user: req.user.id
            });


        if (!interviewReport) {

            return res.status(404).json({
                message: "Interview report not found"
            });

        }


        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport;


        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        });


        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition":
                `attachment; filename=resume_${interviewId}.pdf`
        });


        res.send(pdfBuffer);

    } catch (error) {

        console.error(
            "Generate Resume PDF Error:",
            error
        );

        res.status(500).json({

            message: "Error generating resume PDF",

            error: error.message

        });

    }
}

module.exports = {

    generateInterViewReportController,

    getInterviewReportByIdController,

    getAllInterviewReportsController,

    generateResumePdfController

};