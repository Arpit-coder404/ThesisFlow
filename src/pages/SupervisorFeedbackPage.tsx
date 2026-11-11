import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Plus,
  ArrowRight,
  Calendar,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { ChapterStatus } from '../types';

export const SupervisorFeedbackPage: React.FC = () => {
  const {
    currentUser,
    feedbacks,
    chapters,
    resolveFeedbackComment,
    addFeedbackComment,
    approveChapter,
    requestChapterRevision,
  } = useThesisStore();

  const [activeFeedbackId, setActiveFeedbackId] = useState<string>(feedbacks[0]?.id || '');
  const [resolutionText, setResolutionText] = useState<{ [key: string]: string }>({});
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentSection, setNewCommentSection] = useState('');
  const [newCommentQuote, setNewCommentQuote] = useState('');

  const activeFeedback = feedbacks.find((f) => f.id === activeFeedbackId) || feedbacks[0];
  const isSupervisorRole = currentUser.role === 'supervisor' || currentUser.role === 'admin';

  const handleResolve = (commentId: string) => {
    const note = resolutionText[commentId] || 'Addressed in revised manuscript draft.';
    resolveFeedbackComment(commentId, note);
  };

  const handleAddSupervisorComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeFeedback) return;

    addFeedbackComment({
      feedbackId: activeFeedback.id,
      chapterId: activeFeedback.chapterId,
      chapterTitle: activeFeedback.chapterTitle,
      pageOrSection: newCommentSection || 'General Section',
      quoteText: newCommentQuote || undefined,
      comment: newCommentText,
      reviewerName: currentUser.name,
      reviewerRole: 'supervisor',
      resolved: false,
    });

    setNewCommentText('');
    setNewCommentSection('');
    setNewCommentQuote('');
  };

  const getStatusBadge = (status: ChapterStatus) => {
    switch (status) {
      case 'approved':
        return <span className="bg-sage text-forest-700 px-2.5 py-1 rounded text-xs font-semibold border border-forest-500/20">Approved</span>;
      case 'revision_requested':
        return <span className="bg-terracotta/10 text-terracotta px-2.5 py-1 rounded text-xs font-semibold">Revision Requested</span>;
      case 'submitted':
        return <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold">Submitted for Review</span>;
      default:
        return <span className="bg-surface-subtle text-secondary px-2.5 py-1 rounded text-xs font-semibold border border-border">Draft</span>;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Supervisor Collaboration & Feedback
            </h1>
            {isSupervisorRole && (
              <span className="text-[10px] font-mono uppercase bg-forest-100 text-forest-700 px-2 py-0.5 rounded font-bold">
                Supervisor Mode Active
              </span>
            )}
          </div>
          <p className="text-xs text-secondary mt-1">
            Formal submission reviews, passage-level commentary, revision directives, and institutional approvals.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/app/meetings"
            className="px-3.5 py-1.5 border border-border bg-surface hover:bg-surface-subtle text-primary rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>Schedule Meeting</span>
          </Link>
          <Link
            to="/app/editor"
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <span>Open in Editor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Primary Supervisor Card */}
      <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-forest-100 border border-forest-500/20 text-forest-700 font-bold flex items-center justify-center font-serif text-base">
            MS
          </div>
          <div>
            <div className="font-bold text-sm text-primary">Dr. Meera Sharma</div>
            <div className="text-secondary text-[11px]">
              Associate Professor in Machine Learning & Cyber-Physical Systems • Primary Supervisor
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-secondary text-[11px]">Assigned Department: Computing</span>
          <span className="text-forest-600 font-medium font-mono text-[11px]">Active Session</span>
        </div>
      </div>

      {/* Submissions Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {feedbacks.map((fb) => (
          <button
            key={fb.id}
            onClick={() => setActiveFeedbackId(fb.id)}
            className={`px-3.5 py-2 rounded-lg border text-left transition-all shrink-0 ${
              fb.id === activeFeedback?.id
                ? 'bg-surface border-forest-500 shadow-subtle font-semibold text-primary ring-1 ring-forest-500/20'
                : 'bg-surface-subtle border-border text-secondary hover:text-primary'
            }`}
          >
            <div className="font-semibold text-xs">{fb.chapterTitle}</div>
            <div className="text-[10px] text-secondary font-mono mt-0.5">
              Version {fb.submissionVersion} • {fb.status.replace('_', ' ')}
            </div>
          </button>
        ))}
      </div>

      {/* Active Submission Review Card */}
      {activeFeedback && (
        <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-6">
          {/* Review Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <div className="text-[10px] font-mono uppercase text-secondary font-semibold">
                Submission Review Record
              </div>
              <h2 className="font-serif text-xl font-bold text-primary mt-0.5">
                {activeFeedback.chapterTitle} (v{activeFeedback.submissionVersion})
              </h2>
              <div className="text-xs text-secondary mt-1">
                Submitted: <span className="font-mono text-primary">{activeFeedback.submissionDate}</span> • Review date: <span className="font-mono text-primary">{activeFeedback.reviewDate}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {getStatusBadge(activeFeedback.status)}

              {/* Supervisor actions */}
              {isSupervisorRole && activeFeedback.status !== 'approved' && (
                <div className="flex items-center space-x-1.5 ml-2">
                  <button
                    onClick={() => {
                      approveChapter(activeFeedback.chapterId);
                      alert('Chapter formally approved!');
                    }}
                    className="px-3 py-1 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Chapter</span>
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Specify revisions required for student:');
                      if (reason) requestChapterRevision(activeFeedback.chapterId, reason);
                    }}
                    className="px-3 py-1 bg-surface hover:bg-surface-subtle text-terracotta border border-border rounded text-xs font-semibold"
                  >
                    Request Revision
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Supervisor Overall Evaluation */}
          <div className="p-4 bg-surface-subtle border border-border rounded-lg space-y-2 text-xs">
            <span className="font-mono text-[10px] uppercase font-bold text-secondary block">
              Supervisor Overall Assessment
            </span>
            <p className="font-serif text-sm text-primary leading-relaxed italic">
              "{activeFeedback.overallComments}"
            </p>
            {activeFeedback.actionRequired && (
              <div className="pt-2 text-[11px] text-terracotta font-medium border-t border-border/60">
                Action Required: {activeFeedback.actionRequired}
              </div>
            )}
          </div>

          {/* Specific Passage-Level Comments & Resolution Threads */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Detailed Passage Comments ({activeFeedback.comments.length})
              </h3>
              <span className="text-xs font-mono text-secondary">
                {activeFeedback.comments.filter((c) => c.resolved).length} of {activeFeedback.comments.length} resolved
              </span>
            </div>

            <div className="space-y-4">
              {activeFeedback.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-xl border text-xs space-y-3 transition-colors ${
                    comment.resolved
                      ? 'bg-surface-subtle border-border'
                      : 'bg-terracotta/5 border-terracotta/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-secondary text-[11px]">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-primary font-mono">{comment.pageOrSection}</span>
                      <span>•</span>
                      <span>By {comment.reviewerName}</span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        comment.resolved ? 'bg-sage text-forest-700' : 'bg-terracotta/20 text-terracotta'
                      }`}
                    >
                      {comment.resolved ? '✓ Resolved' : 'Pending Action'}
                    </span>
                  </div>

                  {comment.quoteText && (
                    <div className="p-2.5 bg-surface rounded border border-border italic font-serif text-secondary border-l-4 border-forest-500/40">
                      "{comment.quoteText}"
                    </div>
                  )}

                  <p className="text-primary font-medium text-xs leading-relaxed">
                    {comment.comment}
                  </p>

                  {/* Resolution Section */}
                  {comment.resolved ? (
                    <div className="p-2.5 bg-surface rounded border border-border text-[11px] text-forest-700 font-sans space-y-0.5">
                      <div className="font-semibold">Resolution Note:</div>
                      <div>{comment.resolutionNote || 'Resolved by researcher.'}</div>
                      <div className="text-[10px] text-secondary font-mono">
                        Resolved on {new Date(comment.resolvedAt || '').toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-border flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        placeholder="Detail how you resolved this feedback in your revised text..."
                        value={resolutionText[comment.id] || ''}
                        onChange={(e) =>
                          setResolutionText({ ...resolutionText, [comment.id]: e.target.value })
                        }
                        className="flex-1 p-2 rounded border border-border bg-surface text-xs outline-none"
                      />
                      <button
                        onClick={() => handleResolve(comment.id)}
                        className="w-full sm:w-auto px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle shrink-0"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Supervisor Comment Form (when in supervisor mode) */}
          {isSupervisorRole && (
            <div className="p-5 bg-surface-subtle rounded-xl border border-border space-y-3 pt-4">
              <h4 className="font-serif text-sm font-bold text-primary">
                Add Section Feedback Comment (Supervisor)
              </h4>
              <form onSubmit={handleAddSupervisorComment} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newCommentSection}
                    onChange={(e) => setNewCommentSection(e.target.value)}
                    placeholder="Section or Page (e.g. Section 3.6)"
                    className="p-2 rounded border border-border bg-surface"
                  />
                  <input
                    type="text"
                    value={newCommentQuote}
                    onChange={(e) => setNewCommentQuote(e.target.value)}
                    placeholder="Quoted passage (optional)"
                    className="p-2 rounded border border-border bg-surface"
                  />
                </div>
                <textarea
                  required
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Specific review critique, request for revision, or praise..."
                  className="w-full p-2.5 rounded border border-border bg-surface h-20 outline-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle"
                  >
                    Post Review Comment
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

