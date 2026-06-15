import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import WorkspaceSidebar from '../components/WorkspaceSidebar';
import {
  ArrowRight,
  FileText,
  Download,
  Edit3,
  Feather,
  Paperclip,
  Plus,
  Sparkles,
  TrendingUp,
  Trash2,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Award,
} from 'lucide-react';

const toneOptions = ['Formal', 'Casual', 'Persuasive', 'Academic'];
const categoryTags = ['Engineering', 'Science', 'AI', 'Marketing'];

const trendingNews = [
  {
    id: 1,
    category: 'Engineering',
    title: 'AI architecture patterns for resilient microservices',
    summary: 'How teams are combining vector search with event-driven services to make content strategy agents more scalable.',
    source: 'TechCrunch',
  },
  {
    id: 2,
    category: 'Science',
    title: 'New quantum computing benchmark boosts optimization pipelines',
    summary: 'Researchers publish results showing an 18% improvement in semantic search workloads when hybrid embedding models are used.',
    source: 'Nature',
  },
  {
    id: 3,
    category: 'AI',
    title: 'GPT-style agents now support tone-aware drafting with memory recall',
    summary: 'A fresh agent workflow layer helps marketing teams avoid duplicative copy while keeping content voice consistent.',
    source: 'ArXiv',
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Content calendars that adapt to trending industry angles',
    summary: 'Brands are using real-time feed signals to refresh pillar content and capture audience momentum faster.',
    source: 'HubSpot',
  },
];

const savedDrafts = [
  {
    id: 1,
    title: 'The Future of Memory-Driven Content',
    excerpt: 'Exploring how AI memory systems are reshaping editorial workflows...',
    status: 'draft',
    lastEdited: '2 hours ago',
    wordCount: 1250,
  },
  {
    id: 2,
    title: 'Scaling AI Teams Across Timezones',
    excerpt: 'Best practices for distributed content strategy teams using AI tools...',
    status: 'draft',
    lastEdited: '5 hours ago',
    wordCount: 890,
  },
  {
    id: 3,
    title: 'AI-Powered Analytics for Content Performance',
    excerpt: 'Using predictive modeling to optimize post performance and audience reach...',
    status: 'reviewing',
    lastEdited: '1 day ago',
    wordCount: 2140,
  },
];

const draftVersionHistory = {
  1: [
    { version: 'v1.0', note: 'Initial outline', excerpt: 'Created the first structure for the memory-driven content narrative.' },
    { version: 'v1.2', note: 'Polished intro', excerpt: 'Refined the lead paragraph for stronger audience focus.' },
    { version: 'v1.4', note: 'Tone alignment', excerpt: 'Aligned the messaging with formal brand voice and strategic clarity.' },
  ],
  2: [
    { version: 'v1.0', note: 'Rough draft', excerpt: 'Outlined time-zone planning and remote content ops.' },
    { version: 'v1.1', note: 'Data proofing', excerpt: 'Added real-world examples for distributed team coordination.' },
  ],
  3: [
    { version: 'v1.0', note: 'Metrics overview', excerpt: 'Built an analytics-first case study for performance-driven publishing.' },
    { version: 'v1.2', note: 'Recommendations added', excerpt: 'Added next step recommendations for workflow optimization.' },
  ],
};

const schedulerRecommendations = [
  {
    title: 'Tue · 10:00 AM',
    detail: 'Engineering and AI audiences engage best mid-morning.',
  },
  {
    title: 'Thu · 2:30 PM',
    detail: 'Marketing readers favor early afternoon publishing windows.',
  },
  {
    title: 'Fri · 5:00 PM',
    detail: 'Weekend preview emails receive higher CTR from strategy teams.',
  },
];

function estimateReadability(text) {
  if (!text.trim()) return 0;
  const words = text.trim().split(/\s+/).length;
  const sentences = Math.max(text.split(/[.!?]+/).filter(Boolean).length, 1);
  const syllables = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .reduce((count, word) => count + Math.max(1, word.replace(/[^aeiouy]/g, '').length), 0);
  const score = Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words));
  return Math.min(100, Math.max(score, 10));
}

function improveGrammar(text) {
  if (!text) return '';
  return text
    .replace(/\s{2,}/g, ' ')
    .replace(/\bi\b/g, 'I')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/([.!?])([A-Za-z])/g, '$1 $2')
    .replace(/(\b)(thier)(\b)/gi, '$1their$3');
}

function buildHeadlineSuggestions(text) {
  if (!text.trim()) return ['AI-powered content strategy for modern teams', 'Building scalable editorial workflows with AI', 'Memory-first approach to content creation'];
  return [
    `Optimize "${text.slice(0, 25)}…" for maximum engagement`,
    `Strategic insights on ${text.split(' ').slice(0, 3).join(' ')}`,
    'Boost reach with data-driven headlines',
  ];
}

function buildTopicSuggestions(category) {
  return {
    Engineering: ['AI debugging workflows', 'System design best practices', 'Scalable architecture patterns'],
    Science: ['Research breakthroughs', 'Scientific methodology', 'Data-driven discoveries'],
    AI: ['Machine learning trends', 'AI safety considerations', 'LLM applications'],
    Marketing: ['Audience segmentation', 'Campaign optimization', 'Content distribution'],
  }[category] || ['Industry trends', 'Best practices', 'Case studies'];
}

export default function Content({ darkMode }) {
  const [editorText, setEditorText] = useState('Start writing your next post here. The AI editor will help with grammar, tone, and topic suggestions.');
  const [selectedTone, setSelectedTone] = useState('Formal');
  const [selectedCategory, setSelectedCategory] = useState('AI');
  const [headlineIdeas, setHeadlineIdeas] = useState([]);
  const [topicIdeas, setTopicIdeas] = useState([]);
  const [filteredNewsCategory, setFilteredNewsCategory] = useState('All');
  const [newsFilter, setNewsFilter] = useState('All');
  const [draftSort, setDraftSort] = useState('recent');
  const [exportMessage, setExportMessage] = useState('');
  const [drafts, setDrafts] = useState(savedDrafts);
  const [selectedDraftId, setSelectedDraftId] = useState(savedDrafts[0]?.id || null);
  const [compareDraftIds, setCompareDraftIds] = useState(savedDrafts.slice(0, 2).map((draft) => draft.id));
  const [showCompare, setShowCompare] = useState(false);
  const [reportStatus, setReportStatus] = useState('');
  const [publishMessage, setPublishMessage] = useState('');

  const activeDraft = drafts.find((draft) => draft.id === selectedDraftId);
  const readabilityScore = useMemo(() => estimateReadability(editorText), [editorText]);
  const wordCount = useMemo(() => editorText.trim().split(/\s+/).length, [editorText]);
  
  const correctionSuggestion = useMemo(() => {
    const cleaned = improveGrammar(editorText);
    return cleaned === editorText ? 'No grammar issues' : 'Grammar review recommended';
  }, [editorText]);

  const filteredNews = useMemo(() => {
    return newsFilter === 'All'
      ? trendingNews
      : trendingNews.filter((item) => item.category === newsFilter);
  }, [newsFilter]);

  const sortedDrafts = useMemo(() => {
    const list = [...drafts];
    if (draftSort === 'oldest') {
      return list.reverse();
    }
    return list;
  }, [draftSort, drafts]);

  const handleImproveWithAI = () => {
    setEditorText((prev) => `${improveGrammar(prev)}\n\nAI Enhancement: Improved clarity and structure for better engagement.`);
  };

  const handleHeadlineSuggestions = () => {
    setHeadlineIdeas(buildHeadlineSuggestions(editorText));
  };

  const handleTopicSuggestions = () => {
    setTopicIdeas(buildTopicSuggestions(selectedCategory));
  };

  const handleAddToEditor = (text) => {
    setEditorText((prev) => `${prev}\n\n${text}`);
  };

  const handleExportDraft = (format) => {
    const csv = [
      ['Draft Title', 'Status', 'Word Count', 'Last Edited'],
      ...drafts.map((draft) => [draft.title, draft.status, draft.wordCount, draft.lastEdited]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const content =
      format === 'csv'
        ? csv
        : `Content Summary\n\nTotal Drafts: ${drafts.length}\nWord Count: ${wordCount}\nCurrent Readability: ${readabilityScore}\nTone: ${selectedTone}\n\nDrafts:\n${drafts.map((d) => `- ${d.title} (${d.status})`).join('\n')}`;

    const type = format === 'csv' ? 'text/csv' : 'application/pdf';
    const extension = format === 'csv' ? 'csv' : 'pdf';
    const fileName = `content_export.${extension}`;

    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    setExportMessage(`Exported ${fileName}`);
    setTimeout(() => setExportMessage(''), 2800);
  };

  const handleDeleteDraft = (id) => {
    setDrafts((prev) => prev.filter((draft) => draft.id !== id));
    if (selectedDraftId === id) {
      const remaining = drafts.filter((draft) => draft.id !== id);
      setSelectedDraftId(remaining[0]?.id || null);
    }
  };

  const handlePublishDraft = (id) => {
    setDrafts((prev) => prev.map((draft) => (draft.id === id ? { ...draft, status: 'published' } : draft)));
    setPublishMessage('Draft moved to published workspace.');
    setTimeout(() => setPublishMessage(''), 3200);
  };

  const handleEditDraft = (id) => {
    const draft = drafts.find((item) => item.id === id);
    if (draft) {
      setSelectedDraftId(id);
      setEditorText(`${draft.excerpt}\n\n${editorText}`);
    }
  };

  const handleSaveDraft = () => {
    if (!selectedDraftId) return;
    setDrafts((prev) => prev.map((draft) =>
      draft.id === selectedDraftId
        ? { ...draft, excerpt: editorText, lastEdited: 'Just now', wordCount: editorText.trim().split(/\s+/).length }
        : draft
    ));
    setPublishMessage('Draft saved to your private workspace.');
    setTimeout(() => setPublishMessage(''), 3200);
  };

  useEffect(() => {
    if (!selectedDraftId) return undefined;
    const interval = setInterval(() => {
      setDrafts((prev) => prev.map((draft) =>
        draft.id === selectedDraftId
          ? { ...draft, excerpt: editorText, lastEdited: 'Autosaved', wordCount: editorText.trim().split(/\s+/).length }
          : draft
      ));
      setPublishMessage('Draft autosaved.');
      const timeout = setTimeout(() => setPublishMessage(''), 1500);
      return () => clearTimeout(timeout);
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedDraftId, editorText]);

  const handleGenerateWeeklyReport = () => {
    setReportStatus('Weekly auto-report generated for your drafts and performance metrics.');
    setTimeout(() => setReportStatus(''), 4200);
  };

  const handleCompareDrafts = () => {
    setShowCompare((prev) => !prev);
  };

  const badges = [
    { title: 'Consistency Champ', detail: '10 posts in a month', earned: true, icon: '🔥' },
    { title: 'Engagement Hero', detail: '100+ comments on a post', earned: false, icon: '⭐' },
    { title: 'Trend Spotter', detail: 'Publish a trending story', earned: true, icon: '🎯' },
  ];

  return (
    <div className={`flex-1 overflow-y-auto px-6 pb-10 ${darkMode ? 'bg-[#061424] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-[1600px] mx-auto pt-8 xl:grid xl:grid-cols-[280px_1fr] xl:gap-6">
        <WorkspaceSidebar />
        <div className="space-y-8">
        {/* Header Section */}
        <section className="rounded-[28px] border border-slate-700/40 bg-[#08182f] p-8 shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#00BFA6] font-semibold">
                <Sparkles className="w-4 h-4" /> AI Content Studio
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">My Content</h1>
              <p className="text-slate-300 text-lg">Create and optimize your posts with AI-powered editing, trending topic suggestions, and performance insights.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="inline-flex items-center gap-2 rounded-2xl border border-[#00BFA6]/30 bg-[#00BFA6]/10 px-4 py-3 text-sm font-semibold text-[#00BFA6] transition hover:bg-[#00BFA6]/15" to="/blog">
                <ArrowRight className="w-4 h-4" /> My Blog
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900/90" to="/dashboard">
                <Paperclip className="w-4 h-4" /> Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          {/* Left Column - Editor & News Feed */}
          <div className="space-y-6">
            {/* AI-Powered Editor */}
            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">AI-Powered Editor</p>
                  <h2 className="mt-3 text-2xl font-bold">Create and refine your content</h2>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="rounded-3xl bg-slate-950/90 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Readability</p>
                    <p className="mt-2 text-2xl font-bold text-[#00BFA6]">{readabilityScore}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Words</p>
                    <p className="mt-2 text-2xl font-bold text-slate-100">{wordCount}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tone</p>
                    <p className="mt-2 text-lg font-bold text-slate-100">{selectedTone[0]}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Grammar</p>
                    <p className="mt-2 text-lg font-bold text-[#AEEA00]">✓</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
                <div className="space-y-4">
                  <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Post Editor</label>
                  <textarea
                    rows={16}
                    value={editorText}
                    onChange={(event) => setEditorText(event.target.value)}
                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 p-5 text-slate-100 outline-none transition focus:border-[#00BFA6] focus:ring-4 focus:ring-[#00BFA6]/10 resize-none"
                  />
                  <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition">
                      <FileText className="w-4 h-4" /> Save Draft
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-[#00BFA6]/40 bg-[#00BFA6]/10 px-3 py-2 text-xs font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition">
                      <Send className="w-4 h-4" /> Publish
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-700/70 bg-[#041021] p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#00BFA6] font-semibold">Editor Tools</p>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Tone Checker</label>
                        <select
                          value={selectedTone}
                          onChange={(event) => setSelectedTone(event.target.value)}
                          className="w-full rounded-2xl border border-slate-700 bg-[#071724] px-3 py-2 text-slate-100 outline-none text-sm"
                        >
                          {toneOptions.map((tone) => (
                            <option key={tone} value={tone}>{tone}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(event) => setSelectedCategory(event.target.value)}
                          className="w-full rounded-2xl border border-slate-700 bg-[#071724] px-3 py-2 text-slate-100 outline-none text-sm"
                        >
                          {categoryTags.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-2">
                        <button
                          onClick={handleImproveWithAI}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00BFA6]/40 bg-[#00BFA6]/10 px-3 py-2 text-xs font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition"
                        >
                          <Edit3 className="w-3 h-3" /> Improve
                        </button>
                        <button
                          onClick={handleHeadlineSuggestions}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition"
                        >
                          <Feather className="w-3 h-3" /> Headlines
                        </button>
                        <button
                          onClick={handleTopicSuggestions}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition"
                        >
                          <TrendingUp className="w-3 h-3" /> Topics
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-700/70 bg-[#041021] p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#00BFA6] font-semibold">AI Suggestions</p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-3xl border border-slate-800/60 bg-[#071724] p-3 text-sm text-slate-300 max-h-[200px] overflow-y-auto">
                        <p className="font-semibold text-slate-100 text-xs">Headlines</p>
                        {headlineIdeas.length === 0 ? (
                          <p className="mt-2 text-slate-400 text-xs">Click "Headlines" for AI suggestions</p>
                        ) : (
                          <ul className="mt-2 space-y-2">
                            {headlineIdeas.map((idea, idx) => (
                              <li key={idx} className="text-xs text-slate-200">• {idea}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="rounded-3xl border border-slate-800/60 bg-[#071724] p-3 text-sm text-slate-300 max-h-[200px] overflow-y-auto">
                        <p className="font-semibold text-slate-100 text-xs">Topics</p>
                        {topicIdeas.length === 0 ? (
                          <p className="mt-2 text-slate-400 text-xs">Click "Topics" for trending ideas</p>
                        ) : (
                          <ul className="mt-2 space-y-2">
                            {topicIdeas.map((topic, idx) => (
                              <li key={idx} className="text-xs text-slate-200">• {topic}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trending News Feed */}
            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Trending Feed</p>
                  <h2 className="mt-3 text-2xl font-bold">Latest industry insights</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['All', ...categoryTags].map((category) => (
                    <button
                      key={category}
                      onClick={() => setNewsFilter(category)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase transition ${newsFilter === category ? 'bg-[#00BFA6]/15 border-[#00BFA6]/30 text-[#00BFA6]' : 'border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/50'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {filteredNews.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-700/60 bg-[#041021] p-4 transition hover:border-[#00BFA6]/40 hover:bg-slate-900/95">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#00BFA6] font-semibold">
                          <span>{item.category}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-500">{item.source}</span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-slate-100">{item.title}</h3>
                        <p className="mt-1 text-slate-400 text-sm">{item.summary}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToEditor(item.title)}
                      className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-[#00BFA6]/30 bg-[#00BFA6]/10 px-3 py-2 text-xs font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition"
                    >
                      <Plus className="w-3 h-3" /> Add to Editor
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Performance</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total Drafts</p>
                  <p className="mt-2 text-3xl font-bold text-slate-100">{drafts.length}</p>
                </div>
                <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current Words</p>
                  <p className="mt-2 text-3xl font-bold text-[#00BFA6]">{wordCount}</p>
                </div>
                <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Readability</p>
                  <p className="mt-2 text-3xl font-bold text-[#AEEA00]">{correctionSuggestion === 'No grammar issues' ? 'Clean' : 'Review'}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <button
                  onClick={() => handleExportDraft('csv')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00BFA6]/40 bg-[#00BFA6]/10 px-3 py-2 text-xs font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition"
                >
                  <Download className="w-3 h-3" /> Export CSV
                </button>
                <button
                  onClick={() => handleExportDraft('pdf')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition"
                >
                  <Download className="w-3 h-3" /> Export PDF
                </button>
                <button
                  onClick={handleGenerateWeeklyReport}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition"
                >
                  <Award className="w-3 h-3" /> Weekly Report
                </button>
                {exportMessage && <p className="text-xs text-emerald-300">{exportMessage}</p>}
                {reportStatus && <p className="text-xs text-slate-300">{reportStatus}</p>}
              </div>
            </section>

            {/* Gamified Badges */}
            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Badges</p>
              <div className="mt-5 grid gap-3">
                {badges.map((badge) => (
                  <div key={badge.title} className={`rounded-3xl border p-4 transition ${badge.earned ? 'border-[#00BFA6]/30 bg-[#00BFA6]/10' : 'border-slate-700 bg-slate-950/80'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">{badge.title}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-100">{badge.detail}</p>
                      </div>
                      <span className={`text-xl flex-shrink-0 ${badge.earned ? '' : 'opacity-40'}`}>{badge.icon}</span>
                    </div>
                    <div className={`mt-3 inline-block rounded-2xl px-2 py-1 text-xs font-bold uppercase ${badge.earned ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800/80 text-slate-400'}`}>
                      {badge.earned ? 'Earned' : 'Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Drafts Section */}
        <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Saved Drafts</p>
              <h2 className="mt-3 text-2xl font-bold">Your unpublished posts</h2>
            </div>
            <div className="flex gap-2">
              {['recent', 'oldest'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setDraftSort(sort)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase transition ${draftSort === sort ? 'bg-[#00BFA6]/15 border-[#00BFA6]/30 text-[#00BFA6]' : 'border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/50'}`}
                >
                  {sort === 'recent' ? 'Recent' : 'Oldest'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {sortedDrafts.map((draft) => (
              <div
                key={draft.id}
                onClick={() => setSelectedDraftId(draft.id)}
                className={`cursor-pointer rounded-3xl border p-5 shadow-xl transition hover:border-[#00BFA6]/35 hover:bg-slate-900/95 ${draft.id === selectedDraftId ? 'border-[#00BFA6]/40 bg-[#0a3242]' : 'border-slate-700/60 bg-[#041021]'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {draft.status === 'draft' && <Clock className="w-4 h-4 text-yellow-400" />}
                      {draft.status === 'reviewing' && <AlertCircle className="w-4 h-4 text-blue-400" />}
                      <span className="text-xs uppercase tracking-[0.2em] text-[#00BFA6] font-semibold">{draft.status}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-slate-100">{draft.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{draft.excerpt}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{draft.wordCount} words</span>
                  <span>{draft.lastEdited}</span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleEditDraft(draft.id)} className="flex-1 rounded-2xl border border-[#00BFA6]/30 bg-[#00BFA6]/10 px-2 py-2 text-xs font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition">
                    <Edit3 className="w-3 h-3 inline mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDeleteDraft(draft.id)} className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/80 px-2 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 transition">
                    <Trash2 className="w-3 h-3 inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showCompare && (
            <div className="mt-6 rounded-3xl border border-[#00BFA6]/30 bg-[#041021] p-6 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#00BFA6] font-semibold">Draft Comparison</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-100">See improvements side by side</h3>
                </div>
                <button onClick={handleCompareDrafts} className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 hover:border-[#00BFA6]/40 hover:text-[#00BFA6] transition">Close</button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {compareDraftIds.map((draftId) => {
                  const draft = drafts.find((item) => item.id === draftId);
                  return (
                    <div key={draftId} className="rounded-3xl border border-slate-700/60 bg-[#0A1B2F] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{draft?.status || 'draft'}</p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-100">{draft?.title}</h4>
                      <p className="mt-3 text-sm text-slate-300">{draft?.excerpt}</p>
                      <p className="mt-3 text-xs text-slate-500">Last edited {draft?.lastEdited}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Smart Scheduler</p>
          <h2 className="mt-3 text-2xl font-bold">Best publishing windows</h2>
          <div className="mt-6 space-y-4">
            {schedulerRecommendations.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-700/60 bg-[#041021] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-100">{item.title}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-teal-400">Recommended</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
          {showCompare && (
            <section className="mt-6 rounded-[28px] border border-[#00BFA6]/30 bg-[#041021] p-6 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Draft Comparison</p>
                  <h2 className="mt-2 text-2xl font-bold">Compare draft progress</h2>
                </div>
                <button onClick={handleCompareDrafts} className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 hover:border-[#00BFA6]/40 hover:text-[#00BFA6] transition">Close</button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {compareDraftIds.map((draftId) => {
                  const draft = drafts.find((item) => item.id === draftId);
                  return (
                    <div key={draftId} className="rounded-3xl border border-slate-700/60 bg-[#0A1B2F] p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{draft?.status || 'draft'}</p>
                      <h3 className="mt-3 text-lg font-semibold text-slate-100">{draft?.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{draft?.excerpt}</p>
                      <div className="mt-4 space-y-2 text-xs text-slate-500">
                        <p>Last edited {draft?.lastEdited}</p>
                        <p>{draft?.wordCount} words</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mt-6 rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Version History</p>
            <h2 className="mt-3 text-2xl font-bold">Track published changes</h2>
            <div className="mt-5 space-y-4">
              {(draftVersionHistory[selectedDraftId] || []).map((version) => (
                <div key={version.version} className="rounded-3xl border border-slate-700/60 bg-[#041021] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-100">{version.version}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{version.note}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{version.excerpt}</p>
                </div>
              ))}
              {!(draftVersionHistory[selectedDraftId] || []).length && (
                <p className="text-sm text-slate-400">Select a draft to view a version timeline, with autosave notes and editorial shifts.</p>
              )}
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
  );
}
