import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Brain, Zap, Shield, Repeat, Eye, TrendingUp, Sparkles, Database, Cpu } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2); // Default to memory integration step

  const timelineSteps = [
    {
      id: 1,
      title: "Generic Agent",
      description: "Basic prompt generation without database lookup. Suggestions are often redundant or unrelated.",
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Memory Recall",
      description: "Hindsight cloud database integration allows recalling similar past posts and analyzing performance scores.",
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Duplication Audit",
      description: "Hindsight Memory runs real-time similarity testing to alert writers of content duplication and fatigue risks.",
      icon: <Repeat className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Gap Detector",
      description: "Semantic models extract keyword authority maps and highlight topic areas left uncovered by recent logs.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 5,
      title: "Tone Optimizer",
      description: "Reads clicks/views feedback loops to adapt tone profiles dynamically for optimal engagement.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 6,
      title: "Cross-Channel Growth",
      description: "Automatically translates content suggestions from deep blogs into emails and social video concepts.",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#0A2540] dark:bg-[#061424] light:bg-[#f8fafc] text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors duration-300">
      
      {/* 1. HEADER */}
      <section className="relative py-20 px-6 overflow-hidden text-center bg-gradient-to-b from-[#06182c] to-[#0A2540] dark:from-[#030c16] dark:to-[#061424] light:from-slate-100 light:to-[#f8fafc] border-b border-slate-800 light:border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            About ConStrat AI
          </h1>
          <p className="text-base sm:text-lg text-[#00BFA6] font-bold max-w-2xl mx-auto leading-relaxed">
            Eliminating AI memory loss, preventing redundancy, and building topic authority.
          </p>
        </div>
        
        {/* Subtle Background Art */}
        <div className="absolute top-0 bottom-0 left-0 right-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border border-[#00BFA6] animate-pulse-subtle"></div>
        </div>
      </section>

      {/* 2. MISSION STATEMENT */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-xs font-bold text-[#00BFA6]">
            Our Mission
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 light:text-slate-900 leading-tight">
            Remembering past performance to optimize future reach.
          </h2>
          <p className="text-sm text-slate-400 light:text-slate-550 leading-relaxed">
            ConStrat AI was built to solve the biggest flaw of modern LLM copywriters: <span className="text-slate-200 light:text-slate-850 font-semibold">contextual amnesia</span>. By linking your strategy loops to a vector-cached memory bank of prior engagements, our agents protect your brand against duplication fatigue and ensure your authority stays balanced.
          </p>
          <div className="p-4 rounded-xl bg-slate-905/60 light:bg-slate-100 border border-slate-800 light:border-slate-250 italic text-xs text-slate-350 light:text-slate-600">
            "ConStrat AI remembers past performance, adapts tone strategy, and prevents duplication fatigue automatically."
          </div>
        </div>
        
        {/* Decorative graphic mockup */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0A2540] to-slate-900 light:from-white light:to-slate-100 border border-slate-800 light:border-slate-250 relative shadow-xl min-h-[300px] flex flex-col justify-center space-y-4">
          <div className="absolute top-3 right-3 text-[#AEEA00] animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-200 light:text-slate-800 uppercase tracking-widest text-[#00BFA6]">Hindsight Vector Engine</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 light:border-slate-200">
              <span className="text-slate-400">Context Retention Rate</span>
              <span className="font-bold text-[#AEEA00]">100% (Persistent Cache)</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 light:border-slate-200">
              <span className="text-slate-400">Duplication Audit Scan</span>
              <span className="font-bold text-[#00BFA6]">Real-time pre-checks</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Tone Correlation</span>
              <span className="font-bold text-slate-300 light:text-slate-700">Views & CTR adaptation</span>
            </div>
          </div>

          <div className="flex gap-2 justify-center pt-4">
            <span className="h-2 w-2 rounded-full bg-[#00BFA6]"></span>
            <span className="h-2 w-2 rounded-full bg-[#AEEA00]"></span>
            <span className="h-2 w-2 rounded-full bg-slate-700"></span>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE EVOLUTION ANIMATION */}
      <section className="py-20 px-6 bg-slate-950 dark:bg-[#040e1c] light:bg-[#f1f5f9] border-y border-slate-900 light:border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-100 light:text-slate-900">
              Evolution of ConStrat AI
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-500 max-w-lg mx-auto">
              How we built the core pipeline to transition strategy workflows from generic AI generation to a context-aware content engine.
            </p>
          </div>

          {/* Timeline Row */}
          <div className="relative pt-8 pb-4">
            {/* Horizontal Line connector */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 light:bg-slate-300 -translate-y-1/2 z-0 hidden md:block"></div>
            
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
              {timelineSteps.map((step, idx) => {
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-48 focus:outline-none ${
                      isActive
                        ? 'bg-slate-900 light:bg-white border-[#00BFA6] shadow-lg scale-105'
                        : 'bg-slate-900/40 dark:bg-slate-950/60 light:bg-slate-200/40 border-slate-800 light:border-slate-300 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className={`p-2 rounded-lg w-max border ${
                        isActive
                          ? 'bg-[#00BFA6]/10 border-[#00BFA6]/20 text-[#00BFA6]'
                          : 'bg-slate-950/60 light:bg-slate-100 border-slate-800 light:border-slate-300 text-slate-400'
                      }`}>
                        {step.icon}
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-200 light:text-slate-850">
                        {step.id}. {step.title}
                      </h4>
                    </div>
                    
                    <span className="text-[10px] text-slate-400 light:text-slate-500 font-bold block pt-2 border-t border-slate-800/60 light:border-slate-200">
                      Step {step.id} active
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Details Display */}
          <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-950/40 light:bg-white border border-slate-850 light:border-slate-200 max-w-3xl mx-auto text-center space-y-3 animate-fade-in">
            <h4 className="text-base font-bold text-[#00BFA6]">
              {timelineSteps[activeStep - 1].title} Details
            </h4>
            <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed max-w-xl mx-auto">
              {timelineSteps[activeStep - 1].description}
            </p>
          </div>

        </div>
      </section>

      {/* 4. VISION & VALUES */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl font-extrabold text-center text-slate-100 light:text-slate-900 tracking-tight">
          Vision & Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="group relative p-8 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-200 flex flex-col justify-between h-72 glow-card hover:border-[#00BFA6] transition-all">
            <div className="space-y-4">
              <span className="text-4xl">💡</span>
              <h3 className="text-xl font-bold text-slate-250 light:text-slate-800">Innovation</h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                “Smarter content through memory.” We constantly push context recall capabilities, building agent models that evolve alongside your brand data logs.
              </p>
            </div>
            <span className="text-[10px] text-[#00BFA6] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read value →</span>
          </div>

          <div className="group relative p-8 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-200 flex flex-col justify-between h-72 glow-card hover:border-[#AEEA00] transition-all">
            <div className="space-y-4">
              <span className="text-4xl">⏱️</span>
              <h3 className="text-xl font-bold text-slate-250 light:text-slate-800">Efficiency</h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                “Prevent redundancy, save team hours.” Eliminating double brainstorming, checking drafts automatically, and reducing manual auditing workflow times.
              </p>
            </div>
            <span className="text-[10px] text-[#AEEA00] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read value →</span>
          </div>

          <div className="group relative p-8 rounded-2xl bg-[#0A2540]/40 light:bg-slate-50 border border-slate-850 light:border-slate-200 flex flex-col justify-between h-72 glow-card hover:border-[#00BFA6] transition-all">
            <div className="space-y-4">
              <span className="text-4xl">📈</span>
              <h3 className="text-xl font-bold text-slate-250 light:text-slate-800">Growth</h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                “Drive engagement across all channels.” Turning isolated hits into systemic playbooks. Scaling one post successfully to maximize coverage everywhere.
              </p>
            </div>
            <span className="text-[10px] text-[#00BFA6] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read value →</span>
          </div>

        </div>
      </section>

      {/* 5. TECH STACK INTEGRATION */}
      <section className="py-20 px-6 bg-slate-950 dark:bg-[#040e1c] light:bg-[#f8fafc] border-t border-slate-900 light:border-slate-200">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-100 light:text-slate-900">
              Integrations Stack
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-500 max-w-sm mx-auto">
              Powered by industry-leading semantic databases and agent architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6 space-y-4 bg-slate-900/40 dark:bg-slate-950/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-2xl glow-card">
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#AEEA00] flex items-center justify-center text-[#0A2540] font-extrabold shadow-md">
                HM
              </div>
              <h3 className="font-bold text-slate-250 light:text-slate-800 text-base">Hindsight Indexer</h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Indexes previous campaigns with detailed views, engagement, and tone matrices, making sure outcomes are never forgotten.
              </p>
            </div>

            <div className="p-6 space-y-4 bg-slate-900/40 dark:bg-slate-950/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-2xl glow-card">
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#AEEA00] flex items-center justify-center text-[#0A2540] font-extrabold shadow-md">
                HC
              </div>
              <h3 className="font-bold text-slate-250 light:text-slate-800 text-base">Hindsight Cloud</h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Vector memory database caching metadata attributes (channel, date, metrics, tone) for fast context recall.
              </p>
            </div>

            <div className="p-6 space-y-4 bg-slate-900/40 dark:bg-slate-950/60 light:bg-white border border-slate-800 light:border-slate-200 rounded-2xl glow-card">
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#AEEA00] to-yellow-400 flex items-center justify-center text-[#0A2540] font-extrabold shadow-md">
                GQ
              </div>
              <h3 className="font-bold text-slate-250 light:text-slate-800 text-base">Groq & OpenAI Models</h3>
              <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Processes LLM chat responses. Generates highly descriptive campaign drafts based on contextual inputs.
              </p>
            </div>

          </div>

          <div className="flex justify-between items-center pt-8 border-t border-slate-900 light:border-slate-200">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 hover:bg-slate-900 light:hover:bg-slate-100 border border-slate-850 light:border-slate-250 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            
            <button
              onClick={() => navigate('/features')}
              className="px-4 py-2 bg-[#00BFA6] hover:bg-[#00a892] text-[#0A2540] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
            >
              Go to Features
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
