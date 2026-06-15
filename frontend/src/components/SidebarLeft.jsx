import React, { useState } from 'react';
import { Calendar, Plus, BookOpen, Mail, Video, Share2, HelpCircle } from 'lucide-react';

export default function SidebarLeft({ posts, onAddPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    channel: 'blog',
    tone: 'formal',
    views: '',
    clicks: '',
    engagement: ''
  });

  const [auditResults, setAuditResults] = useState(null);
  const [auditing, setAuditing] = useState(false);

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'blog': return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'email': return <Mail className="w-4 h-4 text-indigo-400" />;
      case 'video': return <Video className="w-4 h-4 text-amber-400" />;
      case 'social': return <Share2 className="w-4 h-4 text-rose-400" />;
      default: return <HelpCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getChannelBadgeClass = (channel) => {
    switch (channel) {
      case 'blog': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      case 'email': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'video': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'social': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Perform a live agent audit of the text to trigger "Audit Mode" warnings
  const handleLiveAudit = async () => {
    if (!formData.title || !formData.content) return;
    setAuditing(true);
    try {
      const response = await fetch('http://localhost:5000/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          channel: formData.channel,
          tone: formData.tone
        })
      });
      const data = await response.json();
      setAuditResults(data);
    } catch (e) {
      console.error('Audit failed:', e);
    } finally {
      setAuditing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.channel) return;
    
    // Call app handler
    onAddPost({
      ...formData,
      views: formData.views ? Number(formData.views) : 0,
      clicks: formData.clicks ? Number(formData.clicks) : 0,
      engagement: formData.engagement ? Number(formData.engagement) : 0
    });

    // Reset state
    setFormData({
      title: '',
      content: '',
      channel: 'blog',
      tone: 'formal',
      views: '',
      clicks: '',
      engagement: ''
    });
    setAuditResults(null);
    setIsOpen(false);
  };

  // Format dates beautifully
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <aside className="w-80 flex flex-col glass-panel border-r shrink-0">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100 light:text-slate-800">
          <Calendar className="w-5 h-5 text-brandPrimary" />
          Content Calendar
        </h2>
        <p className="text-xs text-slate-400 light:text-slate-500 mt-1">Past published campaigns registry</p>
      </div>

      {/* Calendar List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">No campaigns loaded.</div>
        ) : (
          [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
            <div 
              key={post.id} 
              className="p-3 rounded-lg bg-slate-900/60 dark:bg-slate-900/40 light:bg-slate-50 border border-slate-800 dark:border-slate-850 light:border-slate-200 glow-card"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold text-slate-400 light:text-slate-500 uppercase tracking-wider">
                  {formatDate(post.date)}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getChannelBadgeClass(post.channel)}`}>
                  {post.channel}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200 light:text-slate-800 line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-3 mt-3 pt-2 border-t border-slate-800/50 light:border-slate-250/50 text-[11px] text-slate-400 light:text-slate-500">
                <span className="flex items-center gap-1">
                  {getChannelIcon(post.channel)}
                  {post.tone}
                </span>
                <span>•</span>
                <span>{(post.views / 1000).toFixed(1)}k views</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Button */}
      <div className="p-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-brandPrimary to-brandSecondary hover:from-brandPrimary hover:to-brandSecondary text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 duration-150"
        >
          <Plus className="w-5 h-5" />
          Add New Post
        </button>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-slate-900 light:bg-white rounded-2xl border border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-800 light:border-slate-200 flex justify-between items-center bg-slate-950/40 light:bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-100 light:text-slate-800">Publish New Post</h3>
                <p className="text-xs text-slate-400 light:text-slate-500">Add content to database & update Hindsight memory bank</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 light:hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1">Channel *</label>
                  <select 
                    name="channel" 
                    value={formData.channel} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary"
                  >
                    <option value="blog">📝 Blog Post</option>
                    <option value="email">✉️ Email Campaign</option>
                    <option value="video">🎥 Video Tutorial</option>
                    <option value="social">📱 Social Post</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1">Tone Tone *</label>
                  <select 
                    name="tone" 
                    value={formData.tone} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary"
                  >
                    <option value="formal">👔 Formal</option>
                    <option value="casual">🤙 Casual</option>
                    <option value="playful">🎨 Playful</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1">Post Title *</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. SEO Best Practices for 2026"
                  value={formData.title} 
                  onChange={handleChange}
                  onBlur={handleLiveAudit} // Run audit warning on unfocus
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 light:text-slate-600 mb-1">Content Draft *</label>
                <textarea 
                  name="content"
                  rows="4"
                  placeholder="Insert content copy draft here..."
                  value={formData.content} 
                  onChange={handleChange}
                  onBlur={handleLiveAudit} // Run audit warning on unfocus
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary resize-none"
                />
              </div>

              {/* Live Hindsight Audit results */}
              {(auditing || auditResults) && (
                <div className="p-4 rounded-xl border border-dashed border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#00BFA6] uppercase">Hindsight Memory Audit</span>
                    {auditing ? (
                      <span className="text-[10px] text-slate-400 animate-pulse">Analyzing drafts...</span>
                    ) : (
                      <span className="text-xs text-slate-300 light:text-slate-700 font-semibold">
                        Predicted Score: <span className={auditResults.predictedScore >= 80 ? 'text-emerald-400' : 'text-slate-400'}>{auditResults.predictedScore}%</span>
                      </span>
                    )}
                  </div>
                  
                  {auditResults?.auditWarning && (
                    <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                      <strong>🚨 Audit Warning:</strong> {auditResults.auditWarning.message}
                    </div>
                  )}
                  
                  {auditResults && !auditResults.auditWarning && (
                    <div className="text-xs text-slate-400 light:text-slate-500">
                      ✓ No duplication duplicates flagged. {auditResults.predictionReason}
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-slate-800/80 light:border-slate-200 pt-4">
                <span className="block text-[10px] font-bold text-slate-400 light:text-slate-500 mb-2 uppercase tracking-wide">Historical Metrics (Optional for Seeding)</span>
                <div className="grid grid-cols-3 gap-2">
                  <input 
                    type="number" 
                    name="views"
                    placeholder="Views"
                    value={formData.views} 
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary text-sm"
                  />
                  <input 
                    type="number" 
                    name="clicks"
                    placeholder="Clicks"
                    value={formData.clicks} 
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary text-sm"
                  />
                  <input 
                    type="number" 
                    name="engagement"
                    placeholder="Engagement"
                    value={formData.engagement} 
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-brandPrimary text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-400 hover:text-slate-200 light:hover:text-slate-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-brandPrimary to-brandSecondary active:scale-95"
                >
                  Publish & Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
