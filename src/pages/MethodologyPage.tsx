import React, { useState } from 'react';
import {
  GitBranch,
  Plus,
  ArrowRight,
  Edit2,
  Trash2,
  CheckCircle2,
  Code,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { MethodologyStep } from '../types';

export const MethodologyPage: React.FC = () => {
  const { methodology, updateMethodology, addMethodologyStep, updateMethodologyStep, deleteMethodologyStep } = useThesisStore();

  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false);
  const [newStep, setNewStep] = useState({
    name: '',
    description: '',
    tools: '',
    input: '',
    output: '',
    linkedQuestionCode: 'RQ1',
  });

  const handleCreateStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStep.name.trim()) return;

    addMethodologyStep({
      order: methodology.steps.length + 1,
      name: newStep.name,
      description: newStep.description,
      tools: newStep.tools ? newStep.tools.split(',').map((t) => t.trim()) : [],
      input: newStep.input,
      output: newStep.output,
      linkedQuestionCode: newStep.linkedQuestionCode,
    });

    setIsAddStepModalOpen(false);
    setNewStep({
      name: '',
      description: '',
      tools: '',
      input: '',
      output: '',
      linkedQuestionCode: 'RQ1',
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Methodology Planner & Pipeline
          </h1>
          <p className="text-xs text-secondary mt-1">
            Design scientific protocols, step-by-step pipeline architectures, validation criteria, and ethical safeguards.
          </p>
        </div>

        <button
          onClick={() => setIsAddStepModalOpen(true)}
          className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Pipeline Step</span>
        </button>
      </div>

      {/* Methodology Overview Card */}
      <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="font-serif text-base font-bold text-primary">
            Research Design Framework
          </span>
          <span className="text-[10px] font-mono uppercase bg-sage text-forest-700 px-2 py-0.5 rounded font-semibold">
            {methodology.researchApproach}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-secondary/70 font-semibold uppercase font-mono text-[10px] block">
              Research Design
            </span>
            <p className="text-primary mt-0.5 leading-relaxed">{methodology.researchDesign}</p>
          </div>
          <div>
            <span className="text-secondary/70 font-semibold uppercase font-mono text-[10px] block">
              Validation Strategy
            </span>
            <p className="text-primary mt-0.5 leading-relaxed">{methodology.validationStrategy}</p>
          </div>
          <div>
            <span className="text-secondary/70 font-semibold uppercase font-mono text-[10px] block">
              Experimental Hardware & Environment
            </span>
            <p className="text-primary mt-0.5 font-mono text-[11px]">{methodology.experimentalSetup}</p>
          </div>
          <div>
            <span className="text-secondary/70 font-semibold uppercase font-mono text-[10px] block">
              Tools & Technologies
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {methodology.toolsAndTech.map((tool, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-subtle border border-border text-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Methodology Pipeline Flowchart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-primary flex items-center space-x-2">
            <GitBranch className="w-4 h-4 text-forest-600" />
            <span>Operational Pipeline Steps ({methodology.steps.length})</span>
          </h2>
          <span className="text-xs text-secondary font-mono">
            Linked to Chapter 3: Research Methodology
          </span>
        </div>

        <div className="space-y-3">
          {methodology.steps.map((step, idx) => (
            <div
              key={step.id}
              className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500/50 shadow-subtle transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-forest-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {step.order}
                  </span>
                  <h3 className="font-serif text-base font-bold text-primary">
                    {step.name}
                  </h3>
                  {step.linkedQuestionCode && (
                    <span className="font-mono text-[10px] bg-forest-50 text-forest-700 px-2 py-0.5 rounded border border-forest-500/20 font-bold">
                      {step.linkedQuestionCode}
                    </span>
                  )}
                </div>

                <p className="text-xs text-secondary leading-relaxed pl-8">
                  {step.description}
                </p>

                {/* Input -> Output Bar */}
                <div className="pl-8 pt-1 flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] font-mono">
                  <div className="p-1.5 rounded bg-surface-subtle border border-border text-secondary truncate">
                    <span className="font-semibold text-primary">Input:</span> {step.input}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-secondary hidden sm:inline shrink-0" />
                  <div className="p-1.5 rounded bg-sage-light border border-sage-border text-forest-700 truncate">
                    <span className="font-semibold">Output:</span> {step.output}
                  </div>
                </div>
              </div>

              {/* Tools & Actions */}
              <div className="pl-8 md:pl-0 flex items-center space-x-2 shrink-0">
                <div className="flex flex-wrap gap-1">
                  {step.tools.map((t, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => deleteMethodologyStep(step.id)}
                  className="p-1 rounded text-secondary hover:text-terracotta"
                  title="Delete step"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ethical Considerations & Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-forest-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical & User Privacy Safeguards</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            {methodology.ethicalConsiderations}
          </p>
        </div>

        <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-terracotta">
            <AlertCircle className="w-4 h-4" />
            <span>Methodological Limitations & Boundaries</span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            {methodology.limitations}
          </p>
        </div>
      </div>

      {/* Add Step Modal */}
      {isAddStepModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-lg p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Add Operational Pipeline Step
              </h3>
              <button onClick={() => setIsAddStepModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateStep} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Step Name *</label>
                <input
                  type="text"
                  required
                  value={newStep.name}
                  onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                  placeholder="e.g. Statistical Shannon Entropy Derivation"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Step Description</label>
                <textarea
                  required
                  value={newStep.description}
                  onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                  placeholder="Explain algorithmic or data transformation details..."
                  className="w-full p-2 rounded border border-border bg-surface h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tools (comma-separated)</label>
                  <input
                    type="text"
                    value={newStep.tools}
                    onChange={(e) => setNewStep({ ...newStep, tools: e.target.value })}
                    placeholder="e.g. Python, Scikit-learn"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Linked Research Question</label>
                  <input
                    type="text"
                    value={newStep.linkedQuestionCode}
                    onChange={(e) => setNewStep({ ...newStep, linkedQuestionCode: e.target.value })}
                    placeholder="RQ1"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Input Artifact</label>
                  <input
                    type="text"
                    value={newStep.input}
                    onChange={(e) => setNewStep({ ...newStep, input: e.target.value })}
                    placeholder="Cleaned URL records"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Output Artifact</label>
                  <input
                    type="text"
                    value={newStep.output}
                    onChange={(e) => setNewStep({ ...newStep, output: e.target.value })}
                    placeholder="42-column feature matrix"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddStepModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

