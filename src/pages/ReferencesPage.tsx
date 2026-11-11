import React, { useState } from 'react';
import {
  Quote,
  Plus,
  Upload,
  Download,
  Search,
  AlertTriangle,
  Copy,
  Check,
  FileText,
  Trash2,
  Edit2,
  ExternalLink,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { CitationStyleType, ReferenceItem } from '../types';
import {
  formatBibliographyEntry,
  formatInTextCitation,
  generateBibtex,
  validateReferences,
} from '../lib/citations';

export const ReferencesPage: React.FC = () => {
  const {
    references,
    citationStyle,
    setCitationStyle,
    addReference,
    deleteReference,
    importBibtexText,
  } = useThesisStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [rawBibtex, setRawBibtex] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Manual Reference form
  const [manualForm, setManualForm] = useState({
    title: '',
    authors: '',
    year: 2024,
    citationKey: '',
    entryType: 'article' as ReferenceItem['entryType'],
    journal: '',
    doi: '',
    url: '',
    volume: '',
    issue: '',
    pages: '',
  });

  const warnings = validateReferences(references);

  const filteredReferences = references.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.authors.some((a) => a.toLowerCase().includes(q)) ||
      r.citationKey.toLowerCase().includes(q) ||
      (r.journal && r.journal.toLowerCase().includes(q))
    );
  });

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.title.trim()) return;

    const key =
      manualForm.citationKey ||
      `${manualForm.authors.split(' ')[0]?.toLowerCase() || 'ref'}${manualForm.year}`;

    const newRefData: Omit<ReferenceItem, 'id' | 'addedAt'> = {
      projectId: 'proj-001',
      citationKey: key,
      entryType: manualForm.entryType,
      title: manualForm.title,
      authors: manualForm.authors ? manualForm.authors.split(',').map((a) => a.trim()) : ['Unknown Author'],
      year: Number(manualForm.year) || 2024,
      journal: manualForm.journal,
      doi: manualForm.doi,
      url: manualForm.url,
      volume: manualForm.volume,
      issue: manualForm.issue,
      pages: manualForm.pages,
      bibtex: `@${manualForm.entryType}{${key},\n  title = {${manualForm.title}},\n  author = {${manualForm.authors}},\n  year = {${manualForm.year}}\n}`,
    };

    addReference(newRefData);
    setIsAddModalOpen(false);
    setManualForm({
      title: '',
      authors: '',
      year: 2024,
      citationKey: '',
      entryType: 'article',
      journal: '',
      doi: '',
      url: '',
      volume: '',
      issue: '',
      pages: '',
    });
  };

  const handleImportBibtex = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawBibtex.trim()) return;
    const count = importBibtexText(rawBibtex);
    alert(`Successfully parsed and imported ${count} references.`);
    setRawBibtex('');
    setIsImportModalOpen(false);
  };

  const handleExportAllBibtex = () => {
    const fullBib = references.map((r) => r.bibtex || generateBibtex(r)).join('\n\n');
    const blob = new Blob([fullBib], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'references.bib');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            References & Citation Manager
          </h1>
          <p className="text-xs text-secondary mt-1">
            Format academic bibliographies, import/export BibTeX, and validate citation metadata for defense readiness.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3 py-1.5 border border-border bg-surface hover:bg-surface-subtle text-primary rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-secondary" />
            <span>Import BibTeX</span>
          </button>
          <button
            onClick={handleExportAllBibtex}
            className="px-3 py-1.5 border border-border bg-surface hover:bg-surface-subtle text-primary rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-secondary" />
            <span>Export .bib</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reference</span>
          </button>
        </div>
      </div>

      {/* Style Selector Toolbar */}
      <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-primary font-mono uppercase text-[11px]">
            Citation Format:
          </span>
          <div className="flex rounded border border-border p-0.5 bg-surface-subtle">
            {(['apa', 'ieee', 'mla', 'chicago', 'harvard'] as CitationStyleType[]).map((style) => (
              <button
                key={style}
                onClick={() => setCitationStyle(style)}
                className={`px-3 py-1 rounded uppercase font-mono text-[11px] font-bold transition-colors ${
                  citationStyle === style
                    ? 'bg-forest-500 text-white shadow-subtle'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citation keys or titles..."
            className="w-full pl-9 pr-3 py-1.5 rounded border border-border bg-surface-subtle text-xs outline-none"
          />
        </div>
      </div>

      {/* Validation Warnings (if any) */}
      {warnings.length > 0 && (
        <div className="p-4 rounded-xl border border-terracotta/30 bg-terracotta/5 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-terracotta font-semibold font-mono text-[11px]">
            <AlertTriangle className="w-4 h-4" />
            <span>Citation Integrity Alerts ({warnings.length} items require inspection)</span>
          </div>
          <div className="space-y-1">
            {warnings.slice(0, 3).map((w, idx) => (
              <div key={idx} className="text-secondary text-[11px]">
                • <strong className="text-primary">{w.referenceTitle}</strong>: Missing {w.missingFields.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formatted References List */}
      <div className="space-y-3">
        {filteredReferences.map((ref, idx) => {
          const formatted = formatBibliographyEntry(ref, citationStyle, idx + 1);
          const inText = formatInTextCitation(ref, citationStyle, idx + 1);
          return (
            <div
              key={ref.id}
              className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500/50 shadow-subtle transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-forest-700 bg-sage px-2 py-0.5 rounded">
                    [{ref.citationKey}]
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-surface-subtle px-1.5 py-0.5 rounded border border-border text-secondary">
                    {ref.entryType}
                  </span>
                  <span className="text-[10px] text-secondary font-mono">
                    In-text: <strong className="text-primary">{inText}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(formatted);
                      setCopiedKey(ref.id);
                      setTimeout(() => setCopiedKey(null), 2000);
                    }}
                    className="p-1 rounded text-secondary hover:text-primary flex items-center space-x-1 text-[11px]"
                    title="Copy formatted bibliography text"
                  >
                    {copiedKey === ref.id ? <Check className="w-3.5 h-3.5 text-forest-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === ref.id ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => deleteReference(ref.id)}
                    className="p-1 rounded text-secondary hover:text-terracotta"
                    title="Delete reference"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Formatted Citation Rendering */}
              <div className="font-serif text-sm text-primary leading-relaxed pl-3 border-l-2 border-forest-500/30">
                {formatted}
              </div>

              {/* BibTeX toggle preview */}
              <div className="pt-2 text-[10px] font-mono text-secondary flex items-center justify-between">
                <span>{ref.doi ? `DOI: ${ref.doi}` : ref.url ? `URL: ${ref.url}` : 'Manual Entry'}</span>
                <span>Added: {ref.addedAt}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Import BibTeX Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-xl p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Import BibTeX References
              </h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleImportBibtex} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">
                  Paste BibTeX Entries (@article, @inproceedings, @book...)
                </label>
                <textarea
                  required
                  value={rawBibtex}
                  onChange={(e) => setRawBibtex(e.target.value)}
                  placeholder={`@article{sharma2024,\n  title = {Phishing URL Detection},\n  author = {Sharma, Meera},\n  year = {2024}\n}`}
                  className="w-full p-2.5 rounded border border-border bg-surface font-mono text-xs h-44 outline-none focus:border-forest-500"
                />
              </div>
              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Parse & Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Add Reference Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Add Reference Record
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleManualAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={manualForm.title}
                  onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                  placeholder="e.g. Deep Residual Learning for Image Recognition"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Authors (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={manualForm.authors}
                    onChange={(e) => setManualForm({ ...manualForm, authors: e.target.value })}
                    placeholder="e.g. He, Kaiming, Zhang, Xiangyu"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={manualForm.year}
                    onChange={(e) => setManualForm({ ...manualForm, year: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Citation Key</label>
                  <input
                    type="text"
                    value={manualForm.citationKey}
                    onChange={(e) => setManualForm({ ...manualForm, citationKey: e.target.value })}
                    placeholder="e.g. he2016deep"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Entry Type</label>
                  <select
                    value={manualForm.entryType}
                    onChange={(e) => setManualForm({ ...manualForm, entryType: e.target.value as any })}
                    className="w-full p-2 rounded border border-border bg-surface capitalize"
                  >
                    <option value="article">Journal Article</option>
                    <option value="inproceedings">Conference Paper</option>
                    <option value="book">Book</option>
                    <option value="techreport">Technical Report</option>
                    <option value="misc">Web / Misc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Journal or Booktitle</label>
                <input
                  type="text"
                  value={manualForm.journal}
                  onChange={(e) => setManualForm({ ...manualForm, journal: e.target.value })}
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">DOI</label>
                  <input
                    type="text"
                    value={manualForm.doi}
                    onChange={(e) => setManualForm({ ...manualForm, doi: e.target.value })}
                    placeholder="10.1109/..."
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">URL</label>
                  <input
                    type="text"
                    value={manualForm.url}
                    onChange={(e) => setManualForm({ ...manualForm, url: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Reference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

