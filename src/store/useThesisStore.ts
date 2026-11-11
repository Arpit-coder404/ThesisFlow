import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  Role,
  ResearchProject,
  ResearchQuestion,
  ResearchObjective,
  LiteraturePaper,
  LiteratureCollection,
  PaperAnnotation,
  LiteratureMatrixRow,
  ResearchNote,
  ThesisChapter,
  ReferenceItem,
  CitationStyleType,
  MethodologyPlan,
  DatasetItem,
  ExperimentRun,
  SupervisorFeedback,
  FeedbackComment,
  MeetingItem,
  MilestoneItem,
  TaskItem,
  TaskStatus,
  ChecklistItem,
  NotificationItem,
  ActivityLogItem,
  DocumentVersion,
} from '../types';
import {
  currentUser as defaultStudent,
  demoUsers,
  sampleProjects,
  sampleQuestions,
  sampleObjectives,
  samplePapers,
  sampleCollections,
  sampleAnnotations,
  sampleMatrixRows,
  sampleNotes,
  sampleChapters,
  sampleReferences,
  sampleMethodology,
  sampleDatasets,
  sampleExperiments,
  sampleFeedback,
  sampleMeetings,
  sampleMilestones,
  sampleTasks,
  sampleChecklist,
  sampleNotifications,
  sampleActivity,
} from '../data/sampleData';
import { parseBibtexEntry } from '../lib/citations';

interface ThesisState {
  // Auth & Roles
  currentUser: User;
  allUsers: User[];
  setUserRole: (role: Role) => void;
  setUser: (user: User) => void;

  // Projects
  projects: ResearchProject[];
  activeProjectId: string;
  setActiveProject: (projectId: string) => void;
  addProject: (project: Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<ResearchProject>) => void;

  // Research Questions & Objectives
  questions: ResearchQuestion[];
  objectives: ResearchObjective[];
  addQuestion: (q: Omit<ResearchQuestion, 'id'>) => void;
  updateQuestion: (id: string, updates: Partial<ResearchQuestion>) => void;
  deleteQuestion: (id: string) => void;
  addObjective: (obj: Omit<ResearchObjective, 'id'>) => void;
  updateObjective: (id: string, updates: Partial<ResearchObjective>) => void;
  deleteObjective: (id: string) => void;

  // Literature
  papers: LiteraturePaper[];
  collections: LiteratureCollection[];
  annotations: PaperAnnotation[];
  matrixRows: LiteratureMatrixRow[];
  addPaper: (paper: Omit<LiteraturePaper, 'id' | 'addedAt'>) => string;
  updatePaper: (id: string, updates: Partial<LiteraturePaper>) => void;
  deletePaper: (id: string) => void;
  setReadingStatus: (id: string, status: LiteraturePaper['readingStatus']) => void;
  addCollection: (col: Omit<LiteratureCollection, 'id'>) => void;
  deleteCollection: (id: string) => void;
  addAnnotation: (anno: Omit<PaperAnnotation, 'id' | 'createdAt'>) => void;
  deleteAnnotation: (id: string) => void;
  updateMatrixRow: (id: string, updates: Partial<LiteratureMatrixRow>) => void;
  addMatrixRowFromPaper: (paperId: string) => void;

  // Notes
  notes: ResearchNote[];
  addNote: (note: Omit<ResearchNote, 'id' | 'updatedAt'>) => string;
  updateNote: (id: string, updates: Partial<ResearchNote>) => void;
  deleteNote: (id: string) => void;

  // Thesis Editor & Chapters
  chapters: ThesisChapter[];
  activeChapterId: string;
  setActiveChapter: (id: string) => void;
  updateChapterContent: (id: string, content: string, wordCount: number) => void;
  updateChapterDetails: (id: string, updates: Partial<ThesisChapter>) => void;
  addChapter: (title: string, description?: string) => string;
  submitChapterForReview: (chapterId: string) => void;
  approveChapter: (chapterId: string) => void;
  requestChapterRevision: (chapterId: string, feedbackText: string) => void;
  saveChapterVersion: (chapterId: string, summary: string) => void;
  restoreChapterVersion: (chapterId: string, versionId: string) => void;

  // References & Citations
  references: ReferenceItem[];
  citationStyle: CitationStyleType;
  setCitationStyle: (style: CitationStyleType) => void;
  addReference: (ref: Omit<ReferenceItem, 'id' | 'addedAt'>) => string;
  updateReference: (id: string, updates: Partial<ReferenceItem>) => void;
  deleteReference: (id: string) => void;
  importBibtexText: (bibtex: string) => number;

  // Methodology
  methodology: MethodologyPlan;
  updateMethodology: (updates: Partial<MethodologyPlan>) => void;
  addMethodologyStep: (step: Omit<MethodologyPlan['steps'][0], 'id'>) => void;
  updateMethodologyStep: (stepId: string, updates: Partial<MethodologyPlan['steps'][0]>) => void;
  deleteMethodologyStep: (stepId: string) => void;

  // Experiments & Datasets
  datasets: DatasetItem[];
  experiments: ExperimentRun[];
  addDataset: (dataset: Omit<DatasetItem, 'id'>) => string;
  updateDataset: (id: string, updates: Partial<DatasetItem>) => void;
  addExperiment: (exp: Omit<ExperimentRun, 'id'>) => string;
  updateExperiment: (id: string, updates: Partial<ExperimentRun>) => void;
  setBestPerformingExperiment: (expId: string) => void;

  // Collaboration & Feedback
  feedbacks: SupervisorFeedback[];
  addSupervisorFeedback: (fb: Omit<SupervisorFeedback, 'id'>) => void;
  addFeedbackComment: (comment: Omit<FeedbackComment, 'id' | 'createdAt'>) => void;
  resolveFeedbackComment: (commentId: string, note?: string) => void;

  // Meetings
  meetings: MeetingItem[];
  addMeeting: (meeting: Omit<MeetingItem, 'id'>) => void;
  updateMeeting: (id: string, updates: Partial<MeetingItem>) => void;

  // Milestones & Tasks
  milestones: MilestoneItem[];
  tasks: TaskItem[];
  updateMilestoneStatus: (id: string, status: MilestoneItem['status']) => void;
  addTask: (task: Omit<TaskItem, 'id'>) => string;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;

  // Submission Checklist
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Activity Logs
  activities: ActivityLogItem[];
  logActivity: (action: string, target: string, iconType?: ActivityLogItem['iconType']) => void;

  // UI States
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  // Reset to initial demo state
  resetToDemoData: () => void;
}

export const useThesisStore = create<ThesisState>()(
  persist(
    (set, get) => ({
      // Auth & Roles
      currentUser: defaultStudent,
      allUsers: demoUsers,
      setUserRole: (role: Role) => {
        const found = demoUsers.find((u) => u.role === role) || demoUsers[0];
        set({ currentUser: found });
        get().logActivity('switched role to', `${role.toUpperCase()} (${found.name})`, 'comment');
      },
      setUser: (user: User) => set({ currentUser: user }),

      // Projects
      projects: sampleProjects,
      activeProjectId: 'proj-001',
      setActiveProject: (projectId: string) => {
        set({ activeProjectId: projectId });
        const p = get().projects.find((proj) => proj.id === projectId);
        if (p) {
          get().logActivity('switched active project to', p.title, 'document');
        }
      },
      addProject: (projectData) => {
        const id = `proj-${Date.now().toString().slice(-4)}`;
        const now = new Date().toISOString();
        const newProj: ResearchProject = {
          ...projectData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          projects: [newProj, ...state.projects],
          activeProjectId: id,
        }));
        get().logActivity('created new research project', newProj.title, 'document');
        return id;
      },
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      // Research Questions & Objectives
      questions: sampleQuestions,
      objectives: sampleObjectives,
      addQuestion: (q) => {
        const id = `rq-${Date.now().toString().slice(-4)}`;
        const newQ: ResearchQuestion = { ...q, id };
        set((state) => ({ questions: [...state.questions, newQ] }));
        get().logActivity('added research question', `${newQ.code}: ${newQ.question.slice(0, 45)}...`, 'document');
      },
      updateQuestion: (id, updates) => {
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        }));
      },
      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        }));
      },
      addObjective: (obj) => {
        const id = `obj-${Date.now().toString().slice(-4)}`;
        const newObj: ResearchObjective = { ...obj, id };
        set((state) => ({ objectives: [...state.objectives, newObj] }));
        get().logActivity('added research objective', `${newObj.code}: ${newObj.objective.slice(0, 45)}...`, 'milestone');
      },
      updateObjective: (id, updates) => {
        set((state) => ({
          objectives: state.objectives.map((o) => (o.id === id ? { ...o, ...updates } : o)),
        }));
      },
      deleteObjective: (id) => {
        set((state) => ({
          objectives: state.objectives.filter((o) => o.id !== id),
        }));
      },

      // Literature
      papers: samplePapers,
      collections: sampleCollections,
      annotations: sampleAnnotations,
      matrixRows: sampleMatrixRows,
      addPaper: (paperData) => {
        const id = `paper-${Date.now().toString().slice(-4)}`;
        const newPaper: LiteraturePaper = {
          ...paperData,
          id,
          addedAt: new Date().toISOString().split('T')[0],
        };
        set((state) => ({
          papers: [newPaper, ...state.papers],
        }));

        // Also add automatic reference entry
        const refId = `ref-${Date.now().toString().slice(-4)}`;
        const citationKey = `${(newPaper.authors[0] || 'paper').split(' ').pop()?.toLowerCase() || 'ref'}${newPaper.year}`;
        const newRef: ReferenceItem = {
          id: refId,
          projectId: newPaper.projectId,
          paperId: id,
          citationKey,
          entryType: newPaper.publicationType === 'conference' ? 'inproceedings' : 'article',
          title: newPaper.title,
          authors: newPaper.authors,
          year: newPaper.year,
          journal: newPaper.journalOrConference,
          doi: newPaper.doi,
          url: newPaper.url,
          bibtex: `@article{${citationKey},\n  title = {${newPaper.title}},\n  author = {${newPaper.authors.join(' and ')}},\n  year = {${newPaper.year}},\n  journal = {${newPaper.journalOrConference}}\n}`,
          addedAt: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ references: [newRef, ...state.references] }));

        get().logActivity('added paper to literature library', newPaper.title, 'reference');
        return id;
      },
      updatePaper: (id, updates) => {
        set((state) => ({
          papers: state.papers.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },
      deletePaper: (id) => {
        set((state) => ({
          papers: state.papers.filter((p) => p.id !== id),
          annotations: state.annotations.filter((a) => a.paperId !== id),
          matrixRows: state.matrixRows.filter((m) => m.paperId !== id),
        }));
      },
      setReadingStatus: (id, status) => {
        set((state) => ({
          papers: state.papers.map((p) => (p.id === id ? { ...p, readingStatus: status } : p)),
        }));
      },
      addCollection: (col) => {
        const id = `col-${Date.now().toString().slice(-4)}`;
        set((state) => ({
          collections: [...state.collections, { ...col, id, paperCount: 0 }],
        }));
      },
      deleteCollection: (id) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
      },
      addAnnotation: (anno) => {
        const id = `anno-${Date.now().toString().slice(-4)}`;
        const newAnno: PaperAnnotation = {
          ...anno,
          id,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          annotations: [newAnno, ...state.annotations],
        }));
        get().logActivity('added annotation to paper', `Page ${newAnno.pageNumber}: "${newAnno.comment.slice(0, 30)}..."`, 'comment');
      },
      deleteAnnotation: (id) => {
        set((state) => ({
          annotations: state.annotations.filter((a) => a.id !== id),
        }));
      },
      updateMatrixRow: (id, updates) => {
        set((state) => ({
          matrixRows: state.matrixRows.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }));
      },
      addMatrixRowFromPaper: (paperId) => {
        const paper = get().papers.find((p) => p.id === paperId);
        if (!paper) return;
        const exists = get().matrixRows.some((r) => r.paperId === paperId);
        if (exists) return;

        const authorsYear = `${paper.authors[0]?.split(' ').pop() || 'Unknown'} et al., ${paper.year}`;
        const newRow: LiteratureMatrixRow = {
          id: `mat-${Date.now().toString().slice(-4)}`,
          paperId: paper.id,
          paperTitle: paper.title,
          authorsYear,
          researchProblem: '',
          methodology: '',
          dataset: '',
          keyFindings: paper.abstract ? paper.abstract.slice(0, 120) + '...' : '',
          limitations: '',
          researchGap: '',
          relevanceToMyWork: paper.personalNotes || '',
        };
        set((state) => ({ matrixRows: [...state.matrixRows, newRow] }));
        get().logActivity('added paper to literature matrix', paper.title, 'document');
      },

      // Notes
      notes: sampleNotes,
      addNote: (noteData) => {
        const id = `note-${Date.now().toString().slice(-4)}`;
        const newNote: ResearchNote = {
          ...noteData,
          id,
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
        get().logActivity('created research note', newNote.title, 'document');
        return id;
      },
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
          ),
        }));
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
      },

      // Thesis Editor & Chapters
      chapters: sampleChapters,
      activeChapterId: 'chap-01',
      setActiveChapter: (id) => set({ activeChapterId: id }),
      updateChapterContent: (id, content, wordCount) => {
        set((state) => ({
          chapters: state.chapters.map((ch) =>
            ch.id === id
              ? {
                  ...ch,
                  content,
                  currentWordCount: wordCount,
                  lastSaved: new Date().toISOString(),
                }
              : ch
          ),
        }));
      },
      updateChapterDetails: (id, updates) => {
        set((state) => ({
          chapters: state.chapters.map((ch) => (ch.id === id ? { ...ch, ...updates } : ch)),
        }));
      },
      addChapter: (title, description) => {
        const id = `chap-${Date.now().toString().slice(-4)}`;
        const state = get();
        const number = state.chapters.length + 1;
        const newChap: ThesisChapter = {
          id,
          projectId: state.activeProjectId,
          number,
          title,
          description: description || `Chapter ${number} draft`,
          status: 'draft',
          content: `<h1>Chapter ${number}: ${title}</h1><p>Begin writing here...</p>`,
          targetWordCount: 4000,
          currentWordCount: 5,
          lastSaved: new Date().toISOString(),
          readyForReview: false,
          sections: [{ id: `sec-${number}-1`, title: `${number}.1 Overview`, level: 1, order: 1 }],
          linkedReferenceIds: [],
          versions: [],
        };
        set({
          chapters: [...state.chapters, newChap],
          activeChapterId: id,
        });
        get().logActivity('added new chapter', `Chapter ${number}: ${title}`, 'document');
        return id;
      },
      submitChapterForReview: (chapterId) => {
        const state = get();
        const chap = state.chapters.find((c) => c.id === chapterId);
        if (!chap) return;

        // Update chapter status
        set((s) => ({
          chapters: s.chapters.map((c) =>
            c.id === chapterId ? { ...c, status: 'submitted', readyForReview: true } : c
          ),
        }));

        // Create or update supervisor feedback record
        const feedbackId = `fb-${Date.now().toString().slice(-4)}`;
        const currentVersionCount = chap.versions.length + 1;
        const newFb: SupervisorFeedback = {
          id: feedbackId,
          projectId: chap.projectId,
          chapterId: chap.id,
          chapterTitle: chap.title,
          submissionVersion: currentVersionCount,
          reviewerName: 'Dr. Meera Sharma',
          reviewerTitle: 'Associate Professor, Primary Supervisor',
          submissionDate: new Date().toISOString().split('T')[0],
          reviewDate: new Date().toISOString().split('T')[0],
          status: 'submitted',
          overallComments: `Submission received for ${chap.title} (Version ${currentVersionCount}). Currently awaiting supervisor review.`,
          actionRequired: 'Awaiting supervisor feedback.',
          comments: [],
        };

        set((s) => ({
          feedbacks: [newFb, ...s.feedbacks],
          notifications: [
            {
              id: `notif-${Date.now().toString().slice(-4)}`,
              title: 'Chapter Submitted for Review',
              message: `${chap.title} has been submitted to Dr. Meera Sharma for formal review.`,
              type: 'review',
              date: new Date().toISOString(),
              read: false,
              link: '/app/feedback',
              projectId: chap.projectId,
            },
            ...s.notifications,
          ],
        }));

        get().logActivity('submitted chapter for review', chap.title, 'document');
      },
      approveChapter: (chapterId) => {
        set((state) => ({
          chapters: state.chapters.map((c) =>
            c.id === chapterId ? { ...c, status: 'approved' } : c
          ),
          feedbacks: state.feedbacks.map((f) =>
            f.chapterId === chapterId ? { ...f, status: 'approved', reviewDate: new Date().toISOString().split('T')[0] } : f
          ),
          notifications: [
            {
              id: `notif-${Date.now().toString().slice(-4)}`,
              title: 'Chapter Approved!',
              message: `Your supervisor Dr. Meera Sharma has formally approved this chapter.`,
              type: 'review',
              date: new Date().toISOString(),
              read: false,
              link: '/app/chapters',
            },
            ...state.notifications,
          ],
        }));
        const chap = get().chapters.find((c) => c.id === chapterId);
        get().logActivity('approved chapter', chap?.title || chapterId, 'check');
      },
      requestChapterRevision: (chapterId, feedbackText) => {
        set((state) => ({
          chapters: state.chapters.map((c) =>
            c.id === chapterId ? { ...c, status: 'revision_requested' } : c
          ),
          feedbacks: state.feedbacks.map((f) =>
            f.chapterId === chapterId
              ? {
                  ...f,
                  status: 'revision_requested',
                  overallComments: feedbackText,
                  reviewDate: new Date().toISOString().split('T')[0],
                }
              : f
          ),
          notifications: [
            {
              id: `notif-${Date.now().toString().slice(-4)}`,
              title: 'Revision Requested by Supervisor',
              message: `Dr. Meera Sharma requested revisions on your submission.`,
              type: 'feedback',
              date: new Date().toISOString(),
              read: false,
              link: '/app/feedback',
            },
            ...state.notifications,
          ],
        }));
        const chap = get().chapters.find((c) => c.id === chapterId);
        get().logActivity('requested revisions on', chap?.title || chapterId, 'comment');
      },
      saveChapterVersion: (chapterId, summary) => {
        const state = get();
        const chap = state.chapters.find((c) => c.id === chapterId);
        if (!chap) return;

        const versionNumber = (chap.versions?.length || 0) + 1;
        const newVersion: DocumentVersion = {
          id: `ver-${chapterId}-${versionNumber}`,
          chapterId,
          versionNumber,
          title: `Version ${versionNumber}`,
          summary: summary || `Snapshot created by ${state.currentUser.name}`,
          content: chap.content,
          wordCount: chap.currentWordCount,
          authorName: state.currentUser.name,
          createdAt: new Date().toISOString(),
        };

        set((s) => ({
          chapters: s.chapters.map((c) =>
            c.id === chapterId
              ? {
                  ...c,
                  versions: [newVersion, ...(c.versions || [])],
                }
              : c
          ),
        }));
        get().logActivity('saved version snapshot', `${chap.title} (v${versionNumber})`, 'document');
      },
      restoreChapterVersion: (chapterId, versionId) => {
        const state = get();
        const chap = state.chapters.find((c) => c.id === chapterId);
        if (!chap) return;
        const targetVer = chap.versions.find((v) => v.id === versionId);
        if (!targetVer) return;

        set((s) => ({
          chapters: s.chapters.map((c) =>
            c.id === chapterId
              ? {
                  ...c,
                  content: targetVer.content,
                  currentWordCount: targetVer.wordCount,
                  lastSaved: new Date().toISOString(),
                }
              : c
          ),
        }));
        get().logActivity('restored previous version of', `${chap.title} to v${targetVer.versionNumber}`, 'document');
      },

      // References & Citations
      references: sampleReferences,
      citationStyle: 'apa',
      setCitationStyle: (style) => set({ citationStyle: style }),
      addReference: (refData) => {
        const id = `ref-${Date.now().toString().slice(-4)}`;
        const newRef: ReferenceItem = {
          ...refData,
          id,
          addedAt: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ references: [newRef, ...state.references] }));
        get().logActivity('added reference', `[${newRef.citationKey}] ${newRef.title.slice(0, 35)}...`, 'reference');
        return id;
      },
      updateReference: (id, updates) => {
        set((state) => ({
          references: state.references.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }));
      },
      deleteReference: (id) => {
        set((state) => ({
          references: state.references.filter((r) => r.id !== id),
        }));
      },
      importBibtexText: (bibtexString) => {
        const entries = bibtexString.split(/(?=@\w+\s*\{)/);
        let importedCount = 0;
        const state = get();
        const newRefs: ReferenceItem[] = [];

        for (const raw of entries) {
          if (!raw.trim().startsWith('@')) continue;
          const parsed = parseBibtexEntry(raw);
          if (parsed && parsed.title) {
            const id = `ref-${Date.now().toString().slice(-4)}-${importedCount}`;
            newRefs.push({
              id,
              projectId: state.activeProjectId,
              citationKey: parsed.citationKey || `imported${Date.now()}`,
              entryType: parsed.entryType || 'article',
              title: parsed.title,
              authors: parsed.authors && parsed.authors.length > 0 ? parsed.authors : ['Unknown Author'],
              year: parsed.year || new Date().getFullYear(),
              journal: parsed.journal,
              booktitle: parsed.booktitle,
              volume: parsed.volume,
              issue: parsed.issue,
              pages: parsed.pages,
              publisher: parsed.publisher,
              doi: parsed.doi,
              url: parsed.url,
              bibtex: parsed.bibtex || raw,
              addedAt: new Date().toISOString().split('T')[0],
            });
            importedCount++;
          }
        }

        if (newRefs.length > 0) {
          set((s) => ({ references: [...newRefs, ...s.references] }));
          get().logActivity('imported references via BibTeX', `${importedCount} items`, 'reference');
        }
        return importedCount;
      },

      // Methodology
      methodology: sampleMethodology,
      updateMethodology: (updates) => {
        set((state) => ({
          methodology: { ...state.methodology, ...updates, updatedAt: new Date().toISOString() },
        }));
        get().logActivity('updated research methodology', 'Specification updated', 'milestone');
      },
      addMethodologyStep: (stepData) => {
        const id = `mstep-${Date.now().toString().slice(-4)}`;
        set((state) => ({
          methodology: {
            ...state.methodology,
            steps: [...state.methodology.steps, { ...stepData, id }],
            updatedAt: new Date().toISOString(),
          },
        }));
      },
      updateMethodologyStep: (stepId, updates) => {
        set((state) => ({
          methodology: {
            ...state.methodology,
            steps: state.methodology.steps.map((s) => (s.id === stepId ? { ...s, ...updates } : s)),
            updatedAt: new Date().toISOString(),
          },
        }));
      },
      deleteMethodologyStep: (stepId) => {
        set((state) => ({
          methodology: {
            ...state.methodology,
            steps: state.methodology.steps.filter((s) => s.id !== stepId),
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      // Experiments & Datasets
      datasets: sampleDatasets,
      experiments: sampleExperiments,
      addDataset: (datasetData) => {
        const id = `ds-${Date.now().toString().slice(-4)}`;
        const newDs: DatasetItem = { ...datasetData, id };
        set((state) => ({ datasets: [newDs, ...state.datasets] }));
        get().logActivity('registered dataset', newDs.name, 'experiment');
        return id;
      },
      updateDataset: (id, updates) => {
        set((state) => ({
          datasets: state.datasets.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        }));
      },
      addExperiment: (expData) => {
        const id = `exp-${Date.now().toString().slice(-4)}`;
        const newExp: ExperimentRun = { ...expData, id };
        set((state) => ({ experiments: [newExp, ...state.experiments] }));
        get().logActivity('logged experiment run', `${newExp.experimentCode}: ${newExp.name}`, 'experiment');
        return id;
      },
      updateExperiment: (id, updates) => {
        set((state) => ({
          experiments: state.experiments.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
      },
      setBestPerformingExperiment: (expId) => {
        set((state) => ({
          experiments: state.experiments.map((e) => ({
            ...e,
            isBestPerforming: e.id === expId,
          })),
        }));
        const exp = get().experiments.find((e) => e.id === expId);
        if (exp) {
          get().logActivity('marked best performing model', `${exp.experimentCode}: ${exp.name}`, 'check');
        }
      },

      // Collaboration & Feedback
      feedbacks: sampleFeedback,
      addSupervisorFeedback: (fbData) => {
        const id = `fb-${Date.now().toString().slice(-4)}`;
        set((state) => ({ feedbacks: [{ ...fbData, id }, ...state.feedbacks] }));
      },
      addFeedbackComment: (commentData) => {
        const id = `cm-${Date.now().toString().slice(-4)}`;
        const newComment: FeedbackComment = {
          ...commentData,
          id,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          feedbacks: state.feedbacks.map((f) =>
            f.id === commentData.feedbackId
              ? { ...f, comments: [...f.comments, newComment] }
              : f
          ),
        }));
        get().logActivity('added review feedback', `"${newComment.comment.slice(0, 30)}..."`, 'comment');
      },
      resolveFeedbackComment: (commentId, note) => {
        set((state) => ({
          feedbacks: state.feedbacks.map((f) => ({
            ...f,
            comments: f.comments.map((c) =>
              c.id === commentId
                ? {
                    ...c,
                    resolved: true,
                    resolutionNote: note || 'Resolved by researcher.',
                    resolvedAt: new Date().toISOString(),
                  }
                : c
            ),
          })),
        }));
        get().logActivity('resolved supervisor comment', 'Comment resolved', 'check');
      },

      // Meetings
      meetings: sampleMeetings,
      addMeeting: (meetingData) => {
        const id = `meet-${Date.now().toString().slice(-4)}`;
        const newMeeting: MeetingItem = { ...meetingData, id };
        set((state) => ({ meetings: [newMeeting, ...state.meetings] }));
        get().logActivity('scheduled supervision meeting', newMeeting.title, 'milestone');
      },
      updateMeeting: (id, updates) => {
        set((state) => ({
          meetings: state.meetings.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        }));
      },

      // Milestones & Tasks
      milestones: sampleMilestones,
      tasks: sampleTasks,
      updateMilestoneStatus: (id, status) => {
        set((state) => ({
          milestones: state.milestones.map((m) => (m.id === id ? { ...m, status } : m)),
        }));
        const ms = get().milestones.find((m) => m.id === id);
        if (ms) {
          get().logActivity(`marked milestone as ${status}`, ms.title, 'milestone');
        }
      },
      addTask: (taskData) => {
        const id = `task-${Date.now().toString().slice(-4)}`;
        const newTask: TaskItem = { ...taskData, id };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
        get().logActivity('created task', newTask.title, 'milestone');
        return id;
      },
      updateTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        }));
        const t = get().tasks.find((task) => task.id === id);
        if (t) {
          get().logActivity(`updated task status to ${status.replace('_', ' ')}`, t.title, 'check');
        }
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
      },

      // Submission Checklist
      checklist: sampleChecklist,
      toggleChecklistItem: (id) => {
        set((state) => ({
          checklist: state.checklist.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
          ),
        }));
      },

      // Notifications
      notifications: sampleNotifications,
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      // Activity Logs
      activities: sampleActivity,
      logActivity: (action, target, iconType = 'document') => {
        const state = get();
        const newAct: ActivityLogItem = {
          id: `act-${Date.now().toString().slice(-4)}`,
          projectId: state.activeProjectId,
          actor: state.currentUser.name,
          action,
          target,
          timestamp: 'Just now',
          iconType,
        };
        set({ activities: [newAct, ...state.activities.slice(0, 40)] });
      },

      // UI States
      isCommandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
      toggleCommandPalette: () => set((s) => ({ isCommandPaletteOpen: !s.isCommandPaletteOpen })),

      // Reset
      resetToDemoData: () => {
        set({
          currentUser: defaultStudent,
          projects: sampleProjects,
          activeProjectId: 'proj-001',
          questions: sampleQuestions,
          objectives: sampleObjectives,
          papers: samplePapers,
          collections: sampleCollections,
          annotations: sampleAnnotations,
          matrixRows: sampleMatrixRows,
          notes: sampleNotes,
          chapters: sampleChapters,
          activeChapterId: 'chap-01',
          references: sampleReferences,
          citationStyle: 'apa',
          methodology: sampleMethodology,
          datasets: sampleDatasets,
          experiments: sampleExperiments,
          feedbacks: sampleFeedback,
          meetings: sampleMeetings,
          milestones: sampleMilestones,
          tasks: sampleTasks,
          checklist: sampleChecklist,
          notifications: sampleNotifications,
          activities: sampleActivity,
        });
      },
    }),
    {
      name: 'thesisflow-storage-v1',
    }
  )
);

