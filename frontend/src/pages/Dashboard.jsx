import React, { useState, useEffect } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import DashboardMain from '../components/DashboardMain';
import VoiceDemoPanel from '../components/VoiceDemoPanel';

export default function Dashboard({ darkMode }) {
  const [posts, setPosts] = useState([]);
  const [insights, setInsights] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [memoryInsights, setMemoryInsights] = useState(null);
  
  const [useMemory, setUseMemory] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Fetch initial dashboard contents
  const fetchDashboardData = async () => {
    try {
      const postsRes = await fetch('http://localhost:5000/api/posts');
      const postsData = await postsRes.json();
      setPosts(postsData);

      const insightsRes = await fetch('http://localhost:5000/api/insights');
      const insightsData = await insightsRes.json();
      setInsights(insightsData);
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    }
  };

  // Run suggestions query via Odysseus agent
  const handleQuerySuggestions = async (queryText = '', channelVal = '') => {
    try {
      const response = await fetch('http://localhost:5000/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          channel: channelVal,
          useMemory: useMemory
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.suggestions);
        setMemoryInsights(data.memoryInsights);
      }
    } catch (e) {
      console.error('Failed to load suggestions:', e);
    }
  };

  // Store new content in Hindsight + local database
  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      const data = await response.json();
      if (data.success) {
        fetchDashboardData();
        handleQuerySuggestions('', '');
      }
    } catch (e) {
      console.error('Add post failed:', e);
    }
  };

  // Toggle memory agent vs generic agent
  const handleToggleMemory = (val) => {
    setUseMemory(val);
    setTimeout(() => {
      handleQuerySuggestions('', '');
    }, 100);
  };

  // Download suggested topics CSV
  const handleExportCSV = async () => {
    if (suggestions.length === 0) return;
    try {
      const response = await fetch('http://localhost:5000/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: suggestions })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'suggested_topics.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  // Download executive summary text report
  const handleDownloadReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/weekly-report');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'weekly_executive_report.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error('Failed to download report:', e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    handleQuerySuggestions('', '');
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Main Workspace Layout */}
      <div className={`flex-1 flex overflow-hidden dashboard-container ${darkMode ? '' : 'light text-slate-850'}`}>
        
        {/* Left Side: Calendar & Add Post */}
        <SidebarLeft 
          posts={posts} 
          onAddPost={handleAddPost} 
        />

        {/* Center Panel: Dashboard Stats & Recommended Cards */}
        <DashboardMain 
          insights={insights}
          suggestions={suggestions}
          onQuerySuggestions={handleQuerySuggestions}
          useMemory={useMemory}
          onToggleMemory={handleToggleMemory}
          exportSuggestions={handleExportCSV}
          onDownloadReport={handleDownloadReport}
        />

        {/* Right Side: Memory Logs & Brand Tone Graph */}
        <SidebarRight 
          memoryInsights={memoryInsights} 
        />

      </div>

      {/* Narrative Walkthrough Guide Panel */}
      <VoiceDemoPanel 
        currentStep={currentStep}
        onNextStep={() => setCurrentStep(prev => Math.min(prev + 1, 4))}
        onPrevStep={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
        onResetDemo={() => {
          setCurrentStep(0);
          setUseMemory(true);
          handleQuerySuggestions('', '');
        }}
        useMemory={useMemory}
        onToggleMemory={handleToggleMemory}
      />
    </div>
  );
}
