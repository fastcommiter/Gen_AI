import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useinterview";
import Loading from "../../auth/components/Loading";
import "../style/home.scss";

export default function Home() {
  const navigate = useNavigate();

  const { loading, reports, generateReport } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);

  const resumeInputRef = useRef(null);

  // =========================================================
  // RESUME SELECT
  // =========================================================

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file.");

      e.target.value = "";

      return;
    }

    // 5 MB limit

    if (file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5MB.");

      e.target.value = "";

      return;
    }

    setSelectedResume(file);
  };

  // =========================================================
  // REMOVE RESUME
  // =========================================================

  const removeResume = () => {
    setSelectedResume(null);

    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  // =========================================================
  // GENERATE INTERVIEW REPORT
  // =========================================================

  const handleGenerateReport = async () => {
    if (!selectedResume && !selfDescription.trim()) {
      alert("Please upload a resume or enter your self-description.");

      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");

      return;
    }

    try {
      const response = await generateReport({
        jobDescription,

        selfDescription,

        resumeFile: selectedResume,
      });

      if (response?._id) {
        navigate(`/interview/${response._id}`);
      }
    } catch (error) {
      console.error("Error generating interview report:", error);

      alert(
        error?.response?.data?.message || "Error generating interview report",
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return <Loading text="Loading your interview strategy..." />;
  }

  // =========================================================
  // HOME
  // =========================================================

  return (
    <main className="home-page">
      {/* =================================================
                HEADER
            ================================================= */}

      <header className="page-header">
        <h1>
          Prepare for your
          <span className="highlight"> next interview</span>
        </h1>

        <p>
          Get a personalized interview strategy based on your profile and target
          role.
        </p>
      </header>

      {/* =================================================
                MAIN CARD
            ================================================= */}

      <section className="interview-card">
        <div className="interview-card__body">
          {/* =================================================
                        JOB DESCRIPTION
                    ================================================= */}

          <div className="panel panel--left">
            <div className="panel__header">
              <span className="panel__icon">✦</span>

              <h2>Target Job</h2>
            </div>

            <div className="section-label">
              Job Description
              <span className="badge badge--required">Required</span>
            </div>

            <textarea
              className="panel__textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />

            <div className="char-counter">
              {jobDescription.length} characters
            </div>
          </div>

          <div className="panel-divider"></div>

          {/* =================================================
                        PROFILE
                    ================================================= */}

          <div className="panel panel--right">
            <div className="panel__header">
              <span className="panel__icon">♙</span>

              <h2>Your Profile</h2>
            </div>

            {/* =================================================
                            RESUME
                        ================================================= */}

            <div className="upload-section">
              <div className="section-label">
                Upload Resume
                <span className="badge badge--best">Best Results</span>
              </div>

              {!selectedResume ? (
                <label className="dropzone" htmlFor="resume">
                  <span className="dropzone__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v12" />
                      <polyline points="7 8 12 3 17 8" />
                      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                    </svg>
                  </span>

                  <p className="dropzone__title">
                    Click to upload or drag &amp; drop
                  </p>

                  <p className="dropzone__subtitle">PDF or DOCX (Max 5MB)</p>

                  <input
                    ref={resumeInputRef}
                    id="resume"
                    name="resume"
                    type="file"
                    hidden
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                  />
                </label>
              ) : (
                <div className="selected-resume">
                  <div className="selected-resume__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>

                  <div className="selected-resume__info">
                    <span className="selected-resume__name">
                      {selectedResume.name}
                    </span>

                    <span className="selected-resume__size">
                      {(selectedResume.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>

                  <button
                    type="button"
                    className="selected-resume__remove"
                    onClick={removeResume}
                    aria-label="Remove resume"
                    title="Remove resume"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                            OR
                        ================================================= */}

            <div className="or-divider">
              <span>OR</span>
            </div>

            {/* =================================================
                            SELF DESCRIPTION
                        ================================================= */}

            <div className="self-description">
              <div className="section-label">Quick Self-Description</div>

              <textarea
                className="panel__textarea panel__textarea--short"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience, skills, projects and technologies..."
              />
            </div>

            {/* =================================================
                            INFO BOX
                        ================================================= */}

            <div className="info-box">
              <span className="info-box__icon">●</span>

              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="interview-card__footer">
          <span className="footer-info">
            AI-Powered Strategy Generation • Approx 30s
          </span>

          <button
            type="button"
            className="generate-btn"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            <span>✦</span>
            Generate My Interview Strategy
          </button>
        </div>
      </section>

      {/* =================================================
                RECENT REPORTS
            ================================================= */}

      {reports?.length > 0 && (
        <section className="recent-reports">
          <h2>My Recent Interview Plans</h2>

          <div className="reports-list">
            {reports.map((report) => {
              const score = report.matchScore ?? 0;

              return (
                <article
                  className="report-item"
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <h3>{report.title || "Interview Preparation Report"}</h3>

                  <p className="report-meta">
                    Generated on{" "}
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p
                    className={`match-score ${
                      score >= 70
                        ? "score--high"
                        : score >= 40
                          ? "score--mid"
                          : "score--low"
                    }`}
                  >
                    Match Score: {score}%
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =================================================
                FOOTER
            ================================================= */}

      <footer className="site-footer">
        <span>© 2026 Interview AI</span>

        <a href="mailto:kunallatwal4616@gmail.com">Contact Developer</a>
      </footer>
    </main>
  );
}
