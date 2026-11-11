import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { CommandPalette } from '../components/common/CommandPalette';
import { ResearchAssistantModal } from '../components/ai/ResearchAssistantModal';

export const AppLayout: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-primary font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-background">
        <Header onOpenAssistant={() => setIsAssistantOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette />

      {/* Ethical AI Assistant Modal */}
      <ResearchAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

