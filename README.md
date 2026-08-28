# Gen_AI (Interview_AI)

# InterviewAI

AI-powered interview preparation platform that analyzes a candidate's resume, self-description, and target job description to generate a personalized interview strategy.

The application helps candidates understand their job-fit, identify skill gaps, prepare technical and behavioral questions, and follow a personalized preparation roadmap.

---

## 🚀 Features

### 🔐 Authentication

- User registration
- User login
- User logout
- Protected routes
- Current user authentication
- Session-based authentication using cookies

### 📄 Resume Analysis

- Upload resume in PDF format
- Extract resume text automatically
- Use resume information for personalized analysis
- Resume is analyzed together with the target job description

### 🤖 AI-Powered Interview Strategy

InterviewAI uses Google's Gemini API to generate a structured interview report containing:

- Match Score
- Technical Interview Questions
- Behavioral Interview Questions
- Interviewer's Intention
- Suggested Answer Approach
- Skill Gaps
- Skill Gap Severity
- Day-wise Preparation Plan
- Target Job Title

### 🎯 Job Matching

The application compares the candidate's profile with the target job description and generates a match score between 0 and 100.

### 📚 Personalized Preparation Roadmap

The AI generates a day-wise preparation plan based on the candidate's profile and target role.

The roadmap can include:

- Data Structures & Algorithms
- Core Computer Science
- Technical Skills
- System Design
- Projects
- Behavioral Preparation
- Mock Interviews

### 📑 AI-Generated Resume

InterviewAI can generate a tailored resume based on:

- Existing resume
- Self-description
- Target job description

The generated resume is converted into a PDF using Puppeteer.

### 📊 Interview History

Users can view their previously generated interview plans from the home page.

Each report contains:

- Job title
- Generation date
- Match score

### 📥 Resume PDF Download

Users can download their AI-generated resume as a PDF directly from the interview strategy page.

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- React Router
- Axios
- SCSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

## AI

- Google Gemini API
- Zod
- Zod JSON Schema

## Resume Processing

- PDF text extraction
- Puppeteer
- HTML/CSS to PDF conversion

---

# 🏗️ Project Architecture

```text
InterviewAI
│
├── Backend
│   │
│   └── src
│       ├── controllers
│       ├── models
│       ├── routes
│       ├── services
│       ├── middlewares
│       └── app.js
│
│
└── Frontend
    │
    └── src
        │
        ├── features
        │   │
        │   ├── auth
        │   │   ├── components
        │   │   ├── hooks
        │   │   ├── pages
        │   │   └── services
        │   │
        │   └── interview
        │       ├── hooks
        │       ├── pages
        │       ├── services
        │       └── style
        │
        ├── App.jsx
        ├── app.routes.jsx
        └── main.jsx

