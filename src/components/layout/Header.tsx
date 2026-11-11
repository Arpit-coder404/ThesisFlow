import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Plus,
  BookOpen,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useThesisStore } from '../../store/useThesisStore';
import { Role } from '../../types';

interface HeaderProps {
  onOpenAssistant?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAssistant }) => {
  const location = useLocation();
  const {
    currentUser,
    allUsers,
    setUserRole,
    projects,
    activeProjectId,
    setActiveProject,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    toggleCommandPalette,
  } = useThesisStore();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const unreadNotifications = notifications.filter((n) => !n.read);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app/overview') return 'Research Overview';
    if (path === '/app/projects') return 'Research Projects';
    if (path === '/app/research-questions') return 'Research Questions & Objectives';
    if (path === '/app/literature') return 'Literature Library';
    if (path.startsWith('/app/literature/paper/')) return 'Paper Reader & Annotations';
    if (path === '/app/matrix') return 'Literature Review Matrix';
    if (path === '/app/notes') return 'Research Notes';
    if (path === '/app/editor') return 'Thesis Editor';
    if (path === '/app/chapters') return 'Thesis Chapters';
    if (path === '/app/references') return 'References & Citations';
    if (path === '/app/methodology') return 'Methodology Planner';
    if (path === '/app/experiments') return 'Experiments & Datasets';
    if (path === '/app/feedback') return 'Supervisor Collaboration';
    if (path === '/app/meetings') return 'Supervision Meetings & Journal';
    if (path === '/app/tasks') return 'Tasks & Milestones';
    if (path === '/app/calendar') return 'Academic Calendar';
    if (path === '/app/checklist') return 'Submission Readiness';
    if (path === '/app/export') return 'Thesis Export';
    if (path === '/app/analytics') return 'Research Analytics';
    if (path === '/app/help') return 'Guides & Academic Integrity';
    if (path === '/app/settings') return 'Workspace Settings';
    return 'ThesisFlow Workspace';
  };

  return (
    <header className="h-14 border-b border-border bg-surface px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Active Project & Breadcrumb */}
      <div className="flex items-center space-x-3">
        {/* Project Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center space-x-2 text-xs font-medium px-2.5 py-1.5 rounded border border-border bg-surface-subtle hover:bg-sage-light text-primary transition-colors max-w-[240px] truncate"
            title={activeProject?.title}
          >
            <span className="w-2 h-2 rounded-full bg-forest-500 shrink-0" />
            <span className="truncate font-semibold">{activeProject?.title || 'Select Project'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-secondary shrink-0" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-72 bg-surface rounded-lg shadow-academic border border-border py-1.5 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-secondary uppercase tracking-wider border-b border-border">
                Switch Research Project
              </div>
              <div className="max-h-60 overflow-y-auto">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveProject(proj.id);
                      setIsProjectDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-sage-light flex flex-col transition-colors ${
                      proj.id === activeProjectId ? 'bg-sage/40 font-medium' : ''
                    }`}
                  >
                    <span className="text-primary truncate">{proj.title}</span>
                    <span className="text-[10px] text-secondary mt-0.5">{proj.program}</span>
                  </button>
                ))}
              </div>
              <div className="border-t border-border mt-1 pt-1 px-2">
                <Link
                  to="/app/projects"
                  onClick={() => setIsProjectDropdownOpen(false)}
                  className="w-full flex items-center space-x-1.5 text-xs text-forest-600 hover:text-forest-700 py-1 px-2 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Project...</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <span className="text-secondary/50 hidden sm:inline">/</span>
        <h1 className="text-xs font-medium text-secondary hidden sm:inline-block">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Global Search Bar (Trigger for Command Palette) */}
        <button
          onClick={toggleCommandPalette}
          className="flex items-center space-x-2 text-xs text-secondary bg-surface-subtle hover:bg-sage-light border border-border px-2.5 py-1.5 rounded transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-secondary" />
          <span className="hidden md:inline">Quick search or command...</span>
          <span className="hidden md:inline font-mono text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border">
            ⌘K
          </span>
        </button>

        {/* AI Research Assistant (Ethical & Grounded) */}
        {onOpenAssistant && (
          <button
            onClick={onOpenAssistant}
            className="flex items-center space-x-1.5 text-xs font-medium text-forest-600 bg-forest-50 hover:bg-forest-100 border border-forest-500/20 px-2.5 py-1.5 rounded transition-colors"
            title="Ethical Academic Assistant (Grounded in your literature)"
          >
            <Sparkles className="w-3.5 h-3.5 text-forest-500" />
            <span className="hidden lg:inline">Research Assistant</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-subtle transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-terracotta" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-surface rounded-lg shadow-academic border border-border py-2 z-50">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Notifications</span>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-forest-600 hover:text-forest-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-border/60">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-secondary">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markNotificationRead(item.id)}
                      className={`p-3 text-xs hover:bg-surface-subtle transition-colors cursor-pointer ${
                        !item.read ? 'bg-sage-light/60 font-medium' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-primary text-xs font-semibold">{item.title}</span>
                        <span className="text-[10px] text-secondary">
                          {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-secondary mt-1">{item.message}</p>
                      {item.link && (
                        <Link
                          to={item.link}
                          onClick={() => setIsNotificationsOpen(false)}
                          className="inline-flex items-center text-[10px] text-forest-600 font-medium mt-1.5 hover:underline"
                        >
                          <span>View record</span>
                          <ExternalLink className="w-2.5 h-2.5 ml-1" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Demo Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1.5 rounded border border-border bg-surface hover:bg-surface-subtle text-primary transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-forest-500" />
            <span className="capitalize hidden md:inline">Role: {currentUser.role}</span>
            <span className="font-semibold">{currentUser.name.split(' ')[0]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-secondary" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-64 bg-surface rounded-lg shadow-academic border border-border py-1.5 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-secondary uppercase tracking-wider border-b border-border">
                Demo Role Switcher
              </div>
              <div className="p-1.5 space-y-1">
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setUserRole(u.role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-xs hover:bg-sage-light transition-colors flex items-center justify-between ${
                      currentUser.id === u.id ? 'bg-sage font-medium text-forest-700' : 'text-primary'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-[10px] text-secondary capitalize">{u.role} — {u.department}</div>
                    </div>
                    {currentUser.id === u.id && (
                      <CheckCircle2 className="w-4 h-4 text-forest-600" />
                    )}
                  </button>
                ))}
              </div>
              <div className="px-3 py-1.5 border-t border-border text-[10px] text-secondary bg-surface-subtle">
                Switch roles instantly to inspect student submissions and supervisor reviews.
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

