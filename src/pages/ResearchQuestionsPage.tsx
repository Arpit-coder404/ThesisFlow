import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Edit2,
  Trash2,
  Link as LinkIcon,
  BookOpen,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { ResearchQuestion, ResearchObjective } from '../types';

export const ResearchQuestionsPage: React.FC = () => {
  const {
    questions,
    objectives,
    papers,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addObjective,
    updateObjective,
    deleteObjective,
  } = useThesisStore();

  const [activeTab, setActiveTab] = useState<'matrix' | 'canvas'>('matrix');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isObjectiveModalOpen, setIsObjectiveModalOpen] = useState(false);

  const [newQ, setNewQ] = useState({
    code: `RQ${questions.length + 1}`,
    question: '',
    description: '',
    isPrimary: true,
    priority: 'high' as ResearchQuestion['priority'],
  });

  const [newObj, setNewObj] = useState({
    code: `OBJ${objectives.length + 1}`,
    linkedQuestionId: questions[0]?.id || '',
    objective: '',
    methodologyOverview: '',
    status: 'in_progress' as ResearchObjective['status'],
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.question.trim()) return;
    addQuestion({
      projectId: 'proj-001',
      code: newQ.code,
      question: newQ.question,
      description: newQ.description,
      isPrimary: newQ.isPrimary,
      priority: newQ.priority,
    });
    setIsQuestionModalOpen(false);
    setNewQ({
      code: `RQ${questions.length + 2}`,
      question: '',
      description: '',
      isPrimary: true,
      priority: 'high',
    });
  };

  const handleCreateObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObj.objective.trim()) return;
    addObjective({
      projectId: 'proj-001',
      code: newObj.code,
      linkedQuestionId: newObj.linkedQuestionId,
      objective: newObj.objective,
      methodologyOverview: newObj.methodologyOverview,
      status: newObj.status,
      supportingReferenceIds: [],
    });
    setIsObjectiveModalOpen(false);
    setNewObj({
      code: `OBJ${objectives.length + 2}`,
      linkedQuestionId: questions[0]?.id || '',
      objective: '',
      methodologyOverview: '',
      status: 'in_progress',
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Research Questions & Objectives
          </h1>
          <p className="text-xs text-secondary mt-1">
            Formulate research problems, identify gaps, define questions, and verify methodological alignment.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="flex rounded border border-border p-0.5 bg-surface text-xs font-medium">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'matrix' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Alignment Matrix
            </button>
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'canvas' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Relational Canvas
            </button>
          </div>

          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
          <button
            onClick={() => setIsObjectiveModalOpen(true)}
            className="px-3.5 py-1.5 bg-surface hover:bg-surface-subtle text-primary border border-border rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Objective</span>
          </button>
        </div>
      </div>

      {/* Alignment Matrix View */}
      {activeTab === 'matrix' ? (
        <div className="space-y-6">
          {/* Alignment Table */}
          <div className="bg-surface rounded-xl border border-border shadow-subtle overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-surface-subtle flex items-center justify-between">
              <span className="text-xs font-semibold text-primary uppercase font-mono tracking-wider">
                Research Alignment Matrix (RQ → Objective → Method → Status)
              </span>
              <span className="text-[11px] text-secondary font-mono">
                {questions.length} Questions • {objectives.length} Objectives
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface text-secondary font-mono text-[11px]">
                    <th className="py-3 px-4 font-semibold w-16">Code</th>
                    <th className="py-3 px-4 font-semibold w-1/3">Research Question</th>
                    <th className="py-3 px-4 font-semibold w-1/3">Linked Objective</th>
                    <th className="py-3 px-4 font-semibold">Methodology Plan</th>
                    <th className="py-3 px-4 font-semibold w-28">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {questions.map((q) => {
                    const linkedObjs = objectives.filter((o) => o.linkedQuestionId === q.id);
                    return (
                      <React.Fragment key={q.id}>
                        {linkedObjs.length === 0 ? (
                          <tr className="hover:bg-surface-subtle transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-forest-700">{q.code}</td>
                            <td className="py-3 px-4 text-primary font-medium">{q.question}</td>
                            <td className="py-3 px-4 text-secondary italic" colSpan={3}>
                              No objective linked yet. Click 'Add Objective' to connect.
                            </td>
                          </tr>
                        ) : (
                          linkedObjs.map((obj, idx) => (
                            <tr key={obj.id} className="hover:bg-surface-subtle transition-colors">
                              {idx === 0 ? (
                                <>
                                  <td
                                    className="py-3.5 px-4 font-mono font-bold text-forest-700 align-top"
                                    rowSpan={linkedObjs.length}
                                  >
                                    <span className="bg-forest-50 px-2 py-0.5 rounded border border-forest-500/20">
                                      {q.code}
                                    </span>
                                  </td>
                                  <td
                                    className="py-3.5 px-4 text-primary font-medium align-top leading-relaxed"
                                    rowSpan={linkedObjs.length}
                                  >
                                    <div>{q.question}</div>
                                    <div className="text-[11px] text-secondary mt-1">{q.description}</div>
                                  </td>
                                </>
                              ) : null}
                              <td className="py-3 px-4 text-primary align-top leading-relaxed">
                                <div className="font-semibold text-forest-700 font-mono text-[11px] mb-0.5">
                                  {obj.code}
                                </div>
                                {obj.objective}
                              </td>
                              <td className="py-3 px-4 text-secondary align-top leading-relaxed text-[11px]">
                                {obj.methodologyOverview}
                              </td>
                              <td className="py-3 px-4 align-top">
                                <select
                                  value={obj.status}
                                  onChange={(e) =>
                                    updateObjective(obj.id, {
                                      status: e.target.value as ResearchObjective['status'],
                                    })
                                  }
                                  className={`text-[10px] font-semibold px-2 py-1 rounded border outline-none capitalize ${
                                    obj.status === 'completed'
                                      ? 'bg-sage text-forest-700 border-forest-500/30'
                                      : 'bg-softYellow text-primary border-border'
                                  }`}
                                >
                                  <option value="not_started">Not Started</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Relational Research Flow Canvas */
        <div className="bg-surface rounded-xl border border-border p-6 shadow-subtle space-y-8">
          <div className="text-xs text-secondary font-mono uppercase tracking-wider">
            Scientific Inquiry Pipeline: Problem → Gap → Questions → Objectives → Deliverables
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Box 1: Problem */}
            <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-secondary">
                1. Research Problem
              </span>
              <h4 className="font-serif text-sm font-bold text-primary">
                Ephemeral Zero-Day Phishing
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                Blacklist delays leave users exposed for hours. Heavy visual/DOM classifiers take 1.5–4.0s, violating client-side latency constraints.
              </p>
            </div>

            {/* Box 2: Gap */}
            <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-secondary">
                2. Research Gap
              </span>
              <h4 className="font-serif text-sm font-bold text-primary">
                Fast Static Lexical Defense
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                Existing lightweight models degrade severely under adversarial character substitution (homoglyphs) and concept drift on free cloud hosting.
              </p>
            </div>

            {/* Box 3: Questions */}
            <div className="p-4 rounded-lg bg-forest-50/60 border border-forest-500/20 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-forest-700">
                3. Primary Questions (RQ1–RQ3)
              </span>
              <ul className="text-xs text-primary space-y-1.5 leading-snug">
                <li>• Discriminative lexical & Shannon entropy metrics</li>
                <li>• Tree ensemble vs deep neural trade-offs</li>
                <li>• Adversarial homoglyph mitigation</li>
              </ul>
            </div>

            {/* Box 4: Deliverable */}
            <div className="p-4 rounded-lg bg-surface-subtle border border-border space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-secondary">
                4. Validated Outcome
              </span>
              <h4 className="font-serif text-sm font-bold text-forest-700">
                Ensemble Model (96.84%)
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                Sub-15ms client inference, 0.38% false positive rate, and Unicode NFKC normalization defense.
              </p>
            </div>
          </div>

          {/* Research Questions Detailed Cards */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-serif text-lg font-bold text-primary">
              Configured Research Questions ({questions.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-lg border border-border bg-surface-subtle flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-forest-700 bg-sage px-2 py-0.5 rounded">
                        {q.code}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-secondary">
                        {q.priority} priority
                      </span>
                    </div>
                    <div className="font-semibold text-xs text-primary leading-snug">{q.question}</div>
                    <p className="text-[11px] text-secondary">{q.description}</p>
                  </div>
                  <div className="text-[10px] text-forest-600 font-medium pt-2 border-t border-border/60">
                    Linked to {objectives.filter((o) => o.linkedQuestionId === q.id).length} objective(s)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-lg p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Add Research Question
              </h3>
              <button onClick={() => setIsQuestionModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Code</label>
                  <input
                    type="text"
                    required
                    value={newQ.code}
                    onChange={(e) => setNewQ({ ...newQ, code: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Priority</label>
                  <select
                    value={newQ.priority}
                    onChange={(e) => setNewQ({ ...newQ, priority: e.target.value as ResearchQuestion['priority'] })}
                    className="w-full p-2 rounded border border-border bg-surface capitalize"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Research Question *</label>
                <textarea
                  required
                  value={newQ.question}
                  onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                  placeholder="e.g. Which static lexical features provide the strongest discriminative signal...?"
                  className="w-full p-2.5 rounded border border-border bg-surface h-20"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Operational Description / Scope</label>
                <input
                  type="text"
                  value={newQ.description}
                  onChange={(e) => setNewQ({ ...newQ, description: e.target.value })}
                  placeholder="e.g. Focuses on Shannon entropy and token length distributions."
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>
              <div className="pt-3 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Objective Modal */}
      {isObjectiveModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-lg p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Add Research Objective
              </h3>
              <button onClick={() => setIsObjectiveModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateObjective} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Code</label>
                  <input
                    type="text"
                    required
                    value={newObj.code}
                    onChange={(e) => setNewObj({ ...newObj, code: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Linked Question</label>
                  <select
                    value={newObj.linkedQuestionId}
                    onChange={(e) => setNewObj({ ...newObj, linkedQuestionId: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface"
                  >
                    {questions.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.code}: {q.question.slice(0, 35)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Objective Statement *</label>
                <textarea
                  required
                  value={newObj.objective}
                  onChange={(e) => setNewObj({ ...newObj, objective: e.target.value })}
                  placeholder="e.g. Systematically extract and rank 42 static lexical features..."
                  className="w-full p-2.5 rounded border border-border bg-surface h-20"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Methodology Overview</label>
                <input
                  type="text"
                  value={newObj.methodologyOverview}
                  onChange={(e) => setNewObj({ ...newObj, methodologyOverview: e.target.value })}
                  placeholder="e.g. Implemented in Python with Information Gain ranking."
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>
              <div className="pt-3 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsObjectiveModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Objective
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

