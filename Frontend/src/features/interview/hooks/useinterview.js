import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  getResumePdf,
} from "../services/interview.api";

import { useContext, useEffect } from "react";

import { InterviewContext } from "../interview.context";

import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,

    downloading,
    setDownloading,

    report,
    setReport,

    reports,
    setReports,
  } = context;

  // =========================================
  // GENERATE INTERVIEW REPORT
  // =========================================

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (error) {
      console.error("Error generating interview report:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // GET REPORT BY ID
  // =========================================

  const getReportById = async (interviewReportId) => {
    setLoading(true);

    try {
      const response = await getInterviewReportById(interviewReportId);

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (error) {
      console.error("Error fetching interview report:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // GET ALL REPORTS
  // =========================================

  const getReports = async () => {
    setLoading(true);

    try {
      const response = await getAllInterviewReports();

      setReports(response.interviewReports || []);

      return response.interviewReports || [];
    } catch (error) {
      console.error("Error fetching interview reports:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // DOWNLOAD RESUME PDF
  // =========================================

  const downloadResume = async (interviewReportId) => {
    setDownloading(true);

    try {
      const response = await getResumePdf(interviewReportId);

      const pdfBlob = new Blob([response], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `resume_${interviewReportId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume PDF:", error);

      throw error;
    } finally {
      setDownloading(false);
    }
  };

  // =========================================
  // LOAD REPORTS / REPORT
  // =========================================

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  // =========================================
  // RETURN
  // =========================================

  return {
    loading,

    downloading,

    report,

    reports,

    generateReport,

    getReportById,

    getReports,

    downloadResume,
  };
};
