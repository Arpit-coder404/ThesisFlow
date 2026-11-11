import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { OverviewPage } from './pages/OverviewPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResearchQuestionsPage } from './pages/ResearchQuestionsPage';
import { LiteraturePage } from './pages/LiteraturePage';
import { PaperReaderPage } from './pages/PaperReaderPage';
import { LiteratureMatrixPage } from './pages/LiteratureMatrixPage';
import { ResearchNotesPage } from './pages/ResearchNotesPage';
import { ThesisEditorPage } from './pages/ThesisEditorPage';
import { ChaptersListPage } from './pages/ChaptersListPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { ExperimentsPage } from './pages/ExperimentsPage';
import { SupervisorFeedbackPage } from './pages/SupervisorFeedbackPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { TeamWorkspacePage } from './pages/TeamWorkspacePage';
import { TasksMilestonesPage } from './pages/TasksMilestonesPage';
import { CalendarPage } from './pages/CalendarPage';
import { SubmissionChecklistPage } from './pages/SubmissionChecklistPage';
import { ThesisExportPage } from './pages/ThesisExportPage';
import { ArchivePage } from './pages/ArchivePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HelpGuidesPage } from './pages/HelpGuidesPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Application Workspace */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="research-questions" element={<ResearchQuestionsPage />} />
          <Route path="literature" element={<LiteraturePage />} />
          <Route path="literature/paper/:paperId" element={<PaperReaderPage />} />
          <Route path="matrix" element={<LiteratureMatrixPage />} />
          <Route path="notes" element={<ResearchNotesPage />} />
          <Route path="editor" element={<ThesisEditorPage />} />
          <Route path="chapters" element={<ChaptersListPage />} />
          <Route path="references" element={<ReferencesPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="experiments" element={<ExperimentsPage />} />
          <Route path="feedback" element={<SupervisorFeedbackPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="team" element={<TeamWorkspacePage />} />
          <Route path="tasks" element={<TasksMilestonesPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="checklist" element={<SubmissionChecklistPage />} />
          <Route path="export" element={<ThesisExportPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="help" element={<HelpGuidesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

