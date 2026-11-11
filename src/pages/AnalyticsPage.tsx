import React from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  Edit3,
  CheckCircle2,
  Calendar,
  Layers,
  FlaskConical,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useThesisStore } from '../store/useThesisStore';

export const AnalyticsPage: React.FC = () => {
  const { chapters, papers, milestones, tasks, experiments, feedbacks, activities } = useThesisStore();

  // Word count per chapter
  const chapterWordsData = chapters.map((c) => ({
    name: `Ch ${c.number}`,
    title: c.title,
    current: c.currentWordCount,
    target: c.targetWordCount,
  }));

  // Reading status distribution
  const unreadCount = papers.filter((p) => p.readingStatus === 'unread').length;
  const readingCount = papers.filter((p) => p.readingStatus === 'reading').length;
  const readCount = papers.filter((p) => p.readingStatus === 'read').length;

  const readingData = [
    { name: 'Read', value: readCount, color: '#345B46' },
    { name: 'Currently Reading', value: readingCount, color: '#F2E9D1' },
    { name: 'Unread in Library', value: unreadCount, color: '#E5E4DC' },
  ];

  // Milestone completion
  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
  const totalMilestones = milestones.length;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Research Insights & Progress Analytics
        </h1>
        <p className="text-xs text-secondary mt-1">
          Objective metrics calculated directly from active research records, word counts, and experimental benchmarks.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle space-y-1">
          <div className="text-[10px] uppercase text-secondary">Milestone Velocity</div>
          <div className="text-2xl font-bold text-forest-700">
            {completedMilestones}/{totalMilestones}
          </div>
          <div className="text-[11px] text-secondary">
            {Math.round((completedMilestones / totalMilestones) * 100)}% institutional milestones achieved
          </div>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle space-y-1">
          <div className="text-[10px] uppercase text-secondary">Total Written Words</div>
          <div className="text-2xl font-bold text-primary">
            {chapters.reduce((s, c) => s + c.currentWordCount, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-secondary">
            across {chapters.length} structured chapters
          </div>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle space-y-1">
          <div className="text-[10px] uppercase text-secondary">Synthesized Papers</div>
          <div className="text-2xl font-bold text-primary">
            {readCount}/{papers.length}
          </div>
          <div className="text-[11px] text-forest-600 font-semibold">
            100% indexed in matrix
          </div>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-border shadow-subtle space-y-1">
          <div className="text-[10px] uppercase text-secondary">Supervisor Approval</div>
          <div className="text-2xl font-bold text-forest-700">
            {chapters.filter((c) => c.status === 'approved').length} chapters
          </div>
          <div className="text-[11px] text-secondary">
            formally signed off
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Words vs Target Bar Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-primary">
                Chapter Word Count vs Target
              </h3>
              <p className="text-xs text-secondary">
                Monitoring manuscript chapter density against departmental dissertation targets.
              </p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chapterWordsData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E4DC" />
                <XAxis dataKey="name" stroke="#72786F" fontSize={11} />
                <YAxis stroke="#72786F" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E4DC',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="current" name="Current Words" fill="#345B46" />
                <Bar dataKey="target" name="Target Words" fill="#E6ECE5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reading Status Pie Chart (4 Cols) */}
        <div className="lg:col-span-4 p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
          <h3 className="font-serif text-base font-bold text-primary border-b border-border pb-3">
            Literature Reading Status
          </h3>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={readingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {readingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#E5E4DC" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {readingData.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-secondary">{d.name}</span>
                </div>
                <span className="font-mono font-bold text-primary">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

