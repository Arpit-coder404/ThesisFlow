import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Edit3,
  GitBranch,
  FlaskConical,
  MessageSquare,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Users,
  Compass,
  DownloadCloud,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const LandingPage: React.FC = () => {
  const { setUserRole } = useThesisStore();

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-forest-100 selection:text-forest-700">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-border bg-surface/90 backdrop-blur-xs sticky top-0 z-40 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-forest-500 flex items-center justify-center text-white font-serif font-bold text-base shadow-subtle">
            TF
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-primary">ThesisFlow</span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-secondary px-2 py-0.5 rounded border border-border bg-surface-subtle">
            Academic Research System
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-secondary">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#literature" className="hover:text-primary transition-colors">Literature & Matrix</a>
          <a href="#editor" className="hover:text-primary transition-colors">Thesis Editor</a>
          <a href="#collaboration" className="hover:text-primary transition-colors">Supervisor Review</a>
          <a href="#universities" className="hover:text-primary transition-colors">For Universities</a>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/app/overview"
            className="text-xs font-semibold px-4 py-2 rounded border border-border bg-surface hover:bg-surface-subtle text-primary transition-colors"
          >
            Explore Demo
          </Link>
          <Link
            to="/app/overview"
            className="text-xs font-semibold px-4 py-2 rounded bg-forest-500 hover:bg-forest-600 text-white shadow-subtle transition-colors flex items-center space-x-1.5"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20 pb-16 px-6 lg:px-12 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-forest-500/20 bg-forest-50 text-forest-700 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
          <span>The Academic Workspace for Dissertations & Scientific Research</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Research is complex.<br />
          Your workspace shouldn't be.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
          Plan your research questions, organize literature with a comparative matrix, write chapters with in-text citation tracking, and collaborate with your supervisor — all in one connected academic workspace.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/app/overview"
            className="w-full sm:w-auto px-7 py-3 rounded-md bg-forest-500 hover:bg-forest-600 text-white text-sm font-semibold shadow-academic flex items-center justify-center space-x-2 transition-all"
          >
            <span>Create your research workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/app/literature"
            className="w-full sm:w-auto px-7 py-3 rounded-md border border-border bg-surface hover:bg-surface-subtle text-primary text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-secondary" />
            <span>Explore Literature Matrix</span>
          </Link>
        </div>

        {/* Role Demo Quick Jump */}
        <div className="mt-6 flex items-center justify-center space-x-3 text-xs text-secondary">
          <span>Or preview as:</span>
          <Link
            to="/app/overview"
            onClick={() => setUserRole('student')}
            className="underline hover:text-primary font-medium"
          >
            Researcher (Aarav)
          </Link>
          <span>•</span>
          <Link
            to="/app/feedback"
            onClick={() => setUserRole('supervisor')}
            className="underline hover:text-primary font-medium"
          >
            Supervisor (Dr. Sharma)
          </Link>
          <span>•</span>
          <Link
            to="/app/checklist"
            onClick={() => setUserRole('admin')}
            className="underline hover:text-primary font-medium"
          >
            Administrator (Prof. Vance)
          </Link>
        </div>

        {/* Real Product Interface Preview */}
        <div className="mt-14 border border-border rounded-xl shadow-modal bg-surface overflow-hidden text-left">
          {/* Mock Window Top Bar */}
          <div className="h-10 bg-sidebar-bg border-b border-border px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-border-strong inline-block" />
              <span className="w-3 h-3 rounded-full bg-border-strong inline-block" />
              <span className="w-3 h-3 rounded-full bg-border-strong inline-block" />
              <span className="text-xs font-mono text-secondary ml-2 font-medium">
                ThesisFlow Workspace — Machine Learning-Based Detection of Phishing Websites
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-forest-700 bg-sage px-2 py-0.5 rounded font-mono">
              <span>Status: In Progress (May 15 Submission)</span>
            </div>
          </div>

          {/* Interior Mock Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Sidebar preview */}
            <div className="md:col-span-3 bg-surface-subtle p-4 space-y-4 text-xs font-sans">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-secondary font-semibold mb-2">
                  Dissertation Chapters
                </div>
                <div className="space-y-1">
                  <div className="p-1.5 rounded bg-sage font-medium text-forest-700 flex items-center justify-between">
                    <span>1. Introduction</span>
                    <span className="text-[10px] text-forest-600">Approved</span>
                  </div>
                  <div className="p-1.5 rounded hover:bg-black/5 text-primary flex items-center justify-between">
                    <span>2. Literature Review</span>
                    <span className="text-[10px] text-forest-600">Approved</span>
                  </div>
                  <div className="p-1.5 rounded hover:bg-black/5 text-primary flex items-center justify-between">
                    <span>3. Methodology</span>
                    <span className="text-[10px] text-terracotta">Revision</span>
                  </div>
                  <div className="p-1.5 rounded hover:bg-black/5 text-primary flex items-center justify-between">
                    <span>4. Results & Analysis</span>
                    <span className="text-[10px] text-secondary">Draft</span>
                  </div>
                  <div className="p-1.5 rounded hover:bg-black/5 text-primary flex items-center justify-between">
                    <span>5. Discussion</span>
                    <span className="text-[10px] text-secondary">Draft</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-secondary font-semibold mb-1">
                  Verified Corpus
                </div>
                <div className="text-xs text-secondary">
                  88,647 URLs • 42 Engineered Features • 5 ML Benchmarks
                </div>
              </div>
            </div>

            {/* Document writing preview */}
            <div className="md:col-span-6 p-6 bg-surface space-y-3 font-serif">
              <div className="text-xs font-mono uppercase text-secondary tracking-widest font-sans">
                Chapter 3 • Section 3.2
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">
                Dataset Selection & Ground Truth Sanitization
              </h3>
              <p className="text-xs text-primary/80 leading-relaxed font-sans">
                To eliminate sampling bias and reflect authentic web traffic distributions, we constructed a balanced corpus comprising 88,647 unique URLs from active PhishTank feeds and the Tranco research whitelist <span className="bg-sage px-1 py-0.5 rounded text-forest-700 font-mono text-[10px] font-sans font-semibold">(Oest et al., 2023)</span>.
              </p>
              <div className="p-3 bg-surface-subtle border border-border rounded-lg text-xs font-sans space-y-1">
                <div className="flex items-center justify-between text-secondary text-[11px]">
                  <span>EXP-05: Ensemble Stacking Performance</span>
                  <span className="text-forest-600 font-semibold">96.84% Accuracy</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <div className="bg-forest-500 h-full w-[96.8%]" />
                </div>
              </div>
            </div>

            {/* Supervisor feedback preview */}
            <div className="md:col-span-3 bg-surface-subtle p-4 space-y-3 text-xs font-sans">
              <div className="text-[10px] font-mono uppercase tracking-wider text-secondary font-semibold">
                Supervisor Feedback
              </div>
              <div className="p-3 bg-surface rounded border border-border space-y-2 shadow-subtle">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center font-bold text-[10px]">
                    MS
                  </span>
                  <div>
                    <div className="font-semibold text-primary text-[11px]">Dr. Meera Sharma</div>
                    <div className="text-[10px] text-secondary">Primary Supervisor</div>
                  </div>
                </div>
                <p className="text-[11px] text-secondary leading-snug">
                  "Ensure Section 3.6 details the exact URL query parameter sanitization to protect user browsing privacy."
                </p>
                <div className="text-[10px] text-forest-600 font-medium">
                  Status: Revision in progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 6 Core Journey Sections */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border space-y-20">
        {/* Section 1: Research Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono uppercase text-forest-600 font-semibold tracking-wider">
              01 • Structured Formulation
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">
              The Research Journey: From Idea to Submission
            </h2>
            <p className="text-sm text-secondary mt-4 leading-relaxed">
              Define your research gap, formulate primary and secondary research questions, map concrete objectives, and track methodology deliverables on an interactive alignment matrix.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-primary">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500 shrink-0" />
                <span>Formal Research Problem → Gap → RQ → Objective mapping</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500 shrink-0" />
                <span>Live alignment matrix with persistent status updates</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-500 shrink-0" />
                <span>Hypothesis formulation with expected contributions</span>
              </li>
            </ul>
          </div>
          <div className="bg-surface rounded-xl border border-border p-6 shadow-academic space-y-3 font-mono text-xs">
            <div className="text-secondary uppercase text-[11px] font-semibold border-b border-border pb-2">
              Research Alignment Matrix
            </div>
            <div className="space-y-2 font-sans">
              <div className="p-2.5 rounded bg-surface-subtle border border-border">
                <div className="font-semibold text-primary text-xs">RQ1: Static Lexical Signals</div>
                <div className="text-secondary text-[11px]">Objective: Extract & rank 42 entropy features</div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-secondary font-mono">Method: Information Gain</span>
                  <span className="text-forest-600 font-semibold bg-sage px-1.5 py-0.5 rounded">Complete</span>
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface-subtle border border-border">
                <div className="font-semibold text-primary text-xs">RQ2: Shallow Trees vs Deep Models</div>
                <div className="text-secondary text-[11px]">Objective: Train 5 cross-validated classifiers</div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-secondary font-mono">Method: 5-Fold Stratified Split</span>
                  <span className="text-forest-600 font-semibold bg-sage px-1.5 py-0.5 rounded">Complete</span>
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface-subtle border border-border">
                <div className="font-semibold text-primary text-xs">RQ3: Adversarial Evasion Robustness</div>
                <div className="text-secondary text-[11px]">Objective: Stress-test against Cyrillic homoglyphs</div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-secondary font-mono">Method: IDNA Normalization</span>
                  <span className="text-terracotta font-semibold bg-terracotta/10 px-1.5 py-0.5 rounded">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Literature Management */}
        <div id="literature" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-surface rounded-xl border border-border p-6 shadow-academic space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-semibold text-primary">Comparative Literature Matrix</span>
              <span className="text-[10px] text-secondary font-mono">CSV / BibTeX Ready</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-surface-subtle border border-border space-y-1">
                <div className="font-semibold text-primary">Ma et al. (IEEE TIFS 2021)</div>
                <div className="text-secondary text-[11px]">Focus: Lexical URL analysis with online passive-aggressive algorithms.</div>
                <div className="text-[10px] text-forest-700 bg-sage-light p-1 rounded">
                  Relevance: Justifies excluding heavy DOM rendering to maintain sub-15ms latency.
                </div>
              </div>
              <div className="p-2.5 rounded bg-surface-subtle border border-border space-y-1">
                <div className="font-semibold text-primary">Al-Eryani et al. (ACM CCS 2024)</div>
                <div className="text-secondary text-[11px]">Focus: Adversarial evasion using Unicode homoglyphs and zero-day URLs.</div>
                <div className="text-[10px] text-terracotta bg-terracotta/10 p-1 rounded">
                  Gap: Demonstrates 38.4% recall drop without Unicode NFKC normalization.
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="text-xs font-mono uppercase text-forest-600 font-semibold tracking-wider">
              02 • Systematic Review
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">
              Literature Management & The Comparative Matrix
            </h2>
            <p className="text-sm text-secondary mt-4 leading-relaxed">
              Don't just stockpile PDFs. Compare methodologies, datasets, findings, and limitations side-by-side in an interactive literature matrix. Synthesize research themes and directly import or export BibTeX.
            </p>
            <div className="mt-6">
              <Link
                to="/app/matrix"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-forest-600 hover:text-forest-700"
              >
                <span>View live literature matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 3: Focused Writing */}
        <div id="editor" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono uppercase text-forest-600 font-semibold tracking-wider">
              03 • Distraction-Free Authoring
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">
              Focused Academic Writing with TipTap & Overleaf Rigor
            </h2>
            <p className="text-sm text-secondary mt-4 leading-relaxed">
              A distraction-free, paper-like writing environment with instant in-text citation injection, target word count tracking, snapshot version history, and collapsible panels.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-secondary font-mono">
              <span className="px-2 py-1 bg-surface rounded border border-border">APA 7th</span>
              <span className="px-2 py-1 bg-surface rounded border border-border">IEEE</span>
              <span className="px-2 py-1 bg-surface rounded border border-border">MLA</span>
              <span className="px-2 py-1 bg-surface rounded border border-border">Chicago</span>
              <span className="px-2 py-1 bg-surface rounded border border-border">Harvard</span>
            </div>
          </div>
          <div className="bg-surface rounded-xl border border-border p-6 shadow-academic space-y-3 font-serif">
            <div className="text-xs font-mono uppercase text-secondary pb-2 border-b border-border">
              Editor • Live Citation Insert
            </div>
            <div className="p-4 bg-surface-subtle border border-border rounded font-sans text-xs space-y-2">
              <div className="text-primary leading-relaxed font-serif text-sm">
                "Modern phishing campaigns exhibit high volatility, with over 70% of victim interactions occurring prior to blacklist indexing <span className="bg-sage text-forest-700 px-1 py-0.5 rounded font-mono text-[10px] font-bold">[Oest et al., 2023]</span>."
              </div>
              <div className="pt-2 text-[10px] text-secondary flex items-center justify-between border-t border-border">
                <span>Word count: 3,820 / 4,000</span>
                <span className="text-forest-600 font-medium">Autosaved just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Supervisor Collaboration */}
        <div id="collaboration" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-surface rounded-xl border border-border p-6 shadow-academic space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-semibold text-primary">Formal Submission Workflow</span>
              <span className="text-[10px] font-mono text-terracotta bg-terracotta/10 px-2 py-0.5 rounded">
                Revision Requested
              </span>
            </div>
            <div className="p-3 bg-surface-subtle border border-border rounded text-xs space-y-2">
              <div className="font-semibold text-primary">Chapter 3: Research Methodology (v1)</div>
              <div className="text-secondary text-[11px]">
                Reviewer: Dr. Meera Sharma (Associate Professor)
              </div>
              <div className="p-2 bg-surface rounded border border-border text-[11px] text-primary">
                "Expand Section 3.6 to discuss privacy-preserving hashing of query parameters."
              </div>
              <div className="text-[10px] text-secondary flex items-center justify-between">
                <span>Submitted: March 20, 2026</span>
                <span className="text-forest-600 font-medium">Student response attached</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="text-xs font-mono uppercase text-forest-600 font-semibold tracking-wider">
              04 • Academic Governance
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">
              Supervisor Collaboration: Keep Reviews & Revisions Connected
            </h2>
            <p className="text-sm text-secondary mt-4 leading-relaxed">
              No more lost email attachments or contradictory feedback. Submit chapters with version snapshots, receive inline comments with resolution tracking, and document formal meeting decisions.
            </p>
          </div>
        </div>

        {/* Section 5: Experiments & Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono uppercase text-forest-600 font-semibold tracking-wider">
              05 • Empirical Rigor
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">
              Experiments & Dataset Registry
            </h2>
            <p className="text-sm text-secondary mt-4 leading-relaxed">
              Track experimental configurations, execution parameters, hardware environments, and evaluation metrics (Accuracy, F1, Latency, ROC-AUC) across model iterations.
            </p>
          </div>
          <div className="bg-surface rounded-xl border border-border p-6 shadow-academic space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-semibold text-primary">Experiment EXP-05: Ensemble Stacking</span>
              <span className="text-forest-600 font-semibold text-[10px] bg-sage px-2 py-0.5 rounded">
                ★ Best Model
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] text-secondary">Accuracy</div>
                <div className="text-sm font-bold text-forest-700">96.84%</div>
              </div>
              <div className="p-2 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] text-secondary">False Positives</div>
                <div className="text-sm font-bold text-primary">0.38%</div>
              </div>
              <div className="p-2 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] text-secondary">Inference</div>
                <div className="text-sm font-bold text-primary">14.2 ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Submission Readiness */}
        <div id="universities" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-surface rounded-xl border border-border p-6 shadow-academic space-y-3">
            <div className="text-xs font-semibold text-primary border-b border-border pb-2">
              Institutional Submission Readiness
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-sage-light text-forest-700">
                <span>All 7 chapters compiled and formatted</span>
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-sage-light text-forest-700">
                <span>Structured abstract (&lt; 350 words)</span>
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-surface-subtle border border-border text-primary">
                <span>Supervisor sign-off declaration recorded</span>
                <span className="text-[10px] text-secondary font-mono">Pending Apr 18</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="text-xs font-mono uppercase text-forest-600 font-semibold tracking-wider">
              06 • Finalization
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary mt-2">
              Submission Readiness & Multi-Format Thesis Export
            </h2>
            <p className="text-sm text-secondary mt-4 leading-relaxed">
              Verify compliance against institution-configured formatting checklists and export your entire thesis as a print-ready PDF, Word-compatible HTML, Markdown bundle, or standalone BibTeX bibliography.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Statement */}
      <footer className="border-t border-border bg-surface py-16 px-6 lg:px-12 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold max-w-2xl mx-auto leading-snug">
          Your research deserves a workspace built around the way research actually happens.
        </h3>
        <p className="text-xs text-secondary mt-3">
          ThesisFlow: Every paper, every idea, every chapter — connected.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/app/overview"
            className="px-6 py-2.5 rounded-md bg-forest-500 hover:bg-forest-600 text-white text-xs font-semibold shadow-subtle transition-colors"
          >
            Launch Research Workspace
          </Link>
          <Link
            to="/app/help"
            className="px-6 py-2.5 rounded-md border border-border bg-surface hover:bg-surface-subtle text-primary text-xs font-semibold transition-colors"
          >
            Academic Integrity Policy
          </Link>
        </div>

        <div className="mt-12 text-[11px] text-secondary border-t border-border/60 pt-6">
          © 2026 ThesisFlow Platform. Designed for universities, postgraduate researchers, and dissertations.
        </div>
      </footer>
    </div>
  );
};

