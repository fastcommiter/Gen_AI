# 🚀 InterviewAI

> AI-powered interview preparation platform that analyzes a candidate's resume, self-description, and target job description to generate a personalized interview strategy.

InterviewAI helps candidates prepare for interviews by analyzing their profile against a target job description and generating relevant technical questions, behavioral questions, skill gaps, and a personalized preparation roadmap.

---

## 📸 Screenshots

### 🔐 Login

<p align="center">
  <img src="https://github.com/user-attachments/assets/6a7cbaee-3aa4-4a4c-8f55-45b2da29fcdf" width="45%" />
</p>

### 📝 Register

<p align="center">
  <img src="https://github.com/user-attachments/assets/07135e89-52e6-4cb2-a4ab-5cd89f55c120" width="90%" />
</p>

---

## 🚀 Features

### 🔐 Authentication

- User registration
- User login
- User logout
- Protected routes
- Current user authentication
- Cookie-based authentication
- User-specific interview reports

---

### 📄 Resume Analysis

- Upload resume in PDF format
- Extract resume text automatically
- Analyze resume against the target job description
- Use resume information for personalized interview preparation
- Resume or self-description can be used as candidate input

---

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

---

### 🎯 Job Matching

The application compares the candidate's profile with the target job description and generates a match score between **0 and 100**.

This helps candidates understand how closely their current profile matches the requirements of a particular role.

---

### 📚 Personalized Preparation Roadmap

The AI generates a day-wise preparation plan based on:

- Candidate profile
- Resume
- Self-description
- Target job description
- Identified skill gaps

The roadmap can include:

- Data Structures & Algorithms
- Core Computer Science
- Technical Skills
- System Design
- Projects
- Behavioral Preparation
- Mock Interviews

---

### 📑 AI-Generated Resume

InterviewAI can generate a tailored resume using:

- Existing resume
- Self-description
- Target job description

The generated resume is designed to be:

- ATS-friendly
- Easy to parse
- Single-column
- Professionally structured
- Tailored to the target role

The generated HTML resume is converted into a PDF using Puppeteer.

---

### 📊 Interview History

Users can view their previously generated interview plans from the home dashboard.

Each report contains:

- Job title
- Generation date
- Match score

---

### 📥 Resume PDF Download

Users can download their generated resume as a PDF directly from the interview strategy page.

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
```

---

# 🔄 Application Flow

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Register / Login  │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │  Job Description    │
                  └──────────┬──────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
          ┌──────────────┐       ┌────────────────┐
          │ Resume PDF   │       │ Self Description│
          └──────┬───────┘       └───────┬────────┘
                 │                       │
                 └───────────┬───────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Backend API   │
                    └────────┬────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Resume Text Extract │
                  └──────────┬──────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Gemini AI     │
                    └────────┬────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │ Structured Interview Report │
              └──────────────┬──────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Match Score     Skill Gaps      Questions
              │              │              │
              └──────────────┼──────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Preparation Plan    │
                  └──────────┬──────────┘
                             │
                             ▼
                        ┌─────────┐
                        │ MongoDB │
                        └────┬────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Interview Strategy  │
                  └─────────────────────┘
```

---

# 🤖 AI Report Structure

The AI generates a structured JSON response containing:

```json
{
  "matchScore": 80,
  "technicalQuestions": [
    {
      "question": "Technical interview question",
      "intention": "Why the interviewer asks it",
      "answer": "How the candidate should approach the answer"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Behavioral interview question",
      "intention": "What the interviewer wants to evaluate",
      "answer": "Recommended answering approach"
    }
  ],
  "skillGaps": [
    {
      "skill": "System Design",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Data Structures",
      "tasks": [
        "Revise arrays and strings",
        "Solve practice problems"
      ]
    }
  ],
  "title": "Full Stack Developer"
}
```

---

# 📌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Logout

```http
GET /api/auth/logout
```

### Get Current User

```http
GET /api/auth/get-me
```

---

## Interview

### Generate Interview Report

```http
POST /api/interview/
```

Request uses `multipart/form-data`.

Fields:

```text
jobDescription
selfDescription
resume
```

---

### Get All Interview Reports

```http
GET /api/interview/
```

---

### Get Interview Report

```http
GET /api/interview/report/:interviewId
```

---

### Generate Resume PDF

```http
GET /api/interview/resume/:interviewReportId
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

```bash
cd InterviewAI
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

GOOGLE_GENAI_API_KEY=your_gemini_api_key

JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |
| `JWT_SECRET` | Secret used for authentication |

> ⚠️ Never commit your `.env` file to GitHub.

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

# 📄 Resume Generation Flow

InterviewAI generates a tailored resume through the following process:

```text
Existing Resume
       │
       ▼
Resume Text Extraction
       │
       ▼
Candidate Information
       │
       ├── Resume
       ├── Self Description
       └── Job Description
       │
       ▼
     Gemini AI
       │
       ▼
Tailored Resume HTML
       │
       ▼
    Puppeteer
       │
       ▼
     PDF File
```

The generated resume is tailored to the target job while preserving the candidate's original information.

The AI is instructed not to invent:

- Companies
- Job titles
- Projects
- Technologies
- Certifications
- Achievements
- Experience

---

# 🎨 User Interface

InterviewAI contains the following major screens:

### Authentication

- Login
- Registration

### Home Dashboard

- Job description input
- Resume upload
- Self-description input
- Interview strategy generation
- Recent interview plans

### Interview Strategy

- Match score
- Technical questions
- Behavioral questions
- Skill gaps
- Preparation roadmap
- Resume download

---

# 🔒 Security

The application includes:

- Protected API routes
- Authentication middleware
- Cookie-based authentication
- User-specific interview reports
- Environment variables for sensitive credentials
- Server-side validation

Users can only access their own interview reports.

---

# 🧠 Why InterviewAI?

Traditional interview preparation often requires candidates to manually:

- Read the job description
- Identify required skills
- Compare their resume with the role
- Search for possible interview questions
- Identify skill gaps
- Create a preparation schedule

InterviewAI combines these steps into a single workflow.

```text
Candidate Profile
       +
Job Description
       │
       ▼
   AI Analysis
       │
       ▼
Personalized Strategy
```

---

# 🚧 Future Improvements

Some possible future improvements include:

- Live AI mock interviews
- Voice-based interviews
- Real-time interview feedback
- Resume ATS scoring
- Job description keyword analysis
- LinkedIn profile integration
- Multiple resume templates
- Interview performance tracking
- Question difficulty levels
- Company-specific interview preparation
- Interview analytics dashboard

---

# 👨‍💻 Developer

**Kunal Latwal**

Full Stack Developer

📧 **Email:** kunallatwal4616@gmail.com

For project-related queries or feedback, feel free to contact the developer.

---

# ⭐ Project Goal

InterviewAI aims to make interview preparation more personalized by combining:

**Resume Analysis + Job Matching + Generative AI + Interview Preparation**

into one platform.

---

# 📜 License

This project is developed for educational and portfolio purposes.
