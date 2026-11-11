import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  Layers,
  CheckSquare,
  Calendar,
  HelpCircle,
  BookOpen,
  FileText,
  GitBranch,
  FlaskConical,
  Edit3,
  ListOrdered,
  Quote,
  FileArchive,
  MessageSquare,
  Users,
  Video,
  ClipboardCheck,
  DownloadCloud,
  Archive,
  Settings,
  RotateCcw,
  BookMarked,
  Sparkles,
} from 'lucide-react';
import { useThesisStore } from '../../store/useThesisStore';

export const Sidebar: React.FC = () => {
  const { currentUser, resetToDemoData } = useThesisStore();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
      isActive
        ? 'bg-sage text-forest-700 font-semibold'
        : 'text-primary/80 hover:text-primary hover:bg-black/[0.04]'
    }`;

  return (
    <aside className="w-64 bg-sidebar-bg border-r border-border h-screen flex flex-col justify-between shrink-0 select-none overflow-hidden">
      {/* Top: Logo & Branding */}
      <div>
        <div className="h-14 border-b border-border px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-7 h-7 rounded bg-forest-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-subtle group-hover:bg-forest-600 transition-colors">
              TF
            </div>
            <div>
              <div className="font-serif font-bold text-sm tracking-tight text-primary">ThesisFlow</div>
              <div className="text-[10px] text-secondary tracking-normal -mt-0.5">Academic Workspace</div>
            </div>
          </Link>
          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border border-border bg-surface text-secondary">
            v1.0
          </span>
        </div>

        {/* Scrollable Navigation */}
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* MY WORKSPACE */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary/80 font-medium">
              My Workspace
            </div>
            <nav className="space-y-0.5">
              <NavLink to="/app/overview" className={navLinkClass}>
                <Compass className="w-3.5 h-3.5 text-secondary" />
                <span>Overview</span>
              </NavLink>
              <NavLink to="/app/projects" className={navLinkClass}>
                <Layers className="w-3.5 h-3.5 text-secondary" />
                <span>My Research</span>
              </NavLink>
              <NavLink to="/app/tasks" className={navLinkClass}>
                <CheckSquare className="w-3.5 h-3.5 text-secondary" />
                <span>Tasks & Milestones</span>
              </NavLink>
              <NavLink to="/app/calendar" className={navLinkClass}>
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                <span>Academic Calendar</span>
              </NavLink>
            </nav>
          </div>

          {/* RESEARCH */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary/80 font-medium">
              Research
            </div>
            <nav className="space-y-0.5">
              <NavLink to="/app/research-questions" className={navLinkClass}>
                <HelpCircle className="w-3.5 h-3.5 text-secondary" />
                <span>Research Questions</span>
              </NavLink>
              <NavLink to="/app/literature" className={navLinkClass}>
                <BookOpen className="w-3.5 h-3.5 text-secondary" />
                <span>Literature Library</span>
              </NavLink>
              <NavLink to="/app/matrix" className={navLinkClass}>
                <BookMarked className="w-3.5 h-3.5 text-secondary" />
                <span>Literature Matrix</span>
              </NavLink>
              <NavLink to="/app/notes" className={navLinkClass}>
                <FileText className="w-3.5 h-3.5 text-secondary" />
                <span>Research Notes</span>
              </NavLink>
              <NavLink to="/app/methodology" className={navLinkClass}>
                <GitBranch className="w-3.5 h-3.5 text-secondary" />
                <span>Methodology</span>
              </NavLink>
              <NavLink to="/app/experiments" className={navLinkClass}>
                <FlaskConical className="w-3.5 h-3.5 text-secondary" />
                <span>Experiments & Data</span>
              </NavLink>
            </nav>
          </div>

          {/* WRITING */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary/80 font-medium">
              Writing
            </div>
            <nav className="space-y-0.5">
              <NavLink to="/app/editor" className={navLinkClass}>
                <Edit3 className="w-3.5 h-3.5 text-forest-500" />
                <span className="text-forest-700 font-semibold">Thesis Editor</span>
              </NavLink>
              <NavLink to="/app/chapters" className={navLinkClass}>
                <ListOrdered className="w-3.5 h-3.5 text-secondary" />
                <span>Chapters</span>
              </NavLink>
              <NavLink to="/app/references" className={navLinkClass}>
                <Quote className="w-3.5 h-3.5 text-secondary" />
                <span>References & Citations</span>
              </NavLink>
              <NavLink to="/app/documents" className={navLinkClass}>
                <FileArchive className="w-3.5 h-3.5 text-secondary" />
                <span>Documents</span>
              </NavLink>
            </nav>
          </div>

          {/* COLLABORATION */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary/80 font-medium">
              Collaboration
            </div>
            <nav className="space-y-0.5">
              <NavLink to="/app/feedback" className={navLinkClass}>
                <MessageSquare className="w-3.5 h-3.5 text-secondary" />
                <span>Supervisor Feedback</span>
              </NavLink>
              <NavLink to="/app/meetings" className={navLinkClass}>
                <Video className="w-3.5 h-3.5 text-secondary" />
                <span>Meetings & Journal</span>
              </NavLink>
              <NavLink to="/app/team" className={navLinkClass}>
                <Users className="w-3.5 h-3.5 text-secondary" />
                <span>Team Workspace</span>
              </NavLink>
            </nav>
          </div>

          {/* FINALIZATION */}
          <div>
            <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary/80 font-medium">
              Finalization
            </div>
            <nav className="space-y-0.5">
              <NavLink to="/app/checklist" className={navLinkClass}>
                <ClipboardCheck className="w-3.5 h-3.5 text-secondary" />
                <span>Submission Checklist</span>
              </NavLink>
              <NavLink to="/app/export" className={navLinkClass}>
                <DownloadCloud className="w-3.5 h-3.5 text-secondary" />
                <span>Thesis Export</span>
              </NavLink>
              <NavLink to="/app/archive" className={navLinkClass}>
                <Archive className="w-3.5 h-3.5 text-secondary" />
                <span>Research Archive</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="border-t border-border p-3 bg-sidebar-bg space-y-2">
        <div className="flex items-center justify-between text-xs px-2 text-secondary">
          <Link to="/app/help" className="hover:text-primary flex items-center space-x-1">
            <HelpCircle className="w-3 h-3" />
            <span>Help & Guides</span>
          </Link>
          <button
            onClick={() => {
              if (window.confirm('Reset workspace to clean demo project state?')) {
                resetToDemoData();
              }
            }}
            className="hover:text-primary flex items-center space-x-1 text-[11px]"
            title="Reset to default demo data"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-surface/80 border border-border">
          <div className="w-7 h-7 rounded-full bg-forest-100 border border-forest-500/20 text-forest-700 font-medium text-xs flex items-center justify-center shrink-0">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="truncate flex-1">
            <div className="text-xs font-semibold text-primary truncate leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-secondary capitalize truncate">
              {currentUser.role} • {currentUser.institution}
            </div>
          </div>
          <Link
            to="/app/settings"
            className="text-secondary hover:text-primary p-1 rounded hover:bg-black/5"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

