import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  FileText,
  Edit3,
  Calendar,
  Layers,
  FlaskConical,
  CheckSquare,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useThesisStore } from '../../store/useThesisStore';

export const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    papers,
    notes,
    chapters,
    experiments,
    tasks,
    setActiveChapter,
  } = useThesisStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedPapers = papers
    .filter((p) => p.title.toLowerCase().includes(q) || p.authors.some((a) => a.toLowerCase().includes(q)))
    .slice(0, 3)
    .map((p) => ({
      type: 'paper' as const,
      id: p.id,
      title: p.title,
      subtitle: `${p.authors[0] || 'Author'} (${p.year}) • ${p.journalOrConference}`,
      path: `/app/literature/paper/${p.id}`,
      icon: BookOpen,
    }));

  const matchedChapters = chapters
    .filter((c) => c.title.toLowerCase().includes(q) || `Chapter ${c.number}`.toLowerCase().includes(q))
    .slice(0, 3)
    .map((c) => ({
      type: 'chapter' as const,
      id: c.id,
      title: `Chapter ${c.number}: ${c.title}`,
      subtitle: `${c.currentWordCount} words • Status: ${c.status}`,
      path: '/app/editor',
      onSelect: () => setActiveChapter(c.id),
      icon: Edit3,
    }));

  const matchedNotes = notes
    .filter((n) => n.title.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q)))
    .slice(0, 3)
    .map((n) => ({
      type: 'note' as const,
      id: n.id,
      title: n.title,
      subtitle: `Tag: ${n.tags.join(', ')} • ${n.type}`,
      path: '/app/notes',
      icon: FileText,
    }));

  const matchedExperiments = experiments
    .filter((e) => e.name.toLowerCase().includes(q) || e.experimentCode.toLowerCase().includes(q))
    .slice(0, 2)
    .map((e) => ({
      type: 'experiment' as const,
      id: e.id,
      title: `${e.experimentCode}: ${e.name}`,
      subtitle: `Accuracy: ${(e.metrics.accuracy * 100).toFixed(1)}% • ${e.algorithm}`,
      path: '/app/experiments',
      icon: FlaskConical,
    }));

  const matchedTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(q))
    .slice(0, 2)
    .map((t) => ({
      type: 'task' as const,
      id: t.id,
      title: t.title,
      subtitle: `Deadline: ${t.deadline} • Priority: ${t.priority}`,
      path: '/app/tasks',
      icon: CheckSquare,
    }));

  // Quick Action commands
  const quickActions = [
    {
      type: 'action' as const,
      id: 'act-note',
      title: 'Create New Research Note',
      subtitle: 'Record reading observation, experiment finding, or supervisor question',
      path: '/app/notes',
      icon: Plus,
    },
    {
      type: 'action' as const,
      id: 'act-paper',
      title: 'Add Academic Paper',
      subtitle: 'Enter DOI, paper metadata, or BibTeX reference',
      path: '/app/literature',
      icon: BookOpen,
    },
    {
      type: 'action' as const,
      id: 'act-editor',
      title: 'Open Thesis Editor',
      subtitle: 'Continue writing and editing dissertation chapters',
      path: '/app/editor',
      icon: Edit3,
    },
    {
      type: 'action' as const,
      id: 'act-matrix',
      title: 'Open Literature Review Matrix',
      subtitle: 'Compare methodology, findings, and limitations across papers',
      path: '/app/matrix',
      icon: Layers,
    },
    {
      type: 'action' as const,
      id: 'act-meeting',
      title: 'Schedule Supervision Meeting',
      subtitle: 'Plan agenda and record discussion decisions',
      path: '/app/meetings',
      icon: Calendar,
    },
  ].filter((a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q));

  const allItems = [...matchedChapters, ...matchedPapers, ...matchedNotes, ...matchedExperiments, ...matchedTasks, ...quickActions];

  const handleSelect = (item: (typeof allItems)[0]) => {
    if ('onSelect' in item && item.onSelect) {
      item.onSelect();
    }
    setCommandPaletteOpen(false);
    navigate(item.path);
  };

  return (
    <div
      className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-start justify-center pt-20 px-4"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-surface rounded-xl shadow-modal border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-secondary mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, chapters, notes, experiments, or jump to actions..."
            className="w-full text-sm bg-transparent outline-none placeholder:text-secondary text-primary"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % (allItems.length || 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + allItems.length) % (allItems.length || 1));
              } else if (e.key === 'Enter' && allItems[selectedIndex]) {
                handleSelect(allItems[selectedIndex]);
              }
            }}
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-secondary border border-border px-1.5 py-0.5 rounded bg-surface-subtle">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/40">
          {allItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-secondary">
              No matching records found for "{query}".
            </div>
          ) : (
            allItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-sage-light text-forest-700' : 'hover:bg-surface-subtle text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className={`p-1.5 rounded ${isSelected ? 'bg-forest-100 text-forest-700' : 'bg-surface-subtle text-secondary'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{item.title}</div>
                      <div className="text-[11px] text-secondary truncate">{item.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-forest-600' : 'text-secondary/40'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-border px-4 py-2 bg-surface-subtle text-[11px] text-secondary flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>ThesisFlow Global Command Center</span>
        </div>
      </div>
    </div>
  );
};

