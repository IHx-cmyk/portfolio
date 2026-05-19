import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import View from './pages/View';

const Space = lazy(() => import('./pages/Space'));

function Navbar() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const navGlass = "bg-white/[0.01] backdrop-blur-lg border-b border-white/10";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-50 ${navGlass}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 flex flex-row justify-between items-center w-full">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="text-lg md:text-xl font-bold text-white drop-shadow-md whitespace-nowrap">
            Shn<span className="text-cyan-300">N</span>
          </Link>
          <span className="text-[10px] md:text-xs font-mono text-cyan-300/80 bg-white/5 border border-white/10 px-2 py-1 rounded-md whitespace-nowrap">
            {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        <div className="flex flex-row gap-3 sm:gap-4 md:gap-6 text-xs md:text-sm">
          <Link to="/" className={`transition ${location.pathname === '/' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>Home</Link>
          <Link to="/about" className={`transition ${location.pathname === '/about' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>About</Link>
          <Link to="/contact" className={`transition ${location.pathname === '/contact' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>Contact</Link>
          <Link to="/view" className={`transition ${location.pathname === '/view' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>View</Link>
          <Link to="/space" className={`transition ${location.pathname === '/space' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>Space</Link>
        </div>
      </div>
    </nav>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/view" element={<View />} />
        <Route path="/space" element={
          <Suspense fallback={
            <div className="flex h-[70vh] items-center justify-center text-cyan-400 font-mono text-xs md:text-sm tracking-[0.4em] uppercase animate-pulse">
              Initializing Space...
            </div>
          }>
            <Space />
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020205]"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-14 h-14 border-[3px] border-white/10 border-t-cyan-400 rounded-full"
              />
              <motion.div 
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                className="text-xs md:text-sm font-mono tracking-[0.4em] text-cyan-400 uppercase ml-2"
              >
                Loading
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen text-gray-200 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden flex flex-col items-center scroll-smooth">
        <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-screen h-screen object-cover z-[-2] pointer-events-none">
          <source src="/malam.mp4" type="video/mp4" />
        </video>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/10 z-[-1] pointer-events-none"></div>
        <Navbar />
        <div className="w-full pt-20">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}
