import React, { useState, useEffect } from 'react';
import { BookOpen, Mail, Video, Share2, Plus, MessageSquare, ThumbsUp, AlertCircle, Sparkles, Download, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function UserPage({ darkMode }) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({ title: '', content: '', channel: 'blog', tone: 'formal' });
  const [openComments, setOpenComments] = useState({}); // Mapping post.id -> boolean
  const [postComments, setPostComments] = useState({}); // Mapping post.id -> list of comment objects
  const [postLikes, setPostLikes] = useState({}); // Mapping post.id -> likes count
  const [auditResults, setAuditResults] = useState(null);
  const [auditing, setAuditing] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Fetch posts from database
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
      
      // Initialize comments & likes locally if not already set
      const initialComments = {};
      const initialLikes = {};
      data.forEach(p => {
        initialComments[p.id] = [
          { author: "Sarah (Strategist)", avatar: "👩‍💻", text: "Love the hook on this one! Performs really well." },
          { author: "Alex (Copywriter)", avatar: "👨‍💻", text: "Let's repackage this for the newsletter next week." }
        ];
        initialLikes[p.id] = Math.floor(Math.random() * 50) + 10;
      });
      setPostComments(prev => ({ ...initialComments, ...prev }));
      setPostLikes(prev => ({ ...initialLikes, ...prev }));
    } catch (e) {
      console.error(e);
    }
  };

  // Perform Odysseus pre-audit
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit and upload post
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          views: Math.floor(Math.random() * 15000) + 5000,
          clicks: Math.floor(Math.random() * 800) + 100,
          engagement: Math.floor(Math.random() * 600) + 50
        })
      });
      const data = await response.json();
      if (data.success) {
        fetchPosts();
        setFormData({ title: '', content: '', channel: 'blog', tone: 'formal' });
        setAuditResults(null);
        setFormOpen(false);
      }
    } catch (e) {
      console.error('Upload failed:', e);
    }
  };

  // Handle Likes
  const handleLike = (postId) => {
    setPostLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  // Handle Add comment
  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      author: "Me (Brand Lead)",
      avatar: "👑",
      text: commentText
    };
    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
  };

  // Export details CSV
  const handleExportCSV = () => {
    let csv = 'Title,Channel,Tone,Views,Clicks,Date\n';
    posts.forEach(p => {
      csv += `"${p.title.replace(/"/g, '""')}",${p.channel},${p.tone},${p.views},${p.clicks},${p.date}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_content_catalog.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter list
  const filteredPosts = posts.filter(p => filter === 'all' || p.channel === filter);

  // Compute aggregate statistics
  const totalUploads = posts.length;
  const avgViews = totalUploads > 0 ? Math.round(posts.reduce((acc, p) => acc + p.views, 0) / totalUploads) : 0;
  const topPost = [...posts].sort((a, b) => b.views - a.views)[0] || null;

  const getChannelIcon = (ch) => {
    switch (ch) {
      case 'blog': return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'email': return <Mail className="w-4 h-4 text-indigo-400" />;
      case 'video': return <Video className="w-4 h-4 text-amber-400" />;
      case 'social': return <Share2 className="w-4 h-4 text-rose-400" />;
      default: return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className={`flex-1 flex flex-col overflow-hidden text-slate-100 ${darkMode ? 'dark' : 'light'}`}>
      
      <div className="flex-1 flex overflow-hidden dashboard-container">
        
        {/* LEFT COLUMN: Gallery Grid */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 light:border-slate-200">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">My Content Gallery</h1>
              <p className="text-sm text-slate-400 light:text-slate-550 mt-1">Track your uploads, engagements, and comments thread history.</p>
            </div>
            
            <button
              onClick={() => setFormOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00BFA6] to-[#AEEA00] hover:opacity-95 text-[#0A2540] text-xs font-bold flex items-center gap-1.5 shadow active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Post
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex bg-slate-950/60 light:bg-slate-100 p-1 rounded-xl border border-slate-850 light:border-slate-300 text-xs font-bold gap-1 self-start">
            {['all', 'blog', 'email', 'video', 'social'].map(ch => (
              <button
                key={ch}
                onClick={() => setFilter(ch)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === ch 
                    ? 'bg-[#00BFA6] text-[#0A2540] font-extrabold'
                    : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-850'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          {/* Gallery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => {
              const showComments = !!openComments[post.id];
              const commentsList = postComments[post.id] || [];
              const likes = postLikes[post.id] || 0;
              const isTop = topPost && topPost.id === post.id;

              return (
                <div 
                  key={post.id} 
                  className="p-5 rounded-2xl bg-[#0A2540]/40 light:bg-white border border-slate-850 light:border-slate-200 flex flex-col justify-between space-y-4 glow-card group relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    <span className="text-[9px] bg-slate-950/90 text-[#00BFA6] font-semibold px-2 py-1 rounded border border-[#00BFA6]/20 shadow-md">
                      {isTop ? "★ Top performer!" : "Calculated +20% fit score average."}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-slate-400 light:text-slate-500 font-semibold uppercase">{post.date}</span>
                      <span className="flex items-center gap-1 text-[10px] bg-slate-950/60 light:bg-slate-100 px-2 py-0.5 rounded-full border border-slate-800 light:border-slate-250 font-bold">
                        {getChannelIcon(post.channel)}
                        <span className="capitalize">{post.channel}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-100 light:text-slate-800 leading-snug line-clamp-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-400 light:text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-850 light:border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-[9px] text-slate-450 block">Views Reach</span>
                      <span className="font-extrabold text-[#00BFA6]">{(post.views / 1000).toFixed(1)}k</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-450 block">CTR clicks</span>
                      <span className="font-extrabold text-brandSecondary">{((post.clicks / Math.max(post.views, 1)) * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-450 block">Tone Style</span>
                      <span className="font-extrabold text-slate-300 light:text-slate-700 capitalize">{post.tone}</span>
                    </div>
                  </div>

                  {/* Footer actions & comments toggle */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-4 text-slate-400 light:text-slate-600">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1 hover:text-[#00BFA6] transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4 text-slate-500 hover:text-[#00BFA6]" />
                        <span>{likes}</span>
                      </button>
                      <button 
                        onClick={() => setOpenComments(prev => ({ ...prev, [post.id]: !showComments }))}
                        className="flex items-center gap-1 hover:text-[#00BFA6] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                        <span>{commentsList.length}</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setOpenComments(prev => ({ ...prev, [post.id]: !showComments }))}
                      className="text-[10px] text-[#00BFA6] font-bold flex items-center gap-0.5 hover:underline"
                    >
                      {showComments ? 'Hide Feed' : 'Show Feed'}
                      {showComments ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Collapsible comments section */}
                  {showComments && (
                    <div className="pt-3 border-t border-slate-850 light:border-slate-200 space-y-3 animate-slide-up">
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {commentsList.map((c, cIdx) => (
                          <div key={cIdx} className="p-2 rounded bg-slate-950/60 light:bg-slate-50 text-[10.5px] border border-slate-900 light:border-slate-200">
                            <div className="flex items-center justify-between font-semibold text-slate-300 light:text-slate-700">
                              <span>{c.avatar} {c.author}</span>
                              <span className="text-[9px] text-slate-500">Just now</span>
                            </div>
                            <p className="text-slate-400 light:text-slate-500 mt-1">{c.text}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add comments form */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const val = e.target.commentText.value;
                          handleAddComment(post.id, val);
                          e.target.reset();
                        }}
                        className="flex items-center gap-1.5"
                      >
                        <input 
                          type="text" 
                          name="commentText"
                          placeholder="Add to comment stream..."
                          className="flex-1 px-2.5 py-1.5 rounded bg-slate-950 light:bg-slate-100 border border-slate-850 light:border-slate-350 text-[10.5px] text-slate-300 light:text-slate-800 focus:outline-none focus:border-[#00BFA6]"
                        />
                        <button 
                          type="submit"
                          className="px-3 py-1.5 bg-[#00BFA6] text-[#0A2540] font-bold text-[10.5px] rounded hover:opacity-90 transition-opacity"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </main>

        {/* RIGHT COLUMN: Sidebar Stats */}
        <aside className="w-80 flex flex-col glass-panel border-l shrink-0 p-6 space-y-6">
          <div className="border-b border-slate-800 light:border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-100 light:text-slate-805">Performance Summary</h3>
            <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">Summary reports calculated from database registry.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/40 light:bg-slate-50 border border-slate-850 light:border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Total Uploads</span>
              <h4 className="text-2xl font-black text-slate-100 light:text-slate-850">{totalUploads}</h4>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 light:bg-slate-50 border border-slate-850 light:border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Average Views</span>
              <h4 className="text-2xl font-black text-[#00BFA6]">{(avgViews / 1000).toFixed(1)}k</h4>
            </div>

            {topPost && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0A2540] to-slate-950 border border-[#00BFA6]/20 space-y-2">
                <span className="text-[9px] bg-[#00BFA6]/15 text-[#00BFA6] border border-[#00BFA6]/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block w-max">Top Campaign</span>
                <h5 className="text-xs font-bold text-slate-200 line-clamp-1 mt-1">"{topPost.title}"</h5>
                <span className="text-[10.5px] text-[#AEEA00] font-bold block">{(topPost.views / 1000).toFixed(1)}k views reach</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 light:border-slate-200 pt-4 space-y-2 text-xs">
            <button 
              onClick={handleExportCSV}
              className="glow-btn-teal w-full py-2.5 rounded-xl border border-slate-800 light:border-slate-350 hover:bg-slate-900 light:hover:bg-slate-100 font-semibold text-slate-300 light:text-slate-700 flex items-center justify-center gap-1.5 transition-colors active:scale-95"
            >
              <Download className="w-4 h-4 text-[#00BFA6]" />
              Export Content CSV
            </button>
          </div>
        </aside>

      </div>

      {/* POPUP EDITOR MODAL FORM */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-slate-900 light:bg-white rounded-2xl border border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-800 light:border-slate-200 flex justify-between items-center bg-slate-950/40 light:bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-100 light:text-slate-850">Publish & Index New Campaign</h3>
                <p className="text-xs text-slate-400 light:text-slate-500">Draft your copy, audit similarities, and upload to gallery.</p>
              </div>
              <button 
                onClick={() => setFormOpen(false)}
                className="text-slate-400 hover:text-slate-200 light:hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPost} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 light:text-slate-605 mb-1">Channel *</label>
                  <select 
                    name="channel" 
                    value={formData.channel} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6]"
                  >
                    <option value="blog">📝 Blog Post</option>
                    <option value="email">✉️ Email Newsletter</option>
                    <option value="video">🎥 Video Tutorial</option>
                    <option value="social">📱 Social Post</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 light:text-slate-605 mb-1">Tone Tone *</label>
                  <select 
                    name="tone" 
                    value={formData.tone} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6]"
                  >
                    <option value="formal">👔 Formal</option>
                    <option value="casual">🤙 Casual</option>
                    <option value="playful">🎨 Playful</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 light:text-slate-605 mb-1">Title *</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="Insert title..."
                  value={formData.title} 
                  onChange={handleInputChange}
                  onBlur={handleLiveAudit} // Trigger audit
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 light:text-slate-605 mb-1">Content Draft *</label>
                <textarea 
                  name="content"
                  rows="4"
                  placeholder="Insert copy draft here..."
                  value={formData.content} 
                  onChange={handleInputChange}
                  onBlur={handleLiveAudit} // Trigger audit
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-[#00BFA6] resize-none"
                />
              </div>

              {/* Real-time pre-audit output */}
              {(auditing || auditResults) && (
                <div className="p-4 rounded-xl border border-dashed border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#00BFA6] uppercase">Hindsight Memory Check</span>
                    {auditing ? (
                      <span className="text-[9px] text-slate-400 animate-pulse">Running check...</span>
                    ) : (
                      <span className="text-[11px] text-slate-300 light:text-slate-750 font-semibold">
                        Predicted Fit Score: <span className={auditResults.predictedScore >= 80 ? 'text-emerald-400' : 'text-slate-400'}>{auditResults.predictedScore}%</span>
                      </span>
                    )}
                  </div>
                  
                  {auditResults?.auditWarning && (
                    <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-xs text-rose-350">
                      <strong>🚨 Duplication Warning:</strong> {auditResults.auditWarning.message}
                    </div>
                  )}
                  
                  {auditResults && !auditResults.auditWarning && (
                    <div className="text-[11px] text-slate-400 light:text-slate-500">
                      ✓ Zero duplication overlaps detected in Hindsight database. {auditResults.predictionReason}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 flex gap-3 justify-end border-t border-slate-850 light:border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-450 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="glow-btn-teal px-5 py-2 text-xs font-bold rounded-lg text-[#0A2540] bg-[#00BFA6]"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
