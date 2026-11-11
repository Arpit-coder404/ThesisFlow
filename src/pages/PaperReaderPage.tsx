import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Highlighter,
  MessageSquare,
  Plus,
  Trash2,
  ExternalLink,
  Tag,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Share2,
  Copy,
  Check,
  HelpCircle,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { PaperAnnotation } from '../types';

export const PaperReaderPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const { papers, annotations, questions, addAnnotation, deleteAnnotation, addNote } = useThesisStore();

  const paper = papers.find((p) => p.id === paperId) || papers[0];
  const paperAnnotations = annotations.filter((a) => a.paperId === paper?.id);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = paper?.pageCount || 14;

  const [isAnnotating, setIsAnnotating] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [annotationComment, setAnnotationComment] = useState('');
  const [annotationInsight, setAnnotationInsight] = useState('');
  const [annotationColor, setAnnotationColor] = useState<PaperAnnotation['color']>('yellow');
  const [linkedQuestionId, setLinkedQuestionId] = useState<string>(questions[0]?.id || '');
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!paper) {
    return (
      <div className="p-8 text-center text-xs text-secondary">
        Paper not found.{' '}
        <Link to="/app/literature" className="underline text-forest-600">
          Back to Literature Library
        </Link>
      </div>
    );
  }

  const handleSaveAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annotationComment.trim()) return;

    addAnnotation({
      paperId: paper.id,
      pageNumber: currentPage,
      selectedText: selectedText || undefined,
      comment: annotationComment,
      color: annotationColor,
      researchInsight: annotationInsight || undefined,
      linkedQuestionId: linkedQuestionId || undefined,
      authorName: 'Aarav Patel',
    });

    setAnnotationComment('');
    setAnnotationInsight('');
    setSelectedText('');
    setIsAnnotating(false);
  };

  const formattedCitation = `${paper.authors.join(', ')} (${paper.year}). ${paper.title}. ${paper.journalOrConference}.${paper.doi ? ` https://doi.org/${paper.doi}` : ''}`;

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-background overflow-hidden">
      {/* Top Paper Header Bar */}
      <div className="h-14 border-b border-border bg-surface px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3 truncate">
          <Link
            to="/app/literature"
            className="p-1 rounded text-secondary hover:text-primary hover:bg-black/5"
            title="Back to library"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="truncate">
            <h2 className="text-xs font-semibold text-primary truncate max-w-xl">
              {paper.title}
            </h2>
            <div className="text-[10px] text-secondary truncate">
              {paper.authors.join(', ')} • {paper.year} • {paper.journalOrConference}
            </div>
          </div>
        </div>

        {/* Page navigator & actions */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 border border-border rounded px-2 py-1 bg-surface-subtle font-mono text-[11px]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-0.5 disabled:opacity-30 hover:text-forest-600"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-0.5 disabled:opacity-30 hover:text-forest-600"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(formattedCitation);
              setCopiedCitation(true);
              setTimeout(() => setCopiedCitation(false), 2000);
            }}
            className="px-2.5 py-1 rounded border border-border bg-surface hover:bg-surface-subtle text-primary text-xs font-medium flex items-center space-x-1"
            title="Copy formatted APA reference"
          >
            {copiedCitation ? <Check className="w-3 h-3 text-forest-600" /> : <Copy className="w-3 h-3 text-secondary" />}
            <span>{copiedCitation ? 'Copied' : 'Cite'}</span>
          </button>

          {paper.url && (
            <a
              href={paper.url}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded border border-border bg-surface hover:bg-surface-subtle text-primary text-xs font-medium flex items-center space-x-1"
            >
              <ExternalLink className="w-3 h-3 text-secondary" />
              <span className="hidden sm:inline">Publisher</span>
            </a>
          )}
        </div>
      </div>

      {/* Main 2-Panel Workspace: Manuscript on Left, Annotations on Right */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Manuscript Viewer (Paper Simulation) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center bg-background">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-lg shadow-academic p-8 md:p-12 space-y-6 font-serif text-sm leading-relaxed text-primary">
            {/* Header info inside paper */}
            <div className="border-b border-border pb-4 font-sans text-xs text-secondary space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-semibold text-forest-700 bg-sage px-1.5 py-0.2 rounded">
                  {paper.publicationType}
                </span>
                <span className="font-mono text-[10px]">{paper.journalOrConference} ({paper.year})</span>
              </div>
              <h1 className="font-serif text-xl md:text-2xl font-bold text-primary pt-2 leading-tight">
                {paper.title}
              </h1>
              <div className="font-medium text-primary/80 pt-1">
                {paper.authors.join('; ')}
              </div>
              {paper.doi && <div className="text-[10px] font-mono text-secondary">DOI: {paper.doi}</div>}
            </div>

            {/* Abstract Section */}
            <div className="p-4 bg-surface-subtle border border-border rounded-lg font-sans text-xs space-y-1.5">
              <div className="font-bold uppercase tracking-wider text-secondary text-[10px] font-mono">
                Abstract
              </div>
              <p className="text-primary/90 leading-relaxed italic">
                "{paper.abstract}"
              </p>
              <div className="pt-2 flex flex-wrap gap-1 text-[10px] font-mono text-secondary">
                <span className="font-semibold text-primary">Keywords:</span>
                {paper.keywords?.join(', ') || paper.tags.join(', ')}
              </div>
            </div>

            {/* Simulated Manuscript Body Text for Page */}
            <div className="space-y-4 font-serif text-sm text-primary/90 leading-relaxed">
              <h3 className="font-sans font-bold text-sm text-primary uppercase tracking-wide">
                Section {currentPage}: {currentPage === 1 ? '1. Introduction & Background' : currentPage === 2 ? '2. Threat Modeling & Lexical Bounds' : `3.${currentPage} Empirical Evaluation & Latency`}
              </h3>

              <p>
                The rapid growth of targeted social engineering campaigns necessitates automated, line-rate filtering mechanisms that inspect inbound Uniform Resource Locators before client browser execution. Conventional blacklisting techniques—while indispensable for persistent malicious infrastructure—exhibit systemic vulnerabilities during the initial hours of zero-day domain generation.
              </p>

              {/* Sample Highlightable Quote */}
              <div
                onClick={() => {
                  setSelectedText(
                    'Evaluating a URL without downloading remote web content requires deriving statistical features exclusively from string tokens.'
                  );
                  setIsAnnotating(true);
                }}
                className="p-3 bg-softYellow/60 hover:bg-softYellow rounded border-l-4 border-yellow-500 cursor-pointer transition-colors font-sans text-xs leading-relaxed"
                title="Click to add note to this passage"
              >
                <div className="text-[10px] font-mono text-secondary mb-1 flex items-center space-x-1">
                  <Highlighter className="w-3 h-3 text-yellow-600" />
                  <span>Interactive Passage (Click to Annotate):</span>
                </div>
                "Evaluating a URL without downloading remote web content requires deriving statistical features exclusively from string tokens, minimizing client round-trip latency to sub-millisecond tolerances."
              </div>

              <p>
                Feature extraction must therefore prioritize static lexical invariants: character length distributions, Shannon entropy computed over path segments, vowel-to-consonant proportions, and the presence of brand keywords located within third-level subdomains rather than legitimate second-level apex domains.
              </p>

              <p>
                In empirical evaluations on our verified ground-truth dataset, tree-based ensemble architectures demonstrated optimal convergence. Unlike deep convolutional neural networks, which incur non-trivial memory footprints in edge runtime environments, gradient-boosted decision trees deliver predictions in under 12 milliseconds on commodity CPU hardware.
              </p>
            </div>

            {/* Page Footer */}
            <div className="border-t border-border pt-4 text-center text-xs font-mono text-secondary">
              — Page {currentPage} of {totalPages} —
            </div>
          </div>
        </div>

        {/* Right: Annotations & Research Insights Panel */}
        <div className="w-80 md:w-96 border-l border-border bg-surface flex flex-col justify-between shrink-0">
          {/* Header of notes panel */}
          <div className="p-4 border-b border-border bg-surface-subtle flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <MessageSquare className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-semibold text-primary">
                Annotations & Insights ({paperAnnotations.length})
              </span>
            </div>
            <button
              onClick={() => setIsAnnotating(true)}
              className="px-2 py-1 rounded bg-forest-500 hover:bg-forest-600 text-white text-[11px] font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>New Note</span>
            </button>
          </div>

          {/* New Annotation Form */}
          {isAnnotating && (
            <div className="p-4 border-b border-border bg-sage-light/40 space-y-3 text-xs animate-in fade-in duration-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-forest-700">Add Page {currentPage} Note</span>
                <button onClick={() => setIsAnnotating(false)} className="text-secondary hover:text-primary">
                  ✕
                </button>
              </div>

              {selectedText && (
                <div className="p-2 bg-surface rounded border border-border text-[11px] italic font-serif text-secondary line-clamp-3">
                  "{selectedText}"
                </div>
              )}

              <textarea
                value={annotationComment}
                onChange={(e) => setAnnotationComment(e.target.value)}
                placeholder="Note or critique on this passage..."
                className="w-full p-2 rounded border border-border bg-surface h-16 outline-none focus:border-forest-500"
              />

              <input
                type="text"
                value={annotationInsight}
                onChange={(e) => setAnnotationInsight(e.target.value)}
                placeholder="Research insight for thesis (e.g. justify Section 3.2)..."
                className="w-full p-2 rounded border border-border bg-surface text-[11px]"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-secondary">Color:</span>
                  {(['yellow', 'green', 'terracotta', 'sage'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setAnnotationColor(c)}
                      className={`w-4 h-4 rounded-full border ${
                        annotationColor === c ? 'ring-2 ring-primary' : ''
                      } ${
                        c === 'yellow'
                          ? 'bg-yellow-400'
                          : c === 'green'
                          ? 'bg-forest-500'
                          : c === 'terracotta'
                          ? 'bg-terracotta'
                          : 'bg-sage-border'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleSaveAnnotation}
                  className="px-3 py-1 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {/* Annotations List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {paperAnnotations.length === 0 ? (
              <div className="p-6 text-center text-xs text-secondary space-y-2">
                <BookOpen className="w-6 h-6 mx-auto text-secondary/40" />
                <p>No annotations yet for this paper.</p>
                <p className="text-[11px]">
                  Click the highlighted text in the manuscript or click "+ New Note" above.
                </p>
              </div>
            ) : (
              paperAnnotations.map((anno) => (
                <div
                  key={anno.id}
                  className={`p-3 rounded-lg border text-xs space-y-1.5 transition-colors ${
                    anno.color === 'yellow'
                      ? 'bg-yellow-50/60 border-yellow-200'
                      : anno.color === 'green'
                      ? 'bg-forest-50/60 border-forest-500/20'
                      : anno.color === 'terracotta'
                      ? 'bg-terracotta/5 border-terracotta/20'
                      : 'bg-sage-light/60 border-sage-border'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-secondary">
                    <span className="font-semibold text-primary">Page {anno.pageNumber}</span>
                    <button
                      onClick={() => deleteAnnotation(anno.id)}
                      className="text-secondary/60 hover:text-terracotta"
                      title="Delete annotation"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  {anno.selectedText && (
                    <div className="text-[11px] italic font-serif text-secondary border-l-2 border-secondary/40 pl-2">
                      "{anno.selectedText}"
                    </div>
                  )}

                  <p className="text-primary font-medium">{anno.comment}</p>

                  {anno.researchInsight && (
                    <div className="text-[10px] text-forest-700 bg-surface/80 p-1.5 rounded border border-border font-sans">
                      <span className="font-semibold">Insight: </span>
                      {anno.researchInsight}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Bottom helper */}
          <div className="p-3 border-t border-border bg-surface-subtle text-[11px] text-secondary flex items-center justify-between">
            <span>Linked to ThesisFlow Knowledge Base</span>
            <Link to="/app/notes" className="text-forest-600 hover:underline">
              View all notes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

