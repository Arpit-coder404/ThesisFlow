import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const CalendarPage: React.FC = () => {
  const { milestones, meetings, tasks } = useThesisStore();
  const [currentMonth, setCurrentMonth] = useState('April 2026');

  // Unified calendar events list
  const events = [
    ...meetings.map((m) => ({
      id: m.id,
      title: `Meeting: ${m.title}`,
      date: m.date,
      type: 'meeting' as const,
      time: m.time,
      location: m.locationOrLink,
    })),
    ...milestones.map((ms) => ({
      id: ms.id,
      title: `Milestone: ${ms.title}`,
      date: ms.deadline,
      type: 'milestone' as const,
      status: ms.status,
    })),
    ...tasks.map((t) => ({
      id: t.id,
      title: `Task: ${t.title}`,
      date: t.deadline,
      type: 'task' as const,
      priority: t.priority,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Academic Calendar & Target Dates
          </h1>
          <p className="text-xs text-secondary mt-1">
            Institutional deadlines, scheduled supervisor meetings, milestones, and writing targets.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="font-bold text-primary px-3 py-1 bg-surface border border-border rounded">
            {currentMonth}
          </span>
        </div>
      </div>

      {/* Main Schedule Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Schedule (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-xs font-semibold text-primary font-mono uppercase tracking-wider">
            Chronological Academic Schedule (2026)
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-surface rounded-xl border border-border hover:border-forest-500/50 shadow-subtle flex items-start justify-between gap-3 text-xs transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        event.type === 'meeting'
                          ? 'bg-purple-50 text-purple-700'
                          : event.type === 'milestone'
                          ? 'bg-sage text-forest-700'
                          : 'bg-surface-subtle text-secondary border border-border'
                      }`}
                    >
                      {event.type}
                    </span>
                    <h3 className="font-semibold text-primary">{event.title}</h3>
                  </div>

                  {'location' in event && event.location && (
                    <div className="text-[11px] text-secondary pl-2 border-l border-border">
                      {event.time} • {event.location}
                    </div>
                  )}
                </div>

                <div className="text-right font-mono text-[11px] font-bold text-primary shrink-0">
                  {event.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Deadlines Sidebar */}
        <div className="space-y-4">
          <div className="text-xs font-semibold text-primary font-mono uppercase tracking-wider">
            Critical Institutional Deadlines
          </div>

          <div className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-forest-700 font-bold">
                Level 6 Honours Dissertation
              </span>
              <div className="font-serif text-lg font-bold text-primary">
                Final Thesis Submission
              </div>
              <div className="text-secondary font-mono text-xs">
                May 15, 2026 • 23:59 GMT
              </div>
              <p className="text-[11px] text-secondary mt-1">
                Must include signed declaration form, Turnitin similarity report, and electronic PDF archive.
              </p>
            </div>

            <div className="pt-3 border-t border-border space-y-1">
              <div className="font-semibold text-primary">Pre-Submission Supervisor Sign-off</div>
              <div className="text-secondary font-mono text-[11px]">April 30, 2026</div>
            </div>

            <div className="pt-3 border-t border-border space-y-1">
              <div className="font-semibold text-primary">Oral Defense / Viva Examination</div>
              <div className="text-secondary font-mono text-[11px]">June 01–June 05, 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

