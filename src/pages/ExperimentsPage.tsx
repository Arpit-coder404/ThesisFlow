import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  TrendingUp,
  Award,
  Layers,
  Database,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Zap,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useThesisStore } from '../store/useThesisStore';
import { ExperimentRun } from '../types';

export const ExperimentsPage: React.FC = () => {
  const {
    experiments,
    datasets,
    addExperiment,
    setBestPerformingExperiment,
    addDataset,
  } = useThesisStore();

  const [activeTab, setActiveTab] = useState<'experiments' | 'datasets' | 'comparison'>('experiments');
  const [isNewExpModalOpen, setIsNewExpModalOpen] = useState(false);
  const [isNewDatasetModalOpen, setIsNewDatasetModalOpen] = useState(false);

  // Chart data preparation
  const chartData = experiments.map((exp) => ({
    name: exp.experimentCode,
    fullName: exp.name,
    Accuracy: Number((exp.metrics.accuracy * 100).toFixed(1)),
    Precision: Number((exp.metrics.precision * 100).toFixed(1)),
    Recall: Number((exp.metrics.recall * 100).toFixed(1)),
    F1: Number((exp.metrics.f1 * 100).toFixed(1)),
    Latency: exp.metrics.latencyMs,
  }));

  const bestExp = experiments.find((e) => e.isBestPerforming) || experiments[0];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Experiments & Dataset Registry
          </h1>
          <p className="text-xs text-secondary mt-1">
            Empirical benchmarking across model architectures, hyperparameter configurations, and inference latency budgets.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View switcher */}
          <div className="flex rounded border border-border p-0.5 bg-surface text-xs font-medium">
            <button
              onClick={() => setActiveTab('experiments')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'experiments' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Experiments ({experiments.length})
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'comparison' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Metric Benchmark
            </button>
            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'datasets' ? 'bg-sage text-forest-700 font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              Datasets ({datasets.length})
            </button>
          </div>

          <button
            onClick={() => setIsNewExpModalOpen(true)}
            className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Run</span>
          </button>
        </div>
      </div>

      {/* Best Model Contribution Callout Banner */}
      {bestExp && (
        <div className="p-5 rounded-xl border border-forest-500/30 bg-forest-50/60 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-forest-600" />
              <span className="font-mono text-xs uppercase font-bold text-forest-700">
                Primary Proposed Contribution Model
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">
              {bestExp.experimentCode}: {bestExp.name}
            </h3>
            <p className="text-xs text-secondary">
              Algorithm: <span className="font-semibold text-primary">{bestExp.algorithm}</span> • Environment: {bestExp.environment}
            </p>
          </div>

          <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-6 text-xs font-mono shrink-0">
            <div>
              <div className="text-[10px] text-secondary">Accuracy</div>
              <div className="text-xl font-bold text-forest-700">{(bestExp.metrics.accuracy * 100).toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-secondary">False Positives</div>
              <div className="text-xl font-bold text-primary">{(bestExp.metrics.fpr * 100).toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-secondary">Latency</div>
              <div className="text-xl font-bold text-primary">{bestExp.metrics.latencyMs} ms</div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: EXPERIMENTS LIST */}
      {activeTab === 'experiments' && (
        <div className="space-y-4">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className={`p-5 rounded-xl border transition-all ${
                exp.isBestPerforming
                  ? 'bg-surface border-forest-500 ring-1 ring-forest-500/20 shadow-academic'
                  : 'bg-surface border-border hover:border-forest-500/50 shadow-subtle'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-forest-700 bg-sage px-2 py-0.5 rounded">
                      {exp.experimentCode}
                    </span>
                    <h3 className="font-serif text-base font-bold text-primary">
                      {exp.name}
                    </h3>
                    {exp.isBestPerforming ? (
                      <span className="text-[10px] font-mono text-forest-700 bg-forest-100 font-semibold px-2 py-0.5 rounded">
                        ★ Best Run
                      </span>
                    ) : (
                      <button
                        onClick={() => setBestPerformingExperiment(exp.id)}
                        className="text-[10px] text-secondary hover:text-forest-600 font-medium underline"
                      >
                        Set as best
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-secondary leading-relaxed">
                    {exp.objective}
                  </p>
                  <div className="text-[11px] text-secondary font-mono flex items-center space-x-3 pt-1">
                    <span>Algorithm: <strong className="text-primary">{exp.algorithm}</strong></span>
                    <span>Dataset: {exp.datasetVersion}</span>
                    <span>RQ: {exp.relatedQuestionCode}</span>
                  </div>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono shrink-0 pt-2 md:pt-0">
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <div className="text-[9px] text-secondary">Accuracy</div>
                    <div className="font-bold text-primary">{(exp.metrics.accuracy * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <div className="text-[9px] text-secondary">Precision</div>
                    <div className="font-bold text-primary">{(exp.metrics.precision * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <div className="text-[9px] text-secondary">F1 Score</div>
                    <div className="font-bold text-forest-700">{(exp.metrics.f1 * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <div className="text-[9px] text-secondary">Latency</div>
                    <div className="font-bold text-primary">{exp.metrics.latencyMs}ms</div>
                  </div>
                </div>
              </div>

              {/* Observations & Chapter Link */}
              <div className="mt-4 pt-3 border-t border-border/60 text-xs text-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="italic">"{exp.observations}"</div>
                <div className="text-[11px] font-mono text-forest-700 font-medium shrink-0">
                  Target: Chapter 4 Results & Analysis
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: COMPARISON RECHARTS */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="p-6 bg-surface rounded-xl border border-border shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-primary">
                  Empirical Model Comparison (Accuracy, Precision, Recall, F1)
                </h3>
                <p className="text-xs text-secondary">
                  Evaluated on verified corpus of 88,647 URL records with 5-fold stratified cross-validation.
                </p>
              </div>
              <span className="text-[10px] font-mono text-secondary">
                Metrics scaled in percentage (%)
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E4DC" />
                  <XAxis dataKey="name" stroke="#72786F" fontSize={11} />
                  <YAxis domain={[80, 100]} stroke="#72786F" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E4DC',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Accuracy" fill="#345B46" />
                  <Bar dataKey="Precision" fill="#B96D50" />
                  <Bar dataKey="Recall" fill="#72786F" />
                  <Bar dataKey="F1" fill="#20392C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latency vs Accuracy Tradeoff Table */}
          <div className="bg-surface rounded-xl border border-border shadow-subtle p-5 space-y-3">
            <h4 className="font-serif text-sm font-bold text-primary">
              Latency vs Accuracy Operational Trade-Off Table
            </h4>
            <div className="overflow-x-auto text-xs font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-secondary text-[11px]">
                    <th className="py-2 px-3">Model</th>
                    <th className="py-2 px-3">Accuracy</th>
                    <th className="py-2 px-3">FPR (%)</th>
                    <th className="py-2 px-3">Inference Latency</th>
                    <th className="py-2 px-3">Deployment Feasibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {experiments.map((e) => (
                    <tr key={e.id}>
                      <td className="py-2.5 px-3 font-bold text-primary">{e.name}</td>
                      <td className="py-2.5 px-3 text-forest-700">{(e.metrics.accuracy * 100).toFixed(2)}%</td>
                      <td className="py-2.5 px-3">{(e.metrics.fpr * 100).toFixed(2)}%</td>
                      <td className="py-2.5 px-3 font-bold">{e.metrics.latencyMs} ms</td>
                      <td className="py-2.5 px-3 text-[11px] font-sans">
                        {e.metrics.latencyMs < 15 ? '✓ Suitable for browser defense' : '⚠ High latency overhead'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DATASET REGISTRY */}
      {activeTab === 'datasets' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsNewDatasetModalOpen(true)}
              className="px-3.5 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold shadow-subtle flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Dataset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {datasets.map((ds) => (
              <div
                key={ds.id}
                className="p-5 bg-surface rounded-xl border border-border shadow-subtle space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase bg-sage text-forest-700 font-bold px-2 py-0.5 rounded">
                    v{ds.version} • {ds.format}
                  </span>
                  <span className="text-[11px] font-mono text-secondary">{ds.size}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-primary leading-snug">
                  {ds.name}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {ds.description}
                </p>

                <div className="pt-3 border-t border-border grid grid-cols-2 gap-2 text-[11px] text-secondary">
                  <div>
                    <span className="text-secondary/70 block">Source:</span>
                    <span className="font-medium text-primary truncate block">{ds.source}</span>
                  </div>
                  <div>
                    <span className="text-secondary/70 block">Records:</span>
                    <span className="font-mono font-bold text-primary">
                      {ds.rowCount?.toLocaleString() || 'N/A'} rows
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary/70 block">License:</span>
                    <span className="text-primary truncate block">{ds.license}</span>
                  </div>
                  <div>
                    <span className="text-secondary/70 block">Harvest Date:</span>
                    <span className="font-mono text-primary">{ds.collectionDate}</span>
                  </div>
                </div>

                {ds.accessUrl && (
                  <div className="pt-2">
                    <a
                      href={ds.accessUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-forest-600 hover:underline flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>University Data Repository Archive</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Run Modal */}
      {isNewExpModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-modal w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-primary">
                Log Experiment Run
              </h3>
              <button onClick={() => setIsNewExpModalOpen(false)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                addExperiment({
                  projectId: 'proj-001',
                  experimentCode: `EXP-0${experiments.length + 1}`,
                  name: form.expName.value,
                  objective: form.objective.value,
                  relatedQuestionCode: 'RQ2',
                  datasetVersion: 'v2.4 (88,647 records)',
                  method: form.method.value,
                  algorithm: form.algorithm.value,
                  configuration: { depth: 8 },
                  environment: 'Python 3.11, Ryzen 9',
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: new Date().toISOString().split('T')[0],
                  metrics: {
                    accuracy: Number(form.accuracy.value) / 100,
                    precision: Number(form.precision.value) / 100,
                    recall: Number(form.recall.value) / 100,
                    f1: Number(form.f1.value) / 100,
                    fpr: 0.005,
                    rocAuc: 0.985,
                    latencyMs: Number(form.latency.value),
                  },
                  observations: form.observations.value,
                  conclusion: 'Logged via ThesisFlow workspace.',
                  isBestPerforming: false,
                  linkedChapterId: 'chap-04',
                });
                setIsNewExpModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Experiment Name *</label>
                <input
                  name="expName"
                  required
                  placeholder="e.g. CatBoost with GBDT Optimization"
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Algorithm</label>
                  <input
                    name="algorithm"
                    required
                    placeholder="CatBoostClassifier"
                    className="w-full p-2 rounded border border-border bg-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Method Paradigm</label>
                  <input
                    name="method"
                    defaultValue="Gradient Boosting"
                    className="w-full p-2 rounded border border-border bg-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Objective</label>
                <input
                  name="objective"
                  required
                  placeholder="Test CatBoost symmetric tree depth on URL features..."
                  className="w-full p-2 rounded border border-border bg-surface"
                />
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div>
                  <label className="block font-semibold text-[10px] mb-1">Accuracy (%)</label>
                  <input
                    name="accuracy"
                    type="number"
                    step="0.01"
                    defaultValue="96.20"
                    className="w-full p-1.5 rounded border border-border bg-surface font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[10px] mb-1">Precision (%)</label>
                  <input
                    name="precision"
                    type="number"
                    step="0.01"
                    defaultValue="96.50"
                    className="w-full p-1.5 rounded border border-border bg-surface font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[10px] mb-1">Recall (%)</label>
                  <input
                    name="recall"
                    type="number"
                    step="0.01"
                    defaultValue="95.80"
                    className="w-full p-1.5 rounded border border-border bg-surface font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[10px] mb-1">F1 (%)</label>
                  <input
                    name="f1"
                    type="number"
                    step="0.01"
                    defaultValue="96.15"
                    className="w-full p-1.5 rounded border border-border bg-surface font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[10px] mb-1">Latency (ms)</label>
                  <input
                    name="latency"
                    type="number"
                    step="0.1"
                    defaultValue="10.5"
                    className="w-full p-1.5 rounded border border-border bg-surface font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Observations & Insights</label>
                <textarea
                  name="observations"
                  placeholder="How did this run behave compared to baseline Random Forest?"
                  className="w-full p-2 rounded border border-border bg-surface h-16"
                />
              </div>

              <div className="pt-2 border-t border-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewExpModalOpen(false)}
                  className="px-3 py-1.5 border border-border rounded text-xs text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-forest-500 hover:bg-forest-600 text-white rounded text-xs font-semibold"
                >
                  Save Run
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

