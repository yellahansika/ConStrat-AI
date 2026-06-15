import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Content from './pages/Content';
import Contact from './pages/Contact';
import Resources from './pages/Resources';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Sync dark/light mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          darkMode ? 'dark bg-[#061424] text-slate-100' : 'light bg-slate-50 text-slate-800'
        }`}
      >
        {/* Global Navigation Header */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/blog" element={<Blog darkMode={darkMode} />} />
            <Route path="/content" element={<Content darkMode={darkMode} />} />
            <Route path="/my-content" element={<Content darkMode={darkMode} />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
