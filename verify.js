import { spawn } from 'child_process';
import axios from 'axios';

const TEST_PORT = 5000;
const BASE_URL = `http://localhost:${TEST_PORT}/api`;

console.log('====================================================');
console.log('          STARTING BACKEND SERVICE VERIFICATION     ');
console.log('====================================================\n');

// 1. Start the server
const serverProcess = spawn('node', ['backend/src/server.js'], {
  env: { ...process.env, PORT: TEST_PORT.toString() },
  shell: true
});

let serverReady = false;

// Listen for stdout
serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`[Server Log] ${output.trim()}`);
  if (output.includes('running on port')) {
    serverReady = true;
  }
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[Server Error] ${data.toString()}`);
});

// Wait for server to start, then run tests
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  // Wait up to 5 seconds for server to report ready
  let retries = 5;
  while (!serverReady && retries > 0) {
    await sleep(1000);
    retries--;
  }

  if (!serverReady) {
    console.error('❌ Error: Server failed to start in time.');
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- 🚀 Running Endpoint Verifications ---');
  let success = true;

  // Test 1: GET /api/posts
  try {
    console.log('\n[Test 1] Fetching Content Calendar (GET /posts)...');
    const res = await axios.get(`${BASE_URL}/posts`);
    if (res.status === 200 && Array.isArray(res.data)) {
      console.log(`✅ Success: Fetched ${res.data.length} posts.`);
    } else {
      console.error('❌ Fail: Expected array of posts.');
      success = false;
    }
  } catch (err) {
    console.error('❌ Fail: API request error:', err.message);
    success = false;
  }

  // Test 2: GET /api/insights
  try {
    console.log('\n[Test 2] Fetching Dashboard Metrics (GET /insights)...');
    const res = await axios.get(`${BASE_URL}/insights`);
    if (res.status === 200 && res.data.totalViews !== undefined) {
      console.log(`✅ Success: Lifetime views = ${res.data.totalViews}, CTR = ${res.data.avgCTR}%`);
    } else {
      console.error('❌ Fail: Missing critical aggregated fields.');
      success = false;
    }
  } catch (err) {
    console.error('❌ Fail: API request error:', err.message);
    success = false;
  }

  // Test 3: POST /api/suggest (Memory Mode = Disabled)
  try {
    console.log('\n[Test 3] Requesting Suggestions - Generic Mode (POST /suggest)...');
    const res = await axios.post(`${BASE_URL}/suggest`, {
      query: 'SEO Optimization',
      useMemory: false
    });
    if (res.status === 200 && res.data.suggestions.length > 0) {
      console.log(`✅ Success: Generated ${res.data.suggestions.length} general topics.`);
      console.log(`   - Sample topic: "${res.data.suggestions[0].title}"`);
    } else {
      console.error('❌ Fail: Suggestions not generated.');
      success = false;
    }
  } catch (err) {
    console.error('❌ Fail: API request error:', err.message);
    success = false;
  }

  // Test 4: POST /api/suggest (Memory Mode = Enabled)
  try {
    console.log('\n[Test 4] Requesting Suggestions - Memory-Powered (POST /suggest)...');
    const res = await axios.post(`${BASE_URL}/suggest`, {
      query: 'SEO Optimization',
      useMemory: true
    });
    if (res.status === 200 && res.data.suggestions.length > 0 && res.data.memoryInsights) {
      console.log(`✅ Success: Generated ${res.data.suggestions.length} memory-aligned topics.`);
      console.log(`   - Sample topic: "${res.data.suggestions[0].title}"`);
      console.log(`   - Recalled history matches: ${res.data.memoryInsights.matches.length}`);
      console.log(`   - Gaps flagged: ${res.data.memoryInsights.gaps.length}`);
    } else {
      console.error('❌ Fail: Memory insights not integrated.');
      success = false;
    }
  } catch (err) {
    console.error('❌ Fail: API request error:', err.message);
    success = false;
  }

  // Test 5: POST /api/audit (Duplicate Warn Trigger)
  try {
    console.log('\n[Test 5] Auditing Duplicate Content Draft (POST /audit)...');
    const res = await axios.post(`${BASE_URL}/audit`, {
      title: 'SEO Best Practices for 2026',
      content: 'A detailed look at mobile-first indexing, Core Web Vitals, and how to optimize blogs.',
      channel: 'blog'
    });
    if (res.status === 200 && res.data.auditWarning) {
      console.log(`✅ Success: Duplicate detected! Similarity score = ${res.data.auditWarning.similarity}%`);
      console.log(`   - Warning Message: "${res.data.auditWarning.message}"`);
    } else {
      console.error('❌ Fail: Duplicate warning did not fire for identical title.');
      success = false;
    }
  } catch (err) {
    console.error('❌ Fail: API request error:', err.message);
    success = false;
  }

  console.log('\n====================================================');
  if (success) {
    console.log('🎉 VERIFICATION PASSED: ALL ENDPOINTS FUNCTIONING PERFECTLY');
    serverProcess.kill();
    process.exit(0);
  } else {
    console.log('❌ VERIFICATION FAILED: ENCOUNTERED TESTING ERRORS');
    serverProcess.kill();
    process.exit(1);
  }
}

// Handle exit cleanly
process.on('SIGINT', () => {
  serverProcess.kill();
  process.exit();
});

runTests();
