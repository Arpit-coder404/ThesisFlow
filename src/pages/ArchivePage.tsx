import React from 'react';
import { Archive, Download, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const ArchivePage: React.FC = () => {
  const { projects } = useThesisStore();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="border-b border-border pb-5">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Research Archive & Institutional Repository
        </h1>
        <p className="text-xs text-secondary mt-1">
          Archived dissertations, minting of permanent DOIs, and long-term open science dataset deposition.
        </p>
      </div>

      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4 text-xs">
        <div className="flex items-center space-x-2 text-forest-700">
          <ShieldCheck className="w-5 h-5 text-forest-600" />
          <h2 className="font-serif text-base font-bold">
            Permanent Open Access Preservation Standards
          </h2>
        </div>
        <p className="text-secondary leading-relaxed">
          Upon successful thesis defense and final faculty sign-off, ThesisFlow bundles the PDF/A-1b manuscript, full BibTeX bibliography, raw datasets, and reproducible experiment code into an immutable archival record deposited in your university repository.
        </p>

        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono text-secondary">
          <span>Active Repository Integration: Imperial College Spiral Open Access Repository</span>
          <span className="text-forest-600 font-semibold">API Connected</span>
        </div>
      </div>
    </div>
  );
};

