import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import View from './pages/View';
import Space from './pages/Space';

function Navbar() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const navGlass = "bg-white/[0.01] backdrop-blur-lg border-b border-white/10";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
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
          <Link to="/" className={`transition ${location.pathname === '/' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Home
          </Link>
          <Link to="/about" className={`transition ${location.pathname === '/about' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>
            About
          </Link>
          <Link to="/contact" className={`transition ${location.pathname === '/contact' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Contact
          </Link>
          <Link to="/view" className={`transition ${location.pathname === '/view' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>
            View
          </Link>
          <Link to="/space" className={`transition ${location.pathname === '/space' ? 'text-cyan-300 font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Space
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen text-gray-200 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden flex flex-col items-center">
        <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-[-2]">
          <source src="/malam.mp4" type="video/mp4" />
        </video>
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 z-[-1]"></div>
        <Navbar />
        <div className="w-full pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/view" element={<View />} />
            <Route path="/space" element={<Space />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
