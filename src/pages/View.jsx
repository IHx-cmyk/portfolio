import React from 'react';
import { motion } from 'framer-motion';

export default function View() {
  const neonText = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]";
  const photoFrame = "rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-white/5 relative group";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full max-w-3xl mx-auto px-6 py-6 md:py-12 flex flex-col items-center"
    >
      
      <div className="text-center mb-10">
        <h1 className={`text-4xl md:text-5xl font-extrabold ${neonText} mb-2 tracking-tight`}>
          Gallery
        </h1>
        <p className="text-gray-400 text-sm">Visual & Memories</p>
      </div>

      <div className="w-full flex flex-col gap-6 md:gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${photoFrame} w-full aspect-video md:aspect-[21/9]`}
        >
          <img 
            src="/gunung.jpg" 
            alt="Foto Atas" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${photoFrame} w-full aspect-[3/4] md:aspect-[4/5]`}
          >
            <img 
              src="/self.jpg" 
              alt="Foto Kiri" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`${photoFrame} w-full aspect-[3/4] md:aspect-[4/5] mt-12 md:mt-24`}
          >
            <img 
              src="/coder.jpg" 
              alt="Foto Kanan" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

        </div>
      </div>

    </motion.div>
  );
}
