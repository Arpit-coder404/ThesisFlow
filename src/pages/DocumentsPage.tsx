import React from 'react';
import { FileArchive, Plus, Download, FileText, Lock } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const documents = [
    {
      id: 'doc-01',
      name: 'Faculty Ethical Approval & Privacy Clearance (Signed)',
      category: 'Ethics & Compliance',
      size: '1.4 MB',
      date: '2025-10-15',
      type: 'PDF',
    },
    {
      id: 'doc-02',
      name: 'Approved Initial Research Proposal Specification',
      category: 'Proposal',
      size: '2.8 MB',
      date: '2025-10-20',
      type: 'PDF',
    },
    {
      id: 'doc-03',
      name: 'PhishTank API Usage Agreement & Data Retention Terms',
      category: 'Data Governance',
      size: '420 KB',
      date: '2025-11-02',
      type: 'PDF',
    },
    {
      id: 'doc-04',
      name: 'Level 6 Honours Dissertation Guidelines (Faculty Handbook)',
      category: 'Guidelines',
      size: '3.1 MB',
      date: '2025-09-28',
      type: 'PDF',
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Research Documents & Attachments
          </h1>
          <p className="text-xs text-secondary mt-1">
            Institutional approval forms, ethics statements, and supplementary appendix documents.
          </p>
        </div>

        <button
          onClick={() => alert('Document upload modal available in institutional deployment.')}
          className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500/50 shadow-subtle space-y-3 transition-colors text-xs"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-forest-700 bg-sage px-2 py-0.5 rounded">
                {doc.category}
              </span>
              <span className="font-mono text-secondary text-[11px]">{doc.size}</span>
            </div>
            <h3 className="font-serif text-base font-bold text-primary leading-snug">
              {doc.name}
            </h3>
            <div className="pt-2 border-t border-border flex items-center justify-between text-secondary text-[11px] font-mono">
              <span>Deposited: {doc.date}</span>
              <span className="text-forest-600 font-semibold cursor-pointer hover:underline">
                Download {doc.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

