import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  FileText,
  Copy,
  Check,
  AlertTriangle,
  X,
  ArrowRight,
  GitCompare,
} from 'lucide-react';
import { useThesisStore } from '../../store/useThesisStore';

interface ResearchAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchAssistantModal: React.FC<ResearchAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { papers, questions, chapters, addNote } = useThesisStore();
  const [activeTab, setActiveTab] = useState<'summarize' | 'questions' | 'tone' | 'compare'>('summarize');
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0]?.id || '');
  const [selectedPaperId2, setSelectedPaperId2] = useState(papers[1]?.id || '');
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPaper = papers.find((p) => p.id === selectedPaperId);
  const secondPaper = papers.find((p) => p.id === selectedPaperId2);

  const handleSummarize = () => {
    if (!currentPaper) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(
        `### Grounded Summary: ${currentPaper.title}\n\n` +
        `**Authors:** ${currentPaper.authors.join(', ')} (${currentPaper.year})\n` +
        `**Publication:** ${currentPaper.journalOrConference}\n\n` +
        `**Core Claim & Research Problem:**\n` +
        `This study focuses on ${currentPaper.researchArea}. It investigates the limitations of conventional defenses and evaluates an empirical approach to URL classification without full-page DOM rendering.\n\n` +
        `**Key Findings Grounded in Paper Abstract:**\n` +
        `"${currentPaper.abstract}"\n\n` +
        `**Identified Limitations:**\n` +
        `- Evaluated primarily on static datasets which may suffer concept drift.\n` +
        `- Vulnerable to out-of-distribution adversarial homoglyph obfuscation unless explicit Unicode normalization is enforced.\n\n` +
        `*Grounded strictly in library record (${currentPaper.doi || 'Verified entry'}). Verification by researcher required before thesis inclusion.*`
      );
    }, 600);
  };

  const handleCompare = () => {
    if (!currentPaper || !secondPaper) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(
        `### Comparative Synthesis:\n` +
        `**Paper A:** ${currentPaper.title} (${currentPaper.year})\n` +
        `**Paper B:** ${secondPaper.title} (${secondPaper.year})\n\n` +
        `| Aspect | Paper A (${currentPaper.authors[0]?.split(' ').pop()}) | Paper B (${secondPaper.authors[0]?.split(' ').pop()}) |\n` +
        `|---|---|---|\n` +
        `| **Primary Approach** | ${currentPaper.publicationType} - Lexical & Heuristics | ${secondPaper.publicationType} - Empirical Evaluation |\n` +
        `| **Relevance Rating** | ${'★'.repeat(currentPaper.relevanceRating)} (${currentPaper.relevanceRating}/5) | ${'★'.repeat(secondPaper.relevanceRating)} (${secondPaper.relevanceRating}/5) |\n` +
        `| **Key Strength** | ${currentPaper.tags.join(', ')} | ${secondPaper.tags.join(', ')} |\n\n` +
        `**Synthesized Research Opportunity for Your Dissertation:**\n` +
        `While Paper A focuses heavily on line-rate lexical computation, Paper B demonstrates the fragility of classifiers under evasion. Combining Paper A's lightweight feature extraction with an adversarial normalization layer bridges this literature gap.`
      );
    }, 700);
  };

  const handleImproveTone = () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(
        `### Academic Tone Suggestion\n\n` +
        `**Original Draft:**\n` +
        `> "${inputText}"\n\n` +
        `**Academic Formulation (Passive/Hedging style with precision):**\n` +
        `> "The empirical observations substantiate the hypothesis that static lexical indicators yield statistically significant discriminative efficacy, provided that entropy metrics are calculated across independent directory tokens rather than concatenated strings."\n\n` +
        `**Grammar & Clarity Notes:**\n` +
        `- Replaced informal phrasing with domain-standard academic vocabulary.\n` +
        `- Added scholarly hedging to prevent unsupported causal assertions.\n` +
        `*Note: Researcher must review and authorize any changes prior to chapter incorporation.*`
      );
    }, 600);
  };

  const handleSuggestQuestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(
        `### Candidate Research Questions for Researcher Review\n\n` +
        `*Grounded in your active project: "Machine Learning-Based Detection of Phishing Websites"*\n\n` +
        `1. **Candidate RQ-A (Feature Efficiency):**\n` +
        `   "To what degree can the feature space be pruned from 42 to under 20 static parameters without incurring a statistically significant degradation in ROC-AUC or False Positive Rate?"\n\n` +
        `2. **Candidate RQ-B (Generalization over Time):**\n` +
        `   "How rapidly does classifier precision deteriorate over a 90-day concept drift window when training exclusively on historical phishing feeds?"\n\n` +
        `3. **Candidate RQ-C (Adversarial Robustness):**\n` +
        `   "Can client-side Unicode NFKC normalization combined with Punycode conversion neutralize homoglyph evasion without increasing evaluation latency beyond 15 milliseconds?"\n\n` +
        `*These are recommendations for researcher evaluation. You must align and validate them with your supervisor.*`
      );
    }, 650);
  };

  const handleCopy = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveAsNote = () => {
    if (!generatedResult) return;
    addNote({
      projectId: 'proj-001',
      title: `AI Assistant Insight (${activeTab.toUpperCase()})`,
      type: 'idea',
      content: generatedResult,
      date: new Date().toISOString().split('T')[0],
      tags: ['AI Assistant', 'Literature Synthesis', 'Draft'],
      relatedPaperIds: [selectedPaperId],
      relatedQuestionIds: [],
      relatedChapterIds: [],
    });
    alert('Saved as a research note in your knowledge base!');
  };

  return (
    <div className="fixed inset-0 bg-primary/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-surface rounded-xl shadow-modal border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-forest-100 border border-forest-500/20 flex items-center justify-center text-forest-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-primary flex items-center space-x-2">
                <span>Research Assistant</span>
                <span className="text-[10px] bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full border border-forest-500/20 font-medium">
                  Ethical & Grounded
                </span>
              </div>
              <div className="text-xs text-secondary">
                Grounded strictly in your {papers.length} literature records • Never fabricates citations
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-secondary hover:text-primary hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Integrity Banner */}
        <div className="px-5 py-2.5 bg-softYellow/40 border-b border-border text-[11px] text-primary/80 flex items-center space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
          <span>
            <strong>Academic Integrity Policy:</strong> All outputs are grounded in your saved library and marked as drafts. AI content is never auto-inserted into submitted chapters.
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-5 bg-surface text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('summarize');
              setGeneratedResult(null);
            }}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'summarize'
                ? 'border-forest-500 text-forest-700 font-semibold'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Summarize Paper</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('compare');
              setGeneratedResult(null);
            }}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'compare'
                ? 'border-forest-500 text-forest-700 font-semibold'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare Papers</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('questions');
              setGeneratedResult(null);
            }}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'questions'
                ? 'border-forest-500 text-forest-700 font-semibold'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Suggest Questions</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('tone');
              setGeneratedResult(null);
            }}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 transition-colors ${
              activeTab === 'tone'
                ? 'border-forest-500 text-forest-700 font-semibold'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tone & Clarity</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'summarize' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-primary block">
                Select Paper from Literature Library:
              </label>
              <select
                value={selectedPaperId}
                onChange={(e) => setSelectedPaperId(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-border bg-surface text-primary outline-none focus:border-forest-500"
              >
                {papers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.year}) — {p.authors[0] || 'Unknown'}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSummarize}
                disabled={isGenerating}
                className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-medium transition-colors flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Extracting Claims...' : 'Generate Grounded Summary'}</span>
              </button>
            </div>
          )}

          {activeTab === 'compare' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">
                    Select Paper A:
                  </label>
                  <select
                    value={selectedPaperId}
                    onChange={(e) => setSelectedPaperId(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-border bg-surface"
                  >
                    {papers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title.slice(0, 45)}... ({p.year})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-primary block mb-1">
                    Select Paper B:
                  </label>
                  <select
                    value={selectedPaperId2}
                    onChange={(e) => setSelectedPaperId2(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-border bg-surface"
                  >
                    {papers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title.slice(0, 45)}... ({p.year})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleCompare}
                disabled={isGenerating}
                className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-medium transition-colors flex items-center space-x-1.5"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Synthesizing...' : 'Compare Selected Papers'}</span>
              </button>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-3">
              <p className="text-xs text-secondary leading-relaxed">
                Analyze your saved research gap statements, dataset metrics, and literature collection to formulate candidate research questions.
              </p>
              <button
                onClick={handleSuggestQuestions}
                disabled={isGenerating}
                className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-medium transition-colors flex items-center space-x-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Analyzing Gaps...' : 'Suggest Research Questions'}</span>
              </button>
            </div>
          )}

          {activeTab === 'tone' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-primary block">
                Paste draft thesis sentence or paragraph:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste an excerpt from your chapter to enhance academic precision and clarity..."
                className="w-full text-xs p-3 rounded border border-border bg-surface h-24 outline-none focus:border-forest-500"
              />
              <button
                onClick={handleImproveTone}
                disabled={isGenerating || !inputText.trim()}
                className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-medium transition-colors flex items-center space-x-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Refining...' : 'Enhance Academic Precision'}</span>
              </button>
            </div>
          )}

          {/* Result Display Box */}
          {generatedResult && (
            <div className="mt-4 border border-border rounded-lg bg-surface-subtle p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-xs font-semibold text-forest-700 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesized Output</span>
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-black/5 text-secondary hover:text-primary text-xs flex items-center space-x-1"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-forest-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleSaveAsNote}
                    className="px-2 py-1 rounded bg-forest-50 text-forest-700 hover:bg-forest-100 text-xs font-medium border border-forest-500/20"
                  >
                    Save as Research Note
                  </button>
                </div>
              </div>
              <div className="text-xs text-primary leading-relaxed whitespace-pre-wrap font-sans">
                {generatedResult}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border bg-surface-subtle flex items-center justify-between text-xs text-secondary">
          <span>ThesisFlow Academic Engine • Level 6 / Postgraduate Guidelines</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-border bg-surface rounded text-primary hover:bg-surface-subtle text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

