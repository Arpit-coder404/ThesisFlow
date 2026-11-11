import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Edit3,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  FlaskConical,
  MessageSquare,
  Plus,
  Compass,
  DownloadCloud,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const OverviewPage: React.FC = () => {
  const {
    currentUser,
    projects,
    activeProjectId,
    chapters,
    milestones,
    tasks,
    papers,
    references,
    feedbacks,
    meetings,
    objectives,
    checklist,
    activities,
    setActiveChapter,
  } = useThesisStore();

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Calculated Metrics (grounded in real records)
  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
  const totalMilestones = milestones.length;
  const milestonePercent = Math.round((completedMilestones / totalMilestones) * 100);

  const approvedChapters = chapters.filter((c) => c.status === 'approved').length;
  const totalChapters = chapters.length;

  const totalWords = chapters.reduce((sum, ch) => sum + ch.currentWordCount, 0);
  const targetWords = chapters.reduce((sum, ch) => sum + ch.targetWordCount, 0);

  const readPapers = papers.filter((p) => p.readingStatus === 'read').length;
  const totalPapers = papers.length;

  const verifiedChecklist = checklist.filter((c) => c.completed).length;
  const totalChecklist = checklist.length;

  const unresolvedComments = feedbacks.flatMap((f) => f.comments).filter((c) => !c.resolved);
  const nextMeeting = meetings[0];

  // Submission countdown
  const submissionDate = new Date(currentProject?.expectedSubmissionDate || '2026-05-15');
  const today = new Date();
  const diffDays = Math.max(
    0,
    Math.ceil((submissionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Greeting Header */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-forest-600 font-semibold mb-1">
            Research Workspace Overview
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Good morning, {currentUser.name}.
          </h1>
          <p className="text-sm text-secondary mt-1">
            Here is where your research stands for{' '}
            <span className="font-semibold text-primary">{currentProject.title}</span>.
          </p>
        </div>

        {/* Project Metadata Pill */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-surface border border-border text-primary font-medium">
            Dept: {currentProject.department}
          </span>
          <span className="px-2.5 py-1 rounded bg-surface border border-border text-secondary font-mono">
            Supervisor: {currentProject.supervisorName}
          </span>
          <span className="px-2.5 py-1 rounded bg-sage text-forest-700 font-semibold border border-forest-500/20">
            Status: {currentProject.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Calculated Progress Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-surface rounded-lg border border-border shadow-subtle space-y-1">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
            Milestones
          </div>
          <div className="text-xl font-bold text-primary">
            {completedMilestones} / {totalMilestones}
          </div>
          <div className="text-[11px] text-forest-600 font-medium">
            {milestonePercent}% completed
          </div>
        </div>

        <div className="p-3.5 bg-surface rounded-lg border border-border shadow-subtle space-y-1">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
            Chapters Approved
          </div>
          <div className="text-xl font-bold text-primary">
            {approvedChapters} / {totalChapters}
          </div>
          <div className="text-[11px] text-secondary">
            {totalChapters - approvedChapters} in draft/review
          </div>
        </div>

        <div className="p-3.5 bg-surface rounded-lg border border-border shadow-subtle space-y-1">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
            Word Count
          </div>
          <div className="text-xl font-bold text-primary">
            {totalWords.toLocaleString()}
          </div>
          <div className="text-[11px] text-secondary">
            of {targetWords.toLocaleString()} target
          </div>
        </div>

        <div className="p-3.5 bg-surface rounded-lg border border-border shadow-subtle space-y-1">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
            Literature Read
          </div>
          <div className="text-xl font-bold text-primary">
            {readPapers} / {totalPapers}
          </div>
          <div className="text-[11px] text-forest-600 font-medium">
            100% in matrix
          </div>
        </div>

        <div className="p-3.5 bg-surface rounded-lg border border-border shadow-subtle space-y-1">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
            Best ML Accuracy
          </div>
          <div className="text-xl font-bold text-forest-700 font-mono">
            96.84%
          </div>
          <div className="text-[11px] text-secondary">
            EXP-05 Stacking
          </div>
        </div>

        <div className="p-3.5 bg-surface rounded-lg border border-border shadow-subtle space-y-1">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
            Submission Check
          </div>
          <div className="text-xl font-bold text-primary">
            {verifiedChecklist} / {totalChecklist}
          </div>
          <div className="text-[11px] text-forest-600 font-medium">
            Verified compliant
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Continue Writing Banner */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase text-forest-600 font-semibold flex items-center space-x-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Continue Writing</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-primary">
                Chapter 3: Research Methodology
              </h3>
              <p className="text-xs text-secondary">
                5,120 words • Last saved today • Status: <span className="text-terracotta font-medium">Revision requested by Dr. Sharma</span>
              </p>
            </div>
            <Link
              to="/app/editor"
              onClick={() => setActiveChapter('chap-03')}
              className="px-4 py-2.5 rounded bg-forest-500 hover:bg-forest-600 text-white text-xs font-semibold shadow-subtle shrink-0 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Resume Drafting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pending Supervisor Feedback Alert */}
          {unresolvedComments.length > 0 && (
            <div className="p-4 rounded-xl border border-terracotta/30 bg-terracotta/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-terracotta text-xs font-bold uppercase tracking-wider font-mono">
                  <AlertCircle className="w-4 h-4" />
                  <span>Unresolved Supervisor Action Required ({unresolvedComments.length})</span>
                </div>
                <Link
                  to="/app/feedback"
                  className="text-xs text-terracotta hover:underline font-semibold"
                >
                  View full review →
                </Link>
              </div>

              {unresolvedComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 rounded bg-surface border border-border text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-secondary text-[11px]">
                    <span className="font-semibold text-primary">{comment.chapterTitle} • {comment.pageOrSection}</span>
                    <span>Reviewer: {comment.reviewerName}</span>
                  </div>
                  <p className="text-primary italic font-serif">"{comment.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {/* Current Research Objectives */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-primary">
                  Active Research Objectives
                </h3>
                <p className="text-xs text-secondary">
                  Aligned with research questions RQ1–RQ3
                </p>
              </div>
              <Link
                to="/app/research-questions"
                className="text-xs text-forest-600 hover:text-forest-700 font-medium"
              >
                Open alignment canvas →
              </Link>
            </div>

            <div className="space-y-3">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  className="p-3.5 rounded-lg border border-border bg-surface-subtle hover:bg-sage-light/40 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-500/20 shrink-0">
                      {obj.code}
                    </span>
                    <p className="text-xs text-primary font-medium flex-1">
                      {obj.objective}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold capitalize shrink-0 ${
                        obj.status === 'completed'
                          ? 'bg-sage text-forest-700'
                          : 'bg-softYellow text-primary'
                      }`}
                    >
                      {obj.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-secondary pl-1 border-l-2 border-border">
                    {obj.methodologyOverview}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Milestones Timeline */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-primary">
                  Research Milestones Timeline
                </h3>
                <p className="text-xs text-secondary">
                  Key institutional targets leading to dissertation defense
                </p>
              </div>
              <Link
                to="/app/tasks"
                className="text-xs text-forest-600 hover:text-forest-700 font-medium"
              >
                View all milestones →
              </Link>
            </div>

            <div className="space-y-3">
              {milestones.slice(0, 5).map((m) => (
                <div
                  key={m.id}
                  className="flex items-start space-x-3 text-xs p-2.5 rounded border border-border/60 hover:bg-surface-subtle transition-colors"
                >
                  <div className="pt-0.5">
                    {m.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-forest-600" />
                    ) : m.status === 'in_progress' ? (
                      <Clock className="w-4 h-4 text-terracotta" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-secondary/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${m.status === 'completed' ? 'text-secondary line-through' : 'text-primary'}`}>
                        {m.title}
                      </span>
                      <span className="font-mono text-[10px] text-secondary">
                        Due {m.deadline}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary mt-0.5">{m.description}</p>
                    {m.evidenceOfCompletion && (
                      <div className="text-[10px] text-forest-600 mt-1 italic">
                        Evidence: {m.evidenceOfCompletion}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Research Activity Log */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="font-serif text-base font-bold text-primary">
                Recent Research Activity
              </h3>
              <span className="text-[11px] text-secondary font-mono">Real-time log</span>
            </div>
            <div className="divide-y divide-border/60 text-xs">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-forest-500" />
                    <span className="font-semibold text-primary">{act.actor}</span>
                    <span className="text-secondary">{act.action}</span>
                    <span className="font-medium text-primary truncate max-w-xs">{act.target}</span>
                  </div>
                  <span className="text-[10px] text-secondary font-mono shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Submission Countdown Card */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3 text-center">
            <div className="text-[11px] font-mono uppercase text-secondary font-semibold">
              Final Submission Target
            </div>
            <div className="font-serif text-4xl font-bold text-primary tracking-tight">
              {diffDays} Days
            </div>
            <div className="text-xs text-secondary">
              Expected submission: <span className="font-semibold text-primary">{currentProject.expectedSubmissionDate}</span>
            </div>
            <div className="pt-2">
              <Link
                to="/app/checklist"
                className="w-full py-2 bg-surface-subtle hover:bg-sage-light text-primary border border-border rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Check Submission Readiness</span>
                <ChevronRight className="w-3.5 h-3.5 text-secondary" />
              </Link>
            </div>
          </div>

          {/* Next Supervisor Meeting */}
          {nextMeeting && (
            <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-xs font-semibold text-primary flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-forest-500" />
                  <span>Next Supervision Meeting</span>
                </span>
                <span className="text-[10px] font-mono text-forest-600 bg-sage px-1.5 py-0.5 rounded font-semibold">
                  Confirmed
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-primary">{nextMeeting.title}</div>
                <div className="text-secondary text-[11px]">
                  Date: {nextMeeting.date} at {nextMeeting.time} ({nextMeeting.durationMinutes} mins)
                </div>
                <div className="text-secondary text-[11px]">
                  Location: {nextMeeting.locationOrLink}
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <Link
                  to="/app/meetings"
                  className="text-xs text-forest-600 hover:text-forest-700 font-medium flex items-center space-x-1"
                >
                  <span>Prepare meeting agenda & notes →</span>
                </Link>
              </div>
            </div>
          )}

          {/* Research Library Snapshot */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h4 className="text-xs font-semibold text-primary">Library & Reference Count</h4>
              <Link to="/app/literature" className="text-[11px] text-forest-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-secondary">Cataloged Papers</span>
                <span className="font-mono font-bold text-primary">{papers.length}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-border/40">
                <span className="text-secondary">Formatted References</span>
                <span className="font-mono font-bold text-primary">{references.length}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-border/40">
                <span className="text-secondary">Registered Datasets</span>
                <span className="font-mono font-bold text-primary">2 (88.6k rows)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-border/40">
                <span className="text-secondary">Completed Experiments</span>
                <span className="font-mono font-bold text-forest-700">5 runs</span>
              </div>
            </div>
          </div>

          {/* Quick Academic Actions */}
          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-2">
            <div className="text-xs font-semibold text-primary mb-2">Quick Academic Actions</div>
            <Link
              to="/app/notes"
              className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-subtle border border-border text-xs text-primary transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-3.5 h-3.5 text-secondary" />
                <span>Create Research Note</span>
              </div>
              <Plus className="w-3.5 h-3.5 text-secondary" />
            </Link>
            <Link
              to="/app/literature"
              className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-subtle border border-border text-xs text-primary transition-colors"
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5 text-secondary" />
                <span>Add Academic Paper</span>
              </div>
              <Plus className="w-3.5 h-3.5 text-secondary" />
            </Link>
            <Link
              to="/app/editor"
              className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-subtle border border-border text-xs text-primary transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Edit3 className="w-3.5 h-3.5 text-forest-500" />
                <span>Open Thesis Editor</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary" />
            </Link>
            <Link
              to="/app/export"
              className="w-full flex items-center justify-between p-2 rounded hover:bg-surface-subtle border border-border text-xs text-primary transition-colors"
            >
              <div className="flex items-center space-x-2">
                <DownloadCloud className="w-3.5 h-3.5 text-secondary" />
                <span>Export Thesis Manuscript</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-secondary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

