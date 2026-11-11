import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Layers,
  Filter,
  User,
  Trash2,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { MilestoneItem, TaskItem, TaskStatus } from '../types';

export const TasksMilestonesPage: React.FC = () => {
  const {
    milestones,
    tasks,
    updateMilestoneStatus,
    addTask,
    updateTaskStatus,
    deleteTask,
  } = useThesisStore();

  const [activeTab, setActiveTab] = useState<'kanban' | 'list' | 'milestones'>('kanban');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    deadline: new Date().toISOString().split('T')[0],
    priority: 'high' as TaskItem['priority'],
    status: 'in_progress' as TaskStatus,
    assignee: 'Aarav Patel',
    tags: '',
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    addTask({
      projectId: 'proj-001',
      title: taskForm.title,
      deadline: taskForm.deadline,
      priority: taskForm.priority,
      status: taskForm.status,
      assignee: taskForm.assignee,
      tags: taskForm.tags ? taskForm.tags.split(',').map((t) => t.trim()) : ['Research'],
    });

    setIsNewTaskModalOpen(false);
    setTaskForm({
      title: '',
      deadline: new Date().toISOString().split('T')[0],
      priority: 'high',
      status: 'in_progress',
      assignee: 'Aarav Patel',
      tags: '',
    });
  };

  const columns: { id: TaskStatus; label: string; count: number }[] = [
    { id: 'not_started', label: 'To Do / Backlog', count: tasks.filter((t) => t.status === 'not_started').length },
    { id: 'in_progress', label: 'In Progress', count: tasks.filter((t) => t.status === 'in_progress').length },
    { id: 'blocked', label: 'Blocked / Under Review', count: tasks.filter((t) => t.status === 'blocked').length },
    { id: 'completed', label: 'Completed', count: tasks.filter((t) => t.status === 'completed').length },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Tasks & Research Milestones
          </h1>
          <p className="text-xs text-secondary mt-1">
            Track dissertation action items across Kanban stages and monitor academic milestone dependencies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View switcher */}
          <div className="flex rounded border border-border p-0.5 bg-surface text-xs font-medium">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'kanban' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'list' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Task List ({tasks.length})
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'milestones' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Milestones ({milestones.length})
            </button>
          </div>

          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* VIEW: KANBAN BOARD */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="bg-sidebar-bg rounded-xl border border-border p-3 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="font-mono text-xs font-bold text-primary uppercase">
                    {col.label}
                  </span>
                  <span className="font-mono text-[11px] text-secondary bg-surface px-1.5 py-0.2 rounded border border-border">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 min-h-[300px]">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 bg-surface rounded-lg border border-border hover:border-forest-500/50 shadow-subtle space-y-2 text-xs transition-all"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                            task.priority === 'urgent'
                              ? 'bg-red-50 text-red-700'
                              : task.priority === 'high'
                              ? 'bg-terracotta/10 text-terracotta'
                              : 'bg-surface-subtle text-secondary'
                          }`}
                        >
                          {task.priority}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-secondary/40 hover:text-terracotta p-0.5"
                          title="Delete task"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <h4 className="font-semibold text-primary leading-snug">
                        {task.title}
                      </h4>

                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-1 py-0.2 rounded bg-surface-subtle text-secondary border border-border/60"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Move status dropdown */}
                      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] text-secondary">
                        <span className="font-mono">Due {task.deadline}</span>
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                          className="bg-surface-subtle border border-border rounded p-0.5 font-medium outline-none text-[10px]"
                        >
                          <option value="not_started">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="blocked">Blocked</option>
                          <option value="completed">Done</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW: TASK LIST */}
      {activeTab === 'list' && (
        <div className="bg-surface rounded-xl border border-border shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-subtle text-secondary font-mono text-[11px]">
                <th className="py-3 px-4 font-semibold w-8"></th>
                <th className="py-3 px-4 font-semibold">Task Title</th>
                <th className="py-3 px-4 font-semibold w-28">Priority</th>
                <th className="py-3 px-4 font-semibold w-32">Deadline</th>
                <th className="py-3 px-4 font-semibold w-32">Assignee</th>
                <th className="py-3 px-4 font-semibold w-32">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-subtle transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() =>
                        updateTaskStatus(
                          task.id,
                          task.status === 'completed' ? 'in_progress' : 'completed'
                        )
                      }
                      className="rounded border-border text-forest-600 focus:ring-forest-500"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-primary">
                    <span className={task.status === 'completed' ? 'line-through text-secondary' : ''}>
                      {task.title}
                    </span>
                    <div className="flex gap-1 mt-1">
                      {task.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-secondary">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono uppercase text-[10px] font-bold">
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        task.priority === 'urgent'
                          ? 'bg-red-50 text-red-700'
                          : task.priority === 'high'
                          ? 'bg-terracotta/10 text-terracotta'
                          : 'bg-surface-subtle text-secondary'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-secondary text-[11px]">{task.deadline}</td>
                  <td className="py-3 px-4 text-secondary text-[11px]">{task.assignee}</td>
                  <td className="py-3 px-4">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                      className="p-1 rounded border border-border bg-surface text-[11px] capitalize"
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="blocked">Blocked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW: MILESTONES TIMELINE */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle text-xs text-secondary leading-relaxed">
            Institutional research milestones required by the faculty examination board. Evidence of completion must be verified by the lead supervisor before final thesis submission.
          </div>

          <div className="space-y-3">
            {milestones.map((ms) => (
              <div
                key={ms.id}
                className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-forest-100 text-forest-700 font-mono font-bold text-xs flex items-center justify-center">
                      {ms.order}
                    </span>
                    <h3 className="font-serif text-base font-bold text-primary">
                      {ms.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-secondary">
                      Deadline: <strong className="text-primary">{ms.deadline}</strong>
                    </span>
                    <select
                      value={ms.status}
                      onChange={(e) => updateMilestoneStatus(ms.id, e.target.value as MilestoneItem['status'])}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border outline-none capitalize ${
                        ms.status === 'completed'
                          ? 'bg-sage text-forest-700 border-forest-500/30'
                          : ms.status === 'in_progress'
                          ? 'bg-softYellow text-primary border-border'
                          : 'bg-surface text-secondary border-border'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-secondary leading-relaxed">{ms.description}</p>

                <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-secondary">
                  <div>
                    Owner: <strong className="text-primary">{ms.owner}</strong> • Related: {ms.relatedChapterTitle || 'General Thesis'}
                  </div>
                  {ms.evidenceOfCompletion && (
                    <div className="text-forest-700 font-medium italic">
                      Evidence: {ms.evidenceOfCompletion}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-md p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Create New Research Task
              </h3>
              <button onClick={() => setIsNewTaskModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Task Description *</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="e.g. Conduct Cyrillic homoglyph stress test"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Deadline</label>
                  <input
                    type="date"
                    required
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                    className="w-full p-2 rounded border border-border bg-surface capitalize"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Initial Status</label>
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value as TaskStatus })}
                    className="w-full p-2 rounded border border-border bg-surface"
                  >
                    <option value="not_started">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="completed">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={taskForm.tags}
                    onChange={(e) => setTaskForm({ ...taskForm, tags: e.target.value })}
                    placeholder="e.g. Experiments, Code"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

