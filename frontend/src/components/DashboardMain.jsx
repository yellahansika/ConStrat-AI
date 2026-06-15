import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell 
} from 'recharts';
import { Eye, Award, ArrowUpRight, Search, Sparkles, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function DashboardMain({ 
  insights, 
  suggestions, 
  onQuerySuggestions, 
  useMemory, 
  onToggleMemory, 
  exportSuggestions,
  onDownloadReport 
}) {
  const [query, setQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSuggest = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onQuerySuggestions(query, selectedChannel);
    setLoading(false);
  };

  const handleExport = () => {
    if (!suggestions || suggestions.length === 0) return;
    exportSuggestions();
  };

  // Safe metrics fallback
  const totalViews = insights?.totalViews ? (insights.totalViews / 1000).toFixed(1) + 'K' : '72.3K';
  const totalEngagement = insights?.totalEngagement ? (insights.totalEngagement / 1000).toFixed(1) + 'K' : '8.4K';
  const avgCTR = insights?.avgCTR ? insights.avgCTR.toFixed(1) + '%' : '3.2%';

  // Format Recharts data safely
  const chartData = insights?.monthlyStats || [
    { month: 'Jan', views: 8000, engagement: 2200, clicks: 310 },
    { month: 'Feb', views: 12000, engagement: 3100, clicks: 420 },
    { month: 'Mar', views: 10000, engagement: 2900, clicks: 350 },
    { month: 'Apr', views: 18000, engagement: 4200, clicks: 680 },
    { month: 'May', views: 15000, engagement: 3800, clicks: 520 },
    { month: 'Jun', views: 22000, engagement: 5300, clicks: 750 }
  ];

  const pieData = insights?.channelDistribution || [
    { name: 'Blog', value: 32 },
    { name: 'Email', value: 28 },
    { name: 'Video', value: 25 },
    { name: 'Social', value: 15 }
  ];

  const COLORS = ['#38bdf8', '#818cf8', '#fbbf24', '#f43f5e'];

  // Channels
  const channels = [
    { value: '', label: 'All Channels' },
    { value: 'blog', label: '📝 Blog' },
    { value: 'email', label: '✉️ Email' },
    { value: 'video', label: '🎥 Video' },
    { value: 'social', label: '📱 Social' }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 light:border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
            Content Strategy Dashboard
          </h1>
          <p className="text-sm text-slate-400 light:text-slate-500 mt-1">
            Hindsight Cloud persistent memory analyzing historical content strategy performance.
          </p>
        </div>

        {/* Demo Mode Toggle Widget */}
        <div className="flex items-center gap-3 bg-slate-900 light:bg-slate-100 p-1.5 rounded-xl border border-slate-800 light:border-slate-300 shadow-inner">
          <button 
            onClick={() => onToggleMemory(false)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
              !useMemory 
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-800'
            }`}
          >
            Generic Agent (No Memory)
          </button>
          <button 
            onClick={() => onToggleMemory(true)}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
              useMemory 
                ? 'bg-gradient-to-r from-brandPrimary to-brandSecondary text-white border border-brandPrimary/20 shadow-md animate-glow-pulse' 
                : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Memory-Powered Agent
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl glow-card">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">Total Views</span>
              <h3 className="text-3xl font-bold text-slate-100 light:text-slate-900 mt-2">{totalViews}</h3>
            </div>
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <Eye className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full w-max">
            <ArrowUpRight className="w-3.5 h-3.5" />
            15% this month
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl glow-card">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">Engagement</span>
              <h3 className="text-3xl font-bold text-slate-100 light:text-slate-900 mt-2">{totalEngagement}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full w-max">
            <ArrowUpRight className="w-3.5 h-3.5" />
            8% vs average
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl glow-card">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">Click-Through Rate</span>
              <h3 className="text-3xl font-bold text-slate-100 light:text-slate-900 mt-2">{avgCTR}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Eye className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full w-max">
            <ArrowUpRight className="w-3.5 h-3.5" />
            2% improvement
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line / Bar Chart for Performance Overview */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col h-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-100 light:text-slate-800">Performance Overview</h3>
            <span className="text-xs text-slate-400 light:text-slate-500">Monthly reach & engagement</span>
          </div>
          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderColor: '#334155', 
                    borderRadius: '8px', 
                    color: '#e2e8f0' 
                  }} 
                />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Line type="monotone" dataKey="views" name="Total Views" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="engagement" name="Engagement" stroke="#818cf8" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doughnut Chart for Audience Insights */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col h-96">
          <div className="mb-4">
            <h3 className="font-bold text-slate-100 light:text-slate-800">Audience Insights</h3>
            <p className="text-xs text-slate-400 light:text-slate-500">Channel reach distributions</p>
          </div>
          <div className="flex-1 flex items-center justify-center text-xs">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderColor: '#334155', 
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/50 light:border-slate-200">
            {pieData.map((entry, idx) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-300 light:text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                <span className="font-medium">{entry.value}% {entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Topics Section */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 light:text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brandPrimary" />
              Suggested Topics
            </h3>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Agent-generated topics aligned with your brand memory benchmarks.
            </p>
          </div>

          {/* Prompt input for generating suggestions */}
          <form onSubmit={handleSuggest} className="flex items-center gap-2 max-w-lg w-full">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Topic niche (e.g. SEO, React Developer)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-350 text-xs text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
            
            <select 
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-2.5 py-2 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-350 text-xs text-slate-300 light:text-slate-750 focus:outline-none focus:border-brandPrimary"
            >
              {channels.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <button 
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brandPrimary to-brandSecondary hover:opacity-90 text-white text-xs font-bold flex items-center gap-1 shadow disabled:opacity-50"
            >
              {loading ? 'Thinking...' : 'Generate'}
            </button>
          </form>
        </div>

        {/* Suggestion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-16 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-slate-800 border-t-brandPrimary rounded-full animate-spin"></div>
              <span className="text-xs text-slate-400">Agent retrieving history and consulting LLM...</span>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="col-span-3 py-16 text-center border border-dashed border-slate-800 light:border-slate-200 rounded-xl text-slate-500 text-xs">
              No suggestions generated yet. Click generate or search above.
            </div>
          ) : (
            suggestions.map((topic, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/40 light:bg-slate-50 border border-slate-800 light:border-slate-250 flex flex-col justify-between h-64 glow-card animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] bg-brandPrimary/10 text-brandPrimary px-2.5 py-0.5 rounded-full font-bold border border-brandPrimary/20">
                      {topic.category || 'General'}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>Score:</span>
                      <span className={`font-bold ${
                        topic.predictedScore >= 90 ? 'text-emerald-400' :
                        topic.predictedScore >= 80 ? 'text-brandPrimary' : 'text-slate-400'
                      }`}>
                        {topic.predictedScore}%
                      </span>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-200 light:text-slate-800 leading-snug line-clamp-2">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-500 mt-2 line-clamp-3">
                    {topic.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/60 light:border-slate-200 pt-3 flex justify-between items-center text-[10.5px]">
                  <span className="text-slate-400 light:text-slate-600 font-medium">
                    Channel: <span className="capitalize text-slate-300 light:text-slate-700 font-bold">{topic.channel}</span> ({topic.tone})
                  </span>
                  
                  <div className="flex items-center gap-1 text-emerald-400/90 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10" title={topic.predictionReason}>
                    <CheckCircle2 className="w-3 h-3" />
                    High fit
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls: Download CSV / Auto-Report */}
        {suggestions.length > 0 && (
          <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex justify-between">
            <button 
              onClick={onDownloadReport}
              className="px-4 py-2 border border-slate-800 light:border-slate-350 hover:bg-slate-900/60 light:hover:bg-slate-100 text-xs font-semibold text-slate-300 light:text-slate-700 rounded-xl flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <FileText className="w-4 h-4 text-brandPrimary" />
              Download Executive Summary
            </button>
            
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-slate-900 light:bg-slate-100 hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-800 light:border-slate-350 text-xs font-semibold text-slate-300 light:text-slate-700 rounded-xl flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <Download className="w-4 h-4 text-brandSecondary" />
              Export Suggestions CSV
            </button>
          </div>
        )}
      </div>

    </main>
  );
}
