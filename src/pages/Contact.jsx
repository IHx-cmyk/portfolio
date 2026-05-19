import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const neonText = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]";
  const glassEffect = "bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]";

  const socials = [
    {
      name: 'Signal',
      url: 'https://signal.me/#eu/mQC0XOEktE2LSlU3ZZmYpvdyqTFNbWubOVa10ZdoXhV4v2LeGvBMbqEKraQm-oWa',
      color: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
      textColor: 'text-blue-400',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 21.818c-1.92 0-3.71-.532-5.23-1.442l-4.52 1.66 1.66-4.52C3.116 16.1 2.182 14.12 2.182 12A9.818 9.818 0 1 1 12 21.818zm0-15.273c-3.013 0-5.455 2.442-5.455 5.455S8.987 17.455 12 17.455 17.455 15.013 17.455 12 15.013 6.545 12 6.545zm0 9.273A3.818 3.818 0 1 1 12 8.182a3.818 3.818 0 0 1 0 7.636z" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/628818471170', 
      color: 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
      textColor: 'text-emerald-400',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.972 1.002a10.985 10.985 0 0 0-9.429 16.59l-1.543 5.378 5.568-1.468a10.986 10.986 0 1 0 5.404-20.5Zm0 19.141a9.149 9.149 0 0 1-4.664-1.272l-.334-.199-3.473.916.932-3.376-.217-.346A9.155 9.155 0 1 1 11.972 20.14Zm5.132-7.017c-.282-.141-1.666-.822-1.924-.916-.258-.094-.447-.141-.635.141-.188.282-.729.916-.893 1.104-.165.188-.33.212-.612.071-.282-.141-1.189-.439-2.266-1.4-1.109-.988-1.859-2.209-2.071-2.585-.212-.376.104-.499.273-.664.215-.209.426-.45.612-.68.188-.23.259-.395.399-.658.141-.264.071-.494-.002-.635-.072-.141-.635-1.529-.871-2.094-.235-.565-.47-.488-.635-.497-.165-.008-.353-.008-.541-.008a1.036 1.036 0 0 0-.753.353c-.259.282-.988.964-.988 2.352s1.012 2.729 1.153 2.917c.141.188 1.988 3.035 4.811 4.258.671.291 1.196.465 1.606.595.674.213 1.288.183 1.77.111.536-.081 1.666-.68 1.901-1.336.235-.658.235-1.223.165-1.341-.07-.118-.259-.188-.541-.329Z" />
        </svg>
      )
    },
    {
      name: 'Telegram',
      url: 'https://t.me/Shannyie',
      color: 'hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]',
      textColor: 'text-sky-400',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.91 2.212l-3.57 16.836c-.27 1.206-.98 1.507-1.99.936l-5.44-4.008-2.62 2.524c-.29.29-.53.53-1.09.53l.39-5.534 10.07-9.1c.44-.39-.1-.61-.69-.21L8.52 13.684 3.16 12c-1.16-.36-1.19-1.16.24-1.72l20.91-8.06c.97-.36 1.82.22 1.6 1.992z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/IHx-cmyk',
      color: 'hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      textColor: 'text-purple-300',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/abcde_2803',
      color: 'hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]',
      textColor: 'text-pink-400',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@useres871',
      color: 'hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
      textColor: 'text-cyan-400',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.73.9 1.69 1.62 2.79 2.12v3.91c-1.5-.04-2.95-.53-4.17-1.42-.54-.4-1.01-.88-1.41-1.42v7.95c.07 4.13-2.98 7.73-7.07 8.16-4.7.53-8.85-2.89-8.82-7.6.02-3.86 2.92-7.1 6.77-7.48v4.02c-1.8.2-3.11 1.77-2.99 3.58.11 1.59 1.44 2.85 3.04 2.84 1.76-.05 3.12-1.57 3.03-3.33V0l.32.02z" />
        </svg>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex justify-center w-full max-w-4xl mx-auto px-6 py-6 md:py-12"
    >
      <div className={`w-full rounded-[2rem] p-8 md:p-12 ${glassEffect}`}>
        
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-extrabold ${neonText} mb-4 tracking-tight`}>
            Hubungi Saya
          </h1>
          <p className="text-gray-300 max-w-md mx-auto text-sm md:text-base">
            Silakan pilih platform di bawah ini jika kamu tertarik untuk bekerja sama.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 transition-all duration-300 ${social.color} group`}
            >
              <div className={`p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.05] transition-colors ${social.textColor}`}>
                {social.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-wide">
                  {social.name}
                </h3>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  Hubungi via {social.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <hr className="border-white/5 my-12" />
        <div className="text-center text-xs text-gray-400/60">
          Respon paling cepat biasanya melalui Signal.
        </div>

      </div>
    </motion.div>
  );
}
