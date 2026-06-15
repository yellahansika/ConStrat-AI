import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, AlertCircle, CheckCircle, Database, TrendingUp, BarChart2, MessageSquare, BrainCircuit, ShieldAlert, ArrowDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function Home() {
  const navigate = useNavigate();
  const [useMemory, setUseMemory] = useState(true);

  // Mock mini performance data
  const miniChartData = [
    { name: 'W1', views: 1000, ctr: 1.5 },
    { name: 'W2', views: 2400, ctr: 2.1 },
    { name: 'W3', views: 1800, ctr: 1.9 },
    { name: 'W4', views: 4200, ctr: 3.5 },
    { name: 'W5', views: 3200, ctr: 2.8 },
    { name: 'W6', views: 5600, ctr: 4.8 }
  ];

  // Agent suggestions simulation based on mode
  const suggestionsMock = useMemory
    ? [
        {
          title: "Advanced Semantic SEO: Beyond Keyword Stuffing in 2026",
          score: "94% Match",
          reason: "Boosted based on high views of 'SEO Best Practices' (24.5k views)",
          channel: "Blog",
          tag: "SEO Authority"
        },
        {
          title: "A/B Testing Subject Lines: 5 Formulas for 40%+ Open Rates",
          score: "92% Match",
          reason: "Repackages high-CTR email formulas from history bank",
          channel: "Email",
          tag: "Conversion Guide"
        }
      ]
    : [
        {
          title: "Introduction to Modern Content Writing",
          score: "65% Match",
          reason: "Default topic without historical benchmark check",
          channel: "Blog",
          tag: "Bland General"
        },
        {
          title: "Why You Need a Newsletter",
          score: "58% Match",
          reason: "Generic advice. High redundancy risk",
          channel: "Email",
          tag: "Standard Newsletter"
        }
      ];

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col text-slate-100 dark:text-slate-100 light:text-slate-800 transition-colors duration-300 select-none">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0A2540] dark:bg-[#061424] light:bg-[#f8fafc] text-center border-b border-slate-800/80 light:border-slate-200">
        
        {/* Animated Background Particles & Parallax Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30 light:opacity-10">
          {/* Floating graphic 1: Memory */}
          <div className="absolute top-[20%] left-[15%] float-slow text-[#00BFA6] flex flex-col items-center">
            <Database className="w-12 h-12" />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Hindsight Cloud</span>
          </div>
          {/* Floating graphic 2: Charts */}
          <div className="absolute bottom-[25%] left-[20%] float-reverse-slow text-[#AEEA00] flex flex-col items-center">
            <BarChart2 className="w-16 h-16" />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Analytics</span>
          </div>
          {/* Floating graphic 3: Growth */}
          <div className="absolute top-[25%] right-[15%] float-reverse-slow text-[#00BFA6] flex flex-col items-center">
            <TrendingUp className="w-14 h-14" />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Growth Engine</span>
          </div>
          {/* Floating graphic 4: Memory Cache */}
          <div className="absolute bottom-[20%] right-[22%] float-slow text-[#00BFA6] flex flex-col items-center">
            <BrainCircuit className="w-12 h-12" />
            <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">Hindsight Loop</span>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-6">
          
          {/* Small top badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-xs font-bold text-[#00BFA6]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Hindsight Cloud Persistent Memory Bank
          </div>

          {/* Centered Headline with Typing Animation */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 light:text-slate-900 tracking-tight leading-none max-w-4xl">
            Your content, <span className="text-[#00BFA6]">remembered</span>.<br className="hidden sm:inline" />
            Your strategy, <span className="bg-gradient-to-r from-[#00BFA6] to-[#AEEA00] bg-clip-text text-transparent">smarter</span>.
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-400 light:text-slate-650 max-w-2xl font-medium leading-relaxed">
            Eliminate AI memory loss, prevent repetitive content duplication fatigue, and establish topic authority across blog, email, and social campaigns.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="glow-btn-teal px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00BFA6] to-[#00a892] text-[#0A2540] font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-[#00BFA6]/20 active:scale-95 transition-all"
            >
              Explore Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleScrollToSection('intro-feature-section')}
              className="px-8 py-3.5 rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900/40 hover:bg-slate-800/60 light:bg-white light:hover:bg-slate-100 text-slate-300 light:text-slate-700 font-semibold text-sm transition-all active:scale-95"
            >
              Learn More
            </button>
          </div>

          {/* 🌟 Interactive Demo Toggle Widget */}
          <div className="w-full max-w-3xl mt-12 bg-slate-900/60 dark:bg-slate-900/40 light:bg-white border border-slate-850 dark:border-slate-800/80 light:border-slate-250 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
            
            {/* Left Column: Toggle controls and micro stats */}
            <div className="flex-1 flex flex-col items-start text-left space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#00BFA6]">Instant Showcase</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#00BFA6] animate-ping"></span>
              </div>
              <h3 className="text-lg font-bold text-slate-200 light:text-slate-800 leading-snug">
                Compare Intelligence States
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Toggle below to see how Hindsight Memory retains and recalls your past performance stats to optimize output, unlike generic AI which has no memory and suggests duplicate content.
              </p>

              {/* Toggle Buttons */}
              <div className="flex bg-slate-950/80 light:bg-slate-100 p-1 rounded-xl border border-slate-800/80 light:border-slate-250 shadow-inner w-full sm:w-auto">
                <button
                  onClick={() => setUseMemory(false)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                    !useMemory
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-700'
                  }`}
                >
                  Generic Agent
                </button>
                <button
                  onClick={() => setUseMemory(true)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all duration-200 ${
                    useMemory
                      ? 'bg-[#00BFA6] text-[#0A2540] shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Memory-Powered
                </button>
              </div>

              {/* Mini Performance Chart Preview */}
              <div className="pt-2 w-full">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>Views Growth Forecast</span>
                  <span className="text-[#00BFA6] font-bold">+184% CTR Efficiency</span>
                </div>
                <div className="h-16 w-full opacity-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={miniChartData}>
                      <Tooltip disabled />
                      <Line type="monotone" dataKey="views" stroke={useMemory ? "#00BFA6" : "#f43f5e"} strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Output Panel */}
            <div className="w-full md:w-80 p-4 rounded-xl bg-slate-950/50 light:bg-slate-50 border border-slate-850/80 light:border-slate-200 text-left space-y-3 min-h-[220px] flex flex-col justify-center">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                Agent Output Recommendations:
              </span>
              
              <div className="space-y-3">
                {suggestionsMock.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-250 text-xs shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] bg-slate-850 light:bg-slate-100 text-slate-300 light:text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                        {t.channel} • {t.tag}
                      </span>
                      <span className={`text-[9px] font-bold ${useMemory ? 'text-[#00BFA6]' : 'text-rose-400'}`}>
                        {t.score}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-200 light:text-slate-850 text-[11px] leading-tight line-clamp-1">
                      {t.title}
                    </p>
                    <p className="text-[9.5px] text-slate-400 light:text-slate-500 mt-1 line-clamp-1">
                      {t.reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800/80 light:border-slate-200 pt-2 flex items-center justify-between text-[9px] text-slate-400">
                <span className="flex items-center gap-1">
                  {useMemory ? <CheckCircle className="w-3 h-3 text-[#00BFA6]" /> : <ShieldAlert className="w-3 h-3 text-rose-400" />}
                  {useMemory ? 'Hindsight context recalled' : 'No memory query performed'}
                </span>
              </div>
            </div>

          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={() => handleScrollToSection('intro-feature-section')}
            className="pt-10 hover:text-[#00BFA6] transition-colors flex flex-col items-center text-xs text-slate-500 font-semibold gap-1"
          >
            <span>Scroll Down</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

        </div>
      </section>

      {/* 2. TEASER ABOUT SECTION */}
      <section id="intro-feature-section" className="py-20 px-6 bg-slate-950 dark:bg-[#040e1c] light:bg-white border-b border-slate-900 light:border-slate-150">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Smarter Authority. ZERO Memory Loss.
            </h2>
            <p className="text-sm text-slate-400 light:text-slate-500 max-w-xl mx-auto leading-relaxed">
              Standard AI systems suffer from localized memory loss, suggesting duplicate tags and recycling content. ConStrat AI connects historical outcomes with generative strategic planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-3 glow-card">
              <div className="p-3 w-max bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] rounded-xl">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 light:text-slate-800">
                Hindsight Memory cloud
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Retains full content registry histories. Automatically checks topic overlaps, audience CTR thresholds, and content tone profiles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-3 glow-card">
              <div className="p-3 w-max bg-[#AEEA00]/10 border border-[#AEEA00]/20 text-[#AEEA00] rounded-xl">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 light:text-slate-800">
                Amnesia-Free Strategy
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Standard AI forgets outcomes immediately. Hindsight stores view/CTR performance to make every subsequent campaign recommendation smarter.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-3 glow-card">
              <div className="p-3 w-max bg-[#818cf8]/10 border border-[#818cf8]/20 text-[#818cf8] rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 light:text-slate-800">
                Cross‑Channel Growth
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Connects analytics correlations between channels. Recommends how to scale a blog topic into an email newsletter, script or social clip.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-3 border border-slate-850 light:border-slate-200 hover:bg-slate-900/60 light:hover:bg-slate-50 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
            >
              Learn More About Our Tech Stack
              <ArrowRight className="w-4 h-4 text-[#00BFA6]" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
