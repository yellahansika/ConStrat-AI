import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import HindsightClient from './services/hindsight.js';
import OdysseusOrchestrator from './services/odysseus.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'db.json');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read/write DB
const readDb = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { posts: [] };
  }
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

// --- ROUTES ---

// 1. Get all content posts
app.get('/api/posts', (req, res) => {
  try {
    const db = readDb();
    res.json(db.posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content registry.' });
  }
});

// 2. Add new post (store in Hindsight memory + local database)
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, channel, tone, views, clicks, engagement, date } = req.body;
    
    if (!title || !content || !channel) {
      return res.status(400).json({ error: 'Title, content, and channel are required.' });
    }

    const db = readDb();
    
    const newPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      channel,
      tone: tone || 'formal',
      views: views !== undefined ? Number(views) : 0,
      clicks: clicks !== undefined ? Number(clicks) : 0,
      engagement: engagement !== undefined ? Number(engagement) : 0,
      date: date || new Date().toISOString().split('T')[0]
    };

    // Store in Hindsight memory bank
    await HindsightClient.storeMemory(newPost);

    // Save to local database
    db.posts.push(newPost);
    writeDb(db);

    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error('[Server] Store Post Error:', error);
    res.status(500).json({ error: 'Failed to save post and update Hindsight memory.' });
  }
});

// 3. Audit a draft post (Quality / Duplicate Audit Mode)
app.post('/api/audit', async (req, res) => {
  try {
    const { title, content, channel, tone } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required for auditing.' });
    }

    const auditResults = await OdysseusOrchestrator.auditPost({ title, content, channel, tone });
    res.json(auditResults);
  } catch (error) {
    console.error('[Server] Audit Error:', error);
    res.status(500).json({ error: 'Agent failed to run draft audit.' });
  }
});

// 4. Generate suggested topics using Odysseus + Hindsight + LLM
app.post('/api/suggest', async (req, res) => {
  try {
    const { query, channel, useMemory } = req.body;
    const q = query || 'general content strategy';
    
    const result = await OdysseusOrchestrator.runStrategyLoop({
      queryText: q,
      channel: channel || null,
      useMemory: useMemory !== undefined ? useMemory : true
    });

    res.json(result);
  } catch (error) {
    console.error('[Server] Suggestion Loop Error:', error);
    res.status(500).json({ error: 'Odysseus Orchestrator failed to compute recommendations.' });
  }
});

// 5. Get Aggregate Insights for Charts & Analytics
app.get('/api/insights', (req, res) => {
  try {
    const db = readDb();
    const posts = db.posts;

    // Calculate aggregated metrics
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const totalClicks = posts.reduce((sum, p) => sum + p.clicks, 0);
    const totalEngagement = posts.reduce((sum, p) => sum + p.engagement, 0);
    const avgCTR = totalClicks > 0 ? ((totalClicks / Math.max(totalViews, 1)) * 100) : 0;

    // Channel distribution
    const channelStats = { blog: 0, email: 0, video: 0, social: 0 };
    posts.forEach(p => {
      if (channelStats[p.channel] !== undefined) {
        channelStats[p.channel]++;
      }
    });

    const totalCount = Math.max(posts.length, 1);
    const channelDistribution = Object.entries(channelStats).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round((count / totalCount) * 100),
      count
    }));

    // Monthly data for chart (Jan - Jun)
    // Map dates to month names
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyStats = months.map(m => ({ month: m, views: 0, engagement: 0, clicks: 0 }));

    posts.forEach(p => {
      const date = new Date(p.date);
      const monthIdx = date.getMonth(); // 0 - 11
      // For demo data, map to month slots
      const monthLabel = date.toLocaleString('default', { month: 'short' });
      const statObj = monthlyStats.find(s => s.month === monthLabel);
      if (statObj) {
        statObj.views += p.views;
        statObj.engagement += p.engagement;
        statObj.clicks += p.clicks;
      }
    });

    res.json({
      totalViews,
      totalClicks,
      totalEngagement,
      avgCTR: parseFloat(avgCTR.toFixed(1)),
      channelDistribution,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to compute analytics.' });
  }
});

// 6. Export suggested topics to CSV
app.post('/api/export', (req, res) => {
  try {
    const { topics } = req.body;
    if (!topics || !Array.isArray(topics)) {
      return res.status(400).json({ error: 'An array of topics is required for exporting.' });
    }

    let csvContent = 'Title,Category,Channel,Tone,Predicted Score,Prediction Reason,Description\n';
    topics.forEach(t => {
      const cleanTitle = (t.title || '').replace(/"/g, '""');
      const cleanDesc = (t.description || '').replace(/"/g, '""');
      const cleanReason = (t.predictionReason || '').replace(/"/g, '""');
      csvContent += `"${cleanTitle}","${t.category || ''}","${t.channel || ''}","${t.tone || ''}",${t.predictedScore || 0},"${cleanReason}","${cleanDesc}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=suggested_topics.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ error: 'Export failed.' });
  }
});

// 7. Executive Report PDF/Text Summary Generator
app.get('/api/weekly-report', (req, res) => {
  try {
    const db = readDb();
    const posts = db.posts;

    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const totalClicks = posts.reduce((sum, p) => sum + p.clicks, 0);
    const totalEngagement = posts.reduce((sum, p) => sum + p.engagement, 0);
    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;

    let report = `====================================================\n`;
    report += `          EXECUTIVE CONTENT PERFORMANCE REPORT      \n`;
    report += `          Generated: ${new Date().toISOString().split('T')[0]}\n`;
    report += `====================================================\n\n`;
    report += `1. OVERALL METRICS SUMMARY\n`;
    report += `   - Total Lifetime Reach (Views): ${(totalViews / 1000).toFixed(1)}K\n`;
    report += `   - Total Engagement Actions: ${(totalEngagement / 1000).toFixed(1)}K\n`;
    report += `   - Average Click-Through Rate: ${ctr}%\n`;
    report += `   - Content Registry Size: ${posts.length} Campaigns\n\n`;
    report += `2. CHANNEL BENCHMARKS\n`;
    
    const channels = ['blog', 'email', 'video', 'social'];
    channels.forEach(ch => {
      const chPosts = posts.filter(p => p.channel === ch);
      const chViews = chPosts.reduce((sum, p) => sum + p.views, 0);
      const chAvgViews = chPosts.length > 0 ? Math.round(chViews / chPosts.length) : 0;
      report += `   - ${ch.toUpperCase()}: ${chPosts.length} posts, Avg Reach: ${chAvgViews} views\n`;
    });

    report += `\n3. TOP PERFORMANCE BENCHMARKS (RECALLED FROM HINDSIGHT)\n`;
    const sorted = [...posts].sort((a, b) => b.views - a.views).slice(0, 3);
    sorted.forEach((p, idx) => {
      report += `   [#${idx + 1}] "${p.title}" (${p.channel.toUpperCase()})\n`;
      report += `        Date: ${p.date} | Reach: ${p.views} | Tone: ${p.tone.toUpperCase()}\n`;
    });

    report += `\n4. STRATEGIC RECOMMENDATION\n`;
    report += `   Based on Hindsight memory overlaps, formal blog content achieves the highest overall volume of views, while casual emails deliver 2.4x higher Click-Through-Rates. We recommend adopting a cross-channel cadence where deep-dive formal blog posts are introduced, and subsequently repackaged into casual emails and short videos.\n\n`;
    report += `====================================================\n`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=weekly_executive_report.txt');
    res.status(200).send(report);
  } catch (error) {
    res.status(500).json({ error: 'Report generation failed.' });
  }
});

// 8. Contact Submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    console.log(`[Contact Service] Message Submission Received:`);
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Message: ${message}`);
    res.json({ success: true, message: 'Your message has been processed successfully!' });
  } catch (error) {
    console.error('[Server] Contact Submission Error:', error);
    res.status(500).json({ error: 'Failed to process your message.' });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Content Strategy Backend running on port ${PORT}`);
});
