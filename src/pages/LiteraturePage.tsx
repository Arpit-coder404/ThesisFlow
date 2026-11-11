import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Star,
  FileText,
  Upload,
  ExternalLink,
  Tag,
  CheckCircle2,
  Clock,
  BookMarked,
  Layers,
  ArrowUpDown,
  Download,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { LiteraturePaper, ReadingStatus } from '../types';

export const LiteraturePage: React.FC = () => {
  const {
    papers,
    collections,
    addPaper,
    deletePaper,
    setReadingStatus,
    addCollection,
    addMatrixRowFromPaper,
  } = useThesisStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'year' | 'relevance' | 'title'>('relevance');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');

  // Form State for new paper
  const [paperForm, setPaperForm] = useState({
    title: '',
    authors: '',
    year: 2024,
    journalOrConference: '',
    doi: '',
    url: '',
    abstract: '',
    researchArea: 'Cybersecurity & Machine Learning',
    publicationType: 'journal' as LiteraturePaper['publicationType'],
    readingStatus: 'unread' as ReadingStatus,
    relevanceRating: 4 as 1 | 2 | 3 | 4 | 5,
    personalNotes: '',
    tags: '',
    collectionId: collections[0]?.id || '',
  });

  const filteredPapers = papers
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q)) ||
        (p.abstract && p.abstract.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCollection =
        selectedCollection === 'all' || p.collectionIds.includes(selectedCollection);

      const matchesStatus =
        selectedStatus === 'all' || p.readingStatus === selectedStatus;

      return matchesSearch && matchesCollection && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'relevance') return b.relevanceRating - a.relevanceRating;
      return a.title.localeCompare(b.title);
    });

  const handleAddPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperForm.title.trim()) return;

    const newId = addPaper({
      projectId: 'proj-001',
      title: paperForm.title,
      authors: paperForm.authors ? paperForm.authors.split(',').map((a) => a.trim()) : ['Unknown Author'],
      year: Number(paperForm.year) || 2024,
      journalOrConference: paperForm.journalOrConference || 'Academic Proceedings',
      doi: paperForm.doi || undefined,
      url: paperForm.url || (paperForm.doi ? `https://doi.org/${paperForm.doi}` : undefined),
      abstract: paperForm.abstract,
      keywords: paperForm.tags ? paperForm.tags.split(',').map((t) => t.trim()) : [],
      researchArea: paperForm.researchArea,
      publicationType: paperForm.publicationType,
      readingStatus: paperForm.readingStatus,
      relevanceRating: paperForm.relevanceRating,
      personalNotes: paperForm.personalNotes,
      pageCount: 12,
      collectionIds: paperForm.collectionId ? [paperForm.collectionId] : [],
      tags: paperForm.tags ? paperForm.tags.split(',').map((t) => t.trim()) : ['Imported'],
    });

    addMatrixRowFromPaper(newId);
    setIsAddModalOpen(false);
    setPaperForm({
      title: '',
      authors: '',
      year: 2024,
      journalOrConference: '',
      doi: '',
      url: '',
      abstract: '',
      researchArea: 'Cybersecurity & Machine Learning',
      publicationType: 'journal',
      readingStatus: 'unread',
      relevanceRating: 4,
      personalNotes: '',
      tags: '',
      collectionId: collections[0]?.id || '',
    });
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    addCollection({
      projectId: 'proj-001',
      name: newCollectionName,
      description: newCollectionDesc,
      color: '#345B46',
    });
    setNewCollectionName('');
    setNewCollectionDesc('');
    setIsNewCollectionModalOpen(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Literature Library
          </h1>
          <p className="text-xs text-secondary mt-1">
            Discover, catalog, annotate, and evaluate research papers with full citation management.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/app/matrix"
            className="px-3.5 py-1.5 border border-border bg-surface hover:bg-surface-subtle text-primary rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <BookMarked className="w-3.5 h-3.5 text-secondary" />
            <span>Open Literature Matrix</span>
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Academic Paper</span>
          </button>
        </div>
      </div>

      {/* Collections Row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-secondary font-mono text-[11px] shrink-0 mr-1">Collections:</span>
        <button
          onClick={() => setSelectedCollection('all')}
          className={`px-3 py-1 rounded-full border transition-colors shrink-0 font-medium ${
            selectedCollection === 'all'
              ? 'bg-forest-500 text-white border-forest-500'
              : 'bg-surface text-secondary border-border hover:bg-surface-subtle'
          }`}
        >
          All Papers ({papers.length})
        </button>
        {collections.map((col) => {
          const count = papers.filter((p) => p.collectionIds.includes(col.id)).length;
          return (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`px-3 py-1 rounded-full border transition-colors shrink-0 font-medium flex items-center space-x-1.5 ${
                selectedCollection === col.id
                  ? 'bg-forest-500 text-white border-forest-500'
                  : 'bg-surface text-secondary border-border hover:bg-surface-subtle'
              }`}
            >
              <span>{col.name}</span>
              <span className="opacity-70 text-[10px]">({count})</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsNewCollectionModalOpen(true)}
          className="px-2.5 py-1 rounded-full border border-dashed border-border text-secondary hover:text-primary text-xs flex items-center space-x-1 shrink-0"
        >
          <Plus className="w-3 h-3" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-surface rounded-xl border border-border p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs shadow-subtle">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by title, author, keyword, DOI..."
            className="w-full pl-9 pr-3 py-1.5 rounded border border-border bg-surface-subtle outline-none text-xs focus:border-forest-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Reading Status Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-secondary text-[11px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-1 rounded border border-border bg-surface text-xs capitalize"
            >
              <option value="all">All Statuses</option>
              <option value="read">Read</option>
              <option value="reading">Reading</option>
              <option value="unread">Unread</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-1.5">
            <span className="text-secondary text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-1 rounded border border-border bg-surface text-xs capitalize"
            >
              <option value="relevance">Highest Relevance</option>
              <option value="year">Newest Year</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          <span className="text-secondary text-[11px] font-mono">
            Showing {filteredPapers.length} of {papers.length}
          </span>
        </div>
      </div>

      {/* Academic Reference Table */}
      <div className="bg-surface rounded-xl border border-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-subtle text-secondary font-mono text-[11px]">
                <th className="py-3 px-4 font-semibold w-12 text-center">Score</th>
                <th className="py-3 px-4 font-semibold w-2/5">Paper Title & Authors</th>
                <th className="py-3 px-4 font-semibold w-1/5">Publication Venue</th>
                <th className="py-3 px-4 font-semibold w-24">Year</th>
                <th className="py-3 px-4 font-semibold w-28">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredPapers.map((paper) => (
                <tr
                  key={paper.id}
                  className="hover:bg-surface-subtle transition-colors group"
                >
                  {/* Relevance Rating */}
                  <td className="py-3.5 px-4 text-center align-top">
                    <div className="inline-flex items-center font-bold font-mono text-terracotta text-xs" title={`${paper.relevanceRating} out of 5 stars`}>
                      ★ {paper.relevanceRating}
                    </div>
                  </td>

                  {/* Title & Authors */}
                  <td className="py-3.5 px-4 align-top space-y-1">
                    <Link
                      to={`/app/literature/paper/${paper.id}`}
                      className="font-semibold text-primary group-hover:text-forest-600 transition-colors block text-xs leading-snug"
                    >
                      {paper.title}
                    </Link>
                    <div className="text-[11px] text-secondary">
                      {paper.authors.join(', ')}
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {paper.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sage-light text-forest-700"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Venue & DOI */}
                  <td className="py-3.5 px-4 align-top text-secondary text-[11px]">
                    <div className="italic font-serif">{paper.journalOrConference}</div>
                    {paper.doi && (
                      <span className="font-mono text-[10px] text-secondary/80 block mt-0.5">
                        doi:{paper.doi}
                      </span>
                    )}
                  </td>

                  {/* Year */}
                  <td className="py-3.5 px-4 align-top font-mono text-primary font-medium text-xs">
                    {paper.year}
                  </td>

                  {/* Reading Status Selector */}
                  <td className="py-3.5 px-4 align-top">
                    <select
                      value={paper.readingStatus}
                      onChange={(e) => setReadingStatus(paper.id, e.target.value as ReadingStatus)}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border outline-none capitalize ${
                        paper.readingStatus === 'read'
                          ? 'bg-sage text-forest-700 border-forest-500/30'
                          : paper.readingStatus === 'reading'
                          ? 'bg-softYellow text-primary border-border'
                          : 'bg-surface text-secondary border-border'
                      }`}
                    >
                      <option value="unread">Unread</option>
                      <option value="reading">Reading</option>
                      <option value="read">Read</option>
                    </select>
                  </td>

                  {/* Action buttons */}
                  <td className="py-3.5 px-4 align-top text-right space-x-2">
                    <Link
                      to={`/app/literature/paper/${paper.id}`}
                      className="px-2.5 py-1 rounded border border-border bg-surface hover:bg-sage-light text-[11px] font-medium text-forest-700 inline-flex items-center space-x-1"
                    >
                      <span>Read & Annotate</span>
                    </Link>
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded text-secondary hover:text-primary inline-block"
                        title="Open external source"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Paper Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-primary">
                Add Academic Paper to Library
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPaper} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Paper Title *</label>
                <input
                  type="text"
                  required
                  value={paperForm.title}
                  onChange={(e) => setFormDataState('title', e.target.value)}
                  placeholder="e.g. Deep Residual Learning for Image Recognition"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Authors (comma-separated)</label>
                  <input
                    type="text"
                    value={paperForm.authors}
                    onChange={(e) => setFormDataState('authors', e.target.value)}
                    placeholder="e.g. He, Kaiming, Zhang, Xiangyu, Ren, Shaoqing"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Publication Year</label>
                  <input
                    type="number"
                    value={paperForm.year}
                    onChange={(e) => setFormDataState('year', e.target.value)}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Journal or Conference</label>
                  <input
                    type="text"
                    value={paperForm.journalOrConference}
                    onChange={(e) => setFormDataState('journalOrConference', e.target.value)}
                    placeholder="e.g. IEEE Transactions on Information Forensics"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Digital Object Identifier (DOI)</label>
                  <input
                    type="text"
                    value={paperForm.doi}
                    onChange={(e) => setFormDataState('doi', e.target.value)}
                    placeholder="e.g. 10.1109/TIFS.2021.3078491"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Abstract</label>
                <textarea
                  value={paperForm.abstract}
                  onChange={(e) => setFormDataState('abstract', e.target.value)}
                  placeholder="Paste or summarize the study abstract..."
                  className="w-full p-2.5 rounded border border-border bg-surface h-20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Relevance Rating</label>
                  <select
                    value={paperForm.relevanceRating}
                    onChange={(e) => setFormDataState('relevanceRating', Number(e.target.value))}
                    className="w-full p-2 rounded border border-border bg-surface"
                  >
                    <option value={5}>★★★★★ (Critical to Thesis)</option>
                    <option value={4}>★★★★☆ (Strong Support)</option>
                    <option value={3}>★★★☆☆ (Background Context)</option>
                    <option value={2}>★★☆☆☆ (Peripheral)</option>
                    <option value={1}>★☆☆☆☆ (Minimal)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Initial Reading Status</label>
                  <select
                    value={paperForm.readingStatus}
                    onChange={(e) => setFormDataState('readingStatus', e.target.value)}
                    className="w-full p-2 rounded border border-border bg-surface capitalize"
                  >
                    <option value="unread">Unread</option>
                    <option value="reading">Reading</option>
                    <option value="read">Read</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Add to Collection</label>
                  <select
                    value={paperForm.collectionId}
                    onChange={(e) => setFormDataState('collectionId', e.target.value)}
                    className="w-full p-2 rounded border border-border bg-surface"
                  >
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Personal Research Note</label>
                <input
                  type="text"
                  value={paperForm.personalNotes}
                  onChange={(e) => setFormDataState('personalNotes', e.target.value)}
                  placeholder="Why is this paper relevant to your thesis methodology or results?"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Catalog Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Collection Modal */}
      {isNewCollectionModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-md p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Create Literature Collection
              </h3>
              <button onClick={() => setIsNewCollectionModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateCollection} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g. Adversarial Robustness & Evasion"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  placeholder="What papers belong in this group?"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>
              <div className="pt-3 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewCollectionModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 text-white rounded text-xs font-semibold"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  function setFormDataState(field: string, val: any) {
    setPaperForm((prev) => ({ ...prev, [field]: val }));
  }
};

