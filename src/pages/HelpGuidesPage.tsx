import React from 'react';
import {
  HelpCircle,
  ShieldCheck,
  BookOpen,
  Keyboard,
  Award,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const HelpGuidesPage: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Help, Guidelines & Academic Integrity
        </h1>
        <p className="text-xs text-secondary mt-1">
          Institutional standards, citation integrity protocols, and workspace keyboard shortcuts.
        </p>
      </div>

      {/* Academic Integrity Policy */}
      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
        <div className="flex items-center space-x-2 text-forest-700">
          <ShieldCheck className="w-5 h-5 text-forest-600" />
          <h2 className="font-serif text-lg font-bold">
            ThesisFlow Academic Integrity Policy
          </h2>
        </div>

        <div className="text-xs text-secondary leading-relaxed space-y-3 font-sans">
          <p>
            ThesisFlow is designed as an authentic academic workspace. The platform enforces strict ethical research principles:
          </p>
          <ul className="space-y-2 text-primary pl-4 list-disc">
            <li>
              <strong>No Fabricated Citations:</strong> Citations must correspond to verified papers in your library or manually confirmed BibTeX entries.
            </li>
            <li>
              <strong>Mandatory Author Review:</strong> AI suggestions are transparently badged and never auto-injected into submitted chapters without researcher authorization.
            </li>
            <li>
              <strong>Authentic Experimental Ground Truth:</strong> All benchmark metrics must reflect real cross-validation splits and reproducible code artifacts.
            </li>
            <li>
              <strong>Preservation of Revision History:</strong> Supervisor critiques and student responses are permanently stored to ensure supervisory accountability.
            </li>
          </ul>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
        <div className="flex items-center space-x-2">
          <Keyboard className="w-5 h-5 text-secondary" />
          <h2 className="font-serif text-lg font-bold text-primary">
            Workspace Keyboard Shortcuts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded bg-surface-subtle border border-border flex justify-between items-center">
            <span className="font-sans text-primary">Global Search & Command Center</span>
            <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-secondary">⌘K / Ctrl+K</kbd>
          </div>
          <div className="p-2.5 rounded bg-surface-subtle border border-border flex justify-between items-center">
            <span className="font-sans text-primary">Toggle Bold Text</span>
            <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-secondary">⌘B</kbd>
          </div>
          <div className="p-2.5 rounded bg-surface-subtle border border-border flex justify-between items-center">
            <span className="font-sans text-primary">Toggle Italic Text</span>
            <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-secondary">⌘I</kbd>
          </div>
          <div className="p-2.5 rounded bg-surface-subtle border border-border flex justify-between items-center">
            <span className="font-sans text-primary">Undo Last Change</span>
            <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-secondary">⌘Z</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

