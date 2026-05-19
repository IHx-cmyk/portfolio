import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const neonText = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]";
  const glassEffect = "bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex justify-center w-full max-w-4xl mx-auto px-6 py-6 md:py-12"
    >
      <div className={`w-full rounded-[2rem] p-8 md:p-12 ${glassEffect}`}>
        <div className="grid md:grid-cols-[1fr,2fr] gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-48 h-48 md:w-full md:h-auto aspect-square rounded-full md:rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-white/5">
              <img src="/pribadi.jpg" alt="Ihsann Profil" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-4xl md:text-5xl font-extrabold ${neonText} mb-6 tracking-tight`}
            >
              Tentang Saya
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 text-gray-200/90 leading-relaxed text-base md:text-lg drop-shadow-sm"
            >
              <p>
                Halo!! 👋🏻 Saya <span className="font-semibold text-white">M. Najih Ihsany</span>, seorang pelajar yang mempunyai keinginan mengeksplorasi dunia yang tanpa ada batasnya.
              </p>
              <p>
                Keahlian saya berfokus pada ekosistem JavaScript, pengembangan bot automation, 
                hingga integrasi fitur berbasis AI ke dalam aplikasi.
              </p>
              <p className="border-l-4 border-cyan-400/50 pl-4 bg-white/[0.03] py-3 pr-2 rounded-r-lg text-sm md:text-base italic text-gray-300">
                "Coding bukan sekadar menulis sintaks, tapi memecahkan masalah dan mengubah ide menjadi baris kode yang nyata."
              </p>
            </motion.div>
          </div>

        </div>
        
        <hr className="border-white/5 my-10" />
        <div className="text-center text-gray-400/80 text-sm drop-shadow-sm">
         📍 Laren. Lamongan. Jawa Timur
        </div>
      </div>
    </motion.div>
  );
}
