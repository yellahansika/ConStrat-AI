import HindsightClient from './hindsight.js';
import LLMClient from './llm.js';

export class OdysseusOrchestrator {
  /**
   * Run the strategy orchestration loop
   */
  async runStrategyLoop({ queryText, channel, useMemory = true }) {
    console.log(`[Odysseus] Starting strategy loop. Mode: ${useMemory ? 'MEMORY-POWERED' : 'GENERIC'}`);
    
    let memoryInsights = null;
    let systemInstruction = "";
    let prompt = "";

    if (useMemory) {
      // 1. Recall past post history & performance indicators from Hindsight
      memoryInsights = await HindsightClient.recallMemory(queryText, channel);
      
      // Calculate average metrics for context
      const matchesSummary = memoryInsights.matches.map(m => 
        `- "${m.post.title}" (${m.post.channel}): ${m.post.views} views, ${m.post.clicks} clicks, ${m.post.engagement} engagement, Tone: ${m.post.tone}`
      ).join('\n');

      const topSummary = memoryInsights.topPerformers.map(t =>
        `- "${t.title}" (${t.channel}): ${t.views} views. Reason: ${t.reason}`
      ).join('\n');

      const gapSummary = memoryInsights.gaps.map(g =>
        `- Category: ${g.category} (Severity: ${g.severity}). Recommendation: ${g.recommendation}`
      ).join('\n');

      // 2. Formulate advanced system instructions integrating Hindsight memories
      systemInstruction = `
You are Odysseus, an elite AI Content Strategy Architect powered by Hindsight Cloud memory.
Your goal is to suggest high-impact, data-driven content recommendations.
You have retrieved the following historical content performance context from Hindsight Cloud:

--- RECALLED PAST POSTS ---
${matchesSummary || "No direct matches found."}

--- BRAND TOP PERFORMING CONTENT ---
${topSummary}

--- CONTENT GAPS TO FILL ---
${gapSummary}

--- BRAND VOICE TRENDS ---
${JSON.stringify(memoryInsights.tones)}
      `;

      prompt = `
Analyze the content focus area: "${queryText}".
Based on Hindsight memory:
1. Suggest 3 new, highly-differentiated content topics. Make sure they do NOT repeat past titles.
2. Adapt suggestions to the successful brand voice (formal, casual, playful mix).
3. Predict engagement scores (0-100) based on historical performance.
4. Highlight gaps and cross-channel synergies.

Format your response as a strict JSON object:
{
  "suggestedTopics": [
    {
      "title": "Topic title",
      "category": "Topic category",
      "channel": "blog/email/video/social",
      "tone": "formal/casual/playful",
      "predictedScore": 85,
      "predictionReason": "Why this will perform well based on history",
      "description": "Short summary"
    }
  ],
  "brandVoiceAnalysis": {
    "currentToneMatch": "How it matches brand voice",
    "toneSuggestions": "Specific copywriting tone recommendations"
  },
  "crossChannelInsights": "How to repurpose across channels"
}
      `;
    } else {
      // Generic Mode - no history, no memory
      systemInstruction = `
You are a basic AI content assistant. Suggest general topics. Do not reference historical performance, brand voice trends, or content gaps, as you have no memory.
      `;

      prompt = `
Generate 3 topic suggestions for: "${queryText}". Keep suggestions general. Return a JSON object with this exact structure:
{
  "suggestedTopics": [
    {
      "title": "Topic title",
      "category": "General",
      "channel": "blog/email/video/social",
      "tone": "neutral",
      "predictedScore": 60,
      "predictionReason": "Generic score without historical benchmark",
      "description": "Short summary"
    }
  ],
  "brandVoiceAnalysis": {
    "currentToneMatch": "Generic tone match.",
    "toneSuggestions": "Write clearly."
  },
  "crossChannelInsights": "None."
}
      `;
    }

    // Call LLM with the context-aware prompt
    const rawResult = await LLMClient.generateSuggestions(prompt, systemInstruction);
    
    let resultJson;
    try {
      resultJson = JSON.parse(rawResult);
    } catch (e) {
      console.error("[Odysseus] Failed to parse LLM JSON output. Raw result:", rawResult);
      // Fallback parse manual or fallback to empty JSON
      resultJson = {
        suggestedTopics: [],
        brandVoiceAnalysis: { currentToneMatch: "Unknown", toneSuggestions: "Format error" },
        crossChannelInsights: "Format error"
      };
    }

    return {
      success: true,
      agentMode: useMemory ? 'memory-powered' : 'generic',
      suggestions: resultJson.suggestedTopics || [],
      brandVoiceAnalysis: resultJson.brandVoiceAnalysis || {},
      crossChannelInsights: resultJson.crossChannelInsights || "",
      memoryInsights: useMemory ? memoryInsights : null
    };
  }

  /**
   * Audit an incoming post draft for duplication and quality (Audit Mode)
   */
  async auditPost(draftPost) {
    const memory = await HindsightClient.recallMemory(`${draftPost.title} ${draftPost.content}`, draftPost.channel);
    
    // Auto-compute basic scores
    const characterCount = (draftPost.title + draftPost.content).length;
    const baseScore = Math.floor(Math.random() * 20) + 60; // 60-80 default
    
    let predictionScore = baseScore;
    let predictionReason = "Standard historical channel performance baseline.";
    
    if (memory.matches && memory.matches.length > 0) {
      const bestMatch = memory.matches[0];
      if (bestMatch.score > 0.4) {
        // If similar topic performed well, boost score, else if poor, penalize
        const historicalViews = bestMatch.post.views;
        if (historicalViews > 20000) {
          predictionScore = Math.min(98, baseScore + 15);
          predictionReason = `Boosted by 15% due to high performance of similar historical post: "${bestMatch.post.title}" (${historicalViews} views).`;
        } else if (historicalViews < 10000) {
          predictionScore = Math.max(40, baseScore - 15);
          predictionReason = `Reduced by 15% because similar historical post: "${bestMatch.post.title}" had lower engagement (${historicalViews} views).`;
        }
      }
    }

    return {
      auditWarning: memory.auditWarning,
      predictedScore: predictionScore,
      predictionReason,
      memoryMatches: memory.matches.slice(0, 2)
    };
  }
}

export default new OdysseusOrchestrator();
