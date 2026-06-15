import React from 'react';
import { BrainCircuit, AlertCircle, TrendingUp, BarChart3, HelpCircle, Activity, Award } from 'lucide-react';

export default function SidebarRight({ memoryInsights }) {
  // Safe extraction of values
  const topPerformers = memoryInsights?.topPerformers || [
    { title: "Video Campaign: 'Productivity Hacks'", views: "5.2K Views", reason: "Viral Reach" },
    { title: "Blog Post: 'SEO Tips'", views: "High Engagement", reason: "High Conversion Rate" }
  ];

  const gaps = memoryInsights?.gaps || [
    { category: "Web Development", severity: "High", recommendation: "Add React framework articles." },
    { category: "Social Strategy", severity: "Medium", recommendation: "Increase organic short video count." }
  ];

  const brandVoice = memoryInsights?.tones || [
    { tone: "formal", avgViews: 28000, count: 3 },
    { tone: "casual", avgViews: 19500, count: 3 },
    { tone: "playful", avgViews: 17200, count: 1 }
  ];

  const auditWarning = memoryInsights?.auditWarning || null;

  // Render score colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    }
  };

  return (
    <aside className="w-80 flex flex-col glass-panel border-l shrink-0">
      
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100 light:text-slate-800">
          <BrainCircuit className="w-5 h-5 text-brandSecondary" />
          Memory Insights
        </h2>
        <p className="text-xs text-slate-400 light:text-slate-500 mt-1">Hindsight context & gap analytics</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* Audit Mode Warnings */}
        {auditWarning && (
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-300 space-y-2 animate-pulse">
            <h4 className="font-bold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Content Audit Alert
            </h4>
            <p>{auditWarning.message}</p>
          </div>
        )}

        {/* Top Performers */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Top Performers
          </h4>
          <div className="space-y-2">
            {topPerformers.map((p, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-lg bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-850 light:border-slate-200 flex justify-between items-center text-xs"
              >
                <div className="flex-1 pr-2">
                  <p className="font-semibold text-slate-200 light:text-slate-800 line-clamp-1">{p.title}</p>
                  <span className="text-[10px] text-slate-400 light:text-slate-500">{p.reason || 'Benchmark'}</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {typeof p.views === 'number' ? `${(p.views / 1000).toFixed(1)}k Views` : p.views}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Voice Adaptation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-brandPrimary" />
            Brand Tone Adaptation
          </h4>
          <div className="p-4 rounded-xl bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-850 light:border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between font-semibold text-slate-300 light:text-slate-700 text-[11px]">
              <span>Tone Strategy</span>
              <span>Avg Reach</span>
            </div>
            
            <div className="space-y-2">
              {brandVoice.map((b, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400 light:text-slate-500">
                    <span className="capitalize">{b.tone} ({b.count} posts)</span>
                    <span className="font-bold text-slate-300 light:text-slate-700">
                      {typeof b.avgViews === 'number' ? `${(b.avgViews / 1000).toFixed(1)}k views` : b.avgViews}
                    </span>
                  </div>
                  {/* Visual progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brandPrimary to-brandSecondary rounded-full" 
                      style={{ width: `${(b.count / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-slate-400 light:text-slate-500 border-t border-slate-800/50 light:border-slate-200 pt-2 italic">
              * Learning active: Agent shifts towards tones yielding higher engagement averages over time.
            </p>
          </div>
        </div>

        {/* Content Gaps */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Content Authority Gaps
          </h4>
          <div className="space-y-2 text-xs">
            {gaps.map((g, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-lg bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-850 light:border-slate-200 space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200 light:text-slate-800">{g.category}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${getSeverityColor(g.severity)}`}>
                    {g.severity} Gap
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 light:text-slate-500 leading-snug">{g.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gamified Strategy Milestones */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-brandSecondary" />
            Strategy Milestones
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2.5 rounded-lg bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-855 light:border-slate-200 flex flex-col items-center text-center">
              <span className="text-lg">🎯</span>
              <span className="font-bold text-slate-200 light:text-slate-800 mt-1">Trend Spotter</span>
              <span className="text-slate-400 light:text-slate-500 scale-90 mt-0.5">Matched high views</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-855 light:border-slate-200 flex flex-col items-center text-center">
              <span className="text-lg">🏆</span>
              <span className="font-bold text-slate-200 light:text-slate-800 mt-1">Consistency Champ</span>
              <span className="text-slate-400 light:text-slate-500 scale-90 mt-0.5">Benchmarked regular logs</span>
            </div>
          </div>
        </div>

        {/* Memory Recall Timeline Graph */}
        <div className="space-y-3 pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-600 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-brandSecondary" />
            Recall Timeline Graph
          </h4>
          <div className="p-4 rounded-xl bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-850 light:border-slate-200 text-[10.5px] space-y-3 relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-slate-800/80 light:bg-slate-200"></div>
            
            <div className="relative flex gap-3 items-start">
              <div className="z-10 w-4.5 h-4.5 rounded-full bg-brandPrimary flex items-center justify-center text-[8px] text-white font-bold ring-4 ring-slate-900/50 light:ring-white">1</div>
              <div className="flex-1">
                <span className="font-bold text-slate-200 light:text-slate-850 block">Input Focus Drafted</span>
                <span className="text-slate-400 light:text-slate-500">Search keywords extracted: SEO, React, email templates.</span>
              </div>
            </div>

            <div className="relative flex gap-3 items-start">
              <div className="z-10 w-4.5 h-4.5 rounded-full bg-brandSecondary flex items-center justify-center text-[8px] text-white font-bold ring-4 ring-slate-900/50 light:ring-white">2</div>
              <div className="flex-1">
                <span className="font-bold text-slate-200 light:text-slate-850 block">Hindsight Query Sparked</span>
                <span className="text-slate-400 light:text-slate-500">Recalls matching history benchmarks, tone averages, and gaps.</span>
              </div>
            </div>

            <div className="relative flex gap-3 items-start">
              <div className="z-10 w-4.5 h-4.5 rounded-full bg-emerald-400 flex items-center justify-center text-[8px] text-white font-bold ring-4 ring-slate-900/50 light:ring-white">3</div>
              <div className="flex-1">
                <span className="font-bold text-slate-200 light:text-slate-850 block">Hindsight Memory Output</span>
                <span className="text-slate-400 light:text-slate-500">Synthesizes historical outcomes with current prompts, ensuring suggestions are never duplicated.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
