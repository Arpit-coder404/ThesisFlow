export type Role = 'student' | 'supervisor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  avatar?: string;
  institution: string;
  title?: string;
}

export type ProjectType = 
  | 'undergraduate' 
  | 'masters' 
  | 'doctoral' 
  | 'paper' 
  | 'capstone' 
  | 'independent';

export type ProjectStatus = 'in_progress' | 'under_review' | 'revision_required' | 'ready_for_defense' | 'completed';

export interface ResearchProject {
  id: string;
  title: string;
  area: string;
  department: string;
  program: string;
  type: ProjectType;
  status: ProjectStatus;
  supervisorId: string;
  supervisorName: string;
  coResearchers: string[];
  startDate: string;
  expectedSubmissionDate: string;
  abstract: string;
  keywords: string[];
  visibility: 'private' | 'department' | 'public';
  createdAt: string;
  updatedAt: string;
}

export interface ResearchGap {
  id: string;
  projectId: string;
  title: string;
  description: string;
  identifiedFromPapers: string[]; // Paper IDs
}

export interface ResearchQuestion {
  id: string;
  code: string; // e.g. "RQ1"
  projectId: string;
  question: string;
  description: string;
  gapId?: string;
  isPrimary: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ResearchObjective {
  id: string;
  code: string; // e.g. "OBJ1"
  projectId: string;
  linkedQuestionId: string;
  objective: string;
  methodologyOverview: string;
  status: 'not_started' | 'in_progress' | 'completed';
  supportingReferenceIds: string[];
}

export interface AlignmentMatrixItem {
  id: string;
  questionCode: string;
  questionText: string;
  objectiveCode: string;
  objectiveText: string;
  method: string;
  status: 'Complete' | 'In progress' | 'Pending';
  deliverable: string;
}

export type ReadingStatus = 'unread' | 'reading' | 'read';

export interface LiteraturePaper {
  id: string;
  projectId: string;
  title: string;
  authors: string[];
  year: number;
  journalOrConference: string;
  doi?: string;
  url?: string;
  abstract: string;
  keywords: string[];
  researchArea: string;
  publicationType: 'journal' | 'conference' | 'preprint' | 'book_chapter' | 'thesis';
  readingStatus: ReadingStatus;
  relevanceRating: 1 | 2 | 3 | 4 | 5;
  personalNotes: string;
  pdfUrl?: string;
  pageCount?: number;
  collectionIds: string[];
  tags: string[];
  addedAt: string;
  isKeyPaper?: boolean;
}

export interface LiteratureCollection {
  id: string;
  projectId: string;
  name: string;
  description: string;
  color?: string;
  paperCount?: number;
}

export interface PaperAnnotation {
  id: string;
  paperId: string;
  pageNumber: number;
  selectedText?: string;
  comment: string;
  color: 'yellow' | 'green' | 'terracotta' | 'sage';
  researchInsight?: string;
  linkedQuestionId?: string;
  createdAt: string;
  authorName: string;
}

export interface LiteratureMatrixRow {
  id: string;
  paperId: string;
  paperTitle: string;
  authorsYear: string;
  researchProblem: string;
  methodology: string;
  dataset: string;
  keyFindings: string;
  limitations: string;
  researchGap: string;
  relevanceToMyWork: string;
  customColumns?: Record<string, string>;
}

export type NoteType = 
  | 'reading' 
  | 'methodology' 
  | 'experiment' 
  | 'meeting' 
  | 'idea' 
  | 'finding' 
  | 'supervisor_question';

export interface ResearchNote {
  id: string;
  projectId: string;
  title: string;
  type: NoteType;
  content: string; // Markdown or rich text
  date: string;
  tags: string[];
  relatedPaperIds: string[];
  relatedQuestionIds: string[];
  relatedChapterIds: string[];
  updatedAt: string;
}

export type ChapterStatus = 
  | 'draft' 
  | 'ready_for_review' 
  | 'submitted' 
  | 'under_review' 
  | 'revision_requested' 
  | 'resubmitted' 
  | 'approved';

export interface ChapterSection {
  id: string;
  title: string;
  level: number; // 1 = H1, 2 = H2, 3 = H3
  order: number;
}

export interface DocumentVersion {
  id: string;
  chapterId: string;
  versionNumber: number;
  title: string;
  summary: string;
  content: string;
  wordCount: number;
  authorName: string;
  createdAt: string;
}

export interface ThesisChapter {
  id: string;
  projectId: string;
  number: number;
  title: string;
  description?: string;
  status: ChapterStatus;
  content: string; // HTML from TipTap
  targetWordCount: number;
  currentWordCount: number;
  lastSaved: string;
  readyForReview: boolean;
  sections: ChapterSection[];
  linkedReferenceIds: string[];
  versions: DocumentVersion[];
}

export type CitationStyleType = 'apa' | 'ieee' | 'mla' | 'chicago' | 'harvard';

export interface ReferenceItem {
  id: string;
  projectId: string;
  paperId?: string;
  citationKey: string; // e.g. "sharma2024phishing"
  entryType: 'article' | 'book' | 'inproceedings' | 'techreport' | 'misc';
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  booktitle?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publisher?: string;
  doi?: string;
  url?: string;
  bibtex: string;
  addedAt: string;
}

export interface CitationValidationWarning {
  referenceId: string;
  referenceTitle: string;
  missingFields: string[];
  severity: 'warning' | 'error';
}

export interface MethodologyStep {
  id: string;
  order: number;
  name: string;
  description: string;
  tools: string[];
  input: string;
  output: string;
  linkedQuestionCode?: string;
  linkedDatasetId?: string;
}

export interface MethodologyPlan {
  id: string;
  projectId: string;
  researchDesign: string;
  researchApproach: 'Quantitative' | 'Qualitative' | 'Mixed-Method' | 'Experimental Machine Learning';
  dataCollectionMethod: string;
  datasetDescription: string;
  samplingMethod: string;
  toolsAndTech: string[];
  experimentalSetup: string;
  evaluationMetrics: string[];
  validationStrategy: string;
  ethicalConsiderations: string;
  limitations: string;
  steps: MethodologyStep[];
  updatedAt: string;
}

export interface DatasetItem {
  id: string;
  projectId: string;
  name: string;
  source: string;
  description: string;
  version: string;
  collectionDate: string;
  size: string;
  rowCount?: number;
  format: string; // CSV, ARFF, JSON, SQLite
  license: string;
  accessUrl?: string;
  notes: string;
}

export interface ExperimentMetric {
  name: string;
  value: number;
  unit?: string;
  isHigherBetter?: boolean;
}

export interface ExperimentRun {
  id: string;
  projectId: string;
  experimentCode: string; // e.g. "EXP-04"
  name: string;
  objective: string;
  relatedQuestionCode: string;
  datasetVersion: string;
  method: string;
  algorithm: string;
  configuration: Record<string, string | number | boolean>;
  environment: string; // e.g. "Python 3.11, PyTorch, RTX 4090"
  startDate: string;
  endDate: string;
  metrics: Record<string, number>; // e.g. { accuracy: 0.968, precision: 0.971, recall: 0.965, f1: 0.968, latencyMs: 14.2 }
  observations: string;
  conclusion: string;
  isBestPerforming?: boolean;
  linkedChapterId?: string;
  outputChartUrl?: string;
}

export interface FeedbackComment {
  id: string;
  feedbackId: string;
  chapterId: string;
  chapterTitle: string;
  pageOrSection?: string;
  quoteText?: string;
  comment: string;
  reviewerName: string;
  reviewerRole: 'supervisor' | 'co_supervisor' | 'external_examiner';
  createdAt: string;
  resolved: boolean;
  resolutionNote?: string;
  resolvedAt?: string;
}

export interface SupervisorFeedback {
  id: string;
  projectId: string;
  chapterId: string;
  chapterTitle: string;
  submissionVersion: number;
  reviewerName: string;
  reviewerTitle: string;
  submissionDate: string;
  reviewDate: string;
  status: ChapterStatus;
  overallComments: string;
  actionRequired: string;
  comments: FeedbackComment[];
}

export interface MeetingItem {
  id: string;
  projectId: string;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  participants: string[];
  agenda: string[];
  locationOrLink: string;
  notes: string;
  decisions: string[];
  actionItems: { text: string; completed: boolean }[];
  nextMeetingDate?: string;
}

export interface ResearchJournalEntry {
  id: string;
  projectId: string;
  date: string;
  workCompleted: string;
  problemsEncountered: string;
  experimentsPerformed: string;
  findings: string;
  decisions: string;
  questionsForSupervisor: string;
  nextSteps: string;
}

export interface MilestoneItem {
  id: string;
  projectId: string;
  order: number;
  title: string;
  description: string;
  deadline: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'pending';
  dependencies: string[];
  relatedChapterTitle?: string;
  evidenceOfCompletion?: string;
}

export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed';

export interface TaskItem {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  deadline: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: TaskStatus;
  milestoneId?: string;
  assignee: string;
  tags: string[];
}

export interface ChecklistItem {
  id: string;
  category: 'document' | 'academic' | 'administrative';
  label: string;
  description: string;
  completed: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  isRequired: boolean;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'feedback' | 'review' | 'milestone' | 'deadline' | 'meeting' | 'task';
  date: string;
  read: boolean;
  link: string;
  projectId?: string;
}

export interface ActivityLogItem {
  id: string;
  projectId: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  iconType: 'document' | 'comment' | 'experiment' | 'milestone' | 'reference' | 'check';
}

