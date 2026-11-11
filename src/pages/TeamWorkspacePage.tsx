import React from 'react';
import { Users, Plus, ShieldCheck, Mail, Building } from 'lucide-react';
import { useThesisStore } from '../store/useThesisStore';

export const TeamWorkspacePage: React.FC = () => {
  const { allUsers, currentUser } = useThesisStore();

  const team = [
    {
      name: 'Aarav Patel',
      role: 'Lead Student Researcher',
      email: 'a.patel22@imperial.ac.uk',
      dept: 'Department of Computing',
      access: 'Full Workspace Author',
    },
    {
      name: 'Dr. Meera Sharma',
      role: 'Primary Academic Supervisor',
      email: 'm.sharma@imperial.ac.uk',
      dept: 'Department of Computing',
      access: 'Reviewer & Approver',
    },
    {
      name: 'Prof. Robert Vance',
      role: 'Director of Postgraduate Studies & Registry',
      email: 'r.vance@imperial.ac.uk',
      dept: 'Faculty of Engineering',
      access: 'Institutional Oversight',
    },
    {
      name: 'Elena Rostova',
      role: 'Collaborating Researcher / Lab Peer',
      email: 'e.rostova23@imperial.ac.uk',
      dept: 'Cyber-Physical Systems Lab',
      access: 'Read & Comment Only',
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Research Team & Collaborators
          </h1>
          <p className="text-xs text-secondary mt-1">
            Supervisory committee members, co-authors, lab peers, and external examination roles.
          </p>
        </div>

        <button
          onClick={() => alert('Invite collaborator modal available in institutional setup.')}
          className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="space-y-3">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="p-5 bg-surface rounded-xl border border-border hover:border-forest-500/50 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-forest-100 border border-forest-500/20 text-forest-700 font-bold flex items-center justify-center font-serif text-sm">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-primary text-sm">{member.name}</h3>
                <div className="text-secondary text-[11px]">{member.role}</div>
                <div className="text-secondary/70 font-mono text-[10px] mt-0.5">{member.email}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-t sm:border-t-0 border-border pt-3 sm:pt-0 text-[11px] font-mono">
              <span className="text-secondary">{member.dept}</span>
              <span className="px-2 py-0.5 rounded bg-sage text-forest-700 font-semibold">
                {member.access}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

