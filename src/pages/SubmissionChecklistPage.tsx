import React from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  DownloadCloud,
  ShieldCheck,
  Building,
  FileText,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const SubmissionChecklistPage: React.FC = () => {
  const { checklist, toggleChecklistItem, currentUser } = useThesisStore();

  const completedCount = checklist.filter((c) => c.completed).length;
  const totalCount = checklist.length;
  const isFullyCompliant = completedCount === totalCount;
  const percent = Math.round((completedCount / totalCount) * 100);

  const documentItems = checklist.filter((c) => c.category === 'document');
  const academicItems = checklist.filter((c) => c.category === 'academic');
  const adminItems = checklist.filter((c) => c.category === 'administrative');

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Submission Readiness Checklist
          </h1>
          <p className="text-xs text-secondary mt-1">
            Institutional verification across document formatting, academic governance, and administrative requirements.
          </p>
        </div>

        <Link
          to="/app/export"
          className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors shrink-0"
        >
          <DownloadCloud className="w-3.5 h-3.5" />
          <span>Proceed to Thesis Export</span>
        </Link>
      </div>

      {/* Compliance Banner */}
      <div
        className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle ${
          isFullyCompliant
            ? 'bg-sage-light/80 border-forest-500/40'
            : 'bg-surface border-border'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            {isFullyCompliant ? (
              <CheckCircle2 className="w-5 h-5 text-forest-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-terracotta" />
            )}
            <h2 className="font-serif text-base font-bold text-primary">
              {isFullyCompliant
                ? 'All Institutional Requirements Satisfied'
                : `Verification in Progress: ${completedCount} of ${totalCount} Requirements Verified`}
            </h2>
          </div>
          <p className="text-xs text-secondary">
            {isFullyCompliant
              ? 'Your manuscript satisfies Imperial College London Department of Computing submission standards.'
              : 'Complete remaining supervisor sign-offs and compliance items before final archive export.'}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right font-mono text-xs">
            <span className="font-bold text-lg text-primary">{percent}%</span>
            <div className="text-[10px] text-secondary">Ready</div>
          </div>
          <div className="w-24 bg-border h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${isFullyCompliant ? 'bg-forest-500' : 'bg-terracotta'}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-6">
        {/* Category 1: Document Formatting */}
        <div className="bg-surface rounded-xl border border-border shadow-subtle p-5 space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2.5">
            <FileText className="w-4 h-4 text-forest-600" />
            <h3 className="font-serif text-base font-bold text-primary">
              1. Document & Structural Requirements ({documentItems.filter((i) => i.completed).length}/{documentItems.length})
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            {documentItems.map((item) => (
              <div key={item.id} className="py-3 flex items-start space-x-3 text-xs">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="mt-0.5 rounded border-border text-forest-600 focus:ring-forest-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-primary">{item.label}</div>
                  <div className="text-[11px] text-secondary mt-0.5">{item.description}</div>
                  {item.notes && (
                    <div className="text-[10px] text-forest-700 font-mono mt-1">
                      Note: {item.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Academic Governance */}
        <div className="bg-surface rounded-xl border border-border shadow-subtle p-5 space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2.5">
            <ShieldCheck className="w-4 h-4 text-forest-600" />
            <h3 className="font-serif text-base font-bold text-primary">
              2. Academic Governance & Ethics ({academicItems.filter((i) => i.completed).length}/{academicItems.length})
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            {academicItems.map((item) => (
              <div key={item.id} className="py-3 flex items-start space-x-3 text-xs">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="mt-0.5 rounded border-border text-forest-600 focus:ring-forest-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-primary">{item.label}</div>
                  <div className="text-[11px] text-secondary mt-0.5">{item.description}</div>
                  {item.notes && (
                    <div className="text-[10px] text-terracotta font-mono mt-1">
                      Status: {item.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 3: Administrative */}
        <div className="bg-surface rounded-xl border border-border shadow-subtle p-5 space-y-3">
          <div className="flex items-center space-x-2 border-b border-border pb-2.5">
            <Building className="w-4 h-4 text-forest-600" />
            <h3 className="font-serif text-base font-bold text-primary">
              3. Faculty Administrative Compliance ({adminItems.filter((i) => i.completed).length}/{adminItems.length})
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            {adminItems.map((item) => (
              <div key={item.id} className="py-3 flex items-start space-x-3 text-xs">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="mt-0.5 rounded border-border text-forest-600 focus:ring-forest-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-primary">{item.label}</div>
                  <div className="text-[11px] text-secondary mt-0.5">{item.description}</div>
                  {item.notes && (
                    <div className="text-[10px] text-secondary font-mono mt-1">
                      {item.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

