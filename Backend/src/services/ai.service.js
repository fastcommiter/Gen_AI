const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// =====================================================
// INTERVIEW REPORT SCHEMA
// =====================================================

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    ),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),

  title: z.string(),
});

// =====================================================
// GENERATE INTERVIEW REPORT
// =====================================================

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report for a candidate with the following details:

Resume:
${resume || "No resume provided."}

Self Description:
${selfDescription || "No self description provided."}

Job Description:
${jobDescription || "No job description provided."}

Generate a detailed interview preparation report.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}

// =====================================================
// HTML → PDF USING PUPPETEER
// =====================================================

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",

      printBackground: true,

      margin: {
        top: "15mm",
        bottom: "15mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

// =====================================================
// RESUME PDF SCHEMA
// =====================================================

const resumePdfSchema = z.object({
  html: z.string().describe("Complete ATS-friendly HTML content of the resume"),
});

// =====================================================
// GENERATE RESUME PDF
// =====================================================

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
const prompt = `
    You are an expert resume editor and HTML/CSS resume reconstruction system.

    You are NOT creating a new resume design.

    You are editing/reconstructing the candidate's existing resume while preserving its original visual template.

    The candidate's ORIGINAL RESUME is the design source of truth.

    ============================================================
    ORIGINAL RESUME
    ============================================================

    ${resume || "No original resume text was provided."}

    SELF DESCRIPTION:

    ${selfDescription || "No self description was provided."}

    TARGET JOB DESCRIPTION:

    ${jobDescription || "No job description was provided."}


    ============================================================
    MOST IMPORTANT REQUIREMENT
    ============================================================

    Generate the NEW resume in the SAME STYLE and STRUCTURE as the
    candidate's original resume.

    The output must look like the candidate's original resume has been
    professionally updated for the target job.

    DO NOT create a generic AI resume.

    DO NOT create a modern resume template.

    DO NOT redesign the resume.

    DO NOT replace the original structure with a different structure.

    The generated resume should visually resemble the original resume
    as closely as possible.


    ============================================================
    ORIGINAL TEMPLATE TO PRESERVE
    ============================================================

    The original resume follows this general visual structure:

    1. Candidate name centered at the top.

    2. Contact information centered below the name.

    3. Contact information includes:
    phone number
    email
    LinkedIn
    GitHub
    LeetCode

    4. Section headings appear as horizontal full-width light-gray
    background bars.

    5. The section order should remain:

    EDUCATION
    ACHIEVEMENTS
    PROJECTS
    TECHNICAL SKILLS
    CERTIFICATIONS
    ADDITIONAL INFORMATION

    6. EDUCATION uses a structured table-like layout with columns:

    Examination
    University
    Institute
    Year
    Score (CGPA/%)

    7. ACHIEVEMENTS uses bullet points.

    8. PROJECTS uses:
    Project Name | Project Category/Description
    followed by project bullet points.

    9. Project dates/team information are aligned toward the right
    when appropriate.

    10. TECHNICAL SKILLS uses category labels followed by skills.

    11. CERTIFICATIONS uses bullet points with certification name,
        provider and date.

    12. ADDITIONAL INFORMATION uses bullet points.

    Preserve this hierarchy.


    ============================================================
    VISUAL STYLE
    ============================================================

    Reproduce the original resume's visual appearance.

    Use:

    - White page background
    - Black/dark text
    - Centered candidate name
    - Serif-style professional typography similar to the original
    - Bold section headings
    - Light-gray section header bars
    - Thin horizontal borders where appropriate
    - Compact professional spacing
    - Traditional professional resume appearance
    - Minimal styling
    - No colorful modern cards
    - No gradients
    - No rounded cards
    - No sidebar
    - No icons
    - No profile photo
    - No graphics
    - No charts
    - No progress bars
    - No decorative elements

    The resume should look like a professionally formatted
    traditional one-page/two-page academic/technical resume.


    ============================================================
    CONTENT EDITING
    ============================================================

    Tailor the resume content to the TARGET JOB DESCRIPTION.

    Prioritize skills, projects, achievements and experience that are
    relevant to the target role.

    You may:

    - Rewrite existing bullet points
    - Improve grammar
    - Improve clarity
    - Make bullet points more concise
    - Reorder existing bullet points based on relevance
    - Highlight relevant technologies
    - Highlight relevant achievements
    - Improve the professional wording
    - Naturally include relevant keywords from the job description
    - Improve the project descriptions

    However:

    NEVER invent information.

    NEVER fabricate:

    - Companies
    - Job titles
    - Projects
    - Technologies
    - Skills
    - Certifications
    - Degrees
    - Achievements
    - Awards
    - Work experience
    - Metrics
    - Responsibilities
    - Years of experience

    Only use information that exists in the candidate's original resume
    or self description.

    If the job description mentions a technology that the candidate
    does not actually have, DO NOT falsely add it.


    ============================================================
    VERY IMPORTANT — KEEP THE ORIGINAL SECTIONS
    ============================================================

    Do NOT automatically introduce sections such as:

    SUMMARY
    EXPERIENCE

    unless they already exist in the original resume and are necessary.

    The original resume's section structure should remain the same.

    For example, if the original resume contains:

    EDUCATION
    ACHIEVEMENTS
    PROJECTS
    TECHNICAL SKILLS
    CERTIFICATIONS
    ADDITIONAL INFORMATION

    then preserve those sections.

    Do not convert the resume into:

    SUMMARY
    SKILLS
    EXPERIENCE
    PROJECTS
    EDUCATION

    just because that is a common AI resume format.


    ============================================================
    EDUCATION
    ============================================================

    Preserve the original Education structure.

    Use the same columns:

    Examination
    University
    Institute
    Year
    Score (CGPA/%)

    Do not convert Education into unrelated cards or paragraphs.


    ============================================================
    PROJECTS
    ============================================================

    Preserve the original project format.

    Each project should look approximately like:

    PROJECT NAME | CATEGORY / DESCRIPTION                         DATE

        • Achievement/responsibility
        • Achievement/responsibility
        • Achievement/responsibility

    Use the candidate's actual project information.

    Tailor project bullet points toward the target job without inventing
    new facts.


    ============================================================
    TECHNICAL SKILLS
    ============================================================

    Preserve categorized skill formatting.

    For example:

    Programming:
    C++, Python

    Web Technologies:
    HTML5, CSS3, Node.js, Express.js, REST APIs

    Tools & ML:
    Scikit-Learn, Pandas, NumPy, etc.

    Core Competencies:
    Algorithmic Optimization, Problem Solving

    Core CS:
    OOPS, DBMS, Operating Systems, Computer Networks

    Do not add skills that are not supported by the candidate's
    information.


    ============================================================
    ATS REQUIREMENTS
    ============================================================

    The resume must remain ATS-readable.

    Use actual HTML text.

    Do NOT convert the resume into an image.

    Do NOT use canvas.

    Do NOT use SVG for text.

    Do NOT put important information inside images.

    All text must remain selectable and searchable in the generated PDF.

    Use semantic HTML wherever possible.

    The visual structure may use CSS tables/grid only when necessary to
    reproduce the original Education layout.

    The resume must still remain readable if CSS is removed.


    ============================================================
    HTML STRUCTURE
    ============================================================

    Return a complete HTML document.

    Use:

    <html>
    <head>
    <style>
    ...
    </style>
    </head>

    <body>
    ...
    </body>
    </html>

    The CSS should reproduce the original resume.

    Use:

    - A4 page
    - Appropriate margins
    - Professional font
    - Compact line height
    - Proper section spacing
    - Gray section bars
    - Thin borders
    - Correct alignment
    - Consistent typography

    The generated PDF should look extremely close to the original
    resume template.


    ============================================================
    PAGE LAYOUT
    ============================================================

    Try to maintain the same page density as the original resume.

    Do not create huge empty spaces.

    Do not unnecessarily increase font sizes.

    Do not unnecessarily decrease font sizes.

    Do not add unnecessary content.

    If the original resume fits on one page, attempt to keep the updated
    resume on one page.

    If the updated content genuinely requires another page, allow a
    second page rather than making the resume unreadably small.


    ============================================================
    IMPORTANT
    ============================================================

    Think of the task as:

    ORIGINAL RESUME
            +
    TARGET JOB DESCRIPTION
            ↓
    UPDATED CONTENT
            ↓
    SAME ORIGINAL RESUME DESIGN
            ↓
    NEW PDF

    NOT:

    ORIGINAL RESUME
            ↓
    COMPLETELY NEW AI TEMPLATE


    The final resume should look as if the candidate personally edited
    their existing resume to target the new job.

    It must NOT look like a completely different AI-generated resume.


    ============================================================
    OUTPUT
    ============================================================

    Return ONLY valid JSON.

    The JSON must contain exactly one property:

    {
        "html": "complete HTML document"
    }

    Do not return markdown.

    Do not return explanations.

    Do not return code fences.

    Return only valid JSON.
    `;

  // Ask Gemini to generate HTML

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  // Convert Gemini response to JSON

  const jsonContent = JSON.parse(response.text);

  // Convert HTML → PDF

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  generateInterviewReport,

  generateResumePdf,
};
