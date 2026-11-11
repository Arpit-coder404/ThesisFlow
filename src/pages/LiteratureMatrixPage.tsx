import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookMarked,
  Download,
  Filter,
  Plus,
  Search,
  Layers,
  Edit2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { LiteratureMatrixRow } from '../types';

export const LiteratureMatrixPage: React.FC = () => {
  const { matrixRows, papers, updateMatrixRow } = useThesisStore();
  const [activeTab, setActiveTab] = useState<'matrix' | 'synthesis'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCell, setEditingCell] = useState<{ id: string; field: keyof LiteratureMatrixRow } | null>(null);
  const [cellValue, setCellValue] = useState('');

  const filteredRows = matrixRows.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.paperTitle.toLowerCase().includes(q) ||
      r.authorsYear.toLowerCase().includes(q) ||
      r.methodology.toLowerCase().includes(q) ||
      r.researchProblem.toLowerCase().includes(q)
    );
  });

  const handleStartEdit = (row: LiteratureMatrixRow, field: keyof LiteratureMatrixRow) => {
    setEditingCell({ id: row.id, field });
    setCellValue(String(row[field] || ''));
  };

  const handleSaveEdit = () => {
    if (editingCell) {
      updateMatrixRow(editingCell.id, { [editingCell.field]: cellValue });
      setEditingCell(null);
    }
  };

  const exportAsCSV = () => {
    const headers = [
      'Paper',
      'Authors & Year',
      'Research Problem',
      'Methodology',
      'Dataset',
      'Key Findings',
      'Limitations',
      'Research Gap',
      'Relevance to My Work',
    ];

    const csvRows = [
      headers.join(','),
      ...matrixRows.map((r) =>
        [
          `"${r.paperTitle.replace(/"/g, '""')}"`,
          `"${r.authorsYear.replace(/"/g, '""')}"`,
          `"${r.researchProblem.replace(/"/g, '""')}"`,
          `"${r.methodology.replace(/"/g, '""')}"`,
          `"${r.dataset.replace(/"/g, '""')}"`,
          `"${r.keyFindings.replace(/"/g, '""')}"`,
          `"${r.limitations.replace(/"/g, '""')}"`,
          `"${r.researchGap.replace(/"/g, '""')}"`,
          `"${r.relevanceToMyWork.replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Literature_Matrix_ThesisFlow.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Literature Review Matrix
            </h1>
            <span className="text-[10px] font-mono uppercase bg-sage text-forest-700 px-2 py-0.5 rounded border border-forest-500/20 font-semibold">
              Signature Academic Tool
            </span>
          </div>
          <p className="text-xs text-secondary mt-1">
            Systematic comparative synthesis: map methodologies, datasets, findings, and gaps across studies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View switcher */}
          <div className="flex rounded border border-border p-0.5 bg-surface text-xs font-medium">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'matrix' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Matrix Table
            </button>
            <button
              onClick={() => setActiveTab('synthesis')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'synthesis' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Synthesis by Theme
            </button>
          </div>

          <button
            onClick={exportAsCSV}
            className="px-3.5 py-1.5 border border-border bg-surface hover:bg-surface-subtle text-primary rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-secondary" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {activeTab === 'matrix' ? (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter matrix rows..."
              className="w-full pl-9 pr-3 py-1.5 rounded border border-border bg-surface text-xs outline-none focus:border-forest-500"
            />
          </div>

          {/* Matrix Table */}
          <div className="bg-surface rounded-xl border border-border shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[1200px]">
                <thead>
                  <tr className="border-b border-border bg-surface-subtle text-secondary font-mono text-[11px]">
                    <th className="py-3 px-3 font-semibold w-56 sticky left-0 bg-surface-subtle z-10 border-r border-border">
                      Paper & Authors
                    </th>
                    <th className="py-3 px-3 font-semibold w-64">Research Problem</th>
                    <th className="py-3 px-3 font-semibold w-56">Methodology</th>
                    <th className="py-3 px-3 font-semibold w-48">Dataset</th>
                    <th className="py-3 px-3 font-semibold w-64">Key Findings</th>
                    <th className="py-3 px-3 font-semibold w-56">Limitations</th>
                    <th className="py-3 px-3 font-semibold w-56">Research Gap</th>
                    <th className="py-3 px-3 font-semibold w-64">Relevance to My Work</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-subtle/60 transition-colors">
                      {/* Fixed Paper Column */}
                      <td className="py-3 px-3 align-top font-medium text-primary sticky left-0 bg-surface z-10 border-r border-border">
                        <Link
                          to={`/app/literature/paper/${row.paperId}`}
                          className="font-semibold text-xs text-primary hover:text-forest-600 line-clamp-2 leading-snug"
                        >
                          {row.paperTitle}
                        </Link>
                        <div className="text-[10px] text-secondary font-mono mt-1">
                          {row.authorsYear}
                        </div>
                      </td>

                      {/* Editable Cells */}
                      {renderCell(row, 'researchProblem')}
                      {renderCell(row, 'methodology')}
                      {renderCell(row, 'dataset')}
                      {renderCell(row, 'keyFindings')}
                      {renderCell(row, 'limitations')}
                      {renderCell(row, 'researchGap')}
                      {renderCell(row, 'relevanceToMyWork')}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-[11px] text-secondary italic">
            * Click any cell to edit inline. Edits are auto-saved to your project store.
          </div>
        </div>
      ) : (
        /* Synthesis View */
        <div className="space-y-6">
          <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle space-y-2">
            <div className="text-xs font-semibold text-primary flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              <span>Grounded Literature Synthesis</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Synthesized across your saved literature matrix to highlight recurring research paradigms, methodological contrasts, and identified gaps for Chapter 2 write-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Theme 1: Lexical URL Analysis */}
            <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3">
              <div className="font-mono text-[10px] uppercase font-bold text-forest-700 bg-sage px-2 py-0.5 rounded w-fit">
                Methodological Theme 1
              </div>
              <h3 className="font-serif text-base font-bold text-primary">
                Static Lexical & Entropy Features
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Represented by Ma et al. (2021), Marchal et al. (2022), and Chiew et al. (2023). Focuses on sub-millisecond calculation of token lengths, vowel/digit ratios, and Shannon entropy without downloading web assets.
              </p>
              <div className="text-[11px] font-semibold text-primary pt-2 border-t border-border">
                Your Thesis Integration: Adopted for Feature Extractor (Section 3.3).
              </div>
            </div>

            {/* Theme 2: Adversarial Evasion */}
            <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3">
              <div className="font-mono text-[10px] uppercase font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded w-fit">
                Methodological Theme 2
              </div>
              <h3 className="font-serif text-base font-bold text-primary">
                Adversarial Evasion & Homoglyphs
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Represented by Al-Eryani et al. (2024) and Holz et al. (2024). Highlights how attackers bypass static n-gram tokenizers using Cyrillic homoglyphs and ephemeral cloud hosting.
              </p>
              <div className="text-[11px] font-semibold text-primary pt-2 border-t border-border">
                Your Thesis Integration: Explored in RQ3 and Mitigated via Unicode NFKC normalization.
              </div>
            </div>

            {/* Theme 3: Ensemble Stacking */}
            <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3">
              <div className="font-mono text-[10px] uppercase font-bold text-forest-700 bg-sage px-2 py-0.5 rounded w-fit">
                Methodological Theme 3
              </div>
              <h3 className="font-serif text-base font-bold text-primary">
                Ensemble Stacking Meta-Learning
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Represented by Srivastava et al. (2023) and Sahingoz et al. (2023). Demonstrates that stacking tree models achieves higher precision and lower false positive rates (&lt; 0.5%) than single models.
              </p>
              <div className="text-[11px] font-semibold text-primary pt-2 border-t border-border">
                Your Thesis Integration: Implemented in EXP-05 Stacking Classifier (Chapter 4).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderCell(row: LiteratureMatrixRow, field: keyof LiteratureMatrixRow) {
    const isEditing = editingCell?.id === row.id && editingCell?.field === field;
    const value = String(row[field] || '');

    return (
      <td
        className="py-3 px-3 align-top cursor-pointer hover:bg-sage-light/30 transition-colors text-secondary text-[11px]"
        onClick={() => !isEditing && handleStartEdit(row, field)}
      >
        {isEditing ? (
          <div className="space-y-1">
            <textarea
              autoFocus
              value={cellValue}
              onChange={(e) => setCellValue(e.target.value)}
              onBlur={handleSaveEdit}
              className="w-full p-1.5 rounded border border-forest-500 bg-surface text-primary text-xs h-20 outline-none"
            />
            <div className="flex justify-end space-x-1">
              <button
                onClick={handleSaveEdit}
                className="px-2 py-0.5 bg-forest-500 text-white rounded text-[10px]"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="line-clamp-4 leading-relaxed" title={value}>
            {value || <span className="text-secondary/40 italic">Click to edit...</span>}
          </div>
        )}
      </td>
    );
  }
};
