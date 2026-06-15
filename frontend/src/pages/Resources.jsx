import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, HelpCircle, ChevronDown, Code, Clipboard, Download, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Resources() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'blog', 'faq', 'docs'
  const [openFaq, setOpenFaq] = useState(null);
  const [apiEndpoint, setApiEndpoint] = useState('/api/suggest');
  const [copied, setCopied] = useState(false);

  // FAQ items
  const faqs = [
    {
      q: "How does ConStrat AI prevent duplication?",
      a: "The Odysseus Agent performs a real-time semantic search via Hindsight Memory before drafting posts. If similarity scores exceed 60%, it alerts the writer to modify the content angle."
    },
    {
      q: "What is Hindsight memory?",
      a: "Hindsight memory is a persistent vector cache database. It stores the metadata of all published campaigns (views, CTR, date, tone, channel) to give LLMs full context of past results."
    },
    {
      q: "Can I export reports?",
      a: "Yes. From the Dashboard and Resources, you can export suggested content plans as a CSV file or download an executive weekly text report outlining average CTR and channel benchmarks."
    }
  ];

  // Blog articles
  const blogs = [
    {
      title: "Optimizing Q3 Content Loops with Hindsight",
      category: "SEO",
      desc: "Learn how to query your vector memory database to avoid keyword redundancy and boost brand authority.",
      readTime: "5 min read"
    },
    {
      title: "A/B Subject Lines: Secrets of 40%+ CTRs",
      category: "Email",
      desc: "Repackaging metrics from high-performing subject lines can lift newsletter engagement rates by up to 2.4x.",
      readTime: "4 min read"
    },
    {
      title: "Repurposing Long blogs into Video Scripts",
      category: "Social",
      desc: "A breakdown of the Odysseus cross-channel correlation loop: turning articles into short reels and social summaries.",
      readTime: "7 min read"
    },
    {
      title: "Scaling Next.js Render Architectures in 2026",
      category: "Development",
      desc: "An advanced developer walkthrough of Server Components caching configurations and fast repaint optimization strategies.",
      readTime: "6 min read"
    }
  ];

  // API docs snippets
  const apiSnippets = {
    '/api/store': {
      method: 'POST',
      body: JSON.stringify({
        title: "SEO Best Practices for 2026",
        content: "Draft copy for search engine optimization...",
        channel: "blog",
        tone: "formal",
        views: 24500,
        clicks: 820
      }, null, 2),
      response: JSON.stringify({
        success: true,
        post: {
          id: "post-171822839",
          title: "SEO Best Practices for 2026",
          channel: "blog",
          tone: "formal"
        }
      }, null, 2)
    },
    '/api/recall': {
      method: 'POST',
      body: JSON.stringify({
        query: "Advanced React scaling frameworks",
        channel: "video"
      }, null, 2),
      response: JSON.stringify({
        query: "Advanced React scaling frameworks",
        matches: [
          {
            post: { title: "Video Tutorial: Scaling React Apps", views: 18200 },
            score: 0.88
          }
        ]
      }, null, 2)
    },
    '/api/suggest': {
      method: 'POST',
      body: JSON.stringify({
        query: "Conversational Search AI",
        useMemory: true
      }, null, 2),
      response: JSON.stringify({
        success: true,
        suggestions: [
          {
            title: "Advanced Semantic SEO: Beyond keywords in 2026",
            predictedScore: 94,
            predictionReason: "Fills uncovered conversational authority gaps"
          }
        ]
      }, null, 2)
    }
  };

  const handleCopyCode = () => {
    const code = `curl -X POST http://localhost:5000${apiEndpoint} \\\n  -H "Content-Type: application/json" \\\n  -d '${apiSnippets[apiEndpoint].body}'`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAsset = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Filter content dynamically
  const filteredBlogs = blogs.filter(b => 
    (activeTab === 'all' || activeTab === 'blog') &&
    (b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     b.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFaqs = faqs.filter(f => 
    (activeTab === 'all' || activeTab === 'faq') &&
    (f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
     f.a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col bg-[#0A2540] dark:bg-[#061424] light:bg-[#f8fafc] text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors duration-300">
      
      {/* 1. HEADER */}
      <section className="relative py-16 px-6 overflow-hidden text-center bg-gradient-to-b from-[#06182c] to-[#0A2540] dark:from-[#030c16] dark:to-[#061424] light:from-slate-100 light:to-[#f8fafc] border-b border-slate-800 light:border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-100 light:text-slate-900 tracking-tight">
            Resources & API Docs
          </h1>
          <p className="text-base sm:text-lg text-[#00BFA6] font-bold max-w-2xl mx-auto leading-relaxed">
            Guides, FAQs, and API Docs to help you get the most out of ConStrat AI.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & TABS FILTER */}
      <section className="pt-12 px-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Search bar & Category filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <input 
              type="text" 
              placeholder="Search resources (e.g., SEO, recall)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-xs text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6]"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

          <div className="flex bg-slate-950/80 light:bg-slate-200/50 p-1 rounded-xl border border-slate-850 light:border-slate-300 text-xs font-bold gap-1 self-start md:self-auto">
            {['all', 'blog', 'faq', 'docs'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  activeTab === t
                    ? 'bg-[#00BFA6] text-[#0A2540] font-extrabold'
                    : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-800'
                }`}
              >
                {t === 'docs' ? 'API Docs' : t}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* 3. BLOG & GUIDES (GRID) */}
      {(activeTab === 'all' || activeTab === 'blog') && filteredBlogs.length > 0 && (
        <section className="py-12 px-6 max-w-5xl mx-auto w-full space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-800 light:border-slate-250 pb-2 text-slate-100 light:text-slate-800">
            Latest Guides & Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.map((b, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-200 flex flex-col justify-between h-52 glow-card"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] mb-2">
                    <span className="bg-[#00BFA6]/10 text-[#00BFA6] px-2 py-0.5 rounded font-bold border border-[#00BFA6]/15 uppercase">{b.category}</span>
                    <span className="text-slate-400 light:text-slate-500">{b.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-200 light:text-slate-800 leading-snug line-clamp-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-450 light:text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <button className="text-[10px] text-[#00BFA6] font-bold hover:underline self-start">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. FAQs ACCORDION */}
      {(activeTab === 'all' || activeTab === 'faq') && filteredFaqs.length > 0 && (
        <section className="py-12 px-6 max-w-3xl mx-auto w-full space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-800 light:border-slate-250 pb-2 text-slate-100 light:text-slate-800">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-slate-850 light:border-slate-200 overflow-hidden bg-[#0A2540]/20 light:bg-white transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 flex justify-between items-center text-xs font-bold text-left text-slate-250 light:text-slate-800 hover:bg-[#00BFA6]/5 transition-colors focus:outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#00BFA6]" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-slate-900/40 dark:bg-slate-950/20 light:bg-slate-50/50 border-t border-slate-850 light:border-slate-200 text-xs text-slate-400 light:text-slate-550 leading-relaxed animate-slide-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. API DOCS SECTION */}
      {(activeTab === 'all' || activeTab === 'docs') && (
        <section className="py-12 px-6 max-w-5xl mx-auto w-full space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-800 light:border-slate-250 pb-2 text-slate-100 light:text-slate-800">
            Developer API Endpoints
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* API Tabs list */}
            <div className="space-y-2 lg:col-span-1">
              <span className="text-[10px] uppercase font-bold text-slate-450 light:text-slate-500 block mb-2">Endpoint Console</span>
              {Object.keys(apiSnippets).map((endpoint) => (
                <button
                  key={endpoint}
                  onClick={() => setApiEndpoint(endpoint)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-mono transition-all ${
                    apiEndpoint === endpoint
                      ? 'bg-slate-900 light:bg-white border-[#00BFA6] text-[#00BFA6]'
                      : 'bg-[#0A2540]/40 light:bg-slate-100 border-slate-850 light:border-slate-250 text-slate-400 light:text-slate-600 hover:bg-[#00BFA6]/5'
                  }`}
                >
                  <span>{endpoint}</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold uppercase">
                    POST
                  </span>
                </button>
              ))}
            </div>

            {/* Code Snippet Box */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950/80 light:bg-slate-50 border border-slate-850 light:border-slate-200 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-850 light:border-slate-200">
                <span className="text-[10px] font-mono text-slate-400">cURL Request Payload</span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 light:bg-white light:hover:bg-slate-100 rounded text-[10px] font-semibold flex items-center gap-1 border border-slate-800 light:border-slate-250 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Clipboard className="w-3 h-3 text-brandPrimary" />}
                  <span>{copied ? 'Copied' : 'Copy cURL'}</span>
                </button>
              </div>

              <pre className="text-[11px] font-mono text-slate-350 light:text-slate-700 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {`curl -X POST http://localhost:5000${apiEndpoint} \\\n  -H "Content-Type: application/json" \\\n  -d '${apiSnippets[apiEndpoint].body}'`}
              </pre>

              <div className="pt-2 border-t border-slate-850 light:border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 block mb-2">Simulated Response:</span>
                <pre className="text-[10px] font-mono text-emerald-400 bg-slate-900/60 light:bg-white p-3 rounded-lg border border-slate-900 light:border-slate-200 overflow-x-auto leading-relaxed">
                  {apiSnippets[apiEndpoint].response}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. DOWNLOADABLE ASSETS */}
      <section className="py-16 px-6 bg-slate-950 dark:bg-[#040e1c] light:bg-[#f8fafc] text-center border-t border-slate-900 light:border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-slate-100 light:text-slate-800">Download Strategy Templates</h3>
          <p className="text-xs text-slate-400 light:text-slate-500 max-w-md mx-auto">
            Boost your strategic workflow operations with offline templates, guides, and documentation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => handleDownloadAsset('walkthrough_guide.txt', 'CONSTRAT AI STRATEGY GUIDE\n1. Memory Retention workflow\n2. Odysseus pre-audit\n3. Authority analysis')}
              className="glow-btn-teal px-5 py-2.5 rounded-xl border border-slate-850 light:border-slate-300 hover:bg-slate-900 light:hover:bg-slate-100 text-xs font-semibold text-slate-300 light:text-slate-750 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-[#00BFA6]" />
              PDF Walkthrough Guide
            </button>
            <button 
              onClick={() => handleDownloadAsset('task_log.txt', '# ConStrat AI Tasks Logs\nAll systems checked.\nOdysseus Orchestration loop validation success.')}
              className="glow-btn-lime px-5 py-2.5 rounded-xl border border-slate-850 light:border-slate-300 hover:bg-slate-900 light:hover:bg-slate-100 text-xs font-semibold text-slate-300 light:text-slate-750 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-[#AEEA00]" />
              Task.md Documentation
            </button>
            <button 
              onClick={() => handleDownloadAsset('weekly_report_template.txt', 'CONSTRAT AI REPORT TEMPLATE\nDate:\nReach Views:\nCTR:\nRedundancy Flag count:')}
              className="glow-btn-teal px-5 py-2.5 rounded-xl border border-slate-850 light:border-slate-300 hover:bg-slate-900 light:hover:bg-slate-100 text-xs font-semibold text-slate-300 light:text-slate-750 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-[#00BFA6]" />
              Weekly Report Template
            </button>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-slate-900 light:border-slate-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 hover:bg-slate-900 light:hover:bg-slate-100 border border-slate-850 light:border-slate-250 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 bg-[#00BFA6] hover:bg-[#00a892] text-[#0A2540] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
