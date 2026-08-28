import React, { useState } from "react";
import { useInterview } from "../hooks/useinterview";
import Loading from "../../auth/components/Loading";
import Footer from "../../auth/components/Footer";
import "../style/interview.scss";

const Interview = () => {

    const {
        loading,
        downloading,
        report,
        downloadResume
    } = useInterview();

    const [activeSection, setActiveSection] = useState("technical");


    // ==============================
    // LOADING
    // ==============================

    if (loading || !report) {
        return (
            <Loading
                message="Loading your interview strategy..."
            />
        );
    }


    const technicalQuestions =
        report.technicalQuestions || [];

    const behavioralQuestions =
        report.behavioralQuestions || [];

    const skillGaps =
        report.skillGaps || [];

    const preparationPlan =
        report.preparationPlan || [];


    // ==============================
    // DOWNLOAD RESUME
    // ==============================

    const handleDownloadResume = async () => {

        if (!downloadResume) {
            console.error(
                "downloadResume function is not available"
            );
            return;
        }

        try {
            await downloadResume(report._id);
        } catch (error) {
            console.error(
                "Error downloading resume:",
                error
            );
        }
    };


    return (
        <main className="interview-page">

            {/* ================= HEADER ================= */}

            <header className="interview-header">

                <div>

                    <span className="eyebrow">
                        AI INTERVIEW STRATEGY
                    </span>

                    <h1>
                        {report.title ||
                            "Interview Preparation Plan"}
                    </h1>

                    <p>
                        Personalized interview preparation
                        based on your profile and target role.
                    </p>

                </div>


                <div className="match-score-card">

                    <span>
                        MATCH SCORE
                    </span>

                    <strong>
                        {report.matchScore || 0}
                    </strong>

                    <small>
                        / 100
                    </small>

                </div>

            </header>


            {/* ================= MAIN LAYOUT ================= */}

            <div className="interview-layout">


                {/* ================= SIDEBAR ================= */}

                <aside className="interview-sidebar">

                    <div className="sidebar-label">
                        SECTIONS
                    </div>


                    <button
                        type="button"
                        className={
                            activeSection === "technical"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("technical")
                        }
                    >
                        <span>⌘</span>
                        Technical Questions
                    </button>


                    <button
                        type="button"
                        className={
                            activeSection === "behavioral"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("behavioral")
                        }
                    >
                        <span>□</span>
                        Behavioral Questions
                    </button>


                    <button
                        type="button"
                        className={
                            activeSection === "roadmap"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveSection("roadmap")
                        }
                    >
                        <span>◇</span>
                        Road Map
                    </button>


                    {/* DOWNLOAD */}

                    <button
                        type="button"
                        className="download-resume-btn"
                        onClick={handleDownloadResume}
                        disabled={downloading}
                    >

                        {downloading ? (
                            <>
                                <span className="button-spinner"></span>
                                Preparing PDF...
                            </>
                        ) : (
                            <>
                                ✦ Download Resume
                            </>
                        )}

                    </button>

                </aside>



                {/* ================= CENTER ================= */}

                <section className="interview-content">


                    {/* TECHNICAL */}

                    {activeSection === "technical" && (

                        <div>

                            <div className="section-heading">

                                <div>

                                    <span>
                                        TECHNICAL
                                    </span>

                                    <h2>
                                        Technical Questions
                                    </h2>

                                </div>

                                <small>
                                    {technicalQuestions.length}{" "}
                                    questions
                                </small>

                            </div>


                            <div className="questions-list">

                                {technicalQuestions.length === 0 ? (

                                    <div className="empty-state">
                                        No technical questions available.
                                    </div>

                                ) : (

                                    technicalQuestions.map(
                                        (item, index) => (

                                            <QuestionCard
                                                key={index}
                                                number={index + 1}
                                                item={item}
                                            />

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    )}



                    {/* BEHAVIORAL */}

                    {activeSection === "behavioral" && (

                        <div>

                            <div className="section-heading">

                                <div>

                                    <span>
                                        BEHAVIORAL
                                    </span>

                                    <h2>
                                        Behavioral Questions
                                    </h2>

                                </div>

                                <small>
                                    {behavioralQuestions.length}{" "}
                                    questions
                                </small>

                            </div>


                            <div className="questions-list">

                                {behavioralQuestions.length === 0 ? (

                                    <div className="empty-state">
                                        No behavioral questions available.
                                    </div>

                                ) : (

                                    behavioralQuestions.map(
                                        (item, index) => (

                                            <QuestionCard
                                                key={index}
                                                number={index + 1}
                                                item={item}
                                            />

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    )}



                    {/* ROADMAP */}

                    {activeSection === "roadmap" && (

                        <div>

                            <div className="section-heading">

                                <div>

                                    <span>
                                        PREPARATION
                                    </span>

                                    <h2>
                                        Preparation Roadmap
                                    </h2>

                                </div>

                            </div>


                            <div className="roadmap">

                                {preparationPlan.length === 0 ? (

                                    <div className="empty-state">
                                        No preparation plan available.
                                    </div>

                                ) : (

                                    preparationPlan.map(
                                        (day, index) => (

                                            <div
                                                className="roadmap-day"
                                                key={index}
                                            >

                                                <div className="day-number">
                                                    Day {day.day}
                                                </div>


                                                <div className="day-content">

                                                    <h3>
                                                        {day.focus}
                                                    </h3>


                                                    <ul>

                                                        {(day.tasks || []).map(
                                                            (
                                                                task,
                                                                taskIndex
                                                            ) => (

                                                                <li
                                                                    key={
                                                                        taskIndex
                                                                    }
                                                                >
                                                                    {task}
                                                                </li>

                                                            )
                                                        )}

                                                    </ul>

                                                </div>

                                            </div>

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    )}

                </section>



                {/* ================= RIGHT PANEL ================= */}

                <aside className="interview-right-panel">


                    {/* SCORE */}

                    <div className="score-panel">

                        <span>
                            MATCH SCORE
                        </span>


                        <div className="big-score">
                            {report.matchScore || 0}
                        </div>


                        <p>
                            Strong match for this role
                        </p>

                    </div>



                    {/* SKILL GAPS */}

                    <div className="skill-panel">

                        <h3>
                            SKILL GAPS
                        </h3>


                        {skillGaps.length === 0 ? (

                            <p>
                                No major skill gaps detected.
                            </p>

                        ) : (

                            skillGaps.map(
                                (gap, index) => (

                                    <div
                                        className={
                                            `skill-gap skill-${gap.severity}`
                                        }
                                        key={index}
                                    >

                                        <span>
                                            {gap.skill}
                                        </span>

                                        <small>
                                            {gap.severity}
                                        </small>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </aside>

            </div>

        </main>
    );
};



/* =========================================
   QUESTION CARD
========================================= */

const QuestionCard = ({
    number,
    item
}) => {

    const [open, setOpen] = useState(false);


    return (

        <article
            className={
                `question-card ${
                    open
                        ? "question-card--open"
                        : ""
                }`
            }
        >

            <button
                type="button"
                className="question-header"
                onClick={() =>
                    setOpen(!open)
                }
            >

                <span className="question-number">
                    Q{number}
                </span>


                <span className="question-text">
                    {item.question}
                </span>


                <span className="question-arrow">
                    {open ? "−" : "⌄"}
                </span>

            </button>


            {open && (

                <div className="question-answer">

                    <div>

                        <strong>
                            Interviewer's Intention
                        </strong>

                        <p>
                            {item.intention}
                        </p>

                    </div>


                    <div>

                        <strong>
                            How to Answer
                        </strong>

                        <p>
                            {item.answer}
                        </p>

                    </div>

                </div>

            )}

        </article>

    );
};


export default Interview;