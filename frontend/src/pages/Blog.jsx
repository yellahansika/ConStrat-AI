import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ClipboardCheck,
  Download,
  Paperclip,
  Plus,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const categoryTags = ['Engineering', 'Science', 'AI', 'Marketing'];

const initialNews = [
  {
    id: 1,
    category: 'Engineering',
    title: 'AI architecture patterns for resilient microservices',
    summary: 'How teams are combining vector search with event-driven services to make content strategy agents more scalable.',
  },
  {
    id: 2,
    category: 'Science',
    title: 'New quantum computing benchmark boosts optimization pipelines',
    summary: 'Researchers publish results showing an 18% improvement in semantic search workloads when hybrid embedding models are used.',
  },
  {
    id: 3,
    category: 'AI',
    title: 'GPT-style agents now support tone-aware drafting with memory recall',
    summary: 'A fresh agent workflow layer helps marketing teams avoid duplicative copy while keeping content voice consistent.',
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Content calendars that adapt to trending industry angles',
    summary: 'Brands are using real-time feed signals to refresh pillar content and capture audience momentum faster.',
  },
];

const publishedPostsData = [
  {
    id: 1,
    title: 'How Memory-Powered AI Transforms Content Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=60',
    excerpt: 'A deep dive into how vector memory, tone adaptation, and trend recall create a sharper editorial impact.',
    views: 8421,
    comments: 42,
    engagement: 82,
  },
  {
    id: 2,
    title: 'AI Topic Discovery for Modern Campaigns',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=60',
    excerpt: 'Turn noisy signals into board-ready content briefs with a memory-first content strategy workflow.',
    views: 7263,
    comments: 34,
    engagement: 74,
  },
  {
    id: 3,
    title: 'Optimizing Headlines for Clicks and Credibility',
    thumbnail: 'https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=900&q=60',
    excerpt: 'A strategic framework for headlines that balance authority, clarity, and audience intent.',
    views: 5940,
    comments: 18,
    engagement: 68,
  },
];

const commentsData = [
  {
    id: 1,
    author: 'Priya Shah',
    role: 'Strategy Lead',
    avatar: 'PS',
    text: 'This public showcase helps our leadership team see the value of every published campaign.',
    likes: 12,
    replies: [
      {
        id: 11,
        author: 'Arjun Mehta',
        role: 'Copywriter',
        avatar: 'AM',
        text: 'The analytics summary made our post review faster and more shareable.',
      },
    ],
  },
  {
    id: 2,
    author: 'Maya Patel',
    role: 'Content Analyst',
    avatar: 'MP',
    text: 'I can now surface the highest-performing stories and next-step recommendations quickly.',
    likes: 8,
    replies: [],
  },
];

export default function Blog({ darkMode }) {
  const [filteredNewsCategory, setFilteredNewsCategory] = useState('All');
  const [postSort, setPostSort] = useState('mostViewed');
  const [showPinned, setShowPinned] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const [insightMessage, setInsightMessage] = useState('');

  const filteredNews = useMemo(() => {
    return filteredNewsCategory === 'All'
      ? initialNews
      : initialNews.filter((item) => item.category === filteredNewsCategory);
  }, [filteredNewsCategory]);

  const sortedPosts = useMemo(() => {
    const posts = [...publishedPostsData];
    if (postSort === 'mostCommented') {
      return posts.sort((a, b) => b.comments - a.comments);
    }
    if (postSort === 'mostRecent') {
      return posts.sort((a, b) => b.id - a.id);
    }
    return posts.sort((a, b) => b.views - a.views);
  }, [postSort]);

  const totalPosts = publishedPostsData.length;
  const averageViews = Math.round(publishedPostsData.reduce((sum, post) => sum + post.views, 0) / totalPosts);
  const topPost = publishedPostsData.reduce((best, post) => (post.views > best.views ? post : best), publishedPostsData[0]);

  const handleSaveInsight = (headline) => {
    setInsightMessage(`Saved insight: ${headline}`);
    setTimeout(() => setInsightMessage(''), 2600);
  };

  const handleExportSummary = (format) => {
    const csv = [
      ['Post', 'Views', 'Comments', 'Engagement %'],
      ...publishedPostsData.map((post) => [post.title, post.views, post.comments, `${post.engagement}%`]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const content =
      format === 'csv'
        ? csv
        : `Performance Summary\n\nTotal Posts: ${totalPosts}\nAverage Views: ${averageViews}\nTop Post: ${topPost.title}`;
    const type = format === 'csv' ? 'text/csv' : 'application/pdf';
    const extension = format === 'csv' ? 'csv' : 'pdf';
    const fileName = `constrat_blog_summary.${extension}`;

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

  return (
    <div className={`flex-1 overflow-y-auto px-6 pb-10 ${darkMode ? 'bg-[#061424] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-[1600px] mx-auto pt-8 space-y-8">
        <section className="rounded-[28px] border border-slate-700/40 bg-[#08182f] p-8 shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#00BFA6] font-semibold">
                <Sparkles className="w-4 h-4" /> Public Blog Showcase
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">My Blog</h1>
              <p className="text-slate-300 text-lg">A polished showcase of published stories, audience metrics, and signal-driven storytelling.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="inline-flex items-center gap-2 rounded-2xl border border-[#00BFA6]/30 bg-[#00BFA6]/10 px-4 py-3 text-sm font-semibold text-[#00BFA6] transition hover:bg-[#00BFA6]/15" to="/dashboard">
                <ArrowRight className="w-4 h-4" /> Back to Dashboard
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-2xl border border-slate-600 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900/90" to="/resources">
                <Paperclip className="w-4 h-4" /> Resources
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Performance Dashboard</p>
                  <h2 className="mt-3 text-2xl font-bold">Published posts and audience signal</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-950/90 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Published posts</p>
                    <p className="mt-2 text-3xl font-bold text-slate-100">{totalPosts}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Avg views</p>
                    <p className="mt-2 text-3xl font-bold text-[#00BFA6]">{averageViews.toLocaleString()}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Top engagement</p>
                    <p className="mt-2 text-3xl font-bold text-[#AEEA00]">{topPost.engagement}%</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-slate-400 leading-relaxed">This view removes internal drafting tools and highlights the public narrative that matters for external audiences.</p>
            </section>

            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Published Posts Gallery</p>
                  <h2 className="mt-3 text-2xl font-bold">Featured case studies</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['mostViewed', 'mostRecent', 'mostCommented'].map((sortKey) => (
                    <button
                      key={sortKey}
                      onClick={() => setPostSort(sortKey)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase transition ${postSort === sortKey ? 'bg-[#00BFA6]/15 border-[#00BFA6]/30 text-[#00BFA6]' : 'border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/50'}`}
                    >
                      {sortKey === 'mostViewed' ? 'Most Viewed' : sortKey === 'mostRecent' ? 'Most Recent' : 'Most Commented'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid gap-5 xl:grid-cols-3">
                {sortedPosts.map((post) => (
                  <div key={post.id} className="group rounded-[28px] border border-slate-700/50 bg-[#041021] p-5 shadow-2xl transition hover:-translate-y-1 hover:border-[#00BFA6]/35 hover:bg-slate-900/95">
                    <div className="relative overflow-hidden rounded-3xl bg-slate-900/80">
                      <img src={post.thumbnail} alt={post.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#00BFA6]/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-950">Views</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <h3 className="text-xl font-semibold text-slate-100">{post.title}</h3>
                      <p className="text-slate-400">{post.excerpt}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Views</p>
                          <p className="mt-2 text-lg font-semibold text-[#00BFA6]">{post.views.toLocaleString()}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Comments</p>
                          <p className="mt-2 text-lg font-semibold text-slate-100">{post.comments}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Performance Summary</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Posts Published</p>
                  <p className="mt-3 text-3xl font-bold text-slate-100">{totalPosts}</p>
                </div>
                <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Avg Views</p>
                  <p className="mt-3 text-3xl font-bold text-[#00BFA6]">{averageViews.toLocaleString()}</p>
                </div>
                <div className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Top Post</p>
                  <p className="mt-3 text-sm font-semibold text-slate-100">{topPost.title}</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-[#00BFA6]" style={{ width: `${topPost.engagement}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <button
                  onClick={() => handleExportSummary('csv')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00BFA6]/40 bg-[#00BFA6]/10 px-4 py-3 text-sm font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button
                  onClick={() => handleExportSummary('pdf')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
                >
                  <Download className="w-4 h-4" /> Export PDF
                </button>
                {exportMessage && <p className="text-sm text-emerald-300">{exportMessage}</p>}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Industry Signal</p>
              <div className="mt-5 space-y-4">
                {filteredNews.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5">
                    <div className="flex items-center justify-between gap-3 text-sm uppercase tracking-[0.2em] text-[#00BFA6] font-semibold">
                      <span>{item.category}</span>
                      <span className="text-slate-500">Trending</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-100">{item.title}</h3>
                    <p className="mt-2 text-slate-400">{item.summary}</p>
                    <button
                      onClick={() => handleSaveInsight(item.title)}
                      className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#00BFA6]/30 bg-[#00BFA6]/10 px-4 py-2 text-sm font-semibold text-[#00BFA6] hover:bg-[#00BFA6]/15 transition"
                    >
                      <Plus className="w-4 h-4" /> Save Insight
                    </button>
                  </div>
                ))}
              </div>
              {insightMessage && <p className="mt-4 text-sm text-emerald-300">{insightMessage}</p>}
            </section>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-700/50 bg-[#071824] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#00BFA6] font-semibold">Audience Feedback</p>
              <h2 className="mt-3 text-2xl font-bold">Top comments from readers</h2>
              <p className="mt-2 text-sm text-slate-400">Quick reactions from the audience that support your published story narrative.</p>
            </div>
            <button
              onClick={() => setShowPinned(!showPinned)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
            >
              <ClipboardCheck className="w-4 h-4" /> {showPinned ? 'Hide Pinned' : 'Show Pinned'}
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {commentsData.map((comment) => (
              <div key={comment.id} className="rounded-3xl border border-slate-700/60 bg-[#041021] p-5 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00BFA6]/10 text-sm font-bold uppercase text-[#00BFA6]">{comment.avatar}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div>
                        <p className="font-semibold text-slate-100">{comment.author}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{comment.role}</p>
                      </div>
                      <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#00BFA6]">{comment.likes} likes</span>
                    </div>
                    <p className="mt-4 text-slate-300">{comment.text}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:border-[#00BFA6]/40 hover:text-[#00BFA6] transition">Reply</button>
                      <button className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:border-[#00BFA6]/40 hover:text-[#00BFA6] transition">Like</button>
                      <button className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:border-[#00BFA6]/40 hover:text-[#00BFA6] transition">Pin</button>
                    </div>
                    {showPinned && comment.replies.length > 0 && (
                      <div className="mt-5 rounded-3xl border border-slate-800/60 bg-slate-950/90 p-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-sm font-bold uppercase text-slate-200">{reply.avatar}</div>
                              <div>
                                <p className="text-sm font-semibold text-slate-100">{reply.author}</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{reply.role}</p>
                              </div>
                            </div>
                            <p className="text-slate-400">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
