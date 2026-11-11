import React from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  Building,
  RotateCcw,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { CitationStyleType, Role } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    allUsers,
    setUserRole,
    citationStyle,
    setCitationStyle,
    resetToDemoData,
  } = useThesisStore();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Workspace Settings & Preferences
        </h1>
        <p className="text-xs text-secondary mt-1">
          Configure academic institutional settings, citation style defaults, and active user profile.
        </p>
      </div>

      {/* User Profile & Demo Switcher */}
      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
        <h3 className="font-serif text-base font-bold text-primary flex items-center space-x-2">
          <User className="w-4 h-4 text-forest-600" />
          <span>Active Academic Profile & Demo Role</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {allUsers.map((u) => {
            const isSelected = u.id === currentUser.id;
            return (
              <div
                key={u.id}
                onClick={() => setUserRole(u.role)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-sage-light/60 border-forest-500 ring-1 ring-forest-500/20 shadow-subtle'
                    : 'bg-surface hover:bg-surface-subtle border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-forest-700 bg-sage px-2 py-0.5 rounded">
                    {u.role}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-forest-600" />}
                </div>
                <div className="font-semibold text-xs text-primary">{u.name}</div>
                <div className="text-[11px] text-secondary mt-0.5 truncate">{u.title}</div>
                <div className="text-[10px] text-secondary font-mono mt-1">{u.department}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Citation Defaults */}
      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4 text-xs">
        <h3 className="font-serif text-base font-bold text-primary">
          Citation Style Default
        </h3>
        <p className="text-secondary leading-relaxed">
          Determines the default formatting of in-text citations in the thesis editor and the compiled bibliography export.
        </p>

        <div className="flex flex-wrap gap-2 pt-1 font-mono">
          {(['apa', 'ieee', 'mla', 'chicago', 'harvard'] as CitationStyleType[]).map((style) => (
            <button
              key={style}
              onClick={() => setCitationStyle(style)}
              className={`px-4 py-2 rounded-lg border uppercase text-xs font-bold transition-colors ${
                citationStyle === style
                  ? 'bg-forest-500 text-white border-forest-500 shadow-subtle'
                  : 'bg-surface border-border text-secondary hover:text-primary'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Data Management & Reset */}
      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4 text-xs">
        <h3 className="font-serif text-base font-bold text-primary">
          Demo Workspace Data Management
        </h3>
        <p className="text-secondary leading-relaxed">
          ThesisFlow saves all edits, new papers, chapters, and notes to local browser storage so your work persists across refreshes. If you wish to restore the clean initial demo project state, click below.
        </p>

        <div>
          <button
            onClick={() => {
              if (window.confirm('Reset all records to initial sample data?')) {
                resetToDemoData();
                alert('Workspace reset to default demo data.');
              }
            }}
            className="px-4 py-2 rounded border border-border bg-surface hover:bg-black/5 text-primary text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Initial Demo State</span>
          </button>
        </div>
      </div>
    </div>
  );
};

