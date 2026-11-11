# ThesisFlow
## The Complete Research, Thesis Writing & Academic Collaboration Workspace

> **"From research question to final submission. One workspace for the entire journey."**

---

## 🎓 Overview

**ThesisFlow** is an academic research and thesis management platform engineered for university students, postgraduate researchers, faculty members, and primary academic supervisors. It unifies the entire research lifecycle into a single, cohesive, content-first workspace.

ThesisFlow bridges the gaps between:
- **Notion**: Structured relational canvases and connected knowledge bases.
- **Zotero**: Rigorous academic reference cataloging, metadata extraction, and BibTeX management.
- **Overleaf**: Focused scholarly writing, section hierarchy, and live in-text citation injection.
- **Linear**: High-clarity milestone tracking and actionable task pipelines.
- **University Portals**: Formal supervisor review workflows, compliance checklists, and defense readiness.

---

## 🏛️ Product Design Philosophy

- **Light, Editorial, Academic Aesthetic**: Built using an authentic academic color palette:
  - Main background: `#F6F5F1`
  - Workspace surface: `#FFFFFF`
  - Primary text: `#242923`
  - Secondary text: `#72786F`
  - Forest green: `#345B46`
  - Muted sage: `#E6ECE5`
  - Accent terracotta: `#B96D50`
  - Soft yellow: `#F2E9D1`
  - Sidebar background: `#F0F0E9`
- **Scholarly Typography**:
  - Headings: `Newsreader` / `DM Serif Display`
  - Body: `Inter`
  - Document Editor: `Source Serif 4`
  - Technical Metadata: `IBM Plex Mono`
- **Zero Generic AI Clichés**: No purple-blue gradients, neon glowing borders, glassmorphic blur, floating decorative blobs, or robot avatars. Designed to look and feel like an enterprise university research portal.

---

## 🚀 Key Modules & Capabilities

### 1. Research Overview & Calculated Dashboard
- Real-time progress metrics calculated from underlying database records (not arbitrary percentages).
- Active project banner with department, degree program, and supervisor details.
- Submission deadline countdown clock.
- Two-column layout prioritizing active drafting, active research objectives, upcoming milestones timeline, supervisor action items, and recent research logs.

### 2. Research Questions & Objective Builder
- Interactive **Research Alignment Matrix**:
  $$\text{Problem} \longrightarrow \text{Research Gap} \longrightarrow \text{Questions (RQ1--RQ3)} \longrightarrow \text{Objectives (OBJ1--OBJ3)} \longrightarrow \text{Methodology} \longrightarrow \text{Outcomes}$$
- Link research questions directly to empirical objectives and methods.
- Dynamic status tracking (Pending, In Progress, Completed).

### 3. Literature Library
- Systematic cataloging of academic literature.
- 12 verified sample research papers with real DOIs, publication venues, abstracts, reading statuses, and personal critique notes.
- Literature collections (*Foundational Research*, *ML Feature Engineering*, *Adversarial & Recent Evasion*).
- Instant BibTeX export and formatted reference generation.

### 4. Research Paper Reader & Annotation Workspace
- Simulated PDF/manuscript reading environment with page navigation.
- Highlight interactive passages and record margin notes with color-coding (*yellow*, *green*, *terracotta*, *sage*).
- Record research insights linked directly to dissertation research questions.

### 5. Signature Literature Review Matrix & Synthesis
- Compare papers side-by-side across:
  - *Research Problem*
  - *Methodology*
  - *Dataset*
  - *Key Findings*
  - *Limitations*
  - *Research Gap*
  - *Relevance to My Work*
- Inline cell editing with automatic persistence.
- Single-click CSV matrix export.
- **Synthesis by Theme** view grouping papers into coherent literature review themes.

### 6. Research Notes & Connected Knowledge Base
- Note categories: *Reading Notes*, *Methodology*, *Experiments*, *Supervisor Meetings*, *Research Ideas*, *Findings*, *Questions for Supervisor*.
- Markdown formatting, searchable tags, and **bidirectional backlinks** linking notes to specific papers, research questions, and chapters.

### 7. Thesis Editor (Distraction-Free Scholarly Writing)
- **3-Panel Layout**:
  - *Left*: Chapter outline and section structure.
  - *Center*: TipTap rich text editor on a paper-like writing surface with generous line-height, H1/H2/H3, bold, italics, underline, lists, blockquotes, code blocks, tables, undo/redo, autosave ticker, and word/character counters.
  - *Right*: Contextual panel featuring writing checklists, supervisor review comments, version snapshots, and **one-click in-text citation injection** in APA 7th, IEEE, MLA, Chicago, or Harvard styles.
- **Version History**: Snapshot checkpoints with restoration capability.
- **Submit Chapter**: Direct submission workflow alerting the academic supervisor.

### 8. References & Citation Manager
- Support for **APA 7th Edition**, **IEEE**, **MLA**, **Chicago**, and **Harvard**.
- Missing metadata validator checking for missing DOIs, authors, publication years, or duplicate citation keys.
- Raw BibTeX parser and bulk `.bib` exporter.

### 9. Methodology Planner & Pipeline Flowchart
- Structured framework: Research Design, Research Approach, Data Collection, Sampling Method, Tools & Tech, Experimental Setup, Evaluation Metrics, and Ethical Considerations.
- Interactive step-by-step pipeline flowchart mapping inputs to outputs.

### 10. Experiments & Dataset Registry
- Experiment tracking for machine learning and quantitative research:
  - Configurations, hyperparameters, execution environments, and metrics (Accuracy, Precision, Recall, F1-Score, False Positive Rate, Inference Latency).
  - Comparative Recharts bar chart benchmark across experimental runs.
  - Distinct badge for the **Primary Proposed Contribution Model** (EXP-05 Stacking Classifier achieving 96.84% accuracy with 14.2ms latency).
  - Dataset registry tracking collection dates, row counts, licenses, and archive links.

### 11. Supervisor Collaboration & Governance
- Bidirectional student-supervisor workflow:
  - *Student*: Submits chapters, reviews feedback, replies to comments, and records resolution notes.
  - *Supervisor*: Reviews submissions, adds passage-level comments, requests revisions, or formally approves chapters.
- Formal review history preserved across document revisions.

### 12. Supervision Meetings & Chronological Journal
- Meeting scheduler with agenda, discussion notes, decisions, and action item trackers.
- Chronological scientific journal documenting daily progress and hurdles.

### 13. Tasks, Milestones & Academic Calendar
- 4-column Kanban board (*To Do*, *In Progress*, *Blocked*, *Completed*).
- Formal institutional milestones with dependencies, deadlines, and evidence of completion.
- Unified academic calendar visualizing deadlines, meetings, and writing targets.

### 14. Submission Readiness Checklist & Thesis Export
- Compliance verification across:
  - *Document & Structural*: Chapters included, abstract <350 words, keywords, tables numbered.
  - *Academic Governance*: Supervisor sign-off, ethics statement, similarity index threshold.
  - *Administrative*: University cover page, candidate CID, submission date.
- **Multi-Format Export Engine**:
  - Print-ready PDF preview.
  - Clean Markdown bundle (`.md`).
  - Word DOCX-ready HTML structure.
  - Standalone BibTeX bibliography (`.bib`).

### 15. Research Insights & Analytics
- Progress graphs tracking milestone velocity, chapter word counts against departmental targets, literature reading distribution, and activity feeds.

### 16. Global Search & Command Center (⌘K / Ctrl+K)
- Instant keyboard-driven global search across papers, chapters, notes, experiments, tasks, and quick actions.

### 17. Ethical & Grounded AI Research Assistant
- Strictly complies with academic integrity guidelines:
  - Grounded exclusively in your verified literature library.
  - Tools: Paper Summarization, Literature Comparison, Question Suggester, Academic Tone & Clarity Enhancer.
  - Never fabricates citations, DOIs, or experimental results.

---

## 👥 Demo Roles & Seamless Switching

ThesisFlow features an instant demo role switcher in the top navigation bar:

| Role | Demo User | Title / Affiliation | Capabilities |
|---|---|---|---|
| **Student / Researcher** | Aarav Patel | BSc Computer Science (Honours) Researcher | Draft chapters, log experiments, annotate papers, resolve supervisor comments, submit chapters. |
| **Supervisor / Faculty** | Dr. Meera Sharma | Associate Professor in Machine Learning & Cyber-Physical Systems | Review chapter submissions, leave passage critiques, approve chapters, request revisions. |
| **Administrator** | Prof. Robert Vance | Director of Postgraduate Studies & Research Registry | Institutional oversight, compliance verification, faculty governance. |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom academic palette and typography
- **State Management**: Zustand with `localStorage` persistence
- **Rich Text Editor**: TipTap (`@tiptap/react`, `@tiptap/starter-kit`, tables, character count, highlights)
- **Data Visualizations**: Recharts (Bar charts, Pie charts)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Database Architecture**: Supabase PostgreSQL with complete Row Level Security (RLS) schema (`src/services/schema.sql`)

---

## 💻 Running the Application Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📄 License & Attribution

Developed for university dissertations, postgraduate research, and institutional academic governance.
*ThesisFlow: Every paper, every idea, every chapter — connected.*

