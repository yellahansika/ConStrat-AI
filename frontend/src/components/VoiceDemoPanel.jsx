import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, RotateCcw, Volume2, Info } from 'lucide-react';

export default function VoiceDemoPanel({ 
  currentStep, 
  onNextStep, 
  onPrevStep, 
  onResetDemo,
  useMemory, 
  onToggleMemory 
}) {
  const [speakActive, setSpeakActive] = useState(false);

  const steps = [
    {
      title: "1. Load Dashboard & Calendar",
      text: "We begin with a Content Calendar loaded with past campaigns. The Performance Overview chart maps their views and engagements, representing the baseline database stored in Hindsight memory.",
      actionLabel: "Next: Test Generic Agent"
    },
    {
      title: "2. Query the Generic Agent",
      text: "Switch to 'Generic Agent' mode above. Search for 'SEO' in the Suggested Topics panel. The agent generates general, unoptimized recommendations since it has no memory of past performance.",
      actionLabel: "Next: Activate Hindsight Memory"
    },
    {
      title: "3. Activate Hindsight Memory",
      text: "Switch to 'Memory-Powered Agent'. Search for 'SEO' again. Notice how the agent recalls similar high-performing posts, identifies gaps, adapts the brand voice, and predicts score benchmarks (94%+).",
      actionLabel: "Next: Test Duplicate Audit Mode"
    },
    {
      title: "4. Trigger Duplication Audit",
      text: "Click '+ Add New Post' and write a title similar to one of our past posts (e.g., 'SEO Best Practices for 2026'). Hindsight Memory checks similarities and warns of duplication fatigue.",
      actionLabel: "Next: Download Exports"
    },
    {
      title: "5. Export Strategic Summaries",
      text: "Lastly, export the memory-powered suggestions to CSV, or download the executive weekly summary report, showcasing a production-ready Content Strategy workflow.",
      actionLabel: "Start Over"
    }
  ];

  const stepDetails = steps[currentStep] || steps[0];

  // Optional Voiceover Narration using HTML5 SpeechSynthesis
  const speakText = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(stepDetails.text);
      utterance.rate = 1.05;
      utterance.onstart = () => setSpeakActive(true);
      utterance.onend = () => setSpeakActive(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const handleAction = () => {
    if (currentStep === 4) {
      onResetDemo();
    } else {
      // Guide states during steps
      if (currentStep === 1) {
        onToggleMemory(false); // Switch to Generic
      } else if (currentStep === 2) {
        onToggleMemory(true);  // Switch to Memory Powered
      }
      onNextStep();
    }
  };

  return (
    <div className="bg-slate-900/90 light:bg-slate-50/90 border-t border-slate-800 light:border-slate-200 p-4 sticky bottom-0 z-40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-8px_30px_rgb(0,0,0,0.3)]">
      <div className="flex items-start gap-3 flex-1">
        <div className="p-2 bg-gradient-to-br from-brandPrimary to-brandSecondary text-white rounded-xl shadow-lg shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brandPrimary">Demo Mode Guide</span>
            <span className="text-[10px] bg-slate-800 light:bg-slate-200 text-slate-400 light:text-slate-600 px-2 py-0.5 rounded-full font-bold">
              Step {currentStep + 1} of 5
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-100 light:text-slate-800 mt-0.5">{stepDetails.title}</h4>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1 max-w-4xl leading-relaxed">
            {stepDetails.text}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Read narrative button */}
        <button 
          onClick={speakText}
          className={`p-2.5 rounded-xl border border-slate-800 light:border-slate-300 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors text-slate-400 hover:text-brandPrimary ${
            speakActive ? 'text-brandPrimary bg-brandPrimary/10 border-brandPrimary/30 animate-pulse' : ''
          }`}
          title="Narrate Step Text"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <button 
          onClick={onResetDemo}
          className="p-2.5 rounded-xl border border-slate-800 light:border-slate-300 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors text-slate-400"
          title="Reset Walkthrough"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button 
          onClick={handleAction}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brandPrimary to-brandSecondary text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:shadow-brandPrimary/10 active:scale-95 transition-all"
        >
          {currentStep === 4 ? 'Restart Guide' : stepDetails.actionLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
