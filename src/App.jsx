import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// Import Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GiveawayPopup } from './components/GiveawayPopup'; // Import the new component

// Import Page Components
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

export default function App() {
  const location = useLocation();
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="bg-background text-foreground selection:bg-purple-500/50 dark:selection:bg-purple-400/50 transition-colors duration-500">
        <Header />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <GiveawayPopup /> {/* GiveawayPopup, remove once giveaway is completed */}
      </div>
    </ThemeContext.Provider>
  );
}