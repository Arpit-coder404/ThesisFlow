import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Tag,
  BookOpen,
  Calendar,
  HelpCircle,
  Lightbulb,
  FlaskConical,
  MessageSquare,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { NoteType, ResearchNote } from '../types';

export const ResearchNotesPage: React.FC = () => {
  const { notes, papers, questions, chapters, addNote, updateNote, deleteNote } = useThesisStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [newNoteForm, setNewNoteForm] = useState({
    title: '',
    type: 'reading' as NoteType,
    content: '',
    tags: '',
    relatedPaperId: papers[0]?.id || '',
    relatedQuestionId: questions[0]?.id || '',
    relatedChapterId: chapters[0]?.id || '',
  });

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const filteredNotes = notes.filter((n) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q));

    const matchesType = selectedType === 'all' || n.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteForm.title.trim()) return;

    const newId = addNote({
      projectId: 'proj-001',
      title: newNoteForm.title,
      type: newNoteForm.type,
      content: newNoteForm.content,
      date: new Date().toISOString().split('T')[0],
      tags: newNoteForm.tags ? newNoteForm.tags.split(',').map((t) => t.trim()) : ['General'],
      relatedPaperIds: newNoteForm.relatedPaperId ? [newNoteForm.relatedPaperId] : [],
      relatedQuestionIds: newNoteForm.relatedQuestionId ? [newNoteForm.relatedQuestionId] : [],
      relatedChapterIds: newNoteForm.relatedChapterId ? [newNoteForm.relatedChapterId] : [],
    });

    setActiveNoteId(newId);
    setIsNewModalOpen(false);
    setNewNoteForm({
      title: '',
      type: 'reading',
      content: '',
      tags: '',
      relatedPaperId: papers[0]?.id || '',
      relatedQuestionId: questions[0]?.id || '',
      relatedChapterId: chapters[0]?.id || '',
    });
  };

  const getTypeBadge = (type: NoteType) => {
    switch (type) {
      case 'methodology':
        return <span className="bg-forest-50 text-forest-700 px-2 py-0.5 rounded font-mono text-[10px]">Methodology</span>;
      case 'reading':
        return <span className="bg-sage text-forest-700 px-2 py-0.5 rounded font-mono text-[10px]">Reading</span>;
      case 'experiment':
        return <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono text-[10px]">Experiment</span>;
      case 'finding':
        return <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono text-[10px]">Finding</span>;
      case 'meeting':
        return <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono text-[10px]">Meeting</span>;
      case 'idea':
        return <span className="bg-terracotta/10 text-terracotta px-2 py-0.5 rounded font-mono text-[10px]">Idea</span>;
      case 'supervisor_question':
        return <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded font-mono text-[10px]">Supervisor Q</span>;
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-background overflow-hidden">
      {/* Top Header */}
      <div className="h-14 border-b border-border bg-surface px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <h1 className="font-serif text-lg font-bold text-primary">
            Research Notes & Knowledge Base
          </h1>
          <span className="text-[11px] font-mono text-secondary bg-surface-subtle px-2 py-0.5 rounded border border-border">
            {notes.length} connected entries
          </span>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Research Note</span>
        </button>
      </div>

      {/* Main 2-Column Layout: Notes List Left, Active Note Right */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Search & Notes List */}
        <div className="w-80 md:w-96 border-r border-border bg-sidebar-bg flex flex-col justify-between shrink-0">
          {/* Search & Filter Bar */}
          <div className="p-3 border-b border-border bg-surface space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes & tags..."
                className="w-full pl-9 pr-3 py-1.5 rounded border border-border bg-surface-subtle text-xs outline-none focus:border-forest-500"
              />
            </div>

            <div className="flex items-center space-x-1 overflow-x-auto text-[11px] pb-1">
              {['all', 'methodology', 'reading', 'experiment', 'finding', 'meeting', 'idea'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2 py-0.5 rounded-full capitalize whitespace-nowrap transition-colors ${
                    selectedType === t
                      ? 'bg-forest-500 text-white font-medium'
                      : 'bg-surface border border-border text-secondary hover:text-primary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Scrollable List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredNotes.map((note) => {
              const isActive = note.id === activeNote?.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isActive
                      ? 'bg-surface border-forest-500 shadow-subtle ring-1 ring-forest-500/20'
                      : 'bg-surface/70 border-border hover:bg-surface'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    {getTypeBadge(note.type)}
                    <span className="text-[10px] font-mono text-secondary">
                      {note.date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-primary leading-snug line-clamp-1">
                    {note.title}
                  </h4>
                  <p className="text-[11px] text-secondary line-clamp-2 mt-1">
                    {note.content.replace(/[#*`$]/g, '')}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface-subtle text-secondary border border-border/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Note Viewer & Backlink Graph */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-background flex flex-col justify-between">
          {activeNote ? (
            <div className="max-w-3xl mx-auto w-full space-y-6">
              {/* Note Meta Header */}
              <div className="border-b border-border pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeBadge(activeNote.type)}
                    <span className="text-xs font-mono text-secondary">
                      Recorded on {activeNote.date}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this research note?')) {
                        deleteNote(activeNote.id);
                      }
                    }}
                    className="p-1 text-secondary hover:text-terracotta"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="font-serif text-2xl font-bold text-primary">
                  {activeNote.title}
                </h2>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeNote.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage-light text-forest-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Note Content Display */}
              <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle font-sans text-xs sm:text-sm text-primary leading-relaxed whitespace-pre-wrap">
                {activeNote.content}
              </div>

              {/* Backlinks & Knowledge Graph Connections */}
              <div className="p-5 bg-surface-subtle rounded-xl border border-border space-y-3">
                <div className="text-xs font-semibold text-primary font-mono uppercase tracking-wider">
                  Bidirectional Backlinks & Knowledge Context
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Related Papers */}
                  <div className="p-3 bg-surface rounded border border-border space-y-1">
                    <span className="text-[10px] font-mono uppercase font-semibold text-secondary flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Linked Papers</span>
                    </span>
                    {activeNote.relatedPaperIds.length === 0 ? (
                      <div className="text-secondary/70 italic text-[11px]">No papers linked</div>
                    ) : (
                      activeNote.relatedPaperIds.map((pid) => {
                        const p = papers.find((paper) => paper.id === pid);
                        return (
                          <Link
                            key={pid}
                            to={`/app/literature/paper/${pid}`}
                            className="text-forest-600 hover:underline block text-[11px] truncate font-medium"
                          >
                            {p ? p.title : pid}
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {/* Related Questions */}
                  <div className="p-3 bg-surface rounded border border-border space-y-1">
                    <span className="text-[10px] font-mono uppercase font-semibold text-secondary flex items-center space-x-1">
                      <HelpCircle className="w-3 h-3" />
                      <span>Linked Research Questions</span>
                    </span>
                    {activeNote.relatedQuestionIds.length === 0 ? (
                      <div className="text-secondary/70 italic text-[11px]">No questions linked</div>
                    ) : (
                      activeNote.relatedQuestionIds.map((qid) => {
                        const q = questions.find((quest) => quest.id === qid);
                        return (
                          <div key={qid} className="text-primary text-[11px] font-medium truncate">
                            {q ? `${q.code}: ${q.question}` : qid}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Related Chapters */}
                  <div className="p-3 bg-surface rounded border border-border space-y-1">
                    <span className="text-[10px] font-mono uppercase font-semibold text-secondary flex items-center space-x-1">
                      <FileText className="w-3 h-3" />
                      <span>Linked Thesis Chapters</span>
                    </span>
                    {activeNote.relatedChapterIds.length === 0 ? (
                      <div className="text-secondary/70 italic text-[11px]">No chapters linked</div>
                    ) : (
                      activeNote.relatedChapterIds.map((cid) => {
                        const ch = chapters.find((chap) => chap.id === cid);
                        return (
                          <Link
                            key={cid}
                            to="/app/editor"
                            className="text-forest-600 hover:underline block text-[11px] truncate font-medium"
                          >
                            {ch ? `Chapter ${ch.number}: ${ch.title}` : cid}
                          </Link>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-auto text-center text-xs text-secondary">
              Select a note or create a new one.
            </div>
          )}
        </div>
      </div>

      {/* New Note Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-xl p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-primary">
                Create Research Note
              </h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newNoteForm.title}
                  onChange={(e) => setNewNoteForm({ ...newNoteForm, title: e.target.value })}
                  placeholder="e.g. Findings on Cyrillic Homoglyph Vulnerabilities"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Note Type</label>
                  <select
                    value={newNoteForm.type}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, type: e.target.value as NoteType })}
                    className="w-full p-2 rounded border border-border bg-surface capitalize"
                  >
                    <option value="reading">Reading Note</option>
                    <option value="methodology">Methodology Note</option>
                    <option value="experiment">Experiment Finding</option>
                    <option value="meeting">Supervisor Meeting Note</option>
                    <option value="idea">Research Idea</option>
                    <option value="supervisor_question">Question for Supervisor</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newNoteForm.tags}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, tags: e.target.value })}
                    placeholder="e.g. Latency, Baseline, Finding"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Note Body (Supports Markdown)</label>
                <textarea
                  required
                  value={newNoteForm.content}
                  onChange={(e) => setNewNoteForm({ ...newNoteForm, content: e.target.value })}
                  placeholder="Record your observations, mathematical formulations, or reflections..."
                  className="w-full p-2.5 rounded border border-border bg-surface h-36 font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-[11px] mb-1">Link Paper</label>
                  <select
                    value={newNoteForm.relatedPaperId}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, relatedPaperId: e.target.value })}
                    className="w-full p-1.5 rounded border border-border bg-surface text-[11px]"
                  >
                    <option value="">None</option>
                    {papers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title.slice(0, 25)}...
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[11px] mb-1">Link Question</label>
                  <select
                    value={newNoteForm.relatedQuestionId}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, relatedQuestionId: e.target.value })}
                    className="w-full p-1.5 rounded border border-border bg-surface text-[11px]"
                  >
                    <option value="">None</option>
                    {questions.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[11px] mb-1">Link Chapter</label>
                  <select
                    value={newNoteForm.relatedChapterId}
                    onChange={(e) => setNewNoteForm({ ...newNoteForm, relatedChapterId: e.target.value })}
                    className="w-full p-1.5 rounded border border-border bg-surface text-[11px]"
                  >
                    <option value="">None</option>
                    {chapters.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        Ch {ch.number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
