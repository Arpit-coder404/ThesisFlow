import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Calendar,
  User,
  CheckCircle2,
  Lock,
  Globe,
  Building,
  ArrowRight,
  Edit2,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { ProjectType, ResearchProject } from '../types';

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    activeProjectId,
    setActiveProject,
    addProject,
    updateProject,
  } = useThesisStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    area: '',
    department: 'Department of Computing',
    program: 'Undergraduate Honours Dissertation',
    type: 'undergraduate' as ProjectType,
    status: 'in_progress' as ResearchProject['status'],
    supervisorId: 'usr-supervisor-01',
    supervisorName: 'Dr. Meera Sharma',
    coResearchers: '',
    startDate: new Date().toISOString().split('T')[0],
    expectedSubmissionDate: '2026-06-30',
    abstract: '',
    keywords: '',
    visibility: 'department' as ResearchProject['visibility'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addProject({
      title: formData.title,
      area: formData.area || 'Applied Computing',
      department: formData.department,
      program: formData.program,
      type: formData.type,
      status: formData.status,
      supervisorId: formData.supervisorId,
      supervisorName: formData.supervisorName,
      coResearchers: formData.coResearchers ? formData.coResearchers.split(',').map((s) => s.trim()) : [],
      startDate: formData.startDate,
      expectedSubmissionDate: formData.expectedSubmissionDate,
      abstract: formData.abstract,
      keywords: formData.keywords ? formData.keywords.split(',').map((s) => s.trim()) : [],
      visibility: formData.visibility,
    });

    setIsModalOpen(false);
    setFormData({
      title: '',
      area: '',
      department: 'Department of Computing',
      program: 'Undergraduate Honours Dissertation',
      type: 'undergraduate',
      status: 'in_progress',
      supervisorId: 'usr-supervisor-01',
      supervisorName: 'Dr. Meera Sharma',
      coResearchers: '',
      startDate: new Date().toISOString().split('T')[0],
      expectedSubmissionDate: '2026-06-30',
      abstract: '',
      keywords: '',
      visibility: 'department',
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Research Projects
          </h1>
          <p className="text-xs text-secondary mt-1">
            Manage your academic dissertations, doctoral theses, and research initiatives.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Research Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => {
          const isActive = proj.id === activeProjectId;
          return (
            <div
              key={proj.id}
              className={`p-5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-surface border-forest-500 shadow-academic ring-1 ring-forest-500/20'
                  : 'bg-surface border-border hover:border-forest-500/50 shadow-subtle'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-subtle border border-border text-secondary font-semibold">
                  {proj.type.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-1 text-[11px] text-secondary">
                  {proj.visibility === 'private' && <Lock className="w-3 h-3 text-secondary" />}
                  {proj.visibility === 'department' && <Building className="w-3 h-3 text-secondary" />}
                  {proj.visibility === 'public' && <Globe className="w-3 h-3 text-forest-600" />}
                  <span className="capitalize">{proj.visibility}</span>
                </div>
              </div>

              <h3 className="font-serif text-lg font-bold text-primary mt-3 leading-snug">
                {proj.title}
              </h3>
              <p className="text-xs text-secondary mt-1 line-clamp-2">
                {proj.abstract || 'No abstract provided.'}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1 mt-3">
                {proj.keywords.slice(0, 4).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage-light text-forest-700"
                  >
                    #{kw}
                  </span>
                ))}
              </div>

              {/* Details & Metadata */}
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2 text-[11px] text-secondary">
                <div>
                  <span className="text-secondary/70 block">Supervisor:</span>
                  <span className="font-medium text-primary">{proj.supervisorName}</span>
                </div>
                <div>
                  <span className="text-secondary/70 block">Submission Deadline:</span>
                  <span className="font-mono text-primary font-medium">{proj.expectedSubmissionDate}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-4 pt-3 flex items-center justify-between">
                {isActive ? (
                  <span className="text-xs font-semibold text-forest-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Workspace</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveProject(proj.id)}
                    className="text-xs font-semibold text-primary hover:text-forest-600 flex items-center space-x-1"
                  >
                    <span>Switch to this project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                <span className="text-[10px] text-secondary font-mono">
                  Started: {proj.startDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-primary">
                Create New Research Project
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-secondary hover:text-primary text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-primary mb-1">Research Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Machine Learning-Based Detection of Phishing Websites"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary outline-none focus:border-forest-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-primary mb-1">Research Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. Cybersecurity & Applied ML"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-primary mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-primary mb-1">Academic Program</label>
                  <input
                    type="text"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="e.g. Undergraduate Honours Dissertation"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-primary mb-1">Research Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ProjectType })}
                    className="w-full p-2 rounded border border-border bg-surface"
                  >
                    <option value="undergraduate">Undergraduate thesis</option>
                    <option value="masters">Master's thesis</option>
                    <option value="doctoral">Doctoral research</option>
                    <option value="paper">Research paper</option>
                    <option value="capstone">Capstone project</option>
                    <option value="independent">Independent research</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-primary mb-1">Supervisor Name</label>
                  <input
                    type="text"
                    value={formData.supervisorName}
                    onChange={(e) => setFormData({ ...formData, supervisorName: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-primary mb-1">Expected Submission Date</label>
                  <input
                    type="date"
                    value={formData.expectedSubmissionDate}
                    onChange={(e) => setFormData({ ...formData, expectedSubmissionDate: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-primary mb-1">Research Abstract</label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Summarize the core problem statement, methods, and expected contributions..."
                  className="w-full p-2.5 rounded border border-border bg-surface h-24"
                />
              </div>

              <div>
                <label className="block font-semibold text-primary mb-1">Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="e.g. Phishing Detection, Lexical URL Analysis, Supervised Learning"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border rounded text-xs font-medium text-secondary hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

