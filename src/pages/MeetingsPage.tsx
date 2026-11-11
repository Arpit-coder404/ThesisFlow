import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Video,
  Clock,
  UserCheck,
  CheckCircle2,
  FileText,
  Bookmark,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';
import { MeetingItem } from '../types';

export const MeetingsPage: React.FC = () => {
  const { meetings, addMeeting, updateMeeting, notes } = useThesisStore();
  const [activeTab, setActiveTab] = useState<'meetings' | 'journal'>('meetings');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    durationMinutes: 45,
    locationOrLink: 'Huxley Building Room 308 / Zoom',
    agenda: '',
    notes: '',
  });

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingForm.title.trim()) return;

    addMeeting({
      projectId: 'proj-001',
      title: meetingForm.title,
      date: meetingForm.date,
      time: meetingForm.time,
      durationMinutes: Number(meetingForm.durationMinutes) || 45,
      participants: ['Aarav Patel (Student)', 'Dr. Meera Sharma (Supervisor)'],
      agenda: meetingForm.agenda ? meetingForm.agenda.split('\n').filter(Boolean) : ['Progress review'],
      locationOrLink: meetingForm.locationOrLink,
      notes: meetingForm.notes,
      decisions: ['Agreed on draft deadlines.'],
      actionItems: [{ text: 'Submit revised draft by next session', completed: false }],
    });

    setIsModalOpen(false);
    setMeetingForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      durationMinutes: 45,
      locationOrLink: 'Huxley Building Room 308 / Zoom',
      agenda: '',
      notes: '',
    });
  };

  const journalEntries = notes.filter((n) => n.type === 'meeting' || n.type === 'finding' || n.type === 'experiment');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Supervision Meetings & Research Journal
          </h1>
          <p className="text-xs text-secondary mt-1">
            Maintain formal records of supervisory discussions, agreed decisions, and chronological scientific logs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View switcher */}
          <div className="flex rounded border border-border p-0.5 bg-surface text-xs font-medium">
            <button
              onClick={() => setActiveTab('meetings')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'meetings' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Supervision Meetings ({meetings.length})
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'journal' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Research Journal ({journalEntries.length})
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* MEETINGS VIEW */}
      {activeTab === 'meetings' && (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase bg-sage text-forest-700 font-semibold px-2 py-0.5 rounded">
                    Supervision Record
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary pt-1">
                    {meeting.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-secondary text-right">
                  <div className="font-bold text-primary">{meeting.date} at {meeting.time}</div>
                  <div>Duration: {meeting.durationMinutes} mins • {meeting.locationOrLink}</div>
                </div>
              </div>

              {/* Participants */}
              <div className="text-xs text-secondary flex items-center space-x-2">
                <UserCheck className="w-3.5 h-3.5 text-forest-600" />
                <span>Participants: <strong className="text-primary">{meeting.participants.join('; ')}</strong></span>
              </div>

              {/* Agenda */}
              {meeting.agenda && meeting.agenda.length > 0 && (
                <div className="p-3 bg-surface-subtle border border-border rounded-lg text-xs space-y-1">
                  <div className="font-semibold text-secondary text-[11px] font-mono uppercase">
                    Agreed Agenda
                  </div>
                  <ul className="space-y-1 text-primary">
                    {meeting.agenda.map((ag, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                        <span>{ag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notes & Decisions */}
              {meeting.notes && (
                <div className="text-xs text-primary leading-relaxed font-serif p-3 bg-surface border border-border/80 rounded-lg">
                  <span className="font-sans font-semibold text-secondary text-[10px] uppercase font-mono block mb-1">
                    Meeting Discussion Notes:
                  </span>
                  {meeting.notes}
                </div>
              )}

              {/* Action Items */}
              {meeting.actionItems && meeting.actionItems.length > 0 && (
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-secondary text-[11px] font-mono uppercase block">
                    Action Items:
                  </span>
                  <div className="space-y-1">
                    {meeting.actionItems.map((act, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-2 p-2 rounded bg-surface-subtle border border-border/60"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${act.completed ? 'text-forest-600' : 'text-secondary/40'}`}
                        />
                        <span className={act.completed ? 'line-through text-secondary' : 'text-primary'}>
                          {act.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* RESEARCH JOURNAL VIEW */}
      {activeTab === 'journal' && (
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-xl border border-border text-xs text-secondary leading-relaxed">
            A chronological timeline of milestones, experiment observations, and technical findings to prepare progress reports and supervisor updates.
          </div>

          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-secondary text-[11px]">
                  <span className="font-mono uppercase bg-surface-subtle px-2 py-0.5 rounded border border-border font-semibold">
                    {entry.type}
                  </span>
                  <span className="font-mono">{entry.date}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-primary">
                  {entry.title}
                </h3>
                <p className="text-primary leading-relaxed whitespace-pre-wrap font-sans">
                  {entry.content}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {entry.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sage-light text-forest-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-lg p-6 space-y-4">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Schedule Supervision Meeting
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateMeeting} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Meeting Objective / Title *</label>
                <input
                  type="text"
                  required
                  value={meetingForm.title}
                  onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })}
                  placeholder="e.g. Chapter 4 Results & Discussion Review"
                  className="w-full p-2.5 rounded border border-border bg-surface text-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={meetingForm.date}
                    onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={meetingForm.time}
                    onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={meetingForm.durationMinutes}
                    onChange={(e) => setMeetingForm({ ...meetingForm, durationMinutes: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Location or Video Link</label>
                <input
                  type="text"
                  value={meetingForm.locationOrLink}
                  onChange={(e) => setMeetingForm({ ...meetingForm, locationOrLink: e.target.value })}
                  placeholder="Huxley Building Room 308 or Zoom URL"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Agenda Items (one per line)</label>
                <textarea
                  value={meetingForm.agenda}
                  onChange={(e) => setMeetingForm({ ...meetingForm, agenda: e.target.value })}
                  placeholder="1. Review empirical tables\n2. Discuss adversarial homoglyphs\n3. Pre-defense check"
                  className="w-full p-2 rounded border border-border bg-surface h-20"
                />
              </div>

              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Confirm Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

