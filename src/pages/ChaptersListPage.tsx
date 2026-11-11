import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ListOrdered,
  Plus,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const ChaptersListPage: React.FC = () => {
  const navigate = useNavigate();
  const { chapters, setActiveChapter, addChapter } = useThesisStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const totalWords = chapters.reduce((sum, c) => sum + c.currentWordCount, 0);
  const totalTarget = chapters.reduce((sum, c) => sum + c.targetWordCount, 0);

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newId = addChapter(newTitle, newDesc);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    navigate('/app/editor');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="bg-sage text-forest-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-forest-500/20">Approved</span>;
      case 'revision_requested':
        return <span className="bg-terracotta/10 text-terracotta px-2 py-0.5 rounded text-[11px] font-semibold">Revision Requested</span>;
      case 'submitted':
        return <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-semibold">Under Review</span>;
      default:
        return <span className="bg-surface-subtle text-secondary px-2 py-0.5 rounded text-[11px] font-semibold border border-border">Draft</span>;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Thesis Chapters
          </h1>
          <p className="text-xs text-secondary mt-1">
            Manage dissertation structure, section outlines, writing progress, and formal supervisor approvals.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/app/editor"
            className="px-3.5 py-1.5 border border-border bg-surface hover:bg-surface-subtle text-primary rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-forest-500" />
            <span>Open Thesis Editor</span>
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Chapter</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Header */}
      <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-semibold text-primary">Cumulative Manuscript Progress: </span>
          <span className="font-mono text-forest-700 font-bold">
            {totalWords.toLocaleString()} / {totalTarget.toLocaleString()} words ({Math.round((totalWords / totalTarget) * 100)}%)
          </span>
        </div>
        <div className="w-full sm:w-64 bg-border h-2 rounded-full overflow-hidden">
          <div
            className="bg-forest-500 h-full"
            style={{ width: `${Math.min(100, (totalWords / totalTarget) * 100)}%` }}
          />
        </div>
      </div>

      {/* Chapter Cards List */}
      <div className="space-y-3">
        {chapters.map((ch) => {
          const progress = Math.min(100, Math.round((ch.currentWordCount / ch.targetWordCount) * 100));
          return (
            <div
              key={ch.id}
              className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500/50 shadow-subtle transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-forest-700 bg-sage px-2 py-0.5 rounded">
                    Chapter {ch.number}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {ch.title}
                  </h3>
                  {getStatusBadge(ch.status)}
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {ch.description || 'Chapter description'}
                </p>

                {/* Sections preview */}
                {ch.sections && ch.sections.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ch.sections.map((sec) => (
                      <span
                        key={sec.id}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border text-secondary"
                      >
                        {sec.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress & Action */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border">
                <div className="text-right text-xs font-mono">
                  <div className="font-bold text-primary">
                    {ch.currentWordCount.toLocaleString()} / {ch.targetWordCount.toLocaleString()} words
                  </div>
                  <div className="text-[10px] text-secondary">
                    {progress}% of target
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveChapter(ch.id);
                    navigate('/app/editor');
                  }}
                  className="px-3.5 py-1.5 rounded bg-forest-500 hover:bg-forest-600 text-white text-xs font-semibold shadow-subtle flex items-center space-x-1"
                >
                  <span>Edit Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Chapter Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-md p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Add Dissertation Chapter
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddChapter} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Chapter Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Robustness Analysis Under Domain Drift"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Chapter Scope / Summary</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline the main arguments, evaluations, or theoretical derivations..."
                  className="w-full p-2 rounded border border-border bg-surface h-20"
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Create & Open Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

