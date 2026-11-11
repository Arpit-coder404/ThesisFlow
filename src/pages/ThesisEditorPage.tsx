import React, { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Table as TableIcon,
  Undo,
  Redo,
  Send,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Bookmark,
  MessageSquare,
  FileText,
  History,
  AlertCircle,
  Plus,
  Copy,
  Check,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { formatInTextCitation } from '../lib/citations';

export const ThesisEditorPage: React.FC = () => {
  const {
    chapters,
    activeChapterId,
    setActiveChapter,
    updateChapterContent,
    submitChapterForReview,
    saveChapterVersion,
    restoreChapterVersion,
    references,
    feedbacks,
    citationStyle,
  } = useThesisStore();

  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [rightTab, setRightTab] = useState<'info' | 'comments' | 'citations' | 'versions'>('info');
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [versionSummary, setVersionSummary] = useState('');
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');

  const activeChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];
  const chapterFeedback = feedbacks.filter((f) => f.chapterId === activeChapter.id);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: activeChapter?.content || '<h1>Chapter Title</h1><p>Start drafting your academic prose here...</p>',
    onUpdate: ({ editor }) => {
      setAutosaveStatus('saving');
      const html = editor.getHTML();
      const wordCount = editor.storage.characterCount.words();
      updateChapterContent(activeChapter.id, html, wordCount);
      setTimeout(() => setAutosaveStatus('saved'), 400);
    },
  });

  // Keep editor content synchronized when activeChapter changes
  useEffect(() => {
    if (editor && activeChapter && editor.getHTML() !== activeChapter.content) {
      editor.commands.setContent(activeChapter.content);
    }
  }, [activeChapter?.id]);

  const insertCitation = (refId: string) => {
    const ref = references.find((r) => r.id === refId);
    if (!ref || !editor) return;

    const citationText = formatInTextCitation(ref, citationStyle);
    editor
      .chain()
      .focus()
      .insertContent(` <span class="citation-tag" style="background:#E6ECE5; padding:2px 6px; border-radius:4px; font-weight:600; font-family:sans-serif; font-size:0.85em; color:#2A4B39;">${citationText}</span> `)
      .run();
  };

  const handleSaveVersion = (e: React.FormEvent) => {
    e.preventDefault();
    saveChapterVersion(activeChapter.id, versionSummary || 'Manual snapshot checkpoint');
    setVersionSummary('');
    setIsVersionModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="bg-sage text-forest-700 px-2 py-0.5 rounded text-[10px] font-semibold border border-forest-500/20">Approved</span>;
      case 'revision_requested':
        return <span className="bg-terracotta/10 text-terracotta px-2 py-0.5 rounded text-[10px] font-semibold">Revision Requested</span>;
      case 'submitted':
        return <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-semibold">Under Review</span>;
      default:
        return <span className="bg-surface-subtle text-secondary px-2 py-0.5 rounded text-[10px] font-semibold border border-border">Draft</span>;
    }
  };

  const wordCount = editor?.storage?.characterCount?.words() || activeChapter?.currentWordCount || 0;
  const charCount = editor?.storage?.characterCount?.characters() || 0;
  const progressPercent = Math.min(100, Math.round((wordCount / activeChapter.targetWordCount) * 100));

  return (
    <div className={`h-[calc(100vh-56px)] flex flex-col bg-background overflow-hidden ${isFocusMode ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Top Editor Toolbar */}
      <div className="h-12 border-b border-border bg-surface px-4 flex items-center justify-between shrink-0 select-none">
        {/* Left Toggle & Title */}
        <div className="flex items-center space-x-2">
          {!isFocusMode && (
            <button
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
              className="p-1 rounded text-secondary hover:text-primary hover:bg-black/5"
              title={leftPanelOpen ? 'Collapse Outline' : 'Expand Outline'}
            >
              {leftPanelOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}

          <div className="flex items-center space-x-2 text-xs">
            <span className="font-mono text-secondary font-semibold">Ch {activeChapter.number}</span>
            <span className="text-secondary/40">•</span>
            <span className="font-semibold text-primary truncate max-w-[200px] sm:max-w-xs">{activeChapter.title}</span>
            {getStatusBadge(activeChapter.status)}
          </div>
        </div>

        {/* Center Formatting Controls */}
        {editor && (
          <div className="hidden md:flex items-center space-x-1 border-x border-border px-3 text-secondary">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('bold') ? 'bg-sage text-forest-700 font-bold' : 'hover:bg-surface-subtle'}`}
              title="Bold (⌘B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('italic') ? 'bg-sage text-forest-700 font-bold' : 'hover:bg-surface-subtle'}`}
              title="Italic (⌘I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('underline') ? 'bg-sage text-forest-700 font-bold' : 'hover:bg-surface-subtle'}`}
              title="Underline (⌘U)"
            >
              <UnderlineIcon className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-border mx-1" />

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Heading 3"
            >
              H3
            </button>

            <span className="w-px h-4 bg-border mx-1" />

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Bulleted List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('orderedList') ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Numbered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('blockquote') ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Blockquote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-1.5 rounded transition-colors ${editor.isActive('codeBlock') ? 'bg-sage text-forest-700' : 'hover:bg-surface-subtle'}`}
              title="Code Block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-border mx-1" />

            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-1.5 rounded hover:bg-surface-subtle disabled:opacity-30"
              title="Undo (⌘Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-1.5 rounded hover:bg-surface-subtle disabled:opacity-30"
              title="Redo (⌘⇧Z)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center space-x-2 text-xs">
          {/* Autosave status indicator */}
          <div className="hidden sm:flex items-center space-x-1 text-[11px] text-secondary font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${autosaveStatus === 'saving' ? 'bg-amber-500 animate-pulse' : 'bg-forest-500'}`} />
            <span>{autosaveStatus === 'saving' ? 'Saving...' : 'Autosaved'}</span>
          </div>

          {/* Submit Chapter Button */}
          <button
            onClick={() => {
              if (window.confirm(`Submit Chapter ${activeChapter.number}: ${activeChapter.title} to Dr. Meera Sharma for formal review?`)) {
                submitChapterForReview(activeChapter.id);
                alert('Chapter submitted! Your supervisor has received a review notification.');
              }
            }}
            disabled={activeChapter.status === 'submitted'}
            className="px-3 py-1 bg-forest-500 hover:bg-forest-600 disabled:bg-surface-subtle disabled:text-secondary text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1 transition-colors"
          >
            <Send className="w-3 h-3" />
            <span>{activeChapter.status === 'submitted' ? 'Under Review' : 'Submit Chapter'}</span>
          </button>

          {/* Focus Mode Toggle */}
          <button
            onClick={() => {
              setIsFocusMode(!isFocusMode);
              if (!isFocusMode) {
                setLeftPanelOpen(false);
                setRightPanelOpen(false);
              } else {
                setLeftPanelOpen(true);
                setRightPanelOpen(true);
              }
            }}
            className="p-1.5 rounded border border-border bg-surface hover:bg-surface-subtle text-secondary"
            title={isFocusMode ? 'Exit Focus Mode' : 'Distraction-Free Focus Mode'}
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {!isFocusMode && (
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="p-1 rounded text-secondary hover:text-primary hover:bg-black/5"
              title={rightPanelOpen ? 'Collapse Info Panel' : 'Expand Info Panel'}
            >
              {rightPanelOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Main 3-Area Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Area: Chapter Outline & Navigation */}
        {leftPanelOpen && !isFocusMode && (
          <div className="w-64 border-r border-border bg-sidebar-bg flex flex-col justify-between shrink-0 text-xs">
            <div className="p-3 border-b border-border bg-surface font-semibold text-secondary font-mono uppercase text-[10px] tracking-wider">
              Dissertation Structure
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {chapters.map((ch) => {
                const isActive = ch.id === activeChapter.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapter(ch.id)}
                    className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-surface border border-forest-500 shadow-subtle text-forest-700 font-semibold'
                        : 'hover:bg-surface/60 text-primary border border-transparent'
                    }`}
                  >
                    <div className="truncate">
                      <div className="truncate">
                        Ch {ch.number}: {ch.title}
                      </div>
                      <div className="text-[10px] text-secondary font-mono mt-0.5">
                        {ch.currentWordCount} / {ch.targetWordCount} words
                      </div>
                    </div>
                    {getStatusBadge(ch.status)}
                  </button>
                );
              })}
            </div>

            {/* Quick stats at bottom of outline */}
            <div className="p-3 border-t border-border bg-surface-subtle text-[11px] text-secondary space-y-1">
              <div className="flex justify-between">
                <span>Total Words:</span>
                <span className="font-mono font-bold text-primary">
                  {chapters.reduce((sum, c) => sum + c.currentWordCount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Target Words:</span>
                <span className="font-mono text-secondary">
                  {chapters.reduce((sum, c) => sum + c.targetWordCount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Central Writing Area: Paper-like Document Surface */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 flex justify-center bg-background">
          <div className="w-full max-w-3xl bg-surface border border-border rounded-lg shadow-academic p-10 md:p-16 min-h-[900px] flex flex-col justify-between space-y-8 font-editor text-base leading-relaxed text-primary">
            {/* Editor Content Area */}
            <div className="prose prose-stone max-w-none focus:outline-none">
              <EditorContent editor={editor} className="outline-none" />
            </div>

            {/* Document Bottom Word & Char Ticker */}
            <div className="border-t border-border pt-4 text-xs font-mono text-secondary flex items-center justify-between select-none">
              <div className="space-x-3">
                <span>Words: <strong className="text-primary">{wordCount.toLocaleString()}</strong></span>
                <span>Characters: {charCount.toLocaleString()}</span>
                <span>Target: {activeChapter.targetWordCount} words ({progressPercent}%)</span>
              </div>
              <div>Last saved: {new Date(activeChapter.lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        </div>

        {/* Right Contextual Panel: Info, Supervisor Comments, Citations, Version History */}
        {rightPanelOpen && !isFocusMode && (
          <div className="w-80 md:w-88 border-l border-border bg-surface flex flex-col justify-between shrink-0 text-xs">
            {/* Tabs */}
            <div className="border-b border-border bg-surface-subtle flex text-[11px] font-medium">
              <button
                onClick={() => setRightTab('info')}
                className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${rightTab === 'info' ? 'border-forest-500 text-forest-700 font-semibold' : 'border-transparent text-secondary hover:text-primary'}`}
              >
                Chapter Info
              </button>
              <button
                onClick={() => setRightTab('comments')}
                className={`flex-1 py-2.5 text-center border-b-2 transition-colors relative ${rightTab === 'comments' ? 'border-forest-500 text-forest-700 font-semibold' : 'border-transparent text-secondary hover:text-primary'}`}
              >
                Comments
                {chapterFeedback.flatMap((f) => f.comments).filter((c) => !c.resolved).length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-terracotta inline-block ml-1" />
                )}
              </button>
              <button
                onClick={() => setRightTab('citations')}
                className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${rightTab === 'citations' ? 'border-forest-500 text-forest-700 font-semibold' : 'border-transparent text-secondary hover:text-primary'}`}
              >
                Cite In-Text
              </button>
              <button
                onClick={() => setRightTab('versions')}
                className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${rightTab === 'versions' ? 'border-forest-500 text-forest-700 font-semibold' : 'border-transparent text-secondary hover:text-primary'}`}
              >
                Versions
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* TAB: INFO */}
              {rightTab === 'info' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-secondary uppercase font-semibold">
                      Chapter Objective
                    </span>
                    <p className="text-primary text-xs leading-relaxed">
                      {activeChapter.description || 'Draft academic chapter.'}
                    </p>
                  </div>

                  {/* Word Count Progress Bar */}
                  <div className="p-3 bg-surface-subtle border border-border rounded-lg space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Word Count Progress</span>
                      <span className="font-bold text-forest-700">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                      <div className="bg-forest-500 h-full transition-all" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className="text-[10px] text-secondary flex justify-between font-mono">
                      <span>{wordCount} current</span>
                      <span>{activeChapter.targetWordCount} target</span>
                    </div>
                  </div>

                  {/* Writing Quality Checklist */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-secondary uppercase font-semibold block">
                      Writing Checklist
                    </span>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center space-x-2 text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                        <span>Consistent academic tone and hedging</span>
                      </div>
                      <div className="flex items-center space-x-2 text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                        <span>Every empirical claim supported by reference</span>
                      </div>
                      <div className="flex items-center space-x-2 text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                        <span>Figures & tables referenced in-text</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SUPERVISOR COMMENTS */}
              {rightTab === 'comments' && (
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold text-primary flex items-center justify-between">
                    <span>Supervisor Feedback Threads</span>
                    <span className="text-secondary font-mono text-[10px]">
                      {chapterFeedback.flatMap((f) => f.comments).length} total
                    </span>
                  </div>

                  {chapterFeedback.length === 0 ? (
                    <div className="p-6 text-center text-xs text-secondary">
                      No feedback submitted for this chapter yet.
                    </div>
                  ) : (
                    chapterFeedback.map((fb) => (
                      <div key={fb.id} className="space-y-2">
                        <div className="p-2.5 bg-surface-subtle rounded border border-border text-[11px] space-y-1">
                          <div className="flex items-center justify-between text-secondary text-[10px]">
                            <span className="font-semibold text-primary">{fb.reviewerName}</span>
                            <span>{fb.reviewDate}</span>
                          </div>
                          <p className="text-primary italic font-serif">"{fb.overallComments}"</p>
                        </div>

                        {fb.comments.map((cm) => (
                          <div
                            key={cm.id}
                            className={`p-3 rounded border text-xs space-y-1.5 ${
                              cm.resolved ? 'bg-surface-subtle border-border opacity-70' : 'bg-terracotta/5 border-terracotta/30'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] text-secondary">
                              <span className="font-semibold text-primary">{cm.pageOrSection}</span>
                              <span className={cm.resolved ? 'text-forest-600 font-semibold' : 'text-terracotta font-semibold'}>
                                {cm.resolved ? '✓ Resolved' : 'Pending Action'}
                              </span>
                            </div>
                            {cm.quoteText && (
                              <div className="text-[10px] italic text-secondary border-l-2 border-secondary/40 pl-1.5 font-serif">
                                "{cm.quoteText}"
                              </div>
                            )}
                            <p className="text-primary font-medium">{cm.comment}</p>
                            {cm.resolved && cm.resolutionNote && (
                              <div className="text-[10px] text-forest-700 bg-surface p-1 rounded border border-border">
                                Resolution: {cm.resolutionNote}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB: CITATIONS INJECTION */}
              {rightTab === 'citations' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-secondary leading-snug">
                    Click any reference below to insert an in-text citation (<strong className="font-mono text-primary font-bold">{citationStyle.toUpperCase()}</strong>) directly at your cursor:
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {references.map((ref) => (
                      <div
                        key={ref.id}
                        onClick={() => insertCitation(ref.id)}
                        className="p-2.5 rounded bg-surface border border-border hover:border-forest-500 hover:bg-sage-light/30 cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-forest-700 bg-sage px-1.5 py-0.2 rounded">
                            {ref.citationKey}
                          </span>
                          <span className="text-[10px] font-mono text-secondary">{ref.year}</span>
                        </div>
                        <div className="font-semibold text-primary text-[11px] line-clamp-1">
                          {ref.title}
                        </div>
                        <div className="text-[10px] text-secondary truncate">
                          {ref.authors.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: VERSION HISTORY */}
              {rightTab === 'versions' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-primary">Snapshot History</span>
                    <button
                      onClick={() => setIsVersionModalOpen(true)}
                      className="px-2 py-0.5 rounded bg-forest-500 hover:bg-forest-600 text-white text-[10px] font-semibold flex items-center space-x-1"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>Take Snapshot</span>
                    </button>
                  </div>

                  {(activeChapter.versions || []).length === 0 ? (
                    <div className="p-6 text-center text-xs text-secondary">
                      No snapshots taken yet. Click "Take Snapshot" above to preserve a version checkpoint.
                    </div>
                  ) : (
                    activeChapter.versions.map((v) => (
                      <div
                        key={v.id}
                        className="p-3 bg-surface rounded border border-border space-y-1.5 shadow-subtle text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">{v.title}</span>
                          <span className="font-mono text-[10px] text-secondary">
                            {new Date(v.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-secondary">{v.summary}</p>
                        <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[10px]">
                          <span className="text-secondary font-mono">{v.wordCount} words</span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Restore ${v.title}? Your current text will be replaced.`)) {
                                restoreChapterVersion(activeChapter.id, v.id);
                              }
                            }}
                            className="text-forest-600 font-semibold hover:underline"
                          >
                            Restore Version
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Bottom Citation Style indicator */}
            <div className="p-3 border-t border-border bg-surface-subtle text-[11px] text-secondary flex items-center justify-between">
              <span>Citation Style: <strong className="text-primary font-mono uppercase">{citationStyle}</strong></span>
              <span className="text-forest-600">TipTap Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Snapshot Version Modal */}
      {isVersionModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-md p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Save Version Checkpoint
              </h3>
              <button onClick={() => setIsVersionModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveVersion} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Version Summary Note</label>
                <textarea
                  required
                  value={versionSummary}
                  onChange={(e) => setVersionSummary(e.target.value)}
                  placeholder="e.g. Revised Section 3.6 with privacy-preserving hashing..."
                  className="w-full p-2.5 rounded border border-border bg-surface h-20"
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsVersionModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Snapshot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

