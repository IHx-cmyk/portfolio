import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const neonText = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]";
  const glassEffect = "bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]";

  const focusAreas = [
    {
      title: "Web Modern",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "AI Integration",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Bot Automation",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full"
    >
      <div className="relative z-10 w-full max-w-4xl px-6 pt-6">
        <div className="w-full h-56 md:h-72 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-white/10">
          <img src="/gunung.jpg" alt="Mountain" className="w-full h-full object-cover" />
        </div>
      </div>

      <main className="relative z-10 w-full max-w-4xl px-6 pb-12 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`w-full rounded-[2rem] p-8 md:p-12 ${glassEffect} relative overflow-hidden`}
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs md:text-sm text-gray-300 tracking-wide">Available for Collaboration</span>
            </motion.div>

            <h1 className={`text-5xl md:text-7xl font-extrabold ${neonText} mb-6 tracking-tight`}>
              M. Najih Ihsany
            </h1>
            <p className="text-base md:text-lg text-gray-200/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-2">
              Student & Junior Developer.
            </p>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-10">
              Berfokus pada pengembangan ekosistem yang terintegrasi secara efisien.
            </p>            
          </div>
          
          <div className="grid grid-cols-3 gap-2 md:gap-4 relative z-10 w-full max-w-3xl mx-auto">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="flex flex-col items-center justify-center p-2 md:p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group text-center"
              >
                <div className="p-2 md:p-3 rounded-xl bg-white/[0.03] mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-300 group-hover:text-white tracking-wide">
                  {area.title}
                </span>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </main>
    </motion.div>
  );
}
