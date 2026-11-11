import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DownloadCloud,
  Printer,
  FileText,
  Code,
  Quote,
  Eye,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { formatBibliographyEntry } from '../lib/citations';

export const ThesisExportPage: React.FC = () => {
  const { chapters, references, citationStyle, projects, activeProjectId, currentUser } = useThesisStore();
  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const [includeCover, setIncludeCover] = useState(true);
  const [includeAbstract, setIncludeAbstract] = useState(true);
  const [includeBib, setIncludeBib] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'md' | 'bib' | 'html'>('pdf');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    let md = `# ${currentProject.title}\n\n`;
    md += `**Author:** ${currentUser.name}\n`;
    md += `**Department:** ${currentProject.department}\n`;
    md += `**Supervisor:** ${currentProject.supervisorName}\n`;
    md += `**Date:** ${new Date().toLocaleDateString()}\n\n`;

    if (includeAbstract) {
      md += `## Abstract\n\n${currentProject.abstract}\n\n---\n\n`;
    }

    chapters.forEach((ch) => {
      md += `\n\n# Chapter ${ch.number}: ${ch.title}\n\n`;
      // Convert HTML tags to plain markdown approximation
      const plainText = ch.content
        .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
        .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
        .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
        .replace(/<[^>]+>/g, '');
      md += plainText;
    });

    if (includeBib) {
      md += `\n\n# References\n\n`;
      references.forEach((ref, idx) => {
        md += `${formatBibliographyEntry(ref, citationStyle, idx + 1)}\n\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentProject.title.replace(/\s+/g, '_')}_Thesis.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadHTML = () => {
    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${currentProject.title}</title>`;
    html += `<style>body{font-family:'Times New Roman',serif;line-height:1.6;max-width:800px;margin:40px auto;color:#111;}h1{page-break-before:always;}table{border-collapse:collapse;width:100%;margin:16px 0;}th,td{border:1px solid #ccc;padding:8px;}</style></head><body>`;

    if (includeCover) {
      html += `<div style="text-align:center;padding:100px 0;"><h1>${currentProject.title}</h1><h3>${currentUser.name}</h3><p>${currentProject.department}<br>${currentUser.institution}<br>Supervisor: ${currentProject.supervisorName}</p></div>`;
    }

    chapters.forEach((ch) => {
      html += `<div>${ch.content}</div>`;
    });

    html += `</body></html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentProject.title.replace(/\s+/g, '_')}_Manuscript.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Thesis Export & Print Engine
          </h1>
          <p className="text-xs text-secondary mt-1">
            Generate compliant print-ready PDFs, Word-compatible HTML, Markdown archives, and BibTeX bibliographies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* PDF Option */}
        <div
          onClick={handlePrint}
          className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500 cursor-pointer shadow-subtle space-y-2 transition-all group"
        >
          <div className="w-8 h-8 rounded bg-forest-50 border border-forest-500/20 text-forest-700 flex items-center justify-center">
            <Printer className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-primary group-hover:text-forest-600">
            Print-Ready PDF
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Standard 1.5 line height, 1-inch margins, page numbers, and embedded APA/IEEE in-text citations.
          </p>
        </div>

        {/* Markdown Option */}
        <div
          onClick={handleDownloadMarkdown}
          className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500 cursor-pointer shadow-subtle space-y-2 transition-all group"
        >
          <div className="w-8 h-8 rounded bg-surface-subtle border border-border text-secondary flex items-center justify-center">
            <Code className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-primary group-hover:text-forest-600">
            Markdown Bundle (.md)
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Clean plain text markdown archive compatible with Obsidian, GitHub, and academic text repositories.
          </p>
        </div>

        {/* HTML / Word Option */}
        <div
          onClick={handleDownloadHTML}
          className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500 cursor-pointer shadow-subtle space-y-2 transition-all group"
        >
          <div className="w-8 h-8 rounded bg-surface-subtle border border-border text-secondary flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-primary group-hover:text-forest-600">
            Word DOCX-Ready HTML
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Styled HTML structure directly importable into Microsoft Word, LibreOffice, and Google Docs.
          </p>
        </div>

        {/* BibTeX Option */}
        <Link
          to="/app/references"
          className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500 cursor-pointer shadow-subtle space-y-2 transition-all group block"
        >
          <div className="w-8 h-8 rounded bg-sage text-forest-700 flex items-center justify-center">
            <Quote className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-base font-bold text-primary group-hover:text-forest-600">
            BibTeX Bibliography (.bib)
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            All 12 verified references exported for Overleaf or LaTeX compilation.
          </p>
        </Link>
      </div>

      {/* Manuscript Print Preview Box */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-primary flex items-center space-x-2">
            <Eye className="w-4 h-4 text-forest-600" />
            <span>Compiled Thesis Print Preview</span>
          </span>
          <span className="text-xs text-secondary font-mono">
            {chapters.length} chapters compiled • {references.length} references
          </span>
        </div>

        {/* Paper Surface */}
        <div
          id="print-section"
          className="bg-surface rounded-xl border border-border shadow-academic p-8 md:p-16 max-w-4xl mx-auto space-y-12 font-editor text-sm leading-relaxed text-primary"
        >
          {/* Institutional Cover Page */}
          {includeCover && (
            <div className="text-center py-16 border-b border-border space-y-4 select-none">
              <div className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                Imperial College London • Department of Computing
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary max-w-2xl mx-auto leading-tight pt-4">
                {currentProject.title}
              </h1>
              <div className="font-sans text-sm font-semibold text-primary pt-6">
                Candidate: {currentUser.name} (CID: 02149832)
              </div>
              <div className="font-sans text-xs text-secondary space-y-1">
                <div>Primary Supervisor: {currentProject.supervisorName}</div>
                <div>Submitted in partial fulfilment of the requirements for the degree of</div>
                <div className="font-semibold text-primary">{currentProject.program}</div>
                <div className="font-mono pt-4">Submission Date: {currentProject.expectedSubmissionDate}</div>
              </div>
            </div>
          )}

          {/* Abstract */}
          {includeAbstract && (
            <div className="space-y-3 border-b border-border pb-10">
              <h2 className="font-serif text-xl font-bold text-primary text-center">Abstract</h2>
              <p className="text-justify font-sans text-xs leading-relaxed max-w-2xl mx-auto text-primary/90 italic">
                {currentProject.abstract}
              </p>
            </div>
          )}

          {/* Compiled Chapters */}
          {chapters.map((ch) => (
            <div key={ch.id} className="space-y-4 border-b border-border pb-10">
              <div className="prose prose-stone max-w-none text-xs sm:text-sm">
                <div dangerouslySetInnerHTML={{ __html: ch.content }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
