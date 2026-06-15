import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BrainCircuit, ShieldAlert, Sparkles, HelpCircle, FileText, Calendar, Check, AlertCircle, RefreshCw, BarChart2, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function Features() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [demoMode, setDemoMode] = useState('memory'); // 'generic' or 'memory'

  // Features data
  const coreFeatures = [
    {
      id: "memory",
      title: "Memory Recall",
      tagline: "Eliminates AI memory loss.",
      description: "Automatically recalls past post context and metrics from your Hindsight database. The agent references historical campaigns to build topic chains rather than repeating the same core concepts.",
      metricMock: "100% Context Retention",
      chartType: "line"
    },
    {
      id: "audit",
      title: "Duplication Audit",
      tagline: "Prevents repetitive content fatigue.",
      description: "Scans draft copy against your historical catalog in real-time. Highlights duplicate phrasing, tags, and conceptual overlaps, alerting you before you publish redundant materials.",
      metricMock: "0% Content Fatigue",
      chartType: "bar"
    },
    {
      id: "gap",
      title: "Gap Detector",
      tagline: "Ensures balanced topic authority.",
      description: "Performs semantic analysis across your catalog to uncover under-covered niches. Flags gaps in your tech, design, or strategy topics and suggests pilot articles to build authority.",
      metricMock: "5 Authority Pillars Scanned",
      chartType: "line"
    },
    {
      id: "tone",
      title: "Tone Optimizer",
      tagline: "Learns what style drives clicks.",
      description: "Monitors historical CTR and views across casual, formal, and playful drafts. Recommends copywriting adjustments dynamically based on what tone performed best in each channel.",
      metricMock: "2.4x CTR Improvement",
      chartType: "bar"
    },
    {
      id: "growth",
      title: "Cross-Channel Growth",
      tagline: "Repurposes ideas across channels.",
      description: "Links blog, email, and social clip analytics. Suggests how to repackage a high-performing blog post into a casual newsletter template, short video script, and Twitter thread.",
      metricMock: "4 Channels Synced",
      chartType: "line"
    }
  ];

  // Mock data for mini performance preview
  const performancePreviewData = [
    { month: 'Jan', views: 8000, engagement: 2200 },
    { month: 'Feb', views: 12000, engagement: 3100 },
    { month: 'Mar', views: 10000, engagement: 2900 },
    { month: 'Apr', views: 18000, engagement: 4200 },
    { month: 'May', views: 15000, engagement: 3800 },
    { month: 'Jun', views: 22000, engagement: 5300 }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#0A2540] dark:bg-[#061424] light:bg-[#f8fafc] text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors duration-300">
      
      {/* 1. HEADER */}
      <section className="relative py-20 px-6 overflow-hidden text-center bg-gradient-to-b from-[#06182c] to-[#0A2540] dark:from-[#030c16] dark:to-[#061424] light:from-slate-100 light:to-[#f8fafc] border-b border-slate-800 light:border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            Features
          </h1>
          <p className="text-base sm:text-lg text-[#00BFA6] font-bold max-w-2xl mx-auto leading-relaxed">
            Smarter content through memory, duplication checks, and cross-channel growth.
          </p>
        </div>
      </section>

      {/* 2. CORE FEATURES GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl font-extrabold text-center text-slate-100 light:text-slate-900">
          Core Agent Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreFeatures.map((feat) => (
            <div 
              key={feat.id}
              onClick={() => setSelectedFeature(feat)}
              className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-200 flex flex-col justify-between h-64 glow-card hover:border-[#00BFA6] cursor-pointer transition-all"
            >
              <div className="space-y-4">
                <span className="text-xs bg-[#00BFA6]/10 text-[#00BFA6] px-2.5 py-0.5 rounded-full font-bold border border-[#00BFA6]/20">
                  {feat.title}
                </span>
                <h3 className="text-lg font-bold text-slate-150 light:text-slate-800 leading-snug">
                  {feat.tagline}
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed line-clamp-3">
                  {feat.description}
                </p>
              </div>

              <span className="text-[10px] font-bold text-[#00BFA6] hover:underline flex items-center gap-1">
                View Details & Analytics →
              </span>
            </div>
          ))}

          {/* Technology Showcase Extra filler */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A2540] to-slate-900 light:from-white light:to-slate-100 border border-slate-800 light:border-slate-200 flex flex-col justify-center items-center text-center space-y-4 shadow-inner">
            <BrainCircuit className="w-10 h-10 text-[#AEEA00] animate-pulse" />
            <h4 className="text-sm font-bold text-slate-200 light:text-slate-800">Hindsight Memory Controller</h4>
            <p className="text-[11px] text-slate-450 light:text-slate-500 max-w-[200px]">
              All features query Hindsight database context concurrently to eliminate AI memory loss.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SIDE-BY-SIDE DEMO MODE TOGGLE */}
      <section className="py-20 px-6 bg-slate-950 dark:bg-[#040e1c] light:bg-[#f1f5f9] border-y border-slate-900 light:border-slate-200">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-100 light:text-slate-900">
              Interactive Agent Simulator
            </h2>
            <p className="text-xs text-slate-450 light:text-slate-500 max-w-sm mx-auto">
              Compare the strategy output of a memory-powered loop against a standard, local LLM write cycle.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex bg-slate-900 light:bg-slate-200 p-1 rounded-xl border border-slate-800 light:border-slate-300">
              <button
                onClick={() => setDemoMode('generic')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  demoMode === 'generic' 
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25' 
                    : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-800'
                }`}
              >
                Generic Agent (No Memory)
              </button>
              <button
                onClick={() => setDemoMode('memory')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  demoMode === 'memory' 
                    ? 'bg-[#00BFA6] text-[#0A2540] font-extrabold' 
                    : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Memory-Powered Agent
              </button>
            </div>
          </div>

          {/* Side by Side Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* INPUT PANEL */}
            <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-200 space-y-4">
              <span className="text-[10px] uppercase font-bold text-slate-450 light:text-slate-550">Prompt Input niche:</span>
              <div className="p-3 rounded-lg bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 text-xs font-mono text-slate-300 light:text-slate-650">
                Generate SEO content strategy ideas for Q3 campaigns
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-350 light:text-slate-600 block">Agent Operations Log:</span>
                <div className="space-y-1.5 font-mono text-[10px] text-slate-400">
                  {demoMode === 'memory' ? (
                    <>
                      <div className="text-emerald-400">✓ Querying Hindsight Cloud memory registry...</div>
                      <div className="text-emerald-400">✓ Recalled 4 matching posts in SEO authority bank.</div>
                      <div className="text-emerald-400">✓ Calculated highest performing tone: Formal (Views +45%).</div>
                      <div className="text-[#00BFA6]">✓ Excluded duplicate topic 'SEO Basics' (Audit Match 82%).</div>
                      <div className="text-slate-300">➜ Synthesizing predictive Q3 campaigns...</div>
                    </>
                  ) : (
                    <>
                      <div className="text-rose-400">✗ Memory recall skipped (No active token key).</div>
                      <div className="text-rose-450">✗ Cannot compare semantic overlaps.</div>
                      <div className="text-slate-400">➜ Generating general topic lists...</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* STRATEGY OUTPUT RECOMMENDATIONS */}
            <div className="p-6 rounded-2xl bg-slate-900/80 light:bg-slate-50 border border-slate-850 light:border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-450 light:text-slate-550 block mb-4">Suggested Q3 Strategies:</span>
                
                <div className="space-y-3">
                  {demoMode === 'memory' ? (
                    <>
                      <div className="p-3 rounded-xl bg-slate-950/60 light:bg-white border border-[#00BFA6]/20 shadow-sm">
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="bg-[#00BFA6]/10 text-[#00BFA6] px-1.5 py-0.5 rounded font-bold">Blog • Formal</span>
                          <span className="text-[#00BFA6] font-bold">94% Predicted Fit</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 light:text-slate-850">Advanced Semantic SEO: Beyond Keywords in 2026</h4>
                        <p className="text-[10px] text-slate-400 light:text-slate-500 mt-1">Focuses on voice query trends, filling the authority gap.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 light:bg-white border border-[#00BFA6]/20 shadow-sm">
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="bg-[#00BFA6]/10 text-[#00BFA6] px-1.5 py-0.5 rounded font-bold">Email • Casual</span>
                          <span className="text-[#00BFA6] font-bold">92% Predicted Fit</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 light:text-slate-850">A/B Testing Subject Lines: 5 Conversion Formulas</h4>
                        <p className="text-[10px] text-slate-400 light:text-slate-500 mt-1">Repackages blog SEO learnings into a high-CTR email format.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 rounded-xl bg-slate-950/60 light:bg-white border border-rose-500/15 shadow-sm">
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="bg-slate-800 light:bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Blog • Neutral</span>
                          <span className="text-rose-400 font-bold">65% Fit (Generic)</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 light:text-slate-850">Introduction to Modern Content Writing</h4>
                        <p className="text-[10px] text-slate-450 light:text-slate-500 mt-1">Basic guidelines. Warning: similar topic already published in history.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/60 light:bg-white border border-rose-500/15 shadow-sm">
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="bg-slate-800 light:bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Email • Neutral</span>
                          <span className="text-rose-400 font-bold">58% Fit (Generic)</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 light:text-slate-850">Why You Need a Newsletter</h4>
                        <p className="text-[10px] text-slate-450 light:text-slate-500 mt-1">Generic newsletter setups. High probability of reader overlap fatigue.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-slate-800/80 light:border-slate-200 pt-4 text-[10px] text-slate-400">
                <span>Metrics Accuracy: {demoMode === 'memory' ? '✓ High' : '✗ Unknown'}</span>
                <span>Tone: {demoMode === 'memory' ? 'Adapted to Brand history' : 'Bland Static Default'}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. PERFORMANCE PREVIEW SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Chart Mockup */}
        <div className="p-6 rounded-2xl bg-[#0A2540]/60 light:bg-white border border-slate-850 light:border-slate-200 h-96 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="font-bold text-slate-100 light:text-slate-800 text-base">Metrics Preview Engine</h3>
            <p className="text-xs text-slate-400 light:text-slate-550 mt-1">Hover over points to evaluate historical views overlays.</p>
          </div>
          
          <div className="flex-1 w-full text-[10px] pt-4">
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={performancePreviewData}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A2540', 
                    borderColor: '#1e293b', 
                    borderRadius: '8px', 
                    color: '#e2e8f0',
                    fontSize: '11px'
                  }} 
                />
                <Line type="monotone" dataKey="views" name="Reach Views" stroke="#00BFA6" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Explainers */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AEEA00]/10 border border-[#AEEA00]/20 text-xs font-bold text-[#AEEA00]">
            Performance Preview
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 light:text-slate-900 leading-tight">
            How we calculate strategic predictive scores.
          </h2>
          <p className="text-xs text-slate-400 light:text-slate-550 leading-relaxed">
            By analyzing parameters such as content type, publishing cadence, views/clicks ratio (CTR), and author tone, the Hindsight memory engine assigns a fit score (0-100%) to every draft. 
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex gap-3 items-start">
              <div className="p-1 rounded bg-[#00BFA6]/10 text-[#00BFA6] border border-[#00BFA6]/10">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 light:text-slate-805">Reach Views</h4>
                <p className="text-[11px] text-slate-400 light:text-slate-500 mt-0.5">Calculates average volume of users exposed to topics across specific channels.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-1 rounded bg-[#00BFA6]/10 text-[#00BFA6] border border-[#00BFA6]/10">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 light:text-slate-805">CTR (Click-Through Rate)</h4>
                <p className="text-[11px] text-slate-400 light:text-slate-500 mt-0.5">Measures link engagement actions to estimate campaign conversion effectiveness.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 5. EXTRA UTILITIES */}
      <section className="py-20 px-6 bg-slate-950 dark:bg-[#040e1c] light:bg-[#f8fafc] border-t border-slate-900 light:border-slate-200">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-extrabold text-center text-slate-100 light:text-slate-900">
            Advanced Strategy Utilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-xs">
            
            <div className="p-6 space-y-3 bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-250 rounded-2xl">
              <span className="text-2xl block">📈</span>
              <h3 className="font-bold text-slate-200 light:text-slate-800 text-base">Adaptive Tone Engine</h3>
              <p className="text-slate-400 light:text-slate-500 leading-relaxed">
                Learns styling nuances from prior logs. Shifts tone parameters automatically to fit the target persona.
              </p>
            </div>

            <div className="p-6 space-y-3 bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-250 rounded-2xl">
              <span className="text-2xl block">📊</span>
              <h3 className="font-bold text-slate-200 light:text-slate-800 text-base">Auto-Report Generator</h3>
              <p className="text-slate-400 light:text-slate-500 leading-relaxed">
                Generates weekly strategic analysis documents in CSV or executive summaries, outlining top posts and topic suggestions.
              </p>
            </div>

            <div className="p-6 space-y-3 bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-250 rounded-2xl">
              <span className="text-2xl block">📅</span>
              <h3 className="font-bold text-slate-200 light:text-slate-800 text-base">Smart Scheduler</h3>
              <p className="text-slate-400 light:text-slate-500 leading-relaxed">
                Analyzes performance records over weekdays and suggests optimized publishing time slots to maximize CTR volume.
              </p>
            </div>

          </div>

          <div className="flex justify-between pt-6 border-t border-slate-900 light:border-slate-200">
            <button
              onClick={() => navigate('/about')}
              className="px-4 py-2 hover:bg-slate-900 light:hover:bg-slate-100 border border-slate-850 light:border-slate-250 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-[#00BFA6] hover:bg-[#00a892] text-[#0A2540] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
            >
              Go to Dashboard Console
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* FEATURE DETAIL MODAL POPUP */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 overflow-hidden animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 light:border-slate-200">
              <div>
                <span className="text-[10px] bg-[#00BFA6]/10 text-[#00BFA6] px-2 py-0.5 rounded font-bold border border-[#00BFA6]/20">Core Metric: {selectedFeature.metricMock}</span>
                <h3 className="text-lg font-bold text-slate-100 light:text-slate-850 mt-1">{selectedFeature.title}</h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-slate-200 light:hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-350 light:text-slate-600 leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/40 light:bg-slate-50 border border-slate-850 light:border-slate-250 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-450 light:text-slate-550 block">Feature Performance Metric Simulator:</span>
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedFeature.chartType === 'line' ? (
                    <LineChart data={performancePreviewData.slice(2, 6)}>
                      <Line type="monotone" dataKey="views" name="Reach Views" stroke="#00BFA6" strokeWidth={2.5} dot />
                    </LineChart>
                  ) : (
                    <BarChart data={performancePreviewData.slice(2, 6)}>
                      <Bar dataKey="engagement" fill="#AEEA00" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 bg-[#00BFA6] text-[#0A2540] font-bold text-xs rounded-xl shadow active:scale-95 transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
