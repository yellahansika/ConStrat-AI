import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../db.json');

// Helper to read database
function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { posts: [] };
  }
}

// Simple keyword tokenization for local semantic matching
function extractKeywords(text) {
  if (!text) return [];
  const stopWords = [
    'about', 'their', 'there', 'would', 'could', 'should', 'other', 'using',
    'with', 'from', 'this', 'that', 'then', 'here', 'have', 'been', 'will',
    'your', 'and', 'the', 'for', 'but', 'how', 'why', 'our', 'you', 'are'
  ];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length >= 3 && !stopWords.includes(word));
}

export class HindsightClient {
  constructor() {
    this.apiKey = process.env.HINDSIGHT_API_KEY || null;
    this.apiUrl = process.env.HINDSIGHT_API_URL || 'https://api.hindsight.vectorize.io';
  }

  /**
   * Save a post to Hindsight memory
   */
  async storeMemory(post) {
    console.log(`[Hindsight] Indexing memory for post: "${post.title}"`);
    
    if (this.apiKey) {
      try {
        const response = await axios.post(
          `${this.apiUrl}/v1/memory`,
          {
            text: `${post.title}. ${post.content}`,
            metadata: {
              id: post.id,
              channel: post.channel,
              views: post.views,
              clicks: post.clicks,
              engagement: post.engagement,
              tone: post.tone,
              date: post.date
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('[Hindsight] Cloud API Error during store, falling back to local indexing:', error.message);
      }
    }

    // Local DB write is handled by server, we just index locally
    return { status: 'success', source: 'local_memory_bank' };
  }

  /**
   * Recall similar memories and return strategic observations
   */
  async recallMemory(queryText, channel = null) {
    console.log(`[Hindsight] Recalling memories for query: "${queryText}"`);
    const db = readDb();
    const queryKeywords = extractKeywords(queryText);

    if (this.apiKey) {
      try {
        const response = await axios.post(
          `${this.apiUrl}/v1/recall`,
          {
            query: queryText,
            limit: 5,
            filter: channel ? { channel } : {}
          },
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        // Map cloud response to our format or return
        if (response.data && response.data.matches) {
          return this.processRawMemories(response.data.matches, db.posts);
        }
      } catch (error) {
        console.error('[Hindsight] Cloud API Error during recall, falling back to local engine:', error.message);
      }
    }

    // --- LOCAL RECALL ENGINE (High Fidelity Semantic Overlay) ---
    const matches = db.posts.map(post => {
      const postText = `${post.title} ${post.content}`;
      const postKeywords = extractKeywords(postText);
      
      // Calculate intersection
      const common = postKeywords.filter(k => queryKeywords.includes(k));
      const score = queryKeywords.length > 0 ? (common.length / Math.max(queryKeywords.length, 1)) : 0;

      return {
        post,
        score: parseFloat(score.toFixed(2)),
        commonKeywords: common
      };
    });

    // Filter and sort by score
    let relevantMatches = matches
      .filter(m => m.score > 0.05 || (channel && m.post.channel === channel))
      .sort((a, b) => b.score - a.score || b.post.views - a.post.views);

    // Compute top performers
    const topPerformers = [...db.posts]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        views: p.views,
        engagement: p.engagement,
        clicks: p.clicks,
        channel: p.channel,
        reason: p.views > 25000 ? 'Viral Reach' : 'High Conversion Rate'
      }));

    // Find Content Gaps (topics present in modern strategy but not in history)
    const allKeywords = db.posts.flatMap(p => extractKeywords(`${p.title} ${p.content}`));
    const keywordFrequencies = {};
    allKeywords.forEach(k => {
      keywordFrequencies[k] = (keywordFrequencies[k] || 0) + 1;
    });

    // Define standard categories and look for gaps
    const standardCategories = {
      'Web Development': ['react', 'nextjs', 'frontend', 'scaling', 'performance'],
      'AI & Machine Learning': ['ai', 'agent', 'automation', 'llm', 'generative'],
      'Search Optimization': ['seo', 'google', 'search', 'keywords', 'ranking'],
      'Email Marketing': ['newsletter', 'conversions', 'open-rate', 'email', 'ab testing'],
      'Social Strategy': ['social', 'organic', 'instagram', 'linkedin', 'engagement']
    };

    const gaps = [];
    Object.entries(standardCategories).forEach(([category, terms]) => {
      const frequency = terms.reduce((acc, term) => acc + (keywordFrequencies[term] || 0), 0);
      if (frequency === 0) {
        gaps.push({ category, severity: 'High', recommendation: `No content published on ${category}. Create a pilot post.` });
      } else if (frequency <= 2) {
        gaps.push({ category, severity: 'Medium', recommendation: `Under-covered topic. Expand your authority in ${category}.` });
      }
    });

    // Tone adaptation summary
    const toneSummary = {};
    db.posts.forEach(p => {
      if (!toneSummary[p.tone]) {
        toneSummary[p.tone] = { count: 0, totalViews: 0 };
      }
      toneSummary[p.tone].count++;
      toneSummary[p.tone].totalViews += p.views;
    });

    const tones = Object.entries(toneSummary).map(([tone, stats]) => ({
      tone,
      count: stats.count,
      avgViews: Math.round(stats.totalViews / stats.count)
    })).sort((a, b) => b.avgViews - a.avgViews);

    // Dynamic warning: Check if the query is too similar to something already published (Audit Mode)
    const duplicateMatch = matches.find(m => m.score > 0.6); // 60% semantic similarity threshold
    const auditWarning = duplicateMatch ? {
      triggered: true,
      title: duplicateMatch.post.title,
      date: duplicateMatch.post.date,
      similarity: Math.round(duplicateMatch.score * 100),
      channel: duplicateMatch.post.channel,
      message: `Audit Flag: This topic is highly similar (${Math.round(duplicateMatch.score * 100)}%) to "${duplicateMatch.post.title}" published on ${duplicateMatch.post.date}. Recommend modifying the angle to avoid content fatigue.`
    } : null;

    return {
      query: queryText,
      matches: relevantMatches.slice(0, 3),
      topPerformers,
      gaps,
      tones,
      auditWarning,
      source: this.apiKey ? 'hindsight_cloud' : 'hindsight_local_bank'
    };
  }
}

export default new HindsightClient();
